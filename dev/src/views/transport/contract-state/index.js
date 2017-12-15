import IEcharts from "vue-echarts-v3";

export default {
  components: {
    IEcharts
  },
  data() {
    return {
      barData: {
        color: ['#3398DB', '#353A6B'],
        grid: {
          top: '5%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['达拉特电厂', '西宁电厂', '兰州电厂', '铜川电厂', '乌海电厂', '新疆电厂'],
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
                color: '#eee'
              }
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#eee'
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
            data: [620, 732, 701, 734, 90, 130]
          },
          {
            name: '总计',
            type: 'bar',
            barWidth: '40%',
            stack: '完场情况',
            data: [120, 132, 101, 134, 290, 230]
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
  methods: {
    timer(index) {
      if (index == 0) {
        this.barData.xAxis[0].data = ['达拉特电厂', '西宁电厂', '兰州电厂', '铜川电厂', '乌海电厂', '新疆电厂'];
        this.barData.series[0].data = [620, 732, 701, 734, 90, 130];
        this.barData.series[1].data = [120, 132, 101, 134, 290, 230];
      }
      else {
        this.barData.xAxis[0].data = ['西安电厂', '秦山核电', '西北风电', '三峡水电', '', ''];
        this.barData.series[0].data = [620, 73, 70, 73, 0, 0];
        this.barData.series[1].data = [200, 30, 40, 50, 0, 0];
      }
      setTimeout(() => {
        index = index == 0 ? 1 : 0;
        this.timer(index);
      }, 4000);
    }
  },
  mounted() {
    this.timer(0);
    window.addEventListener("resize", this.resizeCallback);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeCallback);
  }
};