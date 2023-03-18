import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import store from "@/store";
import './api/mock'
import moment from "moment";
import Cookie from "js-cookie";
Vue.filter('dateFormat',(dateStr,pattern='YYYY-DD-MM HH:mm:ss')=>{
  return moment(dateStr).format(pattern)
})

Vue.config.productionTip = false

Vue.use(ElementUI)

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  // token存不存在
  const token=Cookie.get('token')
  if(!token&&to.name!=="登录"){
    next({name:'登录'})
  }else if(token&& to.name==='登录'){
    next({name:'首页'})
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
