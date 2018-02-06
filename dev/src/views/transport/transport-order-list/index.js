import IEcharts from "vue-echarts-v3";

export default {
    components: {
        IEcharts
    },
    props: ["corpID"],
    data() {
        return {

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

            orderName: "",

            
            consignerList: [{
                id: -1,
                Text: "全部"
            }],
            ConsignerId: -1,

            

            loading: false,
            pageIndex: 1,
            pageSize: 10,
            totalCnt: 0,

            columns: [
                {
                    title: '订单名',
                    width: 150,
                    key: 'OrderName'
                },
                {
                    title: '发货方',
                    width: 100,
                    key: 'ConsignerName'
                },
                {
                    title: '煤种',
                    width: 100,
                    key: 'ProductName'
                },
                {
                    title: '热值（kcal）',
                    width: 120,
                    key: 'CalorificWeight'
                },
                {
                    title: '硫份',
                    width: 100,
                    key: 'SulphurWeight'
                },
                {
                    title: '合同量（吨）',
                    width: 140,
                    key: 'OrderNumber'
                },
                {
                    title: '完成量（吨）',
                    width: 140,
                    key: 'CompleteWeight'
                },
                {
                    title: '兑现率',
                    width: 100,
                    render: (h, params) => {
                        return h('div', [(params.row.CompleteRate*100).toFixed(2)+"%"]);
                    }
                },
                {
                    title: '状态',
                    width: 100,
                    key: 'statusStr'
                },
                {
                    title: '有效期',
                    width: 200,
                    render: (h, params) => {
                        return h('div', [params.row.OrderName != "汇总" ? (params.row.OrderStartTime.substr(0, 10) + "至" + params.row.OrderEndTime.substr(0, 10)):""]);
                    }
                },
            ],
            rows: [],
        };
    },
    methods: {

        onPageChanged(page) {
            this.pageIndex = page;
            this.query();
        },

        query() {

            this.loading = true;
            this.$service.get("/TMSWeb/CompanyBoard/GetElectricInfoForBurOrder", {
                corpID: this.corpID,
                pageIndex: this.pageIndex - 1,
                pageSize: this.pageSize,
                startTime: this.$utils.formateDate(this.timeSpan[0], "yyyy-MM-dd"),
                endTime: this.$utils.formateDate(this.timeSpan[1], "yyyy-MM-dd"),
                OrderName: this.orderName,
                ConsignerId: this.ConsignerId
            }).then(res => {
                this.loading = false;
                if (!res.Data) res.Data = [];
                this.rows = res.Data;
                this.totalCnt = res.TotalCount;
            }).catch(res => {
                this.loading = false;
            });

        },
    },
    mounted() {

        this.$service.get("/TMSWeb/CompanyBoard/GetUserCorpList", {
            corpID: this.corpID,
            corptype: 4,//发货方
            keyWord: "",
            pageIndex: 0,
            pageSize: 9999
        }).then(res => {
            this.loading = false;
            if (!res.Data) res.Data=[];
            res.Data.forEach(item=>{
                this.consignerList.push({id: item.id, Text: item.corp_short_name});
            });
        })

        this.query();
    }
};