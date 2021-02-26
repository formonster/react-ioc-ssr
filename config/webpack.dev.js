const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
// https://www.npmjs.com/package/tsconfig-paths-webpack-plugin
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const tailwindMd5 = require('../scripts/tailwind/md5.json');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

module.exports = {
    mode: "development",
    entry: path.join(__dirname, '../src/client/index.tsx'),
    // entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: "[name].js",
        path: path.join(__dirname, '../build')
    },
    watch: true,
    cache: true,
    watchOptions: {
        // 排除监听文件
        ignored: /node_modules/
    },
    experiments: {
        topLevelAwait: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["cache-loader", "babel-loader"],
                include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: ["cache-loader", "ts-loader"],
                include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/
            },
        ],
        // 防止 webpack 解析那些任何与给定正则表达式相匹配的文件。
        // noParse: function (content) {
        //     return /jquery|lodash/.test(content);
        // }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [new TsconfigPathsPlugin({
            configFile: path.join(__dirname, "../tsconfig.json")
        })]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/template.html')
        }),
        new CopyPlugin({
            patterns: [
                { from: `public/index.${tailwindMd5.md5}.css` },
            ],
        }),
    ]
}