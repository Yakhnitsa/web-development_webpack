const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = merge(common, {
    mode:'production',
    devtool: 'source-map',

});