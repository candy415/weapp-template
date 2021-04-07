module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  devServer: {
    // 配置服务器
    port: 8080,
    open: true, // 自动开启浏览器
    compress: false, // 开启压缩
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
    proxy: {
      '/api': {
        target: 'https://yqsb.jktz.gov.cn', // target host
        // ws: true, // proxy websockets
        changeOrigin: true, // 允许websockets跨域
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  },
};
