<template>
  <div class="project_manager">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
<!--      用户的表单信息-->
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="工程名称" prop="projectName">
          <el-input placeholder="请输入工程名称" v-model="form.projectName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="onSubmit()">确 定</el-button>
  </span>
    </el-dialog>
    <div class="project-manage">
      <el-button type="primary" @click="dialogVisible=true">
        新建项目
      </el-button>
      <el-table
          height="90%"
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName">
        <el-table-column
            prop="pkId"
            label="工程id">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.pkId }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="projectName"
            label="工程名称">
        </el-table-column>
        <el-table-column
            prop="userId"
            label="用户id">
          <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.userId }}</el-tag>
              </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="addTime"
            label="添加时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.addTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="modTime"
            label="上次修改时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.modTime }}</span>
          </template>
        </el-table-column>

      </el-table>
      <div>
        <el-pagination
            page-size="2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :current-page="currentPage"
            @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getData, getProjects, getProjectStatus} from "@/api";
import moment from "moment/moment";

export default {
  data() {
    return {
      dialogVisible: false,
      form:{
        projectName:'',
      },
      rules: {
        projectName: [
          { required: true, message: '请输入工程名称', trigger: 'blur' },
          { message: '123', trigger: 'blur' }
        ],
      },
      tableData:[],
      projectList:[],
      total:0,//当前总条数
      currentPage:1,
      pageSize:10,
    };
  },
  methods: {

    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    onSubmit() {
      this.$refs.form.validate((valid)=>{
        if(valid){


          this.handleClose()
        }
      })
    },
    handleClose(done) {
      this.$refs.form.resetFields()
      this.dialogVisible=false
    },
    getList(){
      getProjects().then(({data}) => {
        const projects = data.data
        this.tableData = projects
        this.tableData.forEach((Data)=>{
          Data.modTime = moment(Data.modTime).format('YYYY-MM-DD HH:mm:ss')
          Data.addTime = moment(Data.addTime).format('YYYY-MM-DD HH:mm:ss')
        })
        this.total=this.tableData.length || 0

        console.log(this.total)
      })
    },
    //选择页码的回调
    handlePage(val){
      this.pageData.page=val
      this.getList()
    },
  },
  mounted() {
  this.getList()
},
};
</script>

<style scoped lang="less">
.project_manager{
  height: 90%;
}
.project-manage{
  height: 90%;
}
.el-table .warning-row {
  background: #ecab2d;
}

.el-table .success-row {
  background: #6eec2f;
}
</style>
