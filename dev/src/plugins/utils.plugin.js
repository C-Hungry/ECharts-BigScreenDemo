import CryptoJS from 'crypto-js';
import config from '../config/config';

var ApiServicePlugin = {};

ApiServicePlugin.install = function (Vue) {

  Vue.mixin({

    created: function () {

      this.$utils = {

        encrypt(str) {
          return CryptoJS.AES.encrypt(str, config.key).toString();
        },

        decrypt(str) {
          return CryptoJS.AES.decrypt(str.replace(/ /g, '+'), config.key).toString(CryptoJS.enc.Utf8);
        },

        dateToString(dt) {

          if (!dt) return "";

          var year = dt.getFullYear();
          var month = (dt.getMonth() + 1).toString();
          var day = (dt.getDate()).toString();
          var hour = (dt.getHours()).toString();
          var minute = (dt.getMinutes()).toString();
          var second = (dt.getSeconds()).toString();

          if (month.length == 1) {
            month = "0" + month;
          }
          if (day.length == 1) {
            day = "0" + day;
          }
          if (hour.length == 1) {
            hour = "0" + hour;
          }
          if (minute.length == 1) {
            minute = "0" + minute;
          }
          if (second.length == 1) {
            second = "0" + second;
          }
          var dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

          return dateTime;

        },
      };
    }
  })
}

export default ApiServicePlugin;