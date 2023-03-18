import Vue from "vue";
import Vuex from 'vuex'
import tab from "@/store/tab";

Vue.use(Vuex)



const state={
    token:'',
    projectId:Number,
}

const mutations={
    setToken(state,token){
        state.token=token
    },
    setProjectId(state,projectId){
        state.projectId=projectId
    },
}
//创建实例
export default new Vuex.Store({
    state,
    mutations
})
