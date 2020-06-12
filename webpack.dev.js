const merge = require('webpack-merge');
const common = require('./webpack.common.js');


const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode:'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 8080,
        allowedHosts: [
            'localhost:8080'
        ],
        // stats: 'errors-only',
        // clientLogLevel: 'error'
    },
    plugins: [
        new BundleAnalyzerPlugin()
    ],

})