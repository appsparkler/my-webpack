const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'production',

    entry: './src/index.js',

    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'index_bundle.js',
    },

    resolve: {
        modules: [
            path.resolve(__dirname, '../node_modules'),
            path.resolve(__dirname, '../source')
        ]
    },

    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../src/index.pug'),
            // inject:false
        }),
        new CopyPlugin([
            // etc
            {
                from: 'source'
            }
        ])
    ],

    module: {
        rules: [
            // FONT LOADER
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            // IMAGES
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // lESS
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
            // CSS
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },

            // PUG
            {
                test: /\.pug$/,
                loader: 'pug-loader'
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
