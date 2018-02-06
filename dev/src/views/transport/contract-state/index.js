import IEcharts from "vue-echarts-v3";

export default {
  components: {
    IEcharts
  },
  data() {
    return {
      pageIndex: -1,
      pageSize: 6,
      list: [],
      barData: {
        color: ['#3398DB', '#5B6580'],
        grid: {
          top: '5%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            nameRotate: 10,
            axisLabel: {
              interval: 0,
              rotate: -30,
              show: true,
              splitNumber: 15,
              textStyle: {
                fontSize: 10,
                color: '#eee'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
          }
        ],
        series: [
          {
            name: '已完成',
            type: 'bar',
            barWidth: '40%',
            stack: '完场情况',
            data: []
          },
          {
            name: '总计',
            type: 'bar',
            barWidth: '40%',
            stack: '完场情况',
            data: []
          },
        ]
      },

      resizeCallback: () => {
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.$refs["bar"].resize();
        }, 100);
      }

    };
  },
  watch: {
    pageIndex() {
      var start = this.pageIndex * this.pageSize;
      var arr = this.list.slice(start, start + this.pageSize);

      this.barData.xAxis[0].data = [];
      this.barData.series[0].data = [];
      this.barData.series[1].data = [];

      arr.forEach(item => {
        this.barData.xAxis[0].data.push(item.ReceiverName.length <= 5 ? item.ReceiverName : (item.ReceiverName.substr(0,4) + '...'));
        this.barData.series[0].data.push(item.CompleteWeight);
        this.barData.series[1].data.push(item.ContractTotalValue - item.CompleteWeight > 0 ? item.ContractTotalValue - item.CompleteWeight : 0);
      });

      while (this.barData.xAxis[0].data.length < this.pageSize) {
        this.barData.xAxis[0].data.push("");
        this.barData.series[0].data.push(0);
        this.barData.series[1].data.push(0);
      }
    }
  },
  methods: {
    timer(sec) {
      setTimeout(() => {
        // console.log(this.pageIndex);
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

      this.$service.get("/TMSApp/RecDelReport/GetCountContractCompleteCase", {}).then(res => {

        if (!res.Data) {
          this.pageIndex = 0;
          this.timer(10000);
          return;
        }
        this.list = res.Data;
        this.pageIndex = 0;
        this.timer(10000);
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
    window.addEventListener("resize", this.resizeCallback);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeCallback);
  }
};