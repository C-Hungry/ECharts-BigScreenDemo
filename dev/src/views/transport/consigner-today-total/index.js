
export default {
  data() {
    return {
      Data: {
        "ContractCompleteRate": 0,
        "TodayPlanWeight": 0,
        "ToadyFinishWeight": 0,
        "TransportInExecution": 0,
        "LronInExecution": 0,
        "ShipInExecution": 0,
      },
    };
  },
  props: ["loaded"],
  watch: {
  },
  methods: {
    timer(sec) {
      this.$service.get("/TMSApp/RecDelReport/GetCountCompanyPlanWeight", {}).then(res => {

        if (!res.Data) {
          setTimeout(() => {
            this.timer(sec);
          }, sec);
          return;
        }

        this.$emit("loaded", res.Data);

        this.Data = res.Data;
        setTimeout(() => {
          this.timer(sec);
        }, sec);
      })
        .catch(res => {
          setTimeout(() => {
            this.init();
          }, 10000);
        });
    },
    init() {
      this.timer(300000);
    },
  },
  mounted() {
    this.init();
  }
};