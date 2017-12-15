
import IEcharts from "vue-echarts-v3";
import chinaJSON from "../libs/china";
IEcharts.registerMap("china", chinaJSON);

export default {
  components: {
    IEcharts
  },
  data() {


    var option = {
      "backgroundColor": "#404a59",
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
        }
      },
      "series": [
        {
          "type": "lines",
          "zlevel": 2,
          "effect": {
            "show": true,
            "period": 4,
            "trailLength": 0.02,
            "symbolSize": 3
          },
          "lineStyle": { "normal": { "width": 1, "opacity": 0.1, "color": "#00FFFF", "curveness": -0.2 } },
          "data": [
            [{ "coord": [111.4648, 30.2891] }, { "coord": [109.1162, 34.2004] }],
            [{ "coord": [106.5107, 31.2196] }, { "coord": [109.1162, 34.2004] }],
            [{ "coord": [106.3586, 38.1775] }, { "coord": [109.1162, 34.2004] }],
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
          "symbolSize": 8,
          "itemStyle": { "normal": { "show": false, "color": "#19C00D" } },
          "data": [

            { "name": "", "value": [112.4648, 28.2891] },
            { "name": "", "value": [110.4648, 29.2891] },

            { "name": "", "value": [105.5107, 32.2196] },
            { "name": "", "value": [105.5107, 30.2196] },

            { "name": "", "value": [107.3516, 39.1675] },
            { "name": "", "value": [105.3686, 37.1175] },
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
          "itemStyle": { "normal": { "show": false, "color": "#AE37B5" } },
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
      pieData: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          show: false,
          data: ['北方公司', '新疆公司', '南方公司', '内蒙公司', '陕西公司']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ["40%", "60%"],
            data: [
              { value: 335, name: '北方公司' },
              { value: 310, name: '新疆公司' },
              { value: 234, name: '南方公司' },
              { value: 135, name: '内蒙公司' },
              { value: 1548, name: '陕西公司' }
            ],
            itemStyle: {
            }
          }
        ]
      },

      mapData: option
    };
  },
  mounted() {
  }
};