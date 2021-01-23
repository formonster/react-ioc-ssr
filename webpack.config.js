const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: path.join(__dirname, 'src/client/index.tsx'),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'build')
    },
    watch: true,
    watchOptions: {
        // 排除监听文件
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["ts-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './public/template.html')
        }),
        new CopyPlugin({
            patterns: [
                { from: "assets" },
            ],
        })
    ]
}