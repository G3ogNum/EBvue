<template>
  <div id="app">
    <router-view v-if="isShow"/>
  </div>
</template>

<style lang="less">
html,body{
  margin: 0;
  padding: 0;
}
</style>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isShow:true
    }
  },
  methods:{
    reload(){
      this.isShow=false;
      this.$nextTick(()=>{
        this.isShow=true
      })
    }
  }
}
</script>
