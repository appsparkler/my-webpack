const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const less = require('less');

setup_project();

module.exports = {
    mode: 'development',

    entry: './src/index.js',

    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'index_bundle.js'
        // filename: 'etc/clientlibs/kpmgpublic/formbuilder/js/formbuilder.js',
    },

    resolve: {
        modules: [
            path.resolve(__dirname, '../node_modules'),
            // path.resolve(__dirname, '../../kpmg/ui/fe-framework')
        ]
    },

    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../src/index.pug'),
            // inject:false
        }),
        new CopyPlugin([
          {
            from: path.join(__dirname, '../../../../kpmg/ui/fe-framework/source/etc/clientlibs/kpmgpublic/formbuilder/js/formbuilder.js'),
            to: path.join(__dirname, '../dist/etc/clientlibs/kpmgpublic/formbuilder/js/formbuilder.js')
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
            ignored: /.*\/node_modules\/.*/,
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

function setup_project() {
    clean_distFolder();
    copy_etcFolder();
    copy_designsFolder();
    copy_contentFolder();
    copy_customFolders();
    copy_tempFolders();
    copy_fonts();
    compile_globalLess();
    compile_templateLess();
}

function clean_distFolder() {
    // CLEAN DIST
    fs.removeSync('dist');
}

function copy_etcFolder() {
    // COPY SOURCE/ETC to DIST/ETC
    fs.copySync(
        path.join(__dirname, '../../../../kpmg/ui/fe-framework/source/etc'),
        path.join(__dirname, '../dist/etc')
    );
}

function copy_designsFolder() {
    // COPY DESIGNS TO DIST/ETC/DESIGNS
    fs.copySync(
        path.join(__dirname, '../../../../kpmg/cms/content/kpmg-core-design/src/main/content/jcr_root/etc/designs'),
        path.join(__dirname, '../dist/etc/designs')
    );
}

function copy_contentFolder() {
    // COPY src/content to dist/content
    fs.copySync(
        path.join(__dirname, '../src/content'),
        path.join(__dirname, '../dist/content')
    );
}

function copy_customFolders() {
    // COPY xx folder for xx/en/home.mykpmgnav.privacyJSON
    fs.copySync(
        path.join(__dirname, '../src/xx'),
        path.join(__dirname, '../dist/xx')
    );
}

function copy_tempFolders() {
    // COPY fonts
    fs.copySync(
        path.join(__dirname, '../src/temp'),
        path.join(__dirname, '../dist')
    );
}

function copy_fonts() {
    // COPY fonts
    fs.copySync(
        path.join(__dirname, '../dist/etc/clientlibs/kpmgpublic/fonts'),
        path.join(__dirname, '../dist/fonts')
    );
}

function compile_globalLess() {
    // BUILD LESS
    const lessOptions = {
        rootpath: path.resolve('dist/etc/clientlibs/kpmgpublic/global/css/'),
        paths: [
            path.resolve('dist/etc/clientlibs/kpmgpublic/global/css/')
        ]
    };
    fs.readFile('dist/etc/clientlibs/kpmgpublic/global/css/global.less')
        .then(buffer => less
            .render(buffer.toString(), lessOptions)
            .then(output => output.css)
            .then(css => fs.writeFile('dist/global.css', css, err => {
                if(!err) console.log('less is successfully compiled to css');
            }))
        )
        .catch(err => console.log('err : ', err));
}

function compile_templateLess() {
    // BUILD LESS
    const lessOptions = {
        rootpath: path.resolve('dist/etc/clientlibs/kpmgpublic/tmpl-flex/css/'),
        paths: [
            path.resolve('dist/etc/clientlibs/kpmgpublic/tmpl-flex/css/'),
            path.resolve('dist/etc/clientlibs/kpmgpublic')
        ]
    };
    fs.readFile('dist/etc/clientlibs/kpmgpublic/tmpl-myaccount/css/tmpl-myaccount.less')
        .then(buffer => less
            .render(buffer.toString(), lessOptions)
            .then(output => output.css)
            .then(css => fs.writeFile('dist/template.css', css, err => {
                if(!err) console.log('template less is successfully compiled to css');
            }))
        )
        .catch(err => console.log('err : ', err));
}
