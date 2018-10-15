const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const mainConfig = {
    mode: "production",
};

const rendererConfig = {
    mode: "production",
};

module.exports = merge(common[0], common[1], mainConfig, rendererConfig)