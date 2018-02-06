import IEcharts from "vue-echarts-v3";
import chinaJSON from "../../../libs/china";
IEcharts.registerMap("china", chinaJSON);

export default {
  components: {
    IEcharts
  },
  data() {

    return {

      //ECHARTS地图OPTIONS
      mapData: {
        "backgroundColor": "#050E45",
        "geo": {
          "map": "china",
          "label": {
            "emphasis": { "show": false }
          },
          "roam": true,
          "layoutCenter": ["50%", "53%"],
          "layoutSize": "108%",
          "itemStyle": {
            "normal": { "color": "rgba(51, 69, 89, .5)", "borderColor": "rgba(100,149,237,0.4)" },
            "emphasis": { "color": "rgba(37, 43, 61, .5)" }
          },
          center: [109.1162, 34.2004],
          zoom: 1,
          regions: [{
            name: '陕西',
            selected: true
          }]
        },
        "series": []
      },

      groupData: [],

      //最远距离与缩放级别的关系（可能需要手动调整）
      distanceZoomList: [
        { zoom: 4, maxDistance: 1000, minDistance: 0 },
        { zoom: 1, maxDistance: 10000000, minDistance: 1000 },
      ],

      resizeTimer: 0,
      resizeCallback: () => {
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.$refs["map"].resize();
        }, 100);
      }
    };
  },
  methods: {

    timer(index) {

      if (this.groupData.length > 0) {
        this.mapData.geo.center = this.groupData[index].center;
        this.mapData.geo.zoom = this.groupData[index].zoom;
        this.mapData.series = this.groupData[index].series.reverse();
      }

      this.mapData.series.forEach(item => {
        if (item.type == "lines") item.effect.show = false;
      });

      setTimeout(() => {
        this.mapData.series.forEach(item => {
          if (item.type == "lines") item.effect.show = true;
        });
      }, 400);

      setTimeout(() => {
        this.init();
      }, 600000);

    },

    //根据地图上点的位置获取合适的中心点与缩放级别
    getCenterAndZoom(arr) {

      var minLat = 90;
      var maxLat = -90;
      var minLng = 180;
      var maxLng = -180;
      arr.forEach(item => {
        if (item.Lng >= maxLng) maxLng = item.Lng;
        if (item.Lng <= minLng) minLng = item.Lng;
        if (item.Lat >= maxLat) maxLat = item.Lat;
        if (item.Lat <= minLat) minLat = item.Lat;
      });

      //获取最远距离
      var distance = arr.map((item) => { return this.$utils.getDistance(minLat, minLng, maxLat, maxLng); })
        .sort((a, b) => { return b - a; })[0] / 1000;

      //获取缩放级别
      var zoom = this.distanceZoomList
        .filter(item => { return item.maxDistance > distance && item.minDistance <= distance; })[0].zoom;

      return { zoom, center: { Lng: (maxLng + minLng) / 2, Lat: (maxLat + minLat) / 2 } };

    },

    init() {

      this.$service.get("/TMSApp/RecDelReport/GetMapElectInfo", {}).then(res => {

        var Data = res.Data;

        if (!Data || Data.length <= 0) {
          this.timer(0);
          return;
        }

        //中心点与缩放级别
        var centerAndZoom = null;
        var objCorp = null;

        this.mapData.series.forEach(item => {
          item.data = [];
        });

        setTimeout(() => {
          this.groupData = [];

          if (Data[0].Parent[0]) {
            objCorp = Data[0].Parent[0];
            if (!Data[0].Name) {
              Data.length = 0;
              centerAndZoom = this.getCenterAndZoom([{ Lng: objCorp.Lng, Lat: objCorp.Lat }]);
            }
            else {
              centerAndZoom = this.getCenterAndZoom([{ Lng: Data[0].Parent[0].Lng, Lat: Data[0].Parent[0].Lat }, ...Data]);
            }
          }
          else {
            centerAndZoom = this.getCenterAndZoom(Data);
          }

          var center = centerAndZoom.center;

          var baseSeries = [];

          //分公司
          var point0 = {
            "type": "effectScatter",          
            "rippleEffect":{
                "period": 4,
                "scale": 8,
                "brushType": "fill",
            },
            "coordinateSystem": "geo",
            "zlevel": 2,
            "label": {
              "normal": {
                "show": true,
                "position": "right",
                "offset": [7, 0],
                "formatter": "{b}",
                "backgroundColor": "#eee",
                "color": "#FC1818",
                "borderColor": "#FC1818",
                "borderWidth": 1,
                "padding": 2,
                "fontSize": 14,
                "fontWeight": "bold"
              },
              "emphasis": { "show": true }
            },
            "symbol": "circle",
            "symbolSize": 5,
            "itemStyle": { "normal": { "show": false, "color": "#FC1818" } },
            "data": []
          };
          if (objCorp) {
            point0.data.push({ "name": objCorp.Name, "value": [objCorp.Lng, objCorp.Lat] });
          }
          baseSeries.push(point0);
          //收货单位
          var point1 = {
            "type": "effectScatter",
            "rippleEffect":{
              "period": 4,
              "scale": 8,
              "brushType": "fill",
            },
            "coordinateSystem": "geo",
            "zlevel": 2,
            "label": {
              "normal": {
                "show": true,
                "position": "right",
                "offset": [5, 0],
                "formatter": "{b}",
                "backgroundColor": "#eee",
                "color": "#333",
                "borderColor": "#333",
                "borderWidth": 1,
                "padding": 2,
                "fontSize": 14,
                "fontWeight": "normal"
              },
              "emphasis": { "show": true }
            },
            "symbol": "circle",
            "symbolSize": 4,
            "itemStyle": { "normal": { "show": false, "color": "#00FFFF" } },
            "data": []
          };
          Data.filter(item=>{
            return (item.TypeCompany & 8) == 8;
          })
          .forEach(item => {
            point1.data.push({ "name": item.Name, "value": [item.Lng, item.Lat] });
          });
          baseSeries.push(point1);
          
          //发货单位
          var point2 = {
            "type": "effectScatter",
            "rippleEffect":{
              "period": 4,
              "scale": 8,
              "brushType": "fill",
            },
            "coordinateSystem": "geo",
            "zlevel": 2,
            "label": {
              "normal": {
                "show": true,
                "position": "right",
                "offset": [5, 0],
                "formatter": "{b}",
                "backgroundColor": "#eee",
                "color": "#333",
                "borderColor": "#333",
                "borderWidth": 1,
                "padding": 2,
                "fontSize": 14,
                "fontWeight": "normal"
              },
              "emphasis": { "show": true }
            },
            "symbol": "circle",
            "symbolSize": 4,
            "itemStyle": { "normal": { "show": false, "color": "#FFC322" } },
            "data": []
          };
          Data.filter(item=>{
            return (item.TypeCompany & 4) == 4;
          })
          .forEach(item => {
            point2.data.push({ "name": item.Name, "value": [item.Lng, item.Lat] });
          });
          baseSeries.push(point2);
          
          
          var rootSeries = {
            center: [center.Lng, center.Lat],
            zoom: centerAndZoom.zoom,
            series: baseSeries.slice(0),
          };

          //电厂到分公司射线
          var line0 = {
            "type": "lines",
            "zlevel": 2,
            "effect": {
              "show": true,
              "period": 2,
              "trailLength": 0.01,
              "symbolSize": 4,
            },
            "lineStyle": { "normal": { "width": 1, "opacity": 0.1, "color": "#00FFFF", "curveness": -0.2 } },
            "data": [],
          };
          Data.filter(item=>{
            return (item.TypeCompany & 4) == 4 || (item.TypeCompany & 8) == 8;
          })
          .forEach(item => {
            if (objCorp) {
              line0.data.push([{ "coord": [item.Lng, item.Lat] }, { "coord": [objCorp.Lng, objCorp.Lat] }]);
            }
          });
          rootSeries.series.push(line0);
          this.groupData.push(rootSeries);

          this.timer(0);
        });
      })
        .catch(res => {
          setTimeout(() => {
            this.init();
          }, 10000);
        });
    }
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.resizeCallback);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeCallback);
  }
};