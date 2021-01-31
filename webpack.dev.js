const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: ['./src/client/index.js'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        library: 'Client',
        libraryTarget: 'var',
    },
    // Development settings
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: 'Google Chrome',
        watchContentBase: true,
        hot: true,
        stats: {
            colors: true,
        },
    },
    stats: 'verbose',
    // Loaders
    module: {
        rules: [
            {
                test: /.m?js$/,
                use: { loader: 'babel-loader' },
                exclude: /node_module/,
            },
            {
                test: /\.s?css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
            },
        ],
    },
    // Plugins
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './src/client/views/index.html',
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
        }),
    ],
};
