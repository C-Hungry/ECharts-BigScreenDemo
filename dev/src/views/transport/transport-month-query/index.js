
export default {
  props:["corpID"],
  data() {
    return {

      start: (function () {
          var now = new Date();
          var start = new Date(now.getFullYear(), now.getMonth());
          return start;
      })(),
      end: (function () {
          var now = new Date();
          var end = new Date(now.getFullYear(), now.getMonth() + 1);
          end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
          return end;
      })(),

      loading: false,
      pageIndex: 1,
      pageSize: 10,
      totalCnt: 0,

      columns: [
        {
            title: '日期',
            key: 'Time'
        },
        {
            title: '计划量（吨）',
            key: 'FPValue'
        },
        {
            title: '完成量（吨）',
            key: 'CompleteWeight'
        },
        {
          title: '热值(kcal) 实收/计划',
          render: (h, params) => {
            return h('div', [
              (params.row.CalorificCompleteWeight?params.row.CalorificCompleteWeight.toFixed(2):'0.00') + "/" + 
              (params.row.CalorificPlanWeight?params.row.CalorificPlanWeight.toFixed(2):'0.00')
            ]);
          }
        },
        {
          title: '硫份 实收/计划',
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
    query(){
      this.loading = true;
      this.$service.get("/TMSWeb/CompanyBoard/GetElectircDataDetailInfoByMonth", {
        corpID: this.corpID,
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize,
        startTime: this.$utils.formateDate(this.start, "yyyy-MM-dd"),
        endTime: this.$utils.formateDate(this.end, "yyyy-MM-dd")
      }).then(res => {
        this.loading = false;
        if(!res.Data) res.Data = [];
        this.rows = res.Data;
        this.totalCnt = res.TotalCount;
      }).catch(res=>{
        this.loading = false;
      })

    },
  },
  mounted() {
    this.query();
  }
};