const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra')


// COPY ETC
fs.copySync(
    path.join(__dirname, '../../../../kpmg/ui/fe-framework/source/etc'),
    path.join(__dirname, '../dist/etc')
);


// COPY SOURCE
fs.copySync(
    path.join(__dirname, '../../../../kpmg/ui/fe-framework/source'),
    path.join(__dirname, '../source')
);

// D:\Projects\kpmg\ui\fe-framework
// TODO copy source folder to dist before executing the following exports
// module.exports = {
//     mode: 'production',
//
//     entry: './src/index.js',
//
//     output: {
//         path: path.join(__dirname, '../dist'),
//         filename: 'index_bundle.js',
//     },
//
//     resolve: {
//         modules: [
//             path.resolve(__dirname, '../node_modules'),
//             path.resolve(__dirname, '../source')
//         ]
//     },
//
//     plugins: [
//         new HTMLPlugin({
//             template: path.join(__dirname, '../src/index.pug'),
//             // inject:false
//         }),
//         new CopyPlugin([
//             // etc
//             // {
//             //     from: 'source'
//             // },
//             // missing png image
//             {
//                 from: 'src/designs/kpmgpublic/images/blockquotes_inverse.png',
//                 to: 'source/etc/clientlibs/kpmgpublic/global/css/vendor/mCSB_buttons.png'
//             },
//
//             // other files
//             {
//                 from: 'src/xx',
//                 to: 'xx'
//             },
//             // other files
//             {
//                 from: 'src/content',
//                 to: 'content'
//             },
//             {
//                 from: 'src/designs',
//                 to: 'etc/designs'
//             }
//         ])
//     ],
//
//     module: {
//         rules: [
//             // FONT LOADER
//             {
//                 test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
//                 use: [{
//                     loader: 'file-loader'
//                 }]
//             },
//             // IMAGES
//             {
//                 test: /\.(png|svg|jpg|gif)$/,
//                 use: [
//                     'file-loader'
//                 ]
//             },
//             // lESS
//             {
//                 test: /\.less$/,
//                 use: [{
//                     loader: 'style-loader' // creates style nodes from JS strings
//                 }, {
//                     loader: 'css-loader' // translates CSS into CommonJS
//                 }, {
//                     loader: 'less-loader' // compiles Less to CSS
//                 }]
//             },
//             // CSS
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader'],
//             },
//
//             // PUG
//             {
//                 test: /\.pug$/,
//                 loader: 'pug-loader'
//             }
//         ]
//     },
//
//     devServer: {
//         contentBase: path.join(__dirname, '../dist'),
//         bonjour: true,
//         overlay: true,
//         watchOptions: {
//             ignored: /.*\/node_modules\/.*/
//         },
//         writeToDisk: true, // (maybe) this option can be removed for performance
//         stats: {
//             assets: false,
//             cached: false,
//             cachedAssets: false,
//             children: false,
//             chunks: false,
//             chunkModules: false,
//             chunkOrigins: false,
//             colors: true,
//             depth: false,
//             entrypoints: true,
//             excludeAssets: /app\/assets/,
//             hash: false,
//             maxModules: 15,
//             modules: false,
//             performance: true,
//             reasons: false,
//             source: false,
//             timings: true,
//             version: false,
//             warnings: true,
//         }
//     }
// }
