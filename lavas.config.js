/**
 * @file lavas config
 * @author lc(lichuang516@126.com)
 */

'use strict';

const path = require('path');
const BUILD_PATH = path.resolve(__dirname, 'dist');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    build: {
        ssr: false,
        compress: true,
        path: BUILD_PATH,
        publicPath: '/',
        ssrCopy: isDev ? [] : [{
                src: 'server.prod.js'
            },
            {
                src: 'package.json'
            }
        ],
        extendWithWebpackChain: (config, {
            type,
            env
        }) => {
            config.plugins.delete("no-emit-on-errors");
            config.module
                .rule("px2rem")
                .test(/\.(vue|scss|css|styl)$/)
                .use("webpack-px2rem")
                .loader("webpack-px2rem-loader?min=9&floatWidth=2&basePx=32")
                /*
                   basePx:10 ,//1rm = npx 默认为10
                   min:9 ,//只会转换大于min的px 默认为0 因为很小的px（比如border的1px）转化成rem后在很小的设备上结果会小于1px，有的设备就会不显示
                   floatWidth:3  //转化后的rem值保留的小数点后位数 默认为3
                */
                .end()
                .exclude.add(/node_modules/);
        }
    },
    router: {
        mode: 'history',
        base: '/cnode-webapp/',
        pageTransition: {
            type: 'fade',
            transitionClass: 'fade'
        }
    },
    serviceWorker: {
        // If true, generate service-worker.js and sw-register.js
        // Default to `false`
        enable: true,

        // Path of service worker template
        swSrc: path.join(__dirname, 'core/service-worker.js'),

        // Path of generated service worker file
        swDest: path.join(BUILD_PATH, 'service-worker.js'),

        // If true, `workbox.routing.registerNavigationRoute()` won't be generated
        // Defaults to `false`
        disableGenerateNavigationRoute: true,

        // URL of appshell page
        // ONLY works in SSR mode
        appshellUrl: '/appshell',

        //预缓存文件配置
        globPatterns: [
            '**/*.{html,js,css,eot,svg,ttf,woff}'
        ]
    }
};
