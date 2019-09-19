/**
 * @file entry
 * @author lc(lichuang516@126.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';

import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import AppComponent from './App.vue';

/* 全局使用UI框架 vant */
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 引入flexble 页面自适应工具之一
import 'lib-flexible/flexible.js'

import '@/assets/stylus/reset.styl'

Vue.use(Meta);

Vue.config.productionTip = false;

export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {App, router, store};
}

if (module.hot) {
    module.hot.accept();
}
