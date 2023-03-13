import Vue from "vue";
import Vuex from 'vuex'
import tab from "@/store/tab";

Vue.use(Vuex)

//创建实例
export default new Vuex.Store({
    modules:{
        tab
    }
})
