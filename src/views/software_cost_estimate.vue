<template>

  <div class="SCE">

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card" style="margin-bottom: 20px">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="选择文件" prop="isUploaded">
                <el-upload
                    class="upload-demo"
                    :headers="headers"
                    ref="upload"
                    :rules="rules"
                    :action="url"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-change="handleChange"
                    accept=".DOC,.DOCX"
                    multiple:false
                    :with-credentials="true"
                    :auto-upload="false"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :data="upData"
                    :disabled="isDisabled"
                    :file-list="form.fileList">
                  <el-button ref="btn" size="small" type="primary"

                             :disabled="isDisabled">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传docx/doc文件</div>
                  <div slot="tip" class="el-upload__tip" style="color: red" v-show="(this.status.isUploaded === 1)">*已上传文件请勿重复上传</div>
                  <div slot="tip" class="el-upload__tip" style="color: #d7b201" v-show="(this.status.isParsed === 1)">*文档已序列化</div>
                  <div slot="tip" class="el-upload__tip" style="color: #02bbb5" v-show="(this.status.isNeped === 1)">*功能点已提取</div>
                  <div slot="tip" class="el-upload__tip" style="color: red" v-show="needProjectChosen">请先选择项目</div>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button type="danger" @click="onDelete">删除已提交文档</el-button>
                <font color="red" style="margin-left: 20px">*注意：</font><font>这会将该文档的序列化信息和功能点信息一并删除</font>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card class="box-card">
            <div class="xq_border">
              <div style="margin-top: 20px;margin-left: 20px">
                <h2>需求规范</h2>
              </div>
              <div class="rf_table">
                <table>
                  <thead>
                  <tr>
                    <th>文档名称</th>
                    <th>内容说明</th>
                    <th>下载</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>CSBMK-2022</td>
                    <td>2022年中国软件行业基数标准</td>
                    <td><a href="./files/CSBMK-2022年中国软件行业基准数据.pdf"
                           download="2022年中国软件行业基准数据">下载</a>
                    </td>
                  </tr>
                  <tr>
                    <td>GBT36964-2018</td>
                    <td>中华人民共和国国家标准软件开发成本度量规范</td>
                    <td><a href="./files/国家标准《软件工程软件开发成本度量规范》GBT36964-2018.pdf"
                           download="中华人民共和国国家标准软件开发成本度量规范">下载</a></td>
                  </tr>
                  <!--              <tr>
                                  <td>CSBMK-2022</td>
                                  <td>2022年中国软件行业基数标准</td>
                                  <td><el-link type="primary" style="margin-left: 80%" @click="downloadDoc">下载完整的排版实例</el-link>

                                  </td>
                                </tr>-->
                  </tbody>
                </table>
              </div>
            </div>
          </el-card>
          <el-card class="box-card" style="margin-top: 20px">
            <h3>成本评估相关数据</h3>
            <el-collapse v-model="activeNames" @change="handleCollapseChange" accordion>
              <el-collapse-item title="全行业软件开发生产率" name="1" >
                <el-table
                    :data="SoftwareDevelopmentProductivityAllIndustryList"
                    stripe
                    style="width: 100%">
                  <el-table-column
                      prop="productLevel"
                      label="产品等级"
                      width="180">
                  </el-table-column>
                  <el-table-column
                      prop="productValue"
                      label="产品价值"
                      width="180">
                  </el-table-column>
                  <el-table-column
                      prop="convertValue"
                      label="转换价值">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="软件开发基准人月费率（按地区分类）" name="2">
                <el-table
                    :data="BaseSalaryStandardList"
                    stripe
                    style="width: 100%">
                  <el-table-column
                      prop="cityName"
                      label="城市"
                      width="180">
                  </el-table-column>
                  <el-table-column
                      prop="cityType"
                      label="城市分级"
                      width="180">
                  </el-table-column>
                  <el-table-column
                      prop="originalSalary"
                      label="基准人月费率">
                  </el-table-column>
                </el-table>   </el-collapse-item>
            </el-collapse>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>


</template>

<script>
import {getData, getProjectStatus} from "@/api";
import request from "@/utils/request";
import Cookie from "js-cookie";
import http from "@/utils/request";

export default {

  data: function () {
    return {
      activeNames: [],
      SoftwareDevelopmentProductivityAllIndustryList:[],
      BaseSalaryStandardList:[],

      rules:{
        isUploaded: [
          {  message: '已上传过文件请勿重复上传', trigger: 'blur' },
          { required: true, message: '请选择项目', trigger: 'blur' },
        ],
      },
      status: {},
      isDisabled:true,
      needProjectChosen:true,
      dataForm: {
        name: '',
        file: null
      },
      headers: {
        token: Cookie.get("token"),
        Authorization: 'eyJraWQiOiIzIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJyb2xlIjoiUk9MRV9lblVzZXIifQ.7F40UMvbJRMUPlpqduVvZmB9aNFyVx2hPNgi_YTKYUs'
      },
      //url: "http://xxx/pluto/docx/uploadDocx",
      url: "http://xxx/pluto/docx/uploadDocx",
      form: {
        projectId: '',

      },
      fileList: [
      ],

    };
  },
  methods: {
    handleCollapseChange(val) {
      console.log(val);
    },
    anyProjectChosen(){
      let pno=Cookie.get('projectId')
      console.log(pno)
      if(pno===null){
        this.needProjectChosen=true
      }else this.needProjectChosen=false
    },
    disableController(){
       if(this.status.isUploaded === 1)this.isDisabled= true
       else this.isDisabled= false
    },



    handleChange(file, fileList) {

      this.form.projectId = this.status.projectId
      /* fileList[0].name*/
    },
    onSubmit: function () {
      localStorage.setItem('token', this.token)
      this.status.isUploaded=1
      this.$refs.upload.submit();

      /* console.log('submit!');
       request({
         method:"POST",
         url:'',
         params: this.form,
       })*/
    },
    onDelete(){
      http.post('/pluto/docx/deleteDocx',{projectId:Cookie.get("projectId")}).then((data)=>{

      })
    },
    handleRemove(file, fileList) {

    },
    handlePreview(file) {

    },
    handleExceed(files, fileList) {

      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeAvatarUpload(file) {
      const isDoc = file.type === '.DOC,.DOCX';
      /* const isLt2M = file.size / 1024 / 1024 < 2;*/

      if (!isDoc) {
        this.$message.error('上传头像图片只能是 docx或doc 格式!');
      }
      /*if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }*/
      return isDoc /*&& isLt2M*/;
    },
    getList(){
      http.post('/pluto/querySoftwareDevelopmentProductivityAllIndustryList').then(({data})=>{
        this.SoftwareDevelopmentProductivityAllIndustryList=data.data
        console.log(this.SoftwareDevelopmentProductivityAllIndustryList)
      })
      http.post('/pluto/queryBaseSalaryStandardList').then(({data})=>{
        this.BaseSalaryStandardList=data.data
        console.log(this.BaseSalaryStandardList)
      })
    }
  },
  mounted() {
    //待更改为getList http形式
    this.getList()
    getProjectStatus().then(({data}) => {
      const status = data.data
      this.status = status
      console.log(this.status)
      const file={
        name:this.status.docxFileName,
        url:'',
      }
      this.fileList[0]=file
      this.handleChange(file,this.fileList)
      this.anyProjectChosen()
      this.disableController()
    })
  },
  computed: {
    // 这里定义上传文件时携带的参数，即表单数据
    upData: function () {
      return {
        projectId: Cookie.get("projectId"),
        /*body: JSON.stringify(this.form)*/
      }
    }
  },
//123123
}
</script>

<style scoped lang="less">

::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}
.SCE{
  height: 80vh; //一定要设置，保证占满
  overflow: auto;
}
.xq_border {
  width: 99%;
  height: 99%;
  border: 2px solid #cccccc;
  border-radius: 5px;
  padding: 0px 0px 20px 0px;
}

.rf_table {
  padding: 0;
  overflow: hidden;
  margin: 0;
  background-color: #fff;

  table {
    width: 100%;
    border-collapse: collapse;

    thead tr th {
      background-color: rgba(245, 245, 250, 1);
    }

    thead tr th,
    tbody tr td {
      text-align: center;
      padding: 20px;
    }

    tbody tr td {
      border-top: 1px solid rgb(200, 200, 200);
      border-bottom: 1px solid rgb(200, 200, 200);
    }
  }
}

@media (max-width: 1800px) {
  .rf_table table {

  }
}
</style>
