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
        new VueLoaderPlugin()
    ],


    module: {
        rules: [
            // CSS
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },

            // PUG
            // {//   // test: /\.pug$/,
            //   test: /\.pug$/,
            //   use:['pug-plain-loader']
            // },

            // {
            //     test: /\.pug$/,
            //     exclude: /index\.pug$/,
            //     loader: 'pug-plain-loader'
            // },

            {
                test: /\.pug$/,
                exclude: /pages.*\.pug$/,
                loader: 'pug-plain-loader'
            },

            // {
            //     test: /index\.pug$/,
            //     exclude: /index\.pug$/,
            //     loader: 'pug-loader'
            // },

            {
                test: /pages.*\.pug$/,
                exclude: /\.vue$/,
                // loader: 'pug-loader'
                use: ['raw-loader', 'pug-plain-loader']
            },


            // {
            //     test: /\.pug$/,
            //     oneOf: [
            //         // this applies to pug imports inside JavaScript
            //         {
            //             exclude: /\.vue$/,
            //             use: ['raw-loader', 'pug-plain-loader']
            //             // use: ['pug-loader']
            //         },
            //         // this applies to <template lang="pug"> in Vue components
            //         {
            //             use: ['pug-plain-loader']
            //         }
            //     ]
            // },

            // VUE
            {
                test: /\.vue$/,
                loader: 'vue-loader'
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
