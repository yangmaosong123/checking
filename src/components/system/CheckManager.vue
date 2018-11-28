<template>
  <el-container>
    <el-aside width="500px" style="padding:20px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目树</span>
          
        </div>
        <el-tree :data="data2" show-checkbox node-key="id" :props="defaultProps"></el-tree>
      </el-card>
    </el-aside>
    <el-main>
      <el-card class="box-card">
        
        <el-tabs v-model="activeName">
          <el-tab-pane label="项目详情" name="first">
              <el-form ref="form" :model="form" label-width="150px">
                  <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                 </el-form-item>
                  <el-form-item label="总分">
                    <el-input v-model="form.name"></el-input>
                 </el-form-item>
                 <el-form-item label="比重">
                    <el-input v-model="form.name"></el-input>
                 </el-form-item>
                 <el-form-item label="排序比重">
                    <el-input v-model="form.name"></el-input>
                 </el-form-item>
                  <el-form-item label="是否可发起评估">
                    <el-checkbox-group v-model="form.checkList">
                        <el-checkbox label="是"></el-checkbox>
                        <el-checkbox label="否"></el-checkbox>                        
                    </el-checkbox-group>
                 </el-form-item>
              </el-form>
              <div style="text-align:center">
                  <el-button type="primary">保存</el-button>
                  <el-button>删除</el-button>
                  <el-button>重置</el-button>
              </div>
               
          </el-tab-pane>
          <el-tab-pane label="检查标准" name="second">
                  <div style="font-size:32px">
                      <i class="el-icon-plus"></i> 
                      <i class="el-icon-delete"></i>
                  </div>
                  
               
              
               <el-table
                :data="tableData"
                style="width: 100%"> 
                 <el-table-column
                    type="selection"
                    width="55">
                 </el-table-column>

                <el-table-column
                type="index"
                :index="indexMethod">
                </el-table-column>

                <el-table-column
                    prop="name"
                    label="名称"
                    >
                    
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="扣分数"
                    width="50">
                </el-table-column>
                 

                </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
        tableData: [{
            date: '2016-05-02',
            name: '安全出口设置不符合《小档口、小作坊、小娱乐场所消防安全整治技术要求》4.6、4.7条要求',
            address: '50'
          }, {
            date: '2016-05-04',
            name: '不符合《小档口、小作坊、小娱乐场所消防安全整治技术要求》5.1、5.2条规定',
            address: '20'
          }, {
            date: '2016-05-01',
            name: '4.疏散通道、安全出口存在堵塞、占用、锁闭',
            address: '30'
          }, {
            date: '2016-05-03',
            name: '设置人员住宿的“三小”场所的外窗、阳台上的防盗网未设置紧急逃生口、二层（含二层）以上紧急逃生口未设置逃生缓降器、消防逃生梯或辅助爬梯等辅助疏散逃生设施',
            address: '10'
          }],

        form:{},
      activeName: "first",
      defaultProps: {
        children: "children",
        label: "label"
      },
      data2: [
        {
          id: 1,
          label: "全省第九批火灾隐患重点地区整治验收查阅资料标准",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "全省第九批火灾隐患重点地区整治验收实地检查评估标准",
          children: [
            {
              id: 5,
              label: "A、“三小”场所消防安全评估"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style>
.el-tree{
    min-height: 340px;
}
</style>



