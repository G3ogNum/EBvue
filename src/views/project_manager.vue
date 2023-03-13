<template>
  <div class="project_manager">
    <el-row>
      <el-col :span="12">
        <el-card class="box-card" style="margin-right: 20px">
          <!--折线图-->
          <div ref="echarts2" style="height: 280px">

          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <!--柱状图-->
          <div ref="echarts3" style="height: 280px">

          </div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card class="box-card" style="margin-top: 20px">
          <div ref="echarts1" style="height: 400px">

          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {getData} from "@/api";
export default {
   data(){
     return{
       tableData: [],
       tableLabel:{},
       countData:[],
     }
   },
  mounted() {
     getData().then(({data})=>{
       console.log(data)
       const {tableData} =data.data
       this.tableData =tableData
       const {orderData , userData}=data.data

       /*const  echarts1 =echarts.init(this.$refs.echarts1)
       //指定图标的配置项和数据
       const echarts1Option={
         xAxis:{
           data:Object.keys(orderData.data[0]),
         },
         yAxis: {},
         legend: {
           data:Object.keys(orderData.data[0]),
         },
         series: [],

       }*/


       //基于准备好的dom，初始化echarts实例
       const  echarts1 =echarts.init(this.$refs.echarts1)
       //指定图标的配置项和数据
       var echarts1Option={}
       //处理xAxis
       const xAxis= Object.keys(orderData.data[0])
       const xAxisData={
         data:xAxis
       }
       echarts1Option.xAxis= xAxisData
       echarts1Option.yAxis={}
       echarts1Option.legend=xAxisData
       echarts1Option.series=[]
       xAxis.forEach(key=>{
         echarts1Option.series.push({
           name:key,
           data:orderData.data.map(item=>item[key]),
           type:'line'
         })
       })
       echarts1.setOption(echarts1Option)

       //柱状图
       const echarts2 =echarts.init(this.$refs.echarts2)
       const echarts2Options={
         legend:{
           textStyle:{
             color:"#333",
           },
         },
         grid:{
           left:"20%",
         },
         tooltip:{
           trigger:"axis",
         },
         xAxis:{
           type:"category",
           data:userData.map(item=>item.date),
           axisLine:{
             lineStyle:{
               color:"#17b3a3",
             },
           },
           axisLabel:{
             interval:0,
             color:"#333",
           },
         },
         yAxis:[
           {
             type: "value",
             axisLine:{
               lineStyle:{
                 color:"#17b3a3",
               },
             },
           },
         ],
         color:["#2ec7c9","#b6a2de"],
         series:[
           {
             name:'功能点数量',
             data:userData.map(item=>item.new),
             type:'bar'
           },
           {
             name:'功能点估值',
             data:userData.map(item=>item.active),
             type:'bar'
           }
         ],
       }
       echarts2.setOption(echarts2Options)

       //饼状图
       const echarts3 =echarts.init(this.$refs.echarts3)
       const echarts3Options={
         series: [
           {
             type: 'pie',
             data: [
               {
                 value: 335,
                 name: 'javaScript'
               },
               {
                 value: 234,
                 name: 'others'
               },
               {
                 value: 1548,
                 name: 'Java'
               }
             ],
             radius: '80%'
           }
         ]
       }
       echarts3.setOption(echarts3Options)

     })


  }
}
</script>

<style scoped lang="less">

</style>
