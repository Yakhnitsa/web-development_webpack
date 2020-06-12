const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    mode:'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 8082,
    },
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[name].bungle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Development',
            template:'./index.html'
        }),
        new VuetifyLoaderPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',

        }
    },

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
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },

        ]
    },

};