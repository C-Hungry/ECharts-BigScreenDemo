
import config from "../config/config";
import { getToken } from '../libs/storage';

var ApiServicePlugin = {};

ApiServicePlugin.install = function (Vue) {

  Vue.prototype.$service = {

    get: function (url, data = {}) {

      if (!url) {
        url = config.logOut;
      }
      else {
        url = config.baseUrl + url;
      }
      return this.fetch(url, data, "GET", true);
    },

    post: function (url, data = {}) {

      if (!url) {
        url = config.authorizationUrl;
      }
      else {
        url = config.baseUrl + url;
      }
      return this.fetch(url, data, "POST", true);
    },

    fetch: (url, data, type) => {

      type = type.toUpperCase();

      return new Promise((resolve, reject) => {

        let dataStr = ''; //数据拼接字符串
        let sendData = {};

        Object.keys(data).forEach(key => {
          if (typeof (data[key]) == "object") {
            sendData = data[key];
          }
          else {
            if (!(data[key] === "")) dataStr += key + '=' + data[key] + '&';
          }
        })

        if (dataStr !== '') {
          dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
          url = url + '?' + dataStr;
        }

        let requestObj;
        if (window.XMLHttpRequest) {
          requestObj = new XMLHttpRequest();
        } else {
          requestObj = new ActiveXObject;
        }
        // console.log(getToken());
        requestObj.open(type, url, true);
        requestObj.setRequestHeader("Accept", "application/json");
        requestObj.setRequestHeader("Content-type", "application/json");
        requestObj.setRequestHeader("Authorization", getToken());
        requestObj.send(JSON.stringify(sendData));

        requestObj.onreadystatechange = () => {

          if (requestObj.readyState == 4) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            if (requestObj.status == 200) {
              resolve(obj);
            } else {
              reject(obj);
            }
          }
        }
      });
    }
  }
}

export default ApiServicePlugin;