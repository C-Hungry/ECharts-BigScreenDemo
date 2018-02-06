
export default {
  data() {
    return {
      currentIndex: -1,
      pageSize: 7,
      list: [],
      currentPageList: [],
    };
  },
  watch: {

    currentIndex() {
      // if (this.currentIndex % this.list.length % this.pageSize != 0) return;
      var start = Math.floor(this.currentIndex % this.list.length / this.pageSize) * this.pageSize;
      var arr = this.list.slice(start, start + this.pageSize);
      var index = 100000000;
      while (arr.length < this.pageSize) {
        arr.push({ isEmpty: true, name: "", id: index++ });
      }
      this.currentPageList = arr;
    }
  },
  methods: {

    timer(sec) {
      setTimeout(() => {
        //循环显示一圈后重新请求数据
        if (this.currentIndex + 1 >= this.list.length) {
          this.init();
        }
        else {
          this.currentIndex++;
          this.timer(sec);
        }
      }, sec);
    },

    init() {

      this.$service.get("/TMSApp/RecDelReport/GetMediumInfo", { status: 1 }).then(res => {

        // console.log(res.Data);
        if (!res.Data) {
          this.currentIndex = 0;
          this.timer(5000);
          return;
        }
        this.list = [];
        this.currentIndex = -1;
        setTimeout(() => {
          res.Data.forEach(item => {
            this.list.push({
              id: item.CorpID,
              name: item.CorpName,
              plan: item.PlanWeight,
              send: item.CompleteWeight,
              kcal: item.ActualCalorific ? item.ActualCalorific.toFixed(2) : 0,
              sulfur: item.ActualSulphur ? item.ActualSulphur.toFixed(2) : 0
            });
          });
          this.currentIndex = 0;
          this.timer(5000);
        });
      })
        .catch(res => {
          setTimeout(() => {
            this.init();
          }, 10000);
        });

      // setTimeout(() => {
      //   this.list = [
      //     { name: "内蒙电厂", plan: 100, send: 40, kcal: 2500, sulfur: "10%" },
      //     { name: "新疆电厂", plan: 100, send: 10, kcal: 2200, sulfur: "20%" },
      //     { name: "乌海电厂", plan: 100, send: 50, kcal: 2300, sulfur: "30%" },
      //     { name: "铜川电厂", plan: 100, send: 100, kcal: 2100, sulfur: "60%" },
      //     { name: "西宁电厂", plan: 100, send: 40, kcal: 2500, sulfur: "80%" },
      //     { name: "兰州电厂", plan: 100, send: 80, kcal: 2100, sulfur: "40%" },
      //     { name: "西安电厂", plan: 100, send: 80, kcal: 2100, sulfur: "40%" },
      //     { name: "秦山核电", plan: 100, send: 80, kcal: 2100, sulfur: "40%" },
      //     { name: "西北风电", plan: 100, send: 80, kcal: 2100, sulfur: "40%" },
      //     { name: "三峡水电", plan: 100, send: 80, kcal: 2100, sulfur: "40%" },
      //   ];
      //   this.currentIndex = 0;
      //   this.timer(2000)
      // }, 1000);

    },

  },
  mounted() {
    this.init();
  }
};