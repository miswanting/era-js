const path = require('path');
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin');
const mainConfig = {
    mode: "production",
    target: 'electron-main',
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "awesome-typescript-loader",
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
};

const rendererConfig = {
    mode: "production",
    target: 'electron-renderer',
    entry: "./src/renderer.tsx",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'renderer.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.jsx?$/,
                use: "source-map-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
                use: 'url-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            'src/index.html'
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

module.exports = [mainConfig, rendererConfig];