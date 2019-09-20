/**
 * @file .postcssrc.js
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    plugins: {
        // to edit target browsers: use "browserslist" field in package.json
        'autoprefixer': {
            browsers: ['Android >= 4.0', 'iOS >= 7']
        },
        'postcss-pxtorem': {
          rootValue: 32,
          propList: ['*']
        }
    }
};
