<template>

</template>

<script>
import {getNepInfo} from "@/api";

export default {

  mounted() {
    getNepInfo().then(({data})=>{
      const { tableData }=data.msg
      console.log(tableData)
    })
  }
}
</script>

<style scoped>

</style>
