<template>
  <div class="TOC">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card" style="margin-bottom: 20px">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="选择文件" prop="isUploaded">
                <el-upload
                    class="upload-demo"
                    :headers="headers"
                    ref="upload2"
                    :rules="rules"
                    :action="url"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-change="handleChange"
                    accept=".ZIP"
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

                  <div slot="tip" class="el-upload__tip">只能上传zip压缩文件</div>
                  <div slot="tip" class="el-upload__tip" style="color: red" v-show="(this.status.isUploaded === 1)">*已上传代码请勿重复上传</div>
                  <div slot="tip" class="el-upload__tip" style="color: #d7b201" v-show="(this.status.isDetected === 1)">*代码已查重</div>
                  <div slot="tip" class="el-upload__tip" style="color: #02bbb5" v-show="(this.status.isParsed === 1)">*代码已序列化</div>
                  <div slot="tip" class="el-upload__tip" style="color: red" v-show="needProjectChosen">请先选择项目</div>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button type="danger" @click="onDelete">删除已提交压缩包</el-button>
                <font color="red" style="margin-left: 20px">*注意：</font><font>这会将该代码和查重等相关信息一并删除</font>
              </el-form-item>
              <el-form-item>
                <el-button   type="success" :disabled="!isDisabled" @click="onDetected">执行查重</el-button>
                <el-button   type="warning" @click="onResetDetectionStatus">重置查重状态</el-button>
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
      //url: "http://127.0.0.1:25005/pluto/docx/uploadDocx",
      url: "http://192.168.159.240:25005/neptune/uploadCodeZip",
      form: {
        projectId: '',

      },
      fileList: [
      ],

    };
  },
  methods: {
    onDetected(){
      http.post('/neptune/detectDuplication',{projectId:Cookie.get('projectId')}).then(({data})=>{
        this.$message({
          message:data.msg,
          type: 'success'
        })
      })
    },
    onResetDetectionStatus(){
      http.post('/neptune/resetDetectionStatus',{projectId:Cookie.get('projectId')}).then(({data})=>{
        this.$message({
          message:data.msg,
          type: 'success'
        })
      })
    },
    anyProjectChosen(){
      let pno=Cookie.get('projectId')
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
      this.$refs.upload2.submit()


    },
    onDelete(){
      http.post('/neptune/deleteCode',{projectId:Cookie.get("projectId")}).then(({data})=>{

        this.$message({
          message:data.msg,
          type: 'success'
        });
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
      const isDoc = file.type === '.ZIP';
      /* const isLt2M = file.size / 1024 / 1024 < 2;*/

      if (!isDoc) {
        this.$message.error('上传头像图片只能是zip格式!');
      }
      /*if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }*/
      return isDoc /*&& isLt2M*/;
    },
    getList(){
      http.post('/neptune/queryCode',{projectId:Cookie.get("projectId")}).then(({data})=>{
        this.status = data.data
        console.log(this.status)
        const file={
          name:this.status.codeZipName,
          url:'',
        }
        this.fileList[0]=file
        this.handleChange(file,this.fileList)
        this.anyProjectChosen()
        this.disableController()
      })
    },
  },
  mounted() {
    this.getList()

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
.TOC{
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
