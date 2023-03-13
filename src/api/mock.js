import Mock from 'mockjs'
import homeApi from './mockServerData/home'


//定义mock请求拦截
Mock.mock('/api/project_manager/getData','get',homeApi.getStatisticalData())

