<template>
<div>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>基本信息</span>
  </div>
  <div>
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="所属辖区" prop="people">
               <el-col :span="6">
                   <el-input v-model="ruleForm.xiaqu" placeholder="请输入所属辖区"></el-input>
               </el-col>
               <el-col :span="2" >
                     <el-button  icon="el-icon-search" @click="regionAdd"></el-button>
               </el-col>
           </el-form-item>
        <el-form-item label="时间" >
                  <el-col :span="6">
                      <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">起</el-col>
                  <el-col :span="6">
                      <el-form-item prop="date2">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">止</el-col>
            </el-form-item>
         <el-form-item label="评估标题" prop="title">
               <el-input v-model="ruleForm.title" placeholder="请输入评估标题"></el-input>
           </el-form-item>        
   </el-form>
  </div>
</el-card>
    <el-collapse v-model="activeNames" >
  <el-collapse-item title="评分信息" name="1">
    <div>
    <el-table :data="tableData"  border  style="width: 100%">
        <el-table-column label="评分类型" prop="type"></el-table-column>
        <el-table-column label="场地名称" prop="name"></el-table-column>
         <el-table-column label="评估人" prop="people"></el-table-column>
          <el-table-column label="总得分" prop="score"></el-table-column>
           <el-table-column label="总扣分" prop="deduction"></el-table-column>
         <el-table-column label="操作" width="100">
              <template slot-scope="scope">
               <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
            </template>
         </el-table-column>
    </el-table>
    </div>
  </el-collapse-item>
  <el-collapse-item title="重点地区整治验收评估" name="2">
    <div>
   <el-row class="bianju">
     <el-col :span="2" > 评估人员 </el-col>
       <el-col :span="6">
                   <el-input v-model="ruleForm.people" placeholder="请输入评估人员"></el-input>
      </el-col>
               <el-col :span="2" >
                     <el-button  icon="el-icon-search" @click="add"></el-button>
         </el-col> 
   </el-row> 
         <el-table :data="tableData2" :span-method="objectSpanMethod"  border style="width: 100%; margin-top: 20px">
      <el-table-column  type="selection" width="55"> </el-table-column>
      <el-table-column  prop="name" label="子元素">  </el-table-column>
      <el-table-column prop="amount1"  label="评估标准"> </el-table-column>
      <el-table-column  prop="amount2" label="评估方式"> </el-table-column>
      <el-table-column prop="amount3" label="分值"> </el-table-column>
    </el-table>
    
   
    </div>
  </el-collapse-item>
   <el-collapse-item title="一票否则评估" name="3">
    <div>
    <el-row class="bianju">
     <el-col :span="2" > 评估人员 </el-col>
       <el-col :span="6">
                   <el-input v-model="ruleForm.people" placeholder="请输入评估人员"></el-input>
      </el-col>
               <el-col :span="2" >
                     <el-button  icon="el-icon-search" @click="add"></el-button>
         </el-col> 
   </el-row> 
     
    <el-table :data="tableData2" :span-method="objectSpanMethod"  border style="width: 100%; margin-top: 20px">
      <el-table-column  type="selection" width="55"> </el-table-column>
      <el-table-column  prop="name" label="子元素">  </el-table-column>
      <el-table-column prop="amount1"  label="评估标准"> </el-table-column>
      <el-table-column  prop="amount2" label="评估方式"> </el-table-column>
      <el-table-column prop="amount3" label="分值"> </el-table-column>
    </el-table>
    
    </div>
  </el-collapse-item>
   <el-collapse-item title="总得分分扣分评估" name="4">
    <div>
     <el-row class="bianju">
     <el-col :span="2" > 评估人员 </el-col>
       <el-col :span="6">
                   <el-input v-model="ruleForm.people" placeholder="请输入评估人员"></el-input>
      </el-col>
               <el-col :span="2" >
                     <el-button  icon="el-icon-search" @click="add"></el-button>
         </el-col> 
   </el-row> 
    <el-table :data="tableData2" :span-method="objectSpanMethod"  border style="width: 100%; margin-top: 20px">
      <el-table-column  type="selection" width="55"> </el-table-column>
      <el-table-column  prop="name" label="子元素">  </el-table-column>
      <el-table-column prop="amount1"  label="评估标准"> </el-table-column>
      <el-table-column  prop="amount2" label="评估方式"> </el-table-column>
      <el-table-column prop="amount3" label="分值"> </el-table-column>
    </el-table>
    </div>
  </el-collapse-item>
</el-collapse>
    <employee-dialog  :show="add_opt" @people-close="peopleclose" />
    <RegionDialog  :show="regionCheck" @region-close="regionclose"> </RegionDialog>
</div>
</template>
<script>

import EmployeeDialog from "./EmployeeDialog";
import RegionDialog from './RegionDialog'
export default {
    data(){
        return{
            add_opt:false  ,//人员选择dialog
             regionCheck:false,  //辖区选择dialog
            tableData:[
                {
                type:"线上",
                name:"XXX1名称",
                people:"张三",
                score:"100",
                deduction:"20",
            },
            {
               type:"线上",
                name:"XXX1名称",
                people:"李四",
                score:"90",
                deduction:"10",
            },
            {
               type:"线上",
                name:"XXX1名称",
                people:"王五",
                score:"80",
                deduction:"10",
            },
            ],
        tableData2: [{
          name: '道路及附属设施',
          amount1: '道路盖板完整，安放牢固，路面平整，无绊脚(突起<2cm)',
          amount2: 'XO',
          amount3: '10'
        }, {
          name: '',
          amount1: '道路与附属路缘石，石子填充区状态良好(无破损，无污渍，无杂草等)',
          amount2: 'PJ',
          amount3: '20'
        }, {
          name: '',
          amount1: '地面平整，无破损，无绊脚情况',
          amount2: 'PJ',
          amount3: '10'
        },],
            ruleForm:{

            },
            rules:{
                
            },

        }
    },
    components: {
      "employee-dialog":EmployeeDialog   ,  //人员选择组件
      RegionDialog,   //辖区选择组件
    },
    methods:{
          objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex ===1 ) {
          if (rowIndex % 3 === 0) {
            return {
              rowspan: 3,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      //人员选择
      add:function(){
        this.add_opt=true;
      },
      peopleclose:function(){
         this.add_opt=false;
      },
        //辖区选择
      regionAdd:function(){
        this.regionCheck=true;
      },
      regionclose:function(){
         this.regionCheck=false;
      }
    }
}
</script>
<style>
.bianju{
  margin-top:20px;
}
</style>
