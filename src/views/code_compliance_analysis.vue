<template>
  <div class="cca">
    <!-- 文件上传-->
    <el-form :rules="rules" :model="dataForm" ref="dataForm" label-width="150px" @submit.native.prevent>
      <el-form-item label="名称：" prop="name">
        <el-input type="text" v-model.trim="dataForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="文件：" prop="file" >
        <el-upload
            class="upload-import"
            ref="uploadImport"
            :http-request="httpRequest"
            action=""
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="1"
        :on-change="handleChange"
        :auto-upload="false"
        accept="application/zip,.zip">
        <el-button v-show="!hasFile" slot="trigger" size="small" type="primary" >选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传zip文件，且不超过10M</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitUpload">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import dataForm from "mockjs";
export default {
  data(){
    return {
      dataForm: {
        name: '',
        file: null
      },
      rules: {
        name: [
          {required: true, message: "请输入名称", trigger: "blur"},
          {max: 50, message: "最长可输入50个字符", trigger: "blur"},
          {validator: isvalidatName, trigger: "blur" },
        ],
        file: [
          {required: true, message: "请选择上传文件", trigger: "blur"},
        ]
      },
      hasFile: false,
      fileList: []
      }
    },
        methods: {
      handleRemove(file, fileList) {
        if (!fileList.length) {
          this.hasFile = false;
        }
        this.dataForm.file = null;
      },
      handleChange(file, fileList) {
        if (fileList.length >= 2) {
          return;
        }
        if (fileList.length === 1) {
          this.hasFile = true;
        }
        this.dataForm.file = file;
      },
      //确定按钮
      //调用组件upload的submit方法，从而触发httpRequest方法，实现手动上传
      submitUpload() {
        this.$refs.dataForm.validate(valid => {
          if(vaild){
            this.$refs.uploadImport.submit();
          }
        })
      },
      httpRequest(param) {
        let fd = new FormData();
        fd.append('file', param.file); // 传文件
        fd.append('name',  dataForm.name);
        //dataPar.file.raw
        axios.post('/interface/importProject', fd , {
          headers: {'Content-Type': 'multipart/form-data'},//定义内容格式,很重要
          timeout: 20000,
        }).then(response => {
          console.log(res)
          //接口成功调用params上的onSuccess函数，会触发默认的successHandler函数
          //这样可以用自带的ui等
          ///params.onSuccess({name: 'eric'})
        }).catch(err =>{})
      }
    }
  }
</script>
