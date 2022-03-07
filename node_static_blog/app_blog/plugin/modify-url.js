
// 学习：https://juejin.cn/post/7013995927874568206
const HtmlWebpackPlugin = require('html-webpack-plugin');  // 引入html-webpack-plugin

class ModifyUrl {
    // 在插件函数的 prototype 上定义一个 `apply` 方法。
    constructor(options) {
       this.options = options;
    }
    apply(compiler) {
        // compilation 创建之后执行。(compiler 的钩子)
        compiler.hooks.compilation.tap('modifyUrl', (compilation, cb)=> {
            // HtmlWebpackPlugin在webpack刚创建编译的时候执行自带的beforeAssetTagGeneration生命周期
            HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tap('StampWebpackPlugin', (htmlPluginData, cb) => {
                console.log('%c [ htmlPluginData ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', htmlPluginData)
                    const jsSrc = htmlPluginData.assets.js[0];
                    // 直接修改js数组内的元素
                    htmlPluginData.assets.js[0] = `/yujinhong${jsSrc}`;
                }
            )
        })
    }
}

module.exports = ModifyUrl;