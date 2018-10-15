const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const mainConfig = {
    mode: "development",
    devtool: "source-map",
};

const rendererConfig = {
    mode: "development",
    devtool: "source-map",
};
module.exports = merge(common[0], common[1], mainConfig, rendererConfig)