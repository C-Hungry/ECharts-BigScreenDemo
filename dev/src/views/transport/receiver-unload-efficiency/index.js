
export default {
  data() {
    return {
      pageIndex: -1,
      pageSize: 5,
      list: [],
      currentPageList: [],
    };
  },
  watch: {
    pageIndex() {
      var start = this.pageIndex * this.pageSize;
      var arr = this.list.slice(start, start + this.pageSize);
      while (arr.length < this.pageSize) {
        arr.push({ isEmpty: true, id: "empty" + (Math.random() * 10000) });
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

      this.$service.get("/TMSApp/RecDelReport/GetRateOfDischargInfo", {}).then(res => {

        if (!res.Data) {
          this.pageIndex = 0;
          this.timer(10000);
          return;
        }
        this.list = [];
        this.pageIndex = -1;
        setTimeout(() => {
          res.Data.forEach(item => {
            this.list.push({ id: item.CorpId, name: item.CorpName, value: item.DischargNumber });
          });
          this.pageIndex = 0;
          this.timer(10000);
        });
      })
      .catch(res=>{
        setTimeout(() => {
          this.init();
        }, 10000);
      });
    },

  },
  mounted() {
    this.init();
  }
};