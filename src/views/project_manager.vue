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
    <div class="manger_header">
      <el-button type="primary" @click="dialogVisible=true">
        新建项目
      </el-button>
      <el-form inline :model="pkInfo">
        <el-form-item>
          <el-input placeholder="请输入工程名称" v-model="pkInfo.projectName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
      <div class="common-table">
        <el-table
            stripe
            height="90%"
            :data="showTableData"
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
          <el-table-column
              prop="pkId"
              label="请选择项目">
            <template slot-scope="scope">
              <el-button type="primary" @click="chooseProject(scope.row)">
                选择项目
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
  </div>
</template>

<script>
import {getData, getProjects, getProjectStatus,createNewProject} from "@/api";
import moment from "moment/moment";
import axios from "axios";
import Cookie from "js-cookie";
import http from "@/utils/request";

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
      tableData:[
        {
          pkId:Number,
        }
      ],
      showTableData:[],
      projectList:[],
      total:0,//当前总条数
      currentPage:1,
      pageSize:10,
      pkInfo:{
        projectName:''
      }
    };
  },
  methods: {
    chooseProject(row){
      Cookie.set('projectId',row.pkId)
      this.$store.commit("setProjectId",row.pkId)
      this.$router.push('software_cost_estimate')
      console.log(this.$store.state.projectId)
    },
    onSearch(){
      this.total=this.tableData.length
      let tables = [];
      for (let i = 0; i < this.total; i++) {
        if (this.tableData[i].projectName===this.pkInfo.projectName||(!this.pkInfo.projectName)) {
          tables.push(this.tableData[i]);
        }
        this.showTableData = tables;
      }
      console.log(this.tableData.length)
      this.total=this.showTableData.length
    },

    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    onSubmit: function () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let name=this.form.projectName
          http.post('http://192.168.159.240:25005/pluto/project/addPlutoProject',{projectName:name})
          let _this=this
          setTimeout(function (){
            _this.getList()
          },1000)
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
        this.currentPage=1
        this.setPaginations()
      })
    },
    setPaginations(){
      this.showTableData=this.tableData.filter((item,index)=>{
        return index<this.pageSize
      })
    },
    //选择页码的回调
    handlePage(val){
      this.currentPage=val
      let index=this.pageSize*(val-1)
      let nums=this.pageSize*val
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.tableData[i]) {
          tables.push(this.tableData[i]);
        }
        this.showTableData = tables;
      }
      console.log(this.currentPage)
    },
  },
  mounted() {
  this.getList()
},
};
</script>

<style scoped lang="less">

.project_manager{
  height: 100%;
  .manger_header{
    display: flex;
    justify-content: space-between;
    align-items: center;

  }
  .common-table{
    height: 87%;
    position: relative;
    .pager{
      position: absolute;

      right: 20px;
    }
  }
}

.el-table .warning-row {
  background: #ecab2d;
}

.el-table .success-row {
  background: #6eec2f;
}
</style>
