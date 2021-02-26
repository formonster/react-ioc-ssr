const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
// 打包分析工具
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ClosurePlugin = require('closure-webpack-plugin');
const webpack = require('webpack');
// https://www.npmjs.com/package/tsconfig-paths-webpack-plugin
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const tailwindMd5 = require('../scripts/tailwind/md5.json');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

module.exports = {
    mode: "production",
    entry: path.join(__dirname, '../src/client/index.tsx'),
    output: {
        filename: "[name].[contenthash:8].js",
        path: path.join(__dirname, '../build')
    },
    cache: true,
    experiments: {
        topLevelAwait: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["cache-loader", "babel-loader"],
                // include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [new TsconfigPathsPlugin({
            configFile: path.join(__dirname, "../tsconfig.json")
        })]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 减少 React 大小的关键
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({
            cache: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/template.html'),
        }),
        new CopyPlugin({
            patterns: [
                { from: `public/index.${tailwindMd5.md5}.css` },
            ],
        }),
        new BundleAnalyzerPlugin({ analyzerPort: 8081 }),
    ],
    performance: {
        hints: "error", // 性能提示中抛出错误
        maxAssetSize: 200000, // 整数类型（以字节为单位）
        maxEntrypointSize: 400000, // 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
}