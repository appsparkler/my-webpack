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
            template: path.join(__dirname, '../src/pages/home.html')
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

            {
                test: /pages.*\.pug$/,
                exclude: /\.vue$/,
                use: ['raw-loader', 'pug-plain-loader']
            },


            // VUE
            // {
            //     test: /\.vue$/,
            //     use: [
            //         /* config.module.rule('vue').use('cache-loader') */
            //         {
            //             loader: 'cache-loader',
            //             options: {
            //                 cacheDirectory: 'D:\\Projects\\archive\\aem-web-app\\node_modules\\.cache\\vue-loader',
            //                 cacheIdentifier: '57e662db'
            //             }
            //         },
            //         /* config.module.rule('vue').use('vue-loader') */
            //         {
            //             loader: 'vue-loader',
            //             options: {
            //                 compilerOptions: {
            //                     preserveWhitespace: false
            //                 },
            //                 cacheDirectory: 'D:\\Projects\\archive\\aem-wep-app\\node_modules\\.cache\\vue-loader',
            //                 cacheIdentifier: '57e662db'
            //             }
            //         }
            //     ]
            // },

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
