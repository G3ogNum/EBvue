<template>
  <div class="ResultSCE">
    <el-dialog
        title="修改功能点"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form  :model="changeForm" :rules="rules" ref="changeForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="功能点ID" prop="nepId">
          <el-input :disabled="true" v-model="changeForm.nepId"></el-input>
        </el-form-item>
<!--        <el-form-item label="nepType" prop="nepType">
          <el-input v-model="changeForm.nepType"></el-input>
        </el-form-item>-->
        <el-form-item label="功能点类型" prop="nepType">
          <el-select v-model="changeForm.nepType" placeholder="请选择功能点类型">

            <el-option label="ILF" value="1"></el-option>
            <el-option label="EIF" value="2"></el-option>
            <el-option label="EI" value="3"></el-option>
            <el-option label="EO" value="4"></el-option>
            <el-option label="EQ" value="5"></el-option>
            <el-option label="OTH" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能点描述" prop="nepDescription">
          <el-input v-model="changeForm.nepDescription"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit()">确 定</el-button>
  </span>
    </el-dialog>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card" style="height: 85vh">
          <div class="ResultSCE_header">
            <el-button type="primary" @click="onClick">查看详情</el-button>
          </div>
          <div class="common-table">
            <el-table
                :data="showTableData"
                v-loading="loading"
                height="65vh"
                :row-class-name="tableRowClassName">
              <el-table-column
                  label="ID"
                  prop="id">
                <template slot-scope="scope">

                  <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="标题ID"
                  prop="metaId">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>住址: {{ scope.row.address }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.metaId }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                  label="功能点ID"
                  prop="nepId">
              </el-table-column>

              <el-table-column
                  label="功能点类型"
                  prop="nepType">
              </el-table-column>
              <el-table-column
                  label="功能点描述"
                  prop="nepDescription">
              </el-table-column>
              <el-table-column label="操作" prop="operation" >
                <template slot-scope="scope">
                  <el-button
                      size="mini"

                      @click="handleEdit(scope.$index, scope.row)">编辑
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pager">
              <el-pagination
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="total"
                  :current-page="currentPage"
                  @current-change="handlePage">
              </el-pagination>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>


  </div>

</template>

<script>
import moment from "moment";
import http from "@/utils/request"
import Cookie from "js-cookie"

export default {
  data() {
    return {
      changeForm:{
        id:'',
        nepId:'',
        nepType:'',
        nepDescription:'',
      },
      rules:{
        nepType:[
          {}
        ],
        nepDescription:[
        ],
        nepId:[
          { required: true, message: '请输入功能点id', trigger: 'blur' }
        ],
      },
      dialogVisible: false,
      tableData: [],
      showTableData: [],
      pageSize: 8,
      currentPage: 1,
      total: 0,
      fileUrl:'',
      loading:true
    }
  },
  methods: {
    onClick(){
       this.$router.push('/ResultSCEFile')
      /*let a=document.createElement('a')
      a.href = this.fileUrl
      a.download = "result_SCE_file"
      a.click()
      console.log(this.fileUrl)*/
    },
    getSCEFile(){
      let param1 = new URLSearchParams();
      param1.append('projectId',Cookie.get('projectId'));
      http.post('http://192.168.159.240:25005/pluto/docx/downloadDocx', param1).then(({data}) => {
        const FileUrl = data.data
        this.fileUrl = FileUrl
      })
    },
    tableRowClassName({row, rowIndex}) {
      /*console.log(row.id)*/
      if(row.nepType==='ILF'){
        return 'ILF'
      }
      if(row.nepType==='EIF'){
        return 'EIF'
      }
      if(row.nepType==='EI'){
        return 'EI'
      }
      if(row.nepType==='EO'){
        return 'EO'
      }
      if(row.nepType==='EQ'){
        return 'EQ'
      }


      /*if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }*/
      return '';
    },
    handleClose(done) {
      this.$refs.changeForm.resetFields()
      this.dialogVisible = false

    },
    onSubmit: function () {
      this.$refs.changeForm.validate((valid) => {
        if (valid) {
          let Id=this.changeForm.nepId
          console.log(Id)
          let type=this.changeForm.nepType
          let description=this.changeForm.nepDescription
          http.post('http://192.168.159.240:25005/pluto/nep/updatePlutoNEP',{nepId:Id,nepType:type,nepDescription:description})
          let _this=this
          setTimeout(function (){
            _this.getList()
          },1000)
          this.handleClose()
        }
      })
    },
    handlePage(val) {
      this.currentPage = val
      let index = this.pageSize * (val - 1)
      let nums = this.pageSize * val
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.tableData[i]) {
          tables.push(this.tableData[i]);
        }
        this.showTableData = tables;
      }
      console.log(this.currentPage)
    },
    handleEdit(index, row) {
      this.dialogVisible=true
      this.changeForm.nepId=row.nepId
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    getList() {
      http.post('http://192.168.159.240:25005/pluto/nep/queryPlutoNEPList', {projectId: 1/*Cookie.get('projectId')*/}).then(({data}) => {
        const projects = data.data
        this.tableData = projects
        this.total = this.tableData.length || 0
        for(let i=0;i<this.tableData.length;i++){
          switch (this.tableData[i].nepType){
            case 1:
              this.tableData[i].nepType='ILF'
              break
            case 2:
              this.tableData[i].nepType='EIF'
              break
            case 3:
              this.tableData[i].nepType='EI'
              break
            case 4:
              this.tableData[i].nepType='EO'
              break
            case 5:
              this.tableData[i].nepType='EQ'
              break
            case 6:
              this.tableData[i].nepType='OTH'
              break
          }
        }
        this.currentPage = 1
        this.setPaginations()
      })
    },
    setPaginations() {
      this.showTableData = this.tableData.filter((item, index) => {
        return index < this.pageSize
      })
    },
  },
  updated(){
    this.loading=false
  },
  mounted() {
    this.getList()
    this.getSCEFile()
  }
}
</script>

<style lang="less">
body {
  margin: 0;
}
.ResultSCE {
  height: 100%;

  .common-table {
    height: 87%;
    position: relative;

    .pager {
      position: absolute;

      right: 20px;
    }
  }

}

.el-table {
  .ILF{background: #e8bf76;}
  .EIF{background: #a3ea80;}
  .EI {background: #6a98e8;}
  .EO {background: #7fe2ef;}
  .EQ {background: #f68888;}
}

</style>

