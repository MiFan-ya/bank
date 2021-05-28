module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    },
    // devServer: {
    //   open: process.platform === "darwin",
    //   disableHostCheck: false,
    //   host: "0.0.0.0",
    //   port: 8080,//改端口号
    //   https: false,
    //   hotOnly: false,
    //   proxy: null 
    // }, // 第三方插件配置
  }
}

