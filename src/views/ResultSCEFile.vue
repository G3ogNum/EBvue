<template>
  <div class="ResultSCEFile">

    <el-row>
      <el-dialog
          title="调整因子"
          :visible.sync="FactorsDialogVisible"
          width="80%"
          :before-close="FactorsHandleClose">

        <el-form ref="form" :model="sizeModForm" label-width="300px" size="mini">
            <h3 style="margin-left: 10%">功能性特征调整因子</h3>
            <el-form-item :label="item[0].factorName" v-for="item in this.ModifyFactor1" style="display: inline-block">
              <el-select value-key="pkId" v-model="sizeModForm.factorList[item[0].factorType-1]" :placeholder="item[0].placeholder?item[0].placeholder:'请选择'">
                <el-option :label="childItem.factorValue+'\t'+childItem.factorDescriptionA"
                           v-for="childItem in item"
                           :key="childItem.pkId"
                           :value="{factorType:childItem.factorType,
               factorValue:childItem.factorValue,
               pkId:childItem.pkId}">
                </el-option>
              </el-select>
            </el-form-item>
          <h3 style="margin-left: 10%">非功能性特征调整因子</h3>
          <el-form-item :label="item[0].factorDescriptionA" v-for="item in this.ModifyFactor2" style=" ">
            <el-select value-key="pkId" v-model="sizeModForm.factorList[item[0].factorType-1]" :placeholder="item[0].placeholder?item[0].placeholder:'请选择'">
              <el-option :label="childItem.factorValue+'\t'+childItem.factorDescriptionC"
                         v-for="childItem in item"
                         :key="childItem.pkId"
                         :value="{factorType:childItem.factorType,
               factorValue:childItem.factorValue,
               pkId:childItem.pkId}">
              </el-option>
            </el-select>
            <span class="demonstration"><font color="red"> *</font>{{ ' '+item[0].factorDescriptionB }}</span>
          </el-form-item>
<!--            <h3 style="margin-left: 10%">非功能性特征调整因子</h3>
            <el-form-item :label="item[0].factorDescriptionA" v-for="item in this.ModifyFactor2" style="">
              <el-cascader
                  v-model="sizeModForm.factorList[item[0].factorType-1]"
                  :options="options[item[0].factorType-4]">
              </el-cascader>
              <span class="demonstration"><font color="red"> *</font>{{ ' '+item[0].factorDescriptionB }}</span>
            </el-form-item>-->

          <el-form-item size="large" style="margin-left:25%;margin-top: 3%">
            <el-button type="primary" @click="onFactorSubmit">提交</el-button>
            <el-button  @click="FactorsDialogVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-col :span="24" style="margin-bottom: 20px">
        <el-card class="box-card">
          <div class="manger_header">
            <el-button type="primary" @click="dialogVisible=true">
              智能识别
            </el-button>
            <el-button type="primary" @click="dialogVisible=true">
              成本评估
            </el-button>
            <el-button type="primary" @click="FactorsDialogVisible=true">
              调整因子
            </el-button>
            <el-button type="primary" @click="dialogVisible=true">
              申请复核
            </el-button>
            <el-button type="primary" @click="dialogVisible=true">
              归档
            </el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" style="margin-left: 0px;margin-right: 2%; ">
        <el-card class="box-card" style="height: 75vh">
          <div class="custom-tree-container">
            <div class="video-tree">
              <el-tree
                  v-loading="loading"
                  :data="showData"
                  show-checkbox
                  node-key="id"
                  default-expand-all
                  :props="proProps"
                  @node-click="treeClick"
                  :expand-on-click-node="true">

                  <span class="custom-tree-node" slot-scope="{ node, data  }">
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button
                        type="text"
                        size="mini"
                        @click="() => upadte(data)">
                      修改
                    </el-button>

                  </span>
                </span>

              </el-tree>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="11" style="margin-right: 2%">
        <el-card class="box-card" style="height: 75vh" :data="fileData">
          <div class="video-tree" id="ctt">
            <h5 v-for="item in this.fileData" :id="item.metaId">
              {{ item.metaId + item.metaTitle }}
              <p>{{ item.metaContent }}</p>
            </h5>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" style="height: 75vh">
          <div class="video-tree">
            <el-table
                stripe
                :data="tableData"
                style="width: 100%">
              <el-table-column
                  prop="date"
                  label="计数项">
              </el-table-column>
              <el-table-column
                  prop="name"
                  label="类型">
              </el-table-column>
              <el-table-column
                  prop="address"
                  label="复用度">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import http from "@/utils/request";
import myFilter from "@/utils/filter";
import Cookie from "js-cookie";
import {string} from "mockjs/src/mock/random/basic";
let id = 1000;

export default {
  data: function () {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {

      ModifyFactor: [],
      ModifyFactor1: [],
      ModifyFactor2: [],
      chosenFactor:[],
      options: [
        [
          {
            label: '-1 没有明示对分布式处理的需求事项',
            value: {
              factorType: 4,
              factorValue: -1,
              pkId: 16
            }
          },
          {
            label: ' 0 通过网络进行客户端/服务器及网络基础计算机系统分布处理和传输',
            value: {
              factorType: 4,
              factorValue: 0,
              pkId: 17
            }
          },
          {
            label: ' 1 在多个服务器及处理器上同时相互执行计算机系统中的处理功能',
            value: {
              factorType: 4,
              factorValue: 1,
              pkId: 18
            }
          },
        ],
        [
          {
            label: '-1 没有明示对性能的特别需求事项或活动，因此提供基本性能',
            value: {
              factorType: 4,
              factorValue: -1,
              pkId: 19
            }
          },
          {
            label: ' 0 应答时间或处理率对高峰时间或所有业务时间都很重要，对连动系统结 束处理时间有限制',
            value: {
              factorType: 4,
              factorValue: 0,
              pkId: 20
            }
          },
          {
            label: ' 1 为满足性能需求事项，要求设计阶段进行性能分析，或在设计、开发阶 段使用分析工具',
            value: {
              factorType: 4,
              factorValue: 1,
              pkId: 21
            }
          },
        ],
        [
          {
            label: '-1 没有明示对可靠性的特别需求事项或活动，因此提供基本的可靠性',
            value: {
              factorType: 4,
              factorValue: -1,
              pkId: 22
            }
          },
          {
            label: ' 0 发生故障时可轻易修复，带来一定不便或经济损失',
            value: {
              factorType: 4,
              factorValue: 0,
              pkId: 23
            }
          },
          {
            label: ' 1 发生故障时很难修复，发生重大经济损失或有生命危害',
            value: {
              factorType: 4,
              factorValue: 1,
              pkId: 24
            }
          },
        ],
        [
          {
            label: '-1 在相同用途的硬件或软件环境下运行',
            value: {
              factorType: 4,
              factorValue: -1,
              pkId: 25
            }
          },
          {
            label: ' 0 在用途类似的硬件或软件环境下运行',
            value: {
              factorType: 4,
              factorValue: 0,
              pkId: 26
            }
          },
          {
            label: ' 1 在不同用途的硬件或软件环境下运行',
            value: {
              factorType: 4,
              factorValue: 1,
              pkId: 27
            }
          },
        ],
      ],
      sizeModForm: {
        factorList: [],
        projectId: Cookie.get('projectId'),
      },
      finalForm: {
        factorList: [],
        projectId: Cookie.get('projectId'),
      },
      dialogVisible: false,
      FactorsDialogVisible: false,
      data: generateData(),
      value: [1, 4],
      showData: [],
      fileData: [],
      tableData: [{
        date: '授权用户',
        name: 'ILF',
        address: '1'
      }, {
        date: '客户',
        name: 'ILF',
        address: '1'
      }, {
        date: '投保人',
        name: 'EI',
        address: '1'
      }, {
        date: '投保人新增',
        name: 'EO',
        address: '1'
      },
        {
          date: '投保人查询',
          name: 'ILF',
          address: '1'
        }, {
          date: '客户管理',
          name: 'EO',
          address: '1'
        }, {
          date: '参考输入',
          name: 'EI',
          address: '1'
        }, {
          date: '投保人修改',
          name: 'EO',
          address: '1'
        }, {
          date: '投保人查看',
          name: 'ILF',
          address: '1'
        }, {
          date: '投保人删除',
          name: 'EO',
          address: '1'
        }, {
          date: '被保人新增',
          name: 'EI',
          address: '1'
        }, {
          date: '被保人修改',
          name: 'ILF',
          address: '1'
        }, {
          date: '被保人维护',
          name: 'ILF',
          address: '1'
        }, {
          date: '被保人查询',
          name: 'EO',
          address: '1'
        }, {
          date: '被保人新增',
          name: 'EI',
          address: '1'
        }, {
          date: '被保人修改',
          name: 'ILF',
          address: '1'
        },],
      metaTitle: '',
      proProps: {
        label: 'nepDescription',
      },
      loading: true,
    };
  },

  methods: {
    string,

    onFactorSubmit :function() {
      let cnt=0;
      for(let i=0; i<this.sizeModForm.factorList.length; i++){
        if(this.sizeModForm.factorList[i]!=null){
          this.finalForm.factorList[cnt++]=this.sizeModForm.factorList[i]
        }
      }
      /*this.sizeModForm.factorList.forEach(function (item) {
        if(item!=null){
          this.finalForm.factorList.add(item);
        }
      })*/
      console.log(this.finalForm)
      this.$refs.form.validate((valid) => {
        if (valid) {
          http.post('http://192.168.159.240:25005/pluto/addProjectFactor',this.finalForm)


        }
      })
      this.FactorsHandleClose()
    },

    FactorsHandleClose(done) {
      this.FactorsDialogVisible=false

    },
    treeClick(node) {
      let target = document.getElementById(node.metaId)
      let high = target.offsetTop
      document.getElementById('ctt').scrollTop = high - 120
      console.log(node.metaId)
    },
    upadte(data) {
      const newChild = {id: id++, label: 'testtest', children: []};
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    getList() {
      http.post('http://192.168.159.240:25005/pluto/queryAllFactors').then(({data}) => {
        this.ModifyFactor = data.data
        http.post('http://192.168.159.240:25005/pluto/queryProjectFactorList', {projectId: Cookie.get('projectId')}).then(({data}) => {
          this.chosenFactor=data.data
          for(let i=0;i<this.chosenFactor.length;i++){
            if(this.chosenFactor[i].factorType>3&&this.chosenFactor[i].factorType<8)
            this.$set(this.ModifyFactor[this.chosenFactor[i].factorType-1][0],"placeholder",this.chosenFactor[i].factorValue+' '+this.chosenFactor[i].factorDescriptionC);
            else
              this.$set(this.ModifyFactor[this.chosenFactor[i].factorType-1][0],"placeholder",this.chosenFactor[i].factorValue+' '+this.chosenFactor[i].factorDescriptionA);
          }

        })
        let cnt1=0;
        let cnt2=0;
        for(let i=0;i<this.ModifyFactor.length;i++){
          if(this.ModifyFactor[i][0].factorDescriptionC){
            this.ModifyFactor2[cnt2++]=this.ModifyFactor[i]
          }else{
            this.ModifyFactor1[cnt1++]=this.ModifyFactor[i]
          }
        }
        console.log(this.ModifyFactor1)
        console.log(this.ModifyFactor2)
      })
      http.post('http://192.168.159.240:25005/pluto/nep/queryPlutoNEPList', {projectId: 1/*Cookie.get('projectId')*/}).then(({data}) => {
        this.showData = data.data
        this.showData.forEach(function (item) {
          item.nepDescription = item.metaId + item.nepDescription
        })
        this.loading = false
      })
      http.post('http://192.168.159.240:25005/pluto/docx/queryMetaList', {projectId: 1/*Cookie.get('projectId')*/}).then(({data}) => {
        this.fileData = data.data
        /*console.log(this.fileData)*/
        this.fileData.forEach(function (item) {
          /*item.metaId+=item.metaTitle*/
        })
      })

    },

    /*remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },*/

    renderContent(h, {node, data, store}) {
      return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={() => this.append(data)}>Append</el-button>
              <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>Delete</el-button>
            </span>
          </span>);
    }
  },
  mounted() {
    this.getList()

  },
  updated() {

  }
}
</script>

<style scoped lang="less">


.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}

.video-tree {

  height: 700px;
  padding: 10px 0;
  box-sizing: border-box;

  /*设置纵向滚动条、横向滚动条要配合下面的.el-tree-node的样式才能实现*/
  overflow-y: scroll;
  /*overflow-x: scroll;*/

  h5 {
    font-size: 18px;
    font-weight: 400;

    p {
      font-size: 14px;
      font-weight: 400;
    }
  }

  > .el-tree {
    > .el-tree-node {
      /*设置横向滚动条*/
      min-width: 100%;
      display: inline-block;


      /*设置根节点隐藏*/

      > .el-tree-node__content {
        display: none;
      }
    }
  }
}

</style>
