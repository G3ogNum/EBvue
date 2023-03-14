import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import store from "@/store";
import './api/mock'
import moment from "moment";

Vue.filter('dateFormat',(dateStr,pattern='YYYY-DD-MM HH:mm:ss')=>{
  return moment(dateStr).format(pattern)
})

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
