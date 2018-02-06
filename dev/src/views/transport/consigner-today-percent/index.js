import IEcharts from "vue-echarts-v3";

export default {
  components: {
    IEcharts
  },
  data() {
    return {
      currentIndex: -1,
      pieData: {

        series: [
          {
            type: 'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                formatter: '{d}%\n{b}',
                textStyle: {
                  fontSize: '14',
                  fontWeight: 'bold',
                  color: "white"
                }
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              // { value: 335, name: '青岛煤矿' },
              // { value: 310, name: '山西煤矿' },
              // { value: 234, name: '禾草沟煤矿' },
              // { value: 135, name: '包头煤矿' },
              // { value: 548, name: '铜川煤矿' }
            ]
          }
        ]
      },
      resizeCallback: () => {
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          if (this.$refs["pie"]) this.$refs["pie"].resize();
        }, 100);
      }
    };
  },
  watch: {
  },
  methods: {

    timer(sec) {
      var dataLen = this.pieData.series[0].data.length;
      if (!this.$refs["pie"]) {
        setTimeout(() => {
          this.init();
        }, 10000);
        return;
      }
      if(this.currentIndex >= this.pieData.series[0].data.length){
        this.init();
      }
      // 取消之前高亮的图形
      this.$refs["pie"].dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: this.currentIndex
      });
      this.currentIndex = (this.currentIndex + 1) % dataLen;
      // 高亮当前图形
      this.$refs["pie"].dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: this.currentIndex
      });
      setTimeout(() => {
        this.timer(sec);
      }, sec);
    },

    init() {

      this.$service.get("/TMSApp/RecDelReport/GetConsignerPlanWeight", {}).then(res => {
        if (!res.Data) {
          setTimeout(() => {
            this.timer(10000);
          });
          return;
        }
        this.pieData.series[0].data = [];
        res.Data.forEach(item => {
          this.pieData.series[0].data.push({
            name: item.ConsignerName,
            value: item.FPValue,
            HasSendWeight: item.HasSendWeight,
            TransportWeight: item.TransportWeight,
            ArriveWeight: item.ArriveWeight,
            CompleteWeight: item.CompleteWeight,
          });
        });
        setTimeout(() => {
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
    window.addEventListener("resize", this.resizeCallback);
  },
  destroyed() {

    window.removeEventListener("resize", this.resizeCallback);
  }
};