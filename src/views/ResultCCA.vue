<template>
  <div class="ResultCCA">
    <el-row>
      <el-col :span="10">
        <el-col :span="8" style="width: 96%">
          <el-card class="box-card" style="margin-right: 20px">
            <!--折线图-->
            <div ref="echarts2" style="height: 280px">

            </div>
          </el-card>
        </el-col>
        <el-col :span="8" style="width: 100%">
          <el-card class="box-card" style="margin-top: 20px ;width: 603px">
            <!--柱状图-->
            <div ref="echarts3" style="height: 280px">

            </div>
          </el-card>
        </el-col>
<!--        <el-col :span="8" style="width: 80%">
          <el-card class="box-card" style="margin-top: 20px">
            <div ref="echarts1" style="height: 400px">

            </div>
          </el-card>
        </el-col>-->
      </el-col>
      <el-col :span="12">
        <el-card class="box-card CR" >
          <article class="code_border" v-for="item in this.tableData">
            <div class="title" >
              <h3>
                <font-awesome-icon icon="fas fa-book" />
                <a href="#">G3ogNum</a>
                /
                <a href="#">Demo1</a>
              </h3>
            </div>
            <nav class="tabnav">
              <div class="introduce">
                <div class="code">
                  <font-awesome-icon icon="fas fa-code" />
                  <a>
                    Code
                  </a>
                </div>
                <div class="repeat">
                  <font-awesome-icon icon="fas fa-chart-line" />
                  <a>
                    占比23%
                  </a>
                </div>
              </div>
            </nav>
            <div class="downSide">
              <div class="demoLink">
                <p>Code Demo，开源链接：
                  <a href="#">https://github.com/1111
                  </a>
                </p>
              </div>
              <div class="updateTimeAndComponentLanguage">
                <ul>
                  <li>
                    Updated
                    <font datetime="2022-12-27T08:21:47Z"
                          title="Dec 27, 2022, 4:21 PM GMT+8">Dec 27, 2022
                    </font>
                  </li>
                  <li>
                    <span class="languageSpan" style="background-color: #178600"></span>
                    <span itemprop="programmingLanguage">C#</span>
                    <span class="languageSpan" style="background-color: #ff0000"></span>
                    <span itemprop="programmingLanguage">Java</span>
                    <span class="languageSpan" style="background-color: #009fff"></span>
                    <span itemprop="programmingLanguage">JavaScript</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
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
      tableData: [
        {},{},
      ],
      tableLabel:{},
      countData:[],
    }
  },
  mounted() {
    getData().then(({data})=>{
      console.log(data)
      const {tableData} =data.data
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
     /* const  echarts1 =echarts.init(this.$refs.echarts1)
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
      echarts1.setOption(echarts1Option)*/

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
.CR{
  overflow-y: scroll;
  white-space: nowrap;
  height: 700px;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
.el-scrollbar__wrap{
  overflow: hidden
}
.code_border{
  display: block;
  background: rgba(245, 245, 250, 1);
  width: 100%;
  height: 100%;
  border: 2px solid #cccccc;
  border-radius: 5px;
  padding: 10px 0px 0px 0px;
  margin-top: 20px;
}
.title{
  display: inline-block;
  margin-top: 20px;
  margin-left: 20px;
}
.tabnav {
  border-bottom:  1px solid #cccccc;
  margin-top: 0;
  margin-bottom: 0 ;
}
.introduce {
  display: flex;
  margin-bottom: -1px;
  overflow: auto;
}
.code {
  display: inline-flex ;
  border: #cccccc 1px solid;
  border-bottom: none;
  border-top-right-radius:  6px;
  border-top-left-radius: 6px;
  padding: 4px 8px;
  box-sizing: border-box;
  margin-left: 40px;
  margin-top: 10px;
  background: #ffffff;
}
.repeat{
  display: inline-flex ;
  padding: 4px 8px;
  box-sizing: border-box;
  margin-left: 20px;
  margin-top: 10px;
}
.downSide {
  background-color: #ffffff;
  border-bottom-right-radius:  6px;
  border-bottom-left-radius: 6px;
}
.demoLink {
  padding:  20px;
  p{
    margin-bottom: 0 ;
  }
}
.updateTimeAndComponentLanguage{
  border-top: #cccccc 1px solid;
  padding: 10px 20px;
  ul{
    list-style: none;
    padding: 0px;
    li{
      display: inline-block;
      list-style: none;

    }
  }
}
.languageSpan {
  margin-left: 10px;
  margin-right: 5px;
  position: relative;
  top: 1px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid ;
  border-radius: 50%;
}
</style>
