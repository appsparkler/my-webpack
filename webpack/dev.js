const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const path = require('path');

console.log(path.join(__dirname, '../'))

module.exports = {
    mode: 'production',
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'index_bundle.js',
    },

    plugins: [

        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/pages/index.pug')
        }),

        new VueLoaderPlugin(),

        new webpack.HotModuleReplacementPlugin()
    ],


    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rules: [
            // CSS
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },

            // PUG (PLAIN LOADER FOR VUE TEMPLATES WITH PUG)
            {
                test: /\.pug$/,
                exclude: /pages.*\.pug$/,
                use: ['cache-loader', 'pug-plain-loader']
            },


            // PUG LOADER FOR PURE PUG TEMPLATES
            {
                test: /pages.*\.pug$/,
                exclude: /\.vue$/,
                use: ['cache-loader', 'raw-loader', 'pug-plain-loader']
            },


            {
                test: /\.vue$/,
                use: ['cache-loader', 'vue-loader']
            },

            // JS
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },


    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        bonjour: true,
        overlay: true,
        watchOptions: {
            ignored: /.*\/node_modules\/.*/
        },
        //writeToDisk: true, // (maybe) this option can be removed for performance
        stats: {
            assets: false,
            cached: false,
            cachedAssets: false,
            children: false,
            chunks: false,
            chunkModules: false,
            chunkOrigins: false,
            colors: true,
            depth: false,
            entrypoints: true,
            excludeAssets: /app\/assets/,
            hash: false,
            maxModules: 15,
            modules: false,
            performance: true,
            reasons: false,
            source: false,
            timings: true,
            version: false,
            warnings: true,
        }
    }
}
