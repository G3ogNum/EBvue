<template>
  <div class="about">

    <article class="code_border">
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

  </div>
</template>

<script>

import 'font-awesome/css/font-awesome.min.css';
import http from "@/utils/request";
export default {

  data: function () {
    return {
      licenseGroupList:[],
      componentList:[],
      currentMetricsList:[],
      allProjectResult:[],
      refresh:[]
    };
  },
  methods: {


    getList(){
      http.get('http://192.168.159.240:25005/uranus/licenseGroup').then(({data})=>{
        //查询开源协议列表（简化版）
        this.licenseGroupList=data.data
        console.log('licenseGroupList'+this.licenseGroupList)
      })
      http.get('http://192.168.159.240:25005/uranus/project').then(({data})=>{
        //查询工程漏洞列表（简化版）
      })
      http.get('http://192.168.159.240:25005/uranus/component/project'+'?uuid='+'4cea96fc-e50f-4839-8ec8-0c114497d73b').then(({data})=>{
        //查询指定工程所使用组件列表
      })
      http.get('http://192.168.159.240:25005/uranus/metrics/project/current'+'?uuid='+'4cea96fc-e50f-4839-8ec8-0c114497d73b').then(({data})=>{
        //查询指定工程当前指标
      })
      http.get('http://192.168.159.240:25005/uranus/finding/project'+'?uuid='+'4cea96fc-e50f-4839-8ec8-0c114497d73b').then(({data})=>{
        //返回指定工程所有结果列表
      })
      http.get('http://192.168.159.240:25005/uranus/metrics/project/refresh'+'?uuid='+'4cea96fc-e50f-4839-8ec8-0c114497d73b').then(({data})=>{
        //请求刷新指定工程指标
      })
      http.get('http://192.168.159.240:25005/uranus/bom/cyclonedx/project'+'?uuid='+'4cea96fc-e50f-4839-8ec8-0c114497d73b').then(({data})=>{
        //以标准格式返回指定工程依赖元数据
      })
    }
  },
  mounted() {
    //待更改为getList http形式
    this.getList()

  },
  computed: {
    // 这里定义上传文件时携带的参数，即表单数据
    upData: function () {
      return {
        /*projectId: Cookie.get("projectId"),*/
        /*body: JSON.stringify(this.form)*/
      }
    }
  },
}
</script>

<style scoped lang="less">
.code_border{
  display: block;
  background: rgba(245, 245, 250, 1);
  width: 30%;
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
