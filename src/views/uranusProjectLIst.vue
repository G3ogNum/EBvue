<template>
  <div class="UPL">
    <el-row>
      <el-col :span="24" style="margin-bottom: 20px" >

        <el-card class="box-card"  >

          <div class="text item" style="display: inline-block;width: 50%" >
            <h3>漏洞工程简要信息</h3>
            <span>{{ "漏洞工程名称"+' : '+UPList.name }}</span>
            <el-divider></el-divider>
            <span>{{ "种类"+' : '+UPList.classifier }}</span>
            <el-divider></el-divider>
            <span>{{ "漏洞工程号"+' : '+UPList.uuid }}</span>
            <el-divider></el-divider>
            <span>{{ "漏洞工程危险指数"+' : '+UPList.lastInheritedRiskScore }}</span>
            <el-divider></el-divider>
            <span>{{ "激活状态"+' : '+UPList.active }}</span>
            <el-divider></el-divider>
          </div>

          <div class="text item" style="display: inline-block;width: 50%">
            <h3>漏洞危险等级及个数</h3>
            <span>{{ "严重"+' : '+UPList.metrics.critical }}</span>
            <el-divider></el-divider>
            <span>{{ "高"+' : '+UPList.metrics.high }}</span>
            <el-divider></el-divider>
            <span>{{ "中"+' : '+UPList.metrics.medium }}</span>
            <el-divider></el-divider>
            <span>{{ "低"+' : '+UPList.metrics.low }}</span>
            <el-divider></el-divider>
            <span>{{ "未定义"+' : '+UPList.metrics.unassigned }}</span>
            <el-divider></el-divider>
          </div>

          <div class="text item" style="display: inline-block;width: 100%">
            <h3>漏洞分类</h3>

            <span>{{ "缺陷"+' : '+UPList.metrics.vulnerabilities }}</span>
            <el-divider></el-divider>
            <span>{{ "漏洞组件"+' : '+UPList.metrics.vulnerableComponents }}</span>
            <el-divider></el-divider>
          </div>
          <div class="text item" style="display: inline-block;width: 100%">
            <h3>聚合结果</h3>
            <span>{{ "总数"+' : '+UPList.metrics.findingsTotal }}</span>
            <el-divider></el-divider>
            <span>{{ "审计数"+' : '+UPList.metrics.findingsAudited }}</span>
            <el-divider></el-divider>
            <span>{{ "未审计数"+' : '+UPList.metrics.findingsUnaudited }}</span>
            <el-divider></el-divider>
            <span>{{ "遗传风险评分"+' : '+UPList.metrics.inheritedRiskScore }}</span>
            <el-divider></el-divider>
          </div>
          <div class="text item" style="display: inline-block;width: 100%">
            <h3>非合规聚合类</h3>
            <span>{{ "错误"+' : '+UPList.metrics.policyViolationsFail }}</span>
            <el-divider></el-divider>
            <span>{{ "警告"+' : '+UPList.metrics.policyViolationsWarn }}</span>
            <el-divider></el-divider>
            <span>{{ "信息"+' : '+UPList.metrics.policyViolationsInfo }}</span>
            <el-divider></el-divider>
            <span>{{ "总计"+' : '+UPList.metrics.policyViolationsTotal }}</span>
            <el-divider></el-divider>
            <span>{{ "审计数"+' : '+UPList.metrics.policyViolationsAudited }}</span>
            <el-divider></el-divider>
            <span>{{ "未审计数"+' : '+UPList.metrics.policyViolationsUnaudited }}</span>
            <el-divider></el-divider>
            <span>{{ "安全非合规聚合类总数"+' : '+UPList.metrics.policyViolationsSecurityTotal }}</span>
            <el-divider></el-divider>
            <span>{{ "安全非合规聚合类审计数"+' : '+UPList.metrics.policyViolationsSecurityAudited }}</span>
            <el-divider></el-divider>
            <span>{{ "安全非合规聚合类未审计数"+' : '+UPList.metrics.policyViolationsSecurityUnaudited }}</span>
            <el-divider></el-divider>
            <span>{{ "执照总数"+' : '+UPList.metrics.policyViolationsLicenseTotal }}</span>
            <el-divider></el-divider>
            <span>{{ "执照审计数"+' : '+UPList.metrics.policyViolationsLicenseAudited }}</span>
            <el-divider></el-divider>
            <span>{{ "执照未审计数"+' : '+UPList.metrics.policyViolationsLicenseUnaudited }}</span>
            <el-divider></el-divider>
            <span>{{ "操作总数"+' : '+UPList.metrics.policyViolationsOperationalTotal }}</span>
            <el-divider></el-divider>
            <span>{{ "操作审计数"+' : '+UPList.metrics.policyViolationsOperationalAudited }}</span>
            <el-divider></el-divider>
            <span>{{ "操作未审计数"+' : '+UPList.metrics.policyViolationsOperationalUnaudited }}</span>
            <el-divider></el-divider>
          </div>
        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script>

import 'font-awesome/css/font-awesome.min.css';
import http from "@/utils/request";
export default {

  data: function () {
    return {
      UPLInfo:{},
      activeName: '',
      UPList:{},
      componentList:[],
      currentMetricsList:[],
      allProjectResult:[],
      refresh:[]
    };
  },
  methods: {


    getList(){

      http.get('/uranus/project').then(({data})=>{
        //查询工程漏洞列表（简化版）
        this.UPList=data.data[0]
        console.log(this.UPList)
      })
      http.get('/uranus/project/uuid'+'?uuid='+'4cea96fc-e50f-4839-8ec8-0c114497d73b').then(({data})=>{
        //查询工程漏洞列表（简化版）
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
.UPLHeader{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}
.UPL{
  height: 85vh; //一定要设置，保证占满
  overflow: auto;
}

</style>
