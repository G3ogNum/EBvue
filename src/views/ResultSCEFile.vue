<template>
  <div class="ResultSCEFile">

    <el-row>
      <el-col :span="24" style="margin-bottom: 20px">
        <el-card class="box-card">
          <div class="manger_header">
            <el-button type="primary" @click="dialogVisible=true">
              智能识别
            </el-button>
            <el-button type="primary" @click="dialogVisible=true">
              成本评估
            </el-button>
            <el-button type="primary" @click="dialogVisible=true">
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
      <el-col :span="6" style="margin-left: 0px;margin-right: 30px; ">
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
      <el-col :span="11"style="margin-right: 30px">
        <el-card class="box-card" style="height: 75vh" :data="fileData">
          <div class="video-tree" id="ctt">
            <h5 v-for="item in this.fileData" :id="item.metaId">
              {{item.metaId+item.metaTitle}}
              <p>{{item.metaContent}}</p>
            </h5>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" >
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

let id = 1000;

export default {
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${ i }`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      data: generateData(),
      value: [1, 4],
      showData:[],
      fileData:[],
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
        },{
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
        },{
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
      metaTitle:'',
      proProps:{
        label:'nepDescription',
      },
      loading:true,
    };
  },

  methods: {
    treeClick(node){
      let target=document.getElementById(node.metaId)
      let high=target.offsetTop
      document.getElementById('ctt').scrollTop=high-120
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
      http.post('http://192.168.159.240:25005/pluto/nep/queryPlutoNEPList', {projectId: 1/*Cookie.get('projectId')*/}).then(({data}) => {
        this.showData = data.data
        this.showData.forEach(function (item){
          item.nepDescription=item.metaId+item.nepDescription
        })
        this.loading=false
      })
      http.post('http://192.168.159.240:25005/pluto/docx/queryMetaList', {projectId: 1/*Cookie.get('projectId')*/}).then(({data}) => {
        this.fileData = data.data
        /*console.log(this.fileData)*/
        this.fileData.forEach(function (item){
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
  width: 0 !important;height: 0 !important;
}

.video-tree{

 height: 700px;
 padding:10px 0;
 box-sizing: border-box;

 /*设置纵向滚动条、横向滚动条要配合下面的.el-tree-node的样式才能实现*/
  overflow-y: scroll;
  /*overflow-x: scroll;*/

    h5{
      font-size:18px ;
      font-weight: 400;
      p{
        font-size:14px ;
        font-weight: 400;
      }
    }

    >.el-tree{
      >.el-tree-node{
      /*设置横向滚动条*/
      min-width: 100%;
      display: inline-block;


    /*设置根节点隐藏*/
        >.el-tree-node__content{
          display: none;
        }
      }
    }
}

</style>
