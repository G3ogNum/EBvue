<template>
  <div className="home">
    <el-container>
      <el-aside>
        <left_menu></left_menu>
      </el-aside>
      <el-container>
        <el-header>
          <top_header></top_header>
        </el-header>
        <el-main>


          <!--路由出口-->
          <!--路由匹配到的组件将渲染在这里-->
          <router-view></router-view>
        </el-main>
        <el-footer>
          <bottom_footer>

          </bottom_footer>
        </el-footer>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import left_menu from '../components/left_menu.vue'
import top_header from "@/components/header.vue"
import bottom_footer from "@/components/footer.vue";

export default {
  data() {
    return {}
  },
  components: {
    left_menu,
    top_header,
    bottom_footer
  },

}
</script>

<style scoped>
.el-container {
  min-height: 95vh;
}

body {
  background: white;
}

.el-header {
  padding: 0;
}
</style>
