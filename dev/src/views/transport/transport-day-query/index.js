import IEcharts from "vue-echarts-v3";

export default {
  components: {
    IEcharts
  },
  props: ["corpID"],
  data() {
    return {
      loading: true,
      topData:{
        "PlanWeight": 0,
        "HasSendWeight": 0,
        "TransportWeight": 0,
        "ArriverWeight": 0,
        "CompleteWeight": 0,
        "PlanCalorific": 0,
        "CompleteCalorific": 0,
        "PlanSulphur": 0,
        "CompleteSulphur": 0,
        "TransportType": -1
      },

      barData: {
        color: ['#3398DB', '#5B6580'],
        grid: {
          top: '5%',
          left: '5%',
          right: '5%',
          bottom: '10%',
          containLabel: true,
        },
        dataZoom: [
          {
              type: 'inside',
              startValue: 0,
              endValue: 12
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [],
            nameRotate: 10,
            axisLabel: {
              interval: 0,
              show: true,
              splitNumber: 15,
              textStyle: {
                fontSize: 10,
                color: '#1EA3DE'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0)'
              }
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.2)'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.2)'
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 10,
                color: '#1EA3DE'
              }
            },
          }
        ],
        series: [
          {
            name: '已完成',
            type: 'bar',
            barWidth: '40%',
            stack: 'day',
            data: []
          },
          {
            name: '未完成',
            type: 'bar',
            barWidth: '40%',
            stack: 'day',
            data: []
          },
        ]
      },

      resizeCallback: () => {
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.$refs["bar"].resize();
        }, 100);
      },

      options: {
        shortcuts: [
          {
            text: '今日',
            value: function () {
              var end = new Date();
              var start = new Date();
              start.setTime(start.getTime());
              return [start, end];
            }
          },
          {
            text: '昨日',
            value: function () {
              var end = new Date();
              var start = new Date();
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              return [start, end];
            }
          },
          {
            text: '最近七日',
            value: function () {
              var end = new Date();
              var start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
              return [start, end];
            }
          },
          {
            text: '本月',
            value: function () {
              var now = new Date();
              var start = new Date(now.getFullYear(), now.getMonth());
              var end = new Date(now.getFullYear(), now.getMonth() + 1);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              return [start, end];
            }
          },
          {
            text: '上月',
            value: function () {
              var now = new Date();
              var start = new Date(now.getFullYear(), now.getMonth() - 1);
              var end = new Date(now.getFullYear(), now.getMonth());
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              return [start, end];
            }
          },
          {
            text: '近一年',
            value: function () {
              var end = new Date();
              var start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              return [start, end];
            }
          },
          {
            text: '全部',
            value: function () {
              var end = new Date("9999-12-23");
              var start = new Date("1900-01-01");
              return [start, end];
            }
          }
        ]
      },

      timeSpan: (function () {
        var end = new Date();
        var start = new Date();
        return [start, end];
      })(),

      tableLoading: false,
      pageIndex: 1,
      pageSize: 10,
      totalCnt: 0,

      columns: [
        {
          title: '日期',
          width: 100,
          render: (h, params) => {
            return h('div', [params.row.Time == "汇总" ? "汇总" : params.row.Time.substr(5)]);
          }
        },
        {
          title: '计划量（吨）',
          width: 150,
          key: 'FPValue'
        },
        {
          title: '已发（吨）',
          width: 100,
          key: 'HasSendWeight'
        },
        {
          title: '途中（吨）',
          width: 100,
          key: 'TransportWeight'
        },
        {
          title: '待收（吨）',
          width: 100,
          key: 'ArriveWeight'
        },
        {
          title: '已收（吨）',
          width: 100,
          key: 'CompleteWeight'
        },
        {
          title: '热值(kcal) 实收/计划',
          width: 200,
          render: (h, params) => {
            return h('div', [
              (params.row.CalorificCompleteWeight?params.row.CalorificCompleteWeight.toFixed(2):'0.00') + "/" + 
              (params.row.CalorificPlanWeight?params.row.CalorificPlanWeight.toFixed(2):'0.00')
            ]);
          }
        },
        {
          title: '硫份 实收/计划',
          width: 200,
          render: (h, params) => {
            return h('div', [
              (params.row.SulphurCompleteWeight?params.row.SulphurCompleteWeight.toFixed(1):'0.0') + "%/" +
              (params.row.SulphurPlanWeight?params.row.SulphurPlanWeight.toFixed(1):'0.0') + "%"
            ]);
          }
        },
        {
          title: '兑现率',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('Progress', {
                props: {
                  percent: params.row.CompleteRate*100,
                }
              }, (params.row.CompleteRate*100).toFixed(2) + "%")
            ]);
          }
        },
      ],
      rows: [],
    };
  },
  methods: {

    onPageChanged(page){
      this.pageIndex = page;
      this.query();
    },
    query() {
      this.tableLoading = true;
      this.$service.get("/TMSWeb/CompanyBoard/GetElectircDataDetailInfoByDay", {
        corpID: this.corpID,
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize,
        startTime: this.$utils.formateDate(this.timeSpan[0], "yyyy-MM-dd"),
        endTime: this.$utils.formateDate(this.timeSpan[1], "yyyy-MM-dd")
      }).then(res => {
        this.tableLoading = false;
        if (!res.Data) res.Data = [];
        this.rows = res.Data;
        this.totalCnt = res.TotalCount;
      }).catch(res=>{
        this.tableLoading = false;
      });

    },

    init(){

      var now = new Date();
      var start = new Date(now.getFullYear(), now.getMonth());
      var end = new Date(now.getFullYear(), now.getMonth() + 1);
      end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
      
      Promise.all([
        this.$service.get("/TMSWeb/CompanyBoard/GetElectircDataDetailInfoByDay", {
          corpID: this.corpID,
          pageIndex: 0,
          pageSize: 31,
          startTime: this.$utils.formateDate(start, "yyyy-MM-dd"),
          endTime: this.$utils.formateDate(end, "yyyy-MM-dd")
        }).then(res => {
          if (!res.Data) res.Data = [];
          res.Data.reverse().slice(1).forEach(item => {
            this.barData.xAxis[0].data.push(item.Time.substr(5));
            this.barData.series[0].data.push(item.CompleteWeight);
            this.barData.series[1].data.push(item.FPValue - item.CompleteWeight > 0 ? item.FPValue - item.CompleteWeight : 0);
          });
        }),
        this.$service.get("/TMSApp/RecDelReport/GetHomeDataForApp", {
          corpID: this.corpID
        }).then(res => {
          if (!res.Data) res.Data = [];
          var topData = null;
          for(var i = 0; i < res.Data.length; i++){
            if(res.Data[i].TransportType==-1){
              topData = res.Data[i];
            }
          }
          this.topData = topData;
        })])
        .then(res=>{
          this.loading=false;
        });

    }
  },
  mounted() {
    this.query();
    this.init();
    window.addEventListener("resize", this.resizeCallback);
  },
  
  destroyed() {
    window.removeEventListener("resize", this.resizeCallback);
  }
};