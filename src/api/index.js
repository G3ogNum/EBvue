import http from "@/utils/request";
import store from "@/store";
import Cookie from "js-cookie";
import axios from "axios";
//请求首页数据
export const getData=()=>{
    //返回一个promise对象
    return axios.get('/api/project_manager/getData')
    /*return http.post('/pluto/docx/uploadDocx')*/
}

export const getNepInfo=()=>{
    return http.post('http://xxx/pluto/nep/queryPlutoNEP',{projectId:Cookie.get('projectId')})
}

export const getProjectStatus=()=>{
    return http.post('http://xxx/pluto/docx/queryDocx',{projectId:Cookie.get('projectId')})
}


export const getProjects=()=>{
    return http.post('/common/project/queryProjectList')
}



