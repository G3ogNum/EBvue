import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from "@/views/login.vue";
import software_cost_estimate from "@/views/software_cost_estimate.vue"
import ResultSCE from "@/views/ResultSCE.vue";
import ResultCCA from "@/views/ResultCCA.vue";
import code_compliance_analysis from "@/views/code_compliance_analysis.vue";
import Code_Repository from "@/views/Code_Repository.vue";
import ResultFile from "@/views/ResultFile.vue";
import traceability_of_code from "@/views/traceability_of_code.vue";
import user_center from "@/views/user_center.vue";
import home from "@/views/home.vue";
import project_manager from "@/views/project_manager.vue";
import ResultSCEFile from "@/views/ResultSCEFile.vue"
import vulnerAbility from "@/views/vulnerAbility.vue";
import uranusProjectLIst from "@/views/uranusProjectLIst.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: '登录',
    label:'登录',
    component: login
  },

  {
    path: '/',
    name: '首页',
    label:'首页',
    redirect: '/login',
    component: HomeView,
    children:[
      {
        path: 'software_cost_estimate',
        name: '成本评估',
        label:'成本评估',
        component: software_cost_estimate
      },
      {
        path: 'ResultSCE',
        name: '功能点提取结果',
        label:'功能点提取结果',
        component: ResultSCE
      },
      {
        path: 'ResultSCEFile',
        name: '成本评估文档',
        label:'成本评估文档',
        component: ResultSCEFile
      },
      {
        path: 'ResultCCA',
        name: '合规性分析结果',
        label:'合规性分析结果',
        component: ResultCCA
      },
      {
        path: 'uranusProjectLIst',
        name: '漏洞工程列表',
        label:'漏洞工程列表',
        component: uranusProjectLIst
      },
      {
        path: 'vulnerAbility',
        name: '漏洞检索',
        label:'漏洞检索',
        component: vulnerAbility
      },
      {
        path: 'code_compliance_analysis',
        name: '合规性分析',
        label:'合规性分析',
        component: code_compliance_analysis
      },
      {
        path: 'Code_Repository',
        name: '比对代码库',
        label:'比对代码库',
        component: Code_Repository
      },
      {
        path: 'traceability_of_code',
        name: '代码溯源',
        label:'代码溯源',
        component: traceability_of_code
      },
      {
        path: 'user_center',
        name: '用户中心',
        label:'用户中心',
        component: user_center
      },
      {
        path: 'project_manager',
        name: '项目管理',
        label:'项目管理',
        component: project_manager
      },
      {
        path: 'ResultFile',
        name: '分析结果',
        label:'分析结果',
        component: ResultFile
      },
      {
        path: 'About',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
