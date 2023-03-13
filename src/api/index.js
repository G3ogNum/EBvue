import http from "@/utils/request";

//请求首页数据
export const getData=()=>{
    //返回一个promise对象
    return http.get('/project_manager/getData')
    /*return http.post('/pluto/docx/uploadDocx')*/
}

export const getNepInfo=()=>{
    return http.post('http://192.168.159.240:25005/pluto/nep/queryPlutoNEP',{projectId:6})
}

export const getProjectStatus=()=>{
    return http.post('http://192.168.159.240:25005/pluto/docx/queryDocx',{projectId:6})
}
