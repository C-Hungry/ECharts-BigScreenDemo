
export default {
  data() {
    return {
      pageIndex: -1,
      pageSize: 3,
      list: [],
      currentPageList: [],
    };
  },
  watch: {
    pageIndex() {
      var start = this.pageIndex * this.pageSize;
      var arr = this.list.slice(start, start + this.pageSize);
      while (arr.length < this.pageSize) {
        arr.push({ isEmpty: true, name: "", id: "empty" + (Math.random() * 10000) });
      }
      this.currentPageList = arr;
    }
  },
  methods: {

    timer(sec) {
      setTimeout(() => {
        if (this.pageIndex + 1 >= this.list.length / this.pageSize) {
          this.init();
        }
        else {
          this.pageIndex++;
          this.timer(sec);
        }
      }, sec);
    },

    init() {

      this.$service.get("/TMSApp/RecDelReport/GetTodayTransportException", {}).then(res => {

        if (!res.Data) {
          this.pageIndex = 0;
          this.timer(10000);
          return;
        }
        this.list = [];
        this.pageIndex = -1;
        setTimeout(() => {
          res.Data.forEach(item => {
            this.list.push({ id: item.id, carNum: item.car_num, name: item.corp_short_name, excepitonType: item.exception_type });
          });
          this.pageIndex = 0;
          this.timer(10000);
        });
      })
        .catch(res => {
          setTimeout(() => {
            this.init();
          }, 10000);
        });

      // setTimeout(() => {
      //   this.list = [
      //     { carNum: '陕A12345', name: "内蒙电厂", excepitonType: 1 },
      //     { carNum: '陕A22228', name: "新疆电厂", excepitonType: 2 },
      //     { carNum: '陕A32337', name: "乌海电厂", excepitonType: 2 },
      //     { carNum: '陕B11611', name: "铜川电厂", excepitonType: 1 },
      //     { carNum: '陕C32123', name: "西宁电厂", excepitonType: 2 },
      //     { carNum: '陕A76753', name: "兰州电厂", excepitonType: 2 },
      //     { carNum: '陕AD3453', name: "西安电厂", excepitonType: 1 },
      //     { carNum: '陕B54129', name: "秦山核电", excepitonType: 2 },
      //     { carNum: '陕A87345', name: "西北风电", excepitonType: 2 },
      //     { carNum: '陕A55445', name: "三峡水电", excepitonType: 2 },
      //   ];
      //   this.pageIndex = 0;
      //   this.timer(8000)
      // }, 1000);
    },

  },
  mounted() {
    this.init();
  }
};