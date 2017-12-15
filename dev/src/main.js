import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import promise from "promise-polyfill";
import store from './store';
import Plugins from './plugins';

if (!window.Promise) {
    window.Promise = promise;
}

Vue.use(VueRouter);
Vue.use(iView);

Plugins.forEach((plugin) => {
    Vue.use(plugin);
});

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

window.VueRootInstance = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
