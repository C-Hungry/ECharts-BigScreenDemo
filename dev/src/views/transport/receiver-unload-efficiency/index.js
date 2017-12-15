
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
        arr.push({ isEmpty: true, name: "" });
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

      setTimeout(() => {
        this.list = [
          { name: "内蒙电厂", value: 100 },
          { name: "新疆电厂", value: 100 },
          { name: "乌海电厂", value: 100 },
          { name: "铜川电厂", value: 100 },
          { name: "西宁电厂", value: 100 },
          { name: "兰州电厂", value: 100 },
          { name: "西安电厂", value: 100 },
          { name: "秦山核电", value: 100 },
          { name: "西北风电", value: 100 },
          { name: "三峡水电", value: 100 },
        ];
        this.pageIndex = 0;
        this.timer(8000)
      }, 1000);
    },

  },
  mounted() {
    this.init();
  }
};