<template>

  <div class="header_container">
    <div class="l_header">
      <span class="text" style="color: #2c6bf6">{{this.$route.name}}</span>
      <span class="text" style="color: #0fab00;margin-left: 20px">{{'工程ID : '}}</span>
      <span class="text" style="color: #ff0000">{{this.projectId}}</span>
    </div>
    <div class="r_header">
      <el-dropdown trigger="click">
  <span class="el-dropdown-link">
    <img class="user" src="../assets/image/userImg.png" alt="">
  </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleCommand(item)" v-for="item in this.menuData">{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>



</template>

<script>
import Cookie from "js-cookie";

export default {
  data: function () {
    return {
      projectId:'',
      menuData:[
        {
        path: '/user_center',
        name: 'user_center',
        label: '用户中心',
        icon: "s-home",
        url: "Home/home"
        },
        {
          path: '/user_center',
          name: 'user_center',
          label: '邮箱',
          icon: "s-home",
          url: "Home/home"
        },
        {
          path: '/login',
          name: 'login',
          label: '退出',
          icon: "s-home",
          url: "Home/home"
        },
      ]
    }
  },
  methods: {
    clickMenu(item) {
      console.log(item);
      if (this.$route.path !== item.path)
        this.$router.push(item.path)
    },
    handleCommand(item){
      if (this.$route.path !== item.path)
        this.$router.push(item.path)
    }
  },
  computed:{

  },
  mounted() {


    this.projectId=Cookie.get('projectId')==null?"请选择项目":Cookie.get('projectId')
  }
}
</script>

<style lang="less" scoped>

.header_container {
  height: 60px;
  background: white;
  box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.125);
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;

  .text {
    font-size: 16px;
  }
  .r_header{
    .user{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
