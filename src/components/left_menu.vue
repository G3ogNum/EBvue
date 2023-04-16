<template>
  <el-row class="tac">
    <el-col  style="width: 299px">
      <div class="profile_info">
        <div class="profile_img">
          <img src="../assets/image/logo.png" alt="">
        </div>
      </div>
      <h5>元素瓶</h5>
      <el-menu
          :default-active="menuId"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color=" rgba(0, 17, 42, 1)"
          text-color="#fff"
          :unique-opened="isUO"

          active-text-color="#ffd04b">
        <el-menu-item @click="clickMenu(item)" :index="item.name" v-for="item in this.pjt" :key="item.name">
          <i style="color: #ffffff;" :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu  :index="item.label" v-for="item in hasChildren" :key="item.label" >
          <template slot="title">
            <i style="color: #ffffff;" :class="`el-icon-${item.icon}`"></i>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
            <el-menu-item @click="clickMenu(subItem)" :index="subItem.name" >{{subItem.label}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item @click="clickMenu(item)" :index="item.name" v-for="item in noChildren" :key="item.name">
          <i style="color: #ffffff;" :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import project_manager from "@/views/project_manager.vue";
import Cookie from "js-cookie";

export default {
  data: function () {
    return {
      menuId:Cookie.get('menuId'),
      isUO:true,
      pjt:[
        {
          path: 'project_manager',
          name: '项目管理',
          label:'项目管理',
          icon: "folder",
          component: project_manager
        },
      ],
      menuData: [
        {
          label: '软件功能点分析',
          icon: "s-data",
          children: [
            {
              path: '/software_cost_estimate',
              name: 'software_cost_estimate',
              label: '成本估算',
              icon: "s-home",
              url: "Home/home"
            },
            {
              path: '/ResultSCEFile',
              name: 'ResultSCEFile',
              label: '成本估算详情',
              icon: "s-home",
              url: "Home/home"
            },
            {
              path: '/ResultSCE',
              name: 'ResultSCE',
              label: '功能点提取结果',
              icon: "s-home",
              url: "Home/home"
            },
          ]
        },
        {
          label: '开源代码合规性分析',
          icon: "s-help",
          children: [
            {
              path: '/code_compliance_analysis',
              name: 'code_compliance_analysis',
              label: '合规性分析',
              icon: "s-home",
              url: "Home/home"
            },
            {
              path: '/vulnerAbility',
              name: 'vulnerAbility',
              label: '漏洞检索',
              icon: "s-home",
              url: "Home/home"
            },
            {
              path: '/uranusProjectLIst',
              name: 'uranusProjectLIst',
              label: '漏洞工程列表',
              icon: "s-home",
              url: "Home/home"
            },

            {
              path: '/ResultCCA',
              name: 'ResultCCA',
              label: '合规性分析结果',
              icon: "s-home",
              url: "Home/home"
            },
          ]
        },
        {
          path: '/traceability_of_code',
          name: 'traceability_of_code',
          label: '代码溯源',
          icon: "search",
          url: "Home/home"
        },
        {
          path: '/Code_Repository',
          name: 'Code_Repository',
          label: '比对代码库',
          icon: "s-home",
          url: "Home/home"
        },
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
      console.log(item);
      Cookie.set('menuId',item.name)
      if(this.$route.path !==item.path && !(this.$route.path==='/home'&&(item.path==='/')))
        this.$router.push(item.path)
    }
  },
  computed:{
    //无子菜单
    noChildren(){
      return this.menuData.filter((item=>!item.children))
    },
    //有子菜单
    hasChildren(){
      return this.menuData.filter((item=>item.children))
    }
  }
}
</script>



<style lang="less" scoped>
.el-menu{
  height: 79.5vh; // 1080版高度
  //height: 71.3vh; //截图版高度
  width: 100%;
}
.el-col{
  background: rgba(0, 17, 42, 1);        //元素瓶配色
  h5{
    font-size: 18px;
    color: #fff;
    margin-bottom: 5px;
    text-align: center;
  }
}
.profile_info{
  left: 2px;
  top: 0px;
  width: 260px;
  height: 100px;
  opacity: 1;
  padding: 20px;
  text-align: center;
  z-index: 999;
}
.profile_info.profile_img{
  width: 200px;
  margin: 0 auto 5px;
}
.profile_info .profile_img img{
  width: 90%;
  border-radius: 50%;
  display: block;
}
</style>
