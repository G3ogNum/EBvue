import axios from "axios";
import store from "@/store";
import Cookie from "js-cookie";


const http=axios.create({
    //通用请求地址前缀
   // baseURL:'http://127.0.0.1:25005',
    baseURL:'http://192.168.159.240:25005',
    //请求超时时间
    timeout:10000,
    //
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token=Cookie.get('token')
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default http



