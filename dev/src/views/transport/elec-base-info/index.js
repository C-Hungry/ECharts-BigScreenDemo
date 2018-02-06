
export default {
  props:["corpID"],
  data() {
    return {
        loading: true,
        data: {
            TypeStr: "加载中",
            ParentCorpName: "加载中",
            BelongDistrict: "加载中",
            ReceiverNumber: 0,
            ConsignerNumber: 0,
            ShipperNumber: 0,
            id: 0,
            identity: "加载中",
            code: "加载中",
            corp_name: "加载中",
            corp_short_name: "加载中",
            type: 0,
            address: "加载中",
            telephone: "加载中",
            linkman: "加载中",
            mobile: "加载中",
            approved: 0,
            IsDeleted: 0,
            CreateBy: 0,
            CreateTime: "加载中",
            UpdateBy: 0,
            UpdateTime: "加载中",
            IDCode: "加载中",
            GroupType: 0,
            TaxNumber: "加载中",
            PID: null
        },
        dataTop:{
            ReceiverName: "加载中",
            TotalOrderWeight: "加载中",
            TotalOrderNumber: "加载中",
            ExceptionNumber: "加载中",
            CompleteRate: "加载中",
            CompleteWeight: "加载中",
            HighThanCompleteRate: "加载中",
            ExceptionRate: "加载中",
            HighThanExceptionRate: "加载中"
        },
    };
  },
  methods: {

    init(){

      Promise.all([
          this.$service.get("/TMSWeb/CompanyBoard/GetElectricBaseInfo", {
          corpID: this.corpID,
        }).then(res => {
          if(!res.Data) return;
          this.data = res.Data;
        }),
        this.$service.get("/TMSWeb/CompanyBoard/GetElectircDetailInfoTop", {
          corpID: this.corpID
        }).then(res => {
          if(!res.Data) return;
          this.dataTop = res.Data;
        })
      ])
      .then(res=>{
        this.loading=false;
      });
    },
  },
  mounted() {
    this.init();
  }
};