import IEcharts from "vue-echarts-v3";
import chinaJSON from "../../../libs/china";
IEcharts.registerMap("china", chinaJSON);

export default {
  components: {
    IEcharts
  },
  data() {

    var option = {
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
          "normal": { "color": "rgba(51, 69, 89, .5)", "borderColor": "rgba(100,149,237,1)" },
          "emphasis": { "color": "rgba(37, 43, 61, .5)" }
        },
        center: [109.1162, 34.2004],
        zoom: 4,
      },
      "series": [
        {
          "type": "lines",
          "zlevel": 2,
          "lineStyle": { "normal": { "width": 1, "opacity": 0.1, "color": "#05FFFF", "curveness": -0.2 } },
          "data": [],
        },
        {
          "type": "lines",
          "zlevel": 2,
          "effect": {
            "show": true,
            "period": 4,
            "trailLength": 0.02,
            "symbolSize": 4,
          },
          "lineStyle": { "normal": { "width": 1, "opacity": 0.1, "color": "#0177C1", "curveness": -0.2 } },
          "data": [],
        },
        {
          "type": "lines",
          "zlevel": 2,
          "effect": {
            "show": true,
            "period": 4,
            "trailLength": 0.02,
            "symbolSize": 4,
          },
          "lineStyle": { "normal": { "width": 1, "opacity": 0.1, "color": "#F13242", "curveness": -0.2 } },
          "data": [],
        },
        {
          "type": "lines",
          "zlevel": 2,
          "effect": {
            "show": true,
            "period": 4,
            "trailLength": 0.02,
            "symbolSize": 4,
          },
          "lineStyle": { "normal": { "width": 1, "opacity": 0.1, "color": "#E0A219", "curveness": -0.2 } },
          "data": [],
        },
        {
          "type": "effectScatter",
          "coordinateSystem": "geo",
          "zlevel": 2,
          "label": {
            "normal": {
              "show": true,
              "position": "right",
              "offset": [5, 0],
              "formatter": "{b}"
            },
            "emphasis": { "show": true }
          },
          "symbol": "circle",
          "symbolSize": 12,
          "itemStyle": { "normal": { "show": false, "color": "#FC1818" } },
          "data": [{ "name": "华能集团", "value": [109.1162, 34.2004] }]
        },
        {
          "type": "effectScatter",
          "coordinateSystem": "geo",
          "zlevel": 2,
          "label": {
            "normal": {
              "show": true,
              "position": "right",
              "offset": [5, 0],
              "formatter": "{b}"
            },
            "emphasis": { "show": true }
          },
          "symbol": "circle",
          "symbolSize": 10,
          "itemStyle": { "normal": { "show": false, "color": "#00FFFF" } },
          "data": [
            { "name": "普陀分公司", "value": [111.4648, 30.2891] },
            { "name": "南方分公司", "value": [106.5107, 31.2196] },
            { "name": "银川分公司", "value": [106.3586, 38.1775] },
          ]
        },
        {
          "type": "effectScatter",
          "coordinateSystem": "geo",
          "zlevel": 2,
          "label": {
            "normal": {
              "show": true,
              "position": "right",
              "offset": [5, 0],
              "formatter": "{b}"
            },
            "emphasis": { "show": true }
          },
          "symbol": "circle",
          "symbolSize": 6,
          "itemStyle": { "normal": { "show": false, "color": "#19C00D" } },
          "data": [
            { "name": "", "value": [112.4648, 27.2891] },
            { "name": "", "value": [110.4648, 28.2891] },
            { "name": "", "value": [111.4648, 28.2891] },

            { "name": "", "value": [104.5107, 31.2196] },
            { "name": "", "value": [104.5107, 29.2196] },
            { "name": "", "value": [103.5107, 30.2196] },

            { "name": "", "value": [108.3516, 39.1675] },
            { "name": "", "value": [104.3686, 37.1175] },
            { "name": "", "value": [103.3686, 36.1175] },
            { "name": "", "value": [107.3686, 37.1175] },
            { "name": "", "value": [106.3686, 36.1175] },
          ]
        }
      ]
    };

    return {

      mapData: option,

      resizeTimer: 0,

      resizeCallback: () => {
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.$refs["map"].resize();
        }, 100);
      }
    };
  },
  watch: {
  },
  methods: {
    timer(index) {
      var arr = [[109.1162, 34.2004], [111.4648, 30.2891], [106.5107, 31.2196], [106.3586, 38.1775]];
      this.mapData.geo.center = arr[index];
      if (index == 0) {
        this.mapData.geo.zoom = 2;
        this.mapData.series[0].data = [
          [{ "coord": [111.4648, 30.2891] }, { "coord": [109.1162, 34.2004] }],
          [{ "coord": [106.5107, 31.2196] }, { "coord": [109.1162, 34.2004] }],
          [{ "coord": [106.3586, 38.1775] }, { "coord": [109.1162, 34.2004] }],
        ];
        this.mapData.series[1].data = [];
        this.mapData.series[2].data = [];
        this.mapData.series[3].data = [];
      }
      else {
        this.mapData.geo.zoom = 4;
        if (index == 1) {
          this.mapData.series[0].data = [];
          this.mapData.series[1].data = [
            [{ "coord": [112.4648, 27.2891] }, { "coord": [111.4648, 30.2891] }],
          ];
          this.mapData.series[2].data = [
            [{ "coord": [110.4648, 28.2891] }, { "coord": [111.4648, 30.2891] }],
          ];
          this.mapData.series[3].data = [
            [{ "coord": [111.4648, 28.2891] }, { "coord": [111.4648, 30.2891] }],
          ];
        }
        if (index == 2) {
          this.mapData.series[0].data = [];
          this.mapData.series[1].data = [
            [{ "coord": [104.5107, 31.2196] }, { "coord": [106.5107, 31.2196] }],
            [{ "coord": [104.5107, 29.2196] }, { "coord": [106.5107, 31.2196] }],
          ];
          this.mapData.series[2].data = [
            [{ "coord": [103.5107, 30.2196] }, { "coord": [106.5107, 31.2196] }],
          ];
          this.mapData.series[3].data = [];
        }
        if (index == 3) {
          this.mapData.series[0].data = [];
          this.mapData.series[1].data = [
            [{ "coord": [108.3516, 39.1675] }, { "coord": [106.3586, 38.1775] }],
            [{ "coord": [104.3686, 37.1175] }, { "coord": [106.3586, 38.1775] }],
            [{ "coord": [103.3686, 36.1175] }, { "coord": [106.3586, 38.1775] }],
          ];
          this.mapData.series[2].data = [
            [{ "coord": [107.3686, 37.1175] }, { "coord": [106.3586, 38.1775] }],
          ];
          this.mapData.series[3].data = [
            [{ "coord": [106.3686, 36.1175] }, { "coord": [106.3586, 38.1775] }],
          ];
        }
      }

      this.mapData.series[1].effect.show = false;
      this.mapData.series[2].effect.show = false;
      this.mapData.series[3].effect.show = false;
      setTimeout(() => {
        this.mapData.series[1].effect.show = true;
        this.mapData.series[2].effect.show = true;
        this.mapData.series[3].effect.show = true;
      }, 400);

      index++;
      if (index >= arr.length) index = 0;
      setTimeout(() => {
        this.timer(index)
      }, 6000);
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