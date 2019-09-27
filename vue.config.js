const path = require("path");
const proxy = "http://localhost:8088"
const argv = require("yargs").argv;

process.env.VUE_APP_API_BASE_URL = argv.apiBaseUrl || "";

module.exports = {
  publicPath: "./",
  outputDir: "dist",

  lintOnSave: true,

  chainWebpack: config => {
    config
      .output
      .filename("js/[name].js?[hash]")
      .chunkFilename("js/[name].js?[hash]")
      .end();

    config.resolve.alias.set(
      "images",
      path.join(__dirname, "src/assets/img")
    );

    //忽略的打包文件
    // config.externals({
    //   vue: "Vue",
    //   "vue-router": "VueRouter",
    //   vuex: "Vuex",
    //   axios: "axios",
    //   "element-ui": "ELEMENT"
    // });

    const plugins = config.plugins;
    plugins.delete("prefetch")
    plugins.delete("preload")

    // config.plugin("webpack-bundle-analyzer")
    //   .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
  },
  configureWebpack: () => {

  },


  productionSourceMap: false,
  filenameHashing: true,

  css: {
    extract: true,
    sourceMap: false
  },


  devServer: {
    port: 8080,
    https: false,
    hotOnly: false,
    proxy
  },

  // 三方插件的选项
  pluginOptions: {
  }
}
