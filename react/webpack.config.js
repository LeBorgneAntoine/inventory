const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path-browserify');
const tailwindcss = require('tailwindcss');

const port = process.env.PORT || 3000;
const src = path.resolve(__dirname, './src');

module.exports = {
    mode: 'development',  
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            manifest: "./public/manifest.json",
            template: './public/index.html',
            favicon: './public/favicon.ico'
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true
    },
    resolve : {
        modules: [
            'node_modules',
            'src',
            'public'
        ],
        alias: {
            '@assets' : path.resolve(__dirname, 'assets')
        },
        extensions: ['.js', '.json', '.css', '.*']
    },
    module: {
        rules: [

        {
            
            test: /\.(png|jp(e*)g|gif)$/,
            type: 'asset'
        },
        {
            
            test: /\.svg$/,
            use: [ '@svgr/webpack' ]
        },
        {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        }
        ]
    },

};