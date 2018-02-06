import CryptoJS from 'crypto-js';
import config from '../config/config';

var ApiServicePlugin = {};

ApiServicePlugin.install = function (Vue) {

  Vue.mixin({

    created: function () {

      var EARTH_RADIUS = 6378137.0;    //单位M
      var PI = Math.PI;

      function getRad(d) {
        return d * PI / 180.0;
      }

      this.$utils = {

        encrypt(str) {
          return CryptoJS.AES.encrypt(str, config.key).toString();
        },

        decrypt(str) {
          return CryptoJS.AES.decrypt(str.replace(/ /g, '+'), config.key).toString(CryptoJS.enc.Utf8);
        },

        getDistance(lat1, lng1, lat2, lng2) {

          var radLat1 = getRad(lat1);
          var radLat2 = getRad(lat2);

          var a = radLat1 - radLat2;
          var b = getRad(lng1) - getRad(lng2);

          var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
          s = s * EARTH_RADIUS;
          s = Math.round(s * 10000) / 10000.0;

          return s;
        },
        
        formateDate: function (datetime, formate = "yyyy-MM-dd HH:mm:ss") {

          if(!datetime) return "";
    
          var str = formate;
          var Week = ['日','一','二','三','四','五','六'];  
        
          str=str.replace(/yyyy|YYYY/,datetime.getFullYear());   
          str=str.replace(/yy|YY/,(datetime.getYear() % 100)>9?(datetime.getYear() % 100).toString():'0' + (datetime.getYear() % 100));   
        
          str=str.replace(/MM/,(datetime.getMonth()+1)>9?(datetime.getMonth()+1).toString():'0' + (datetime.getMonth()+1));   
          str=str.replace(/M/g,(datetime.getMonth()+1));   
        
          str=str.replace(/w|W/g,Week[datetime.getDay()]);   
        
          str=str.replace(/dd|DD/,datetime.getDate()>9?datetime.getDate().toString():'0' + datetime.getDate());   
          str=str.replace(/d|D/g,datetime.getDate());   
        
          str=str.replace(/hh|HH/,datetime.getHours()>9?datetime.getHours().toString():'0' + datetime.getHours());   
          str=str.replace(/h|H/g,datetime.getHours());   
          str=str.replace(/mm/,datetime.getMinutes()>9?datetime.getMinutes().toString():'0' + datetime.getMinutes());   
          str=str.replace(/m/g,datetime.getMinutes());   
        
          str=str.replace(/ss|SS/,datetime.getSeconds()>9?datetime.getSeconds().toString():'0' + datetime.getSeconds());   
          str=str.replace(/s|S/g,datetime.getSeconds());   
        
          return str;  
    
        },
      };
    }
  })
}

export default ApiServicePlugin;