import IEcharts from "vue-echarts-v3";
import echarts from 'echarts';

import { getCorpID } from '../../../libs/storage';

export default {
  components: {
    IEcharts
  },
  data() {

    var renderItem = function (params, api) {
      
      var xValue = api.value(0);
      var highPoint = api.coord([xValue, api.value(1)]);
      var halfWidth = api.size([0, 0])[0] * 0.1;
      var style = api.style({
          stroke: api.visual('color'),
          fill: null
      });
  
      return {
          type: 'group',
          children: [{
              type: 'line',
              shape: params.seriesIndex == 2 ? {
                  x1: highPoint[0] - halfWidth * 3.6, y1: highPoint[1],
                  x2: highPoint[0] - halfWidth * 1.6, y2: highPoint[1]
              } : params.seriesIndex == 5 ? {
                x1: highPoint[0] - halfWidth, y1: highPoint[1],
                x2: highPoint[0] + halfWidth, y2: highPoint[1]
              } : {
                  x1: highPoint[0] + halfWidth * 1.6, y1: highPoint[1],
                  x2: highPoint[0] + halfWidth * 3.6, y2: highPoint[1]
              },
              style: style
          }]
      };
    };
    return {
      pageIndex: -1,
      pageSize: 2,
      list: [],
      barData: {
        color: ['#3398DB', '#5B6580', '#ff1111', '#E39F18', '#5B6580', '#ff1111', '#1C8F2E', '#5B6580', '#ff1111'],
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
            name: '长协（已完成）',
            type: 'bar',
            barWidth: '20%',
            stack: '长协',
            data: []
          },
          {
            name: '长协（未完成）',
            type: 'bar',
            barWidth: '20%',
            stack: '长协',
            data: []
          },
          {
            name: '长协（预估）',
            type: 'custom',
            renderItem: renderItem,
            // stack: '长协',
            data: []
          },
          {
            name: '协同（已完成）',
            type: 'bar',
            barWidth: '20%',
            stack: '协同',
            data: []
          },
          {
            name: '协同（未完成）',
            type: 'bar',
            barWidth: '20%',
            stack: '协同',
            data: []
          },
          {
            name: '协同（预估）',
            type: 'custom',
            renderItem: renderItem,
            // stack: '协同',
            data: []
          },
          {
            name: '市场（已完成）',
            type: 'bar',
            barWidth: '20%',
            stack: '市场',
            data: []
          },
          {
            name: '市场（未完成）',
            type: 'bar',
            barWidth: '20%',
            stack: '市场',
            data: []
          },
          {
            name: '市场（预估）',
            type: 'custom',
            renderItem: renderItem,
            // stack: '市场',
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
      this.barData.series[2].data = [];
      this.barData.series[3].data = [];
      this.barData.series[4].data = [];
      this.barData.series[5].data = [];
      this.barData.series[6].data = [];
      this.barData.series[7].data = [];
      this.barData.series[8].data = [];

      arr.forEach(item => {
        this.barData.xAxis[0].data.push((!item.receiverName || item.receiverName.length <= 5) ? item.receiverName : (item.receiverName.substr(0,4) + '...'));
        
        this.barData.series[0].data.push(item.teamworkCompleteWeight);        
        this.barData.series[1].data.push(item.teamworkPlanWeight-item.teamworkCompleteWeight);
        this.barData.series[2].data.push(item.teamworkEstimateWeight);
        this.barData.series[3].data.push(item.associationCompleteWeight);
        this.barData.series[4].data.push(item.associationPlanWeight-item.associationCompleteWeight);        
        this.barData.series[5].data.push(item.associationEstimateWeight);
        this.barData.series[6].data.push(item.marketCompleteWeight);        
        this.barData.series[7].data.push(item.marketPlanWeight-item.marketCompleteWeight);
        this.barData.series[8].data.push(item.marketEstimateWeight);
      });

      while (this.barData.xAxis[0].data.length < this.pageSize) {
        this.barData.xAxis[0].data.push("");
        this.barData.series[0].data.push(null);
        this.barData.series[1].data.push(null);
        this.barData.series[2].data.push(null);
        this.barData.series[3].data.push(null);
        this.barData.series[4].data.push(null);
        this.barData.series[5].data.push(null);
        this.barData.series[6].data.push(null);
        this.barData.series[7].data.push(null);
        this.barData.series[8].data.push(null);
      }
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

      this.$service.get("/TMSWeb/BranchOfficeHome/GetContractDetailInfo", {
        corpID:getCorpID(),
        status: 1
      }).then(res => {

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