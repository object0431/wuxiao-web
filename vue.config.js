const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath:'/tmc-web/',
  devServer: {
    //open: true,//设置自动打开
    //port: 8000,//设置端口
    proxy: {
      //设置代理
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        secure: true, //如果是http接口，需要配置该参数
        pathRewrite: {
          '^/api': ''
        }
      },
      '/fsip-project/file/uploadFile': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        secure: true, //如果是http接口，需要配置该参数
        pathRewrite: {
          '^/fsip-project/file/uploadFile': '/fsip-project/file/uploadFile'
        }
      },
      '/fsip-project/common/upload5File': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        secure: true, //如果是http接口，需要配置该参数
        pathRewrite: {
          '^/fsip-project/file/uploadMd5File': '/fsip-project/file/uploadMd5File'
        }
      }
    }
  },
})
