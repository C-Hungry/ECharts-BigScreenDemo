import Env from './env';

let config = {

    env: Env,

    // //开发-刘欣
    // baseUrl: "http://192.168.1.188:80/webapi/api",

    // //开发 王安茂
    // baseUrl: "http://localhost:80/ZK.ITMS.WebApi/api",

    // //正式
    // baseUrl: "http://api.i-tms.cn/api",
    
    //测试-黄敏
    baseUrl: "http://192.168.1.122/ZK.ITMS.WebApi/api",

    key: "demo",

};

if(window.service && window.service.baseUrl){
    config.baseUrl = window.service.baseUrl;
}

export default config;