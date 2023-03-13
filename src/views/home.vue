<template>
  <div class="home">
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <el-card class="box-card" style="margin-bottom: 20px">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
              <el-upload
                  class="upload-demo"
                  :action="url"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  accept=".DOC,.DOCX"
                  multiple:false
                  :with-credentials="true"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :data="upData"
                  :file-list="form.fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传docx/doc文件</div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="box-card">

        </el-card>
      </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "home"
}
</script>

<style scoped>

</style>
