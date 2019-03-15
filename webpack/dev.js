const HtmlWebpackPlugin = require('html-webpack-plugin');
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
            template: path.join(__dirname, '../src/index.html')
        })
    ],


    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }]
    },


    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        bonjour: true,
        overlay: true,
        watchOptions: {
            ignored: /.*\/node_modules\/.*/
        },
        writeToDisk: true, // (maybe) this option can be removed for performance
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
