<template>
  <div class="ResultSCE">
    <el-dialog
        title="修改功能点"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form  :model="changeForm" :rules="rules" ref="changeForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="id" prop="id">
          <el-input v-model="changeForm.id"></el-input>
        </el-form-item>
        <el-form-item label="nepType" prop="nepType">
          <el-input v-model="changeForm.nepType"></el-input>
        </el-form-item>
        <el-form-item label="nepDescription" prop="nepDescription">
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
        <el-card class="box-card" style="height: 800px">
          <div class="common-table">
            <el-table
                :data="showTableData"
                style="width: 100%"

                height="700px"
                :row-class-name="tableRowClassName">
              <el-table-column
                  label="id"
                  prop="id"
                  width="180">
                <template slot-scope="scope">

                  <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="metaId"
                  prop="metaId"
                  width="180">
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
                  label="nepId"
                  prop="nepId"
                  width="180">
              </el-table-column>

              <el-table-column
                  label="nepType"
                  prop="nepType"
                  width="180">
              </el-table-column>
              <el-table-column
                  label="nepDescription"
                  prop="nepDescription"
                  width="180">
              </el-table-column>
              <el-table-column label="操作" prop="operation">
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

export default {
  data() {
    return {
      changeForm:{
        id:'',
        nepType:'',
        nepDescription:'',
      },
      rules:{
        nepType:[
        ],
        nepDescription:[
        ],
        id:[
          { required: true, message: '请输入功能点id', trigger: 'blur' }
        ],
      },
      dialogVisible: false,
      tableData: [],
      showTableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  methods: {

    tableRowClassName({row, rowIndex}) {
      /*console.log(row.id)*/
      if(row.nepType===1){
        return 'ILF'
      }
      if(row.nepType===2){
        return 'EIF'
      }
      if(row.nepType===3){
        return 'EI'
      }
      if(row.nepType===4){
        return 'EO'
      }
      if(row.nepType===5){
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
          let Id=this.changeForm.id
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
      this.changeForm.id=row.id
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    getList() {
      http.post('http://192.168.159.240:25005/pluto/nep/queryPlutoNEPList', {projectId: 20}).then(({data}) => {
        const projects = data.data
        this.tableData = projects
        this.total = this.tableData.length || 0
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
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less">
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

