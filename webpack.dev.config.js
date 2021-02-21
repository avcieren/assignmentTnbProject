const path = require('path'),
    webpack = require('webpack'),
    // VueLoaderPlugin = require('vue-loader/lib/plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Entry file for webpack to start bundling the app.
    entry: {
        app: [
            path.join(__dirname, 'client/core/index.js')
        ]
    },
    // Configuration to display sourcemaps in the source tree.
    devtool: 'eval',
    // Place where the bundled file would be stored.
    output: {
        path: path.resolve(__dirname, 'dist/development'),
        filename: '[name].js',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    // local server configs which is going to serve the app on a local network port.
    devServer: {
        historyApiFallback: true,
        contentBase: './dist/development',
        hot: true,
        port: 3000,
    },
    // Defines absolute paths to the webpack and
    // points webpack to find the files with the given extensions.
    resolve: {
        modules: [
            '.',
            'node_modules',
            'client'
        ],
        alias: {
            'vue': 'vue/dist/vue.js',
        },
        extensions: ['*', '.js', '.vue', 'less']
    },

    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules|dist/,
            options: {
                fix: true,
            },
            loader: 'eslint-loader'
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader',
                }
            ]
        }, {
            test: /\.css$/, loader: "style-loader!css-loader",
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader',
        }, {
            test: /\.vue$/,
            exclude: /node_modules/,
            use: 'vue-loader',
        }]
    },

    plugins: [
        // live dev chunks
        new webpack.HotModuleReplacementPlugin(),

        // for clear module names
        new webpack.NamedModulesPlugin(),
        // source maps
        new webpack.SourceMapDevToolPlugin(),

        // generate index.html from a template file
        new HtmlWebpackPlugin({
            template: 'dist/template/template.html'
        })

        // new VueLoaderPlugin()
    ]
}
