import IEcharts from "vue-echarts-v3";
import transportDayQuery from "../transport-day-query/index.vue";
import transportMonthQuery from "../transport-month-query/index.vue";
import transportOrderList from "../transport-order-list/index.vue";
import elecBaseInfo from "../elec-base-info/index.vue";

export default {
  components: {
    IEcharts,
    transportDayQuery,
    transportMonthQuery,
    transportOrderList,
    elecBaseInfo
  },
  data() {
    return {
      pageIndex: -1,
      pageSize: 10,
      list: [],
      currentPageList: [],

      dlgDetail: {

        visible: false,

        title: "",

        corpID: 0,

        tabName: "日统计",

      },
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
    showDetail(corpID, name, CorpType) {

      if ((CorpType & 8) != 8) return;

      this.dlgDetail.tabName = "日统计";
      this.dlgDetail.corpID = corpID;
      this.dlgDetail.title = name;
      this.dlgDetail.visible = true;
    },

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

      this.$service.get("/TMSApp/RecDelReport/GetMediumInfo", { status: 1 }).then(res => {

        if (!res.Data) {
          this.pageIndex = 0;
          this.timer(10000);
          return;
        }
        this.list = [];
        this.pageIndex = -1;
        setTimeout(() => {
          res.Data.forEach(item => {
            this.list.push({
              id: item.CorpID,
              name: item.CorpName,
              plan: item.PlanWeight,
              send: item.CompleteWeight,
              kcal: item.ActualCalorific ? item.ActualCalorific.toFixed(2) : 0,
              sulfur: item.ActualSulphur ? item.ActualSulphur.toFixed(2) : 0,
              CorpType: item.CorpType
            });
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
    },

  },
  mounted() {
    this.init();
  }
};