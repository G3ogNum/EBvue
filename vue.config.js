const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
 /* lintOnSave:false,*/
  //配置跨域
  /*devServer:{
    proxy:{
      '/api':{
        target:'http://192.168.159.240:25005',
        changeOrigin:true,
      }
    }
  }*/
})
