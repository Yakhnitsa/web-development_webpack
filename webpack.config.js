const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode:'development',
    entry: {
        main: './src/router.js',
        secondary: './src/secondary.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

        new HtmlWebpackPlugin({
            title: 'Development',
            template:'./index.html'
        }),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                //Правила для vue.js
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                // Правила для обработки css стилей
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }

        ]
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    }
};