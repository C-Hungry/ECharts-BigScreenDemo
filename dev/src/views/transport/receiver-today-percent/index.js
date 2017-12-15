
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
      while (arr.length < this.pageSize) {
        arr.push({ isEmpty: true, name: "" });
      }
      this.currentPageList = arr;
    }
  },
  methods: {

    timer(sec) {
      setTimeout(() => {
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
      setTimeout(() => {
        this.list = [
          { name: "内蒙电厂", plan: 100, send: 40, kcal: 2500, sulfur: "10%" },
          { name: "新疆电厂", plan: 100, send: 10, kcal: 2200, sulfur: "20%" },
          { name: "乌海电厂", plan: 100, send: 50, kcal: 2300, sulfur: "30%" },
          { name: "铜川电厂", plan: 100, send: 100, kcal: 2100, sulfur: "60%" },
          { name: "西宁电厂", plan: 100, send: 40, kcal: 2500, sulfur: "80%" },
          { name: "兰州电厂", plan: 100, send: 80, kcal: 2100, sulfur: "40%" },
          { name: "西安电厂", plan: 100, send: 80, kcal: 2100, sulfur: "40%" },
          { name: "秦山核电", plan: 100, send: 80, kcal: 2100, sulfur: "40%" },
          { name: "西北风电", plan: 100, send: 80, kcal: 2100, sulfur: "40%" },
          { name: "三峡水电", plan: 100, send: 80, kcal: 2100, sulfur: "40%" },
        ];
        this.currentIndex = 0;
        this.timer(2000)
      }, 1000);
    },

  },
  mounted() {
    this.init();
  }
};