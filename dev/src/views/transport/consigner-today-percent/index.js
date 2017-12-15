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
              { value: 335, name: '青岛煤矿' },
              { value: 310, name: '山西煤矿' },
              { value: 234, name: '禾草沟煤矿' },
              { value: 135, name: '包头煤矿' },
              { value: 548, name: '铜川煤矿' }
            ]
          }
        ]
      },
      resizeCallback: () => {
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.$refs["pie"].resize();
        }, 100);
      }
    };
  },
  watch: {
  },
  methods: {

    timer(sec) {
      setTimeout(() => {
        var dataLen = this.pieData.series[0].data.length;
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
        this.timer(sec);
      }, sec);
    },

    init() {
      setTimeout(() => {
        this.pageIndex = 0;
        this.timer(2000);
      }, 1000);
    },
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.resizeCallback);
  },
  destroyed(){
    
    window.removeEventListener("resize", this.resizeCallback);
  }
};