<template>
<div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>基本信息</span>
        </div>
        <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="所属辖区" prop="locationName">
                   <el-col :span="6">
                  <el-input placeholder="请输入所属辖区" v-model="ruleForm.locationName">
                    <el-button slot="append" icon="el-icon-search" @click="regionAdd"></el-button>
                  </el-input>
                </el-col>
                </el-form-item>
                <el-form-item label="时间">
                    <el-col :span="6">
                        <el-form-item prop="evulateStartDate">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.evulateStartDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="text-align:center">起</el-col>
                    <el-col :span="6">
                        <el-form-item prop="evulateEndDate">
                            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="ruleForm.evulateEndDate" style="width: 100%;"></el-date-picker>
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

    <el-collapse v-model="activeNames">
        <el-collapse-item title="重点地区整治验收评估" name="1">
            <div>
                <el-row class="bianju">
                     <el-col :span="6">
                  <el-input
                    placeholder="请输入评估人员"
                    v-model="ruleForm.evulatePepole "
                    clearable
                    :readonly="true"
                    @clear="ruleForm.evulatePepole =''"
                  >
                    <el-button slot="append" icon="el-icon-search" @click="add"></el-button>
                  </el-input>
                </el-col>
                </el-row>
               <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="已启用" name="first">
              <el-table
                :data="enabledItemData"
                border
                style="width: 100%;"
                :span-method="calSpanForEnableData"
              >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="categoryName" label="子元素"></el-table-column>
                <el-table-column prop="name" label="评估标准"></el-table-column>
                <el-table-column prop="evaluateType" label="评估方式" width="150"></el-table-column>
                <el-table-column prop="score" label="分值" width="100"></el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleDisableRow(scope.row)" type="text" size="small">禁用</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="未启用" name="second">
              <el-table
                :data="disableItemData"
                border
                style="width: 100%;"
                :span-method="calSpanForDisableData"
              >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="categoryName" label="子元素"></el-table-column>
                <el-table-column prop="name" label="评估标准"></el-table-column>
                <el-table-column prop="evaluateType" label="评估方式"></el-table-column>
                <el-table-column prop="score" label="分值"></el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="context">
                    <el-button @click="handleDisableRow2(context.row)" type="text" size="small">启用</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>

            </div>
        </el-collapse-item>
        <el-collapse-item title="一票否则评估" name="2">
            <div>
                <el-row class="bianju">
                    <el-col :span="6">
                  <el-input
                    placeholder="请输入评估人员"
                    v-model="ruleForm.evulatePepole "
                    clearable
                    :readonly="true"
                    @clear="ruleForm.evulatePepole =''"
                  >
                    <el-button slot="append" icon="el-icon-search" @click="add"></el-button>
                  </el-input>
                </el-col>
                </el-row>

               <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="已启用" name="first">
              <el-table
                :data="enabledItemData"
                border
                style="width: 100%;"
                :span-method="calSpanForEnableData"
              >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="categoryName" label="子元素"></el-table-column>
                <el-table-column prop="name" label="评估标准"></el-table-column>
                <el-table-column prop="evaluateType" label="评估方式" width="150"></el-table-column>
                <el-table-column prop="score" label="分值" width="100"></el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleDisableRow(scope.row)" type="text" size="small">禁用</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="未启用" name="second">
              <el-table
                :data="disableItemData"
                border
                style="width: 100%;"
                :span-method="calSpanForDisableData"
              >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="categoryName" label="子元素"></el-table-column>
                <el-table-column prop="name" label="评估标准"></el-table-column>
                <el-table-column prop="evaluateType" label="评估方式"></el-table-column>
                <el-table-column prop="score" label="分值"></el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="context">
                    <el-button @click="handleDisableRow2(context.row)" type="text" size="small">启用</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
            </div>
        </el-collapse-item>
        <el-collapse-item title="总得分分扣分评估" name="3">
            <div>
                <el-row class="bianju">
                    <el-col :span="6">
                  <el-input
                    placeholder="请输入评估人员"
                    v-model="ruleForm.evulatePepole "
                    clearable
                    :readonly="true"
                    @clear="ruleForm.evulatePepole =''"
                  >
                    <el-button slot="append" icon="el-icon-search" @click="add"></el-button>
                  </el-input>
                </el-col>
                </el-row>
               <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="已启用" name="first">
              <el-table
                :data="enabledItemData"
                border
                style="width: 100%;"
                :span-method="calSpanForEnableData"
              >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="categoryName" label="子元素"></el-table-column>
                <el-table-column prop="name" label="评估标准"></el-table-column>
                <el-table-column prop="evaluateType" label="评估方式" width="150"></el-table-column>
                <el-table-column prop="score" label="分值" width="100"></el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleDisableRow(scope.row)" type="text" size="small">禁用</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="未启用" name="second">
              <el-table
                :data="disableItemData"
                border
                style="width: 100%;"
                :span-method="calSpanForDisableData"
              >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="categoryName" label="子元素"></el-table-column>
                <el-table-column prop="name" label="评估标准"></el-table-column>
                <el-table-column prop="evaluateType" label="评估方式"></el-table-column>
                <el-table-column prop="score" label="分值"></el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="context">
                    <el-button @click="handleDisableRow2(context.row)" type="text" size="small">启用</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
            </div>
        </el-collapse-item>
    </el-collapse>
    <employee-dialog :show="add_opt" @people-close="peopleclose" @view-People="viewpeople"/>
    <RegionDialog :show="regionCheck" @region-close="regionclose" @view-region="viewregion"> </RegionDialog>
</div>
</template>

<script>
import EmployeeDialog from "./EmployeeDialog";
import RegionDialog from './RegionDialog'
export default {
    data() {
        return {
            enableDataRowSpan: [], //已启用评估要素夸行数据
            disableDataRowSpan: [], //未启用评估要素夸行数据
             evaluatePeople: [],
            add_opt: false, //人员选择dialog
            regionCheck: false, //辖区选择dialog
              activeName: "first",
              activeNames: ["1"],
               code: "C0000001",
            tableData2: [],
            ruleForm: {
              locationName:"",
              evulatePepole:"",
              evulatePepoleId:"",
            },
            rules: {

            },

        }
    },
    created: function() {
    this.handleGetScoreTableData(); //加载评分要素数据
  },
    components: {
        "employee-dialog": EmployeeDialog, //人员选择组件
        RegionDialog, //辖区选择组件
    },
    computed:{
      enabledItemData: function() {
      var sz = [];
      this.enableDataRowSpan = [];
      for (var i = 0; i < this.tableData2.length; i++) {
        if (this.tableData2[i].enable == true) {
          sz.push(this.tableData2[i]);
        }
      }
      this.enableDataRowSpan = this.calSpanData(sz);
      return sz;
    },
     disableItemData: function() {
      var sz = [];
      for (var i = 0; i < this.tableData2.length; i++) {
        if (this.tableData2[i].enable == false) {
          sz.push(this.tableData2[i]);
        }
      }
      this.disableDataRowSpan = this.calSpanData(sz);
      return sz;
    }
    },
    watch: {
    "ruleForm.evulateStartDate": function() {
      //判断开始日期或结束日期是否没选，如果是的话，不需要特殊处理
      if (
        this.ruleForm.evulateEndDate == "" ||
        this.ruleForm.evulateStartDate == ""
      ) {
        return;
      }
      //判断开始日期是否大于结束日期，如果是的话，则清空结束日期
      if (this.ruleForm.evulateStartDate > this.ruleForm.evulateEndDate) {
        this.ruleForm.evulateEndDate = ""; //清空结束日期
      }
    },
    "ruleForm.evulateEndDate": function() {
      if (
        this.ruleForm.evulateEndDate == "" ||
        this.ruleForm.evulateStartDate == ""
      ) {
        return;
      }
      if (this.ruleForm.evulateStartDate > this.ruleForm.evulateEndDate) {
        this.ruleForm.evulateEndDate = "";
      }
    },
    
  },
    methods: {
      //加载评分要素数据
    handleGetScoreTableData() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url: "/categoryItem/findByCategoryCode",
          data: {
            categoryCode: this.code
          }
        })
        .then(res => {
          _this.tableData2 = [];
          if (res.data.status == 200) {
            _this.tableData2 = res.data.data;
          } else {
            _this.tableData2 = [];
          }
          for (var i = 0; i < _this.tableData2.length; i++) {
            _this.tableData2[i].enable = true;
          }
          _this.loadData();
        });
    },
    loadData() {
      if (!this.ruleForm.settingsId) {
        return;
      }

      let _this = this;
      _this
        .$axios({
          method: "post",
          url: "/evalSettings/load",
          data: { id: _this.ruleForm.settingsId }
        })
        .then(res => {
          if (res.data.status == 200) {
            _this.ruleForm = res.data.data[0];
            _this.tableDataSite = _this.ruleForm.accountingTable;
            _this.loadAtt();
            for (var i = 0; i < _this.tableData2.length; i++) {
              _this.tableData2[i].enable = false;
              if (
                ("," + _this.ruleForm.itemId + ",").indexOf(
                  "," + _this.tableData2[i].itemId + ","
                ) >= 0
              ) {
                _this.tableData2[i].enable = true;
              }
            }
            _this.freshCategoryData();
          }
        });
    },
     //获取dailog中传过来的选中的人员
    viewpeople: function(person) {
      this.evaluatePeople = person;
      var szId = [];
      var szName = [];
      for (var i = 0; i < person.length; i++) {
        szId.push(person[i].personId);
        szName.push(person[i].name);
      }
      this.ruleForm.evulatePepoleId = szId.join(",");
      this.ruleForm.evulatePepole = szName.join(",");
    },
     concatId(sz, id) {
      var idsz = [];
      for (var i = 0; i < sz.length; i++) {
        idsz.push(sz[i][id]);
      }
      return idsz.join(",");
    },
       //已启用评估要素的跨行计算方法
    calSpanForEnableData(rowObj) {
      return this.getRowSpan(this.enableDataRowSpan, rowObj);
    },

    //未启用评估要素的跨行计算方法
    calSpanForDisableData(rowObj) {
      return this.getRowSpan(this.disableDataRowSpan, rowObj);
    },

    //计算夸行
    calSpanData(sz) {
      var enableDataRowSpan = [];
      for (var i = 0; i < sz.length; i++) {
        if (enableDataRowSpan[sz[i].categoryId]) {
          var spanObj = enableDataRowSpan[sz[i].categoryId];
          spanObj.rowSpan++;
        } else {
          enableDataRowSpan[sz[i].categoryId] = {
            rowSpan: 1,
            spanObj: false,
            itemId: sz[i].itemId
          };
        }
      }
      return enableDataRowSpan;
    },
    getRowSpan(spanArray, rowObj) {
      if (rowObj.columnIndex != 1) {
        return;
      }
      var spanObj = spanArray[rowObj.row.categoryId];
      if (spanObj.rowSpan == 1 && spanObj.itemId == rowObj.row.itemId) {
        return {
          rowspan: 1,
          colspan: 1
        };
      }
      if (spanObj.rowSpan > 1 && spanObj.itemId == rowObj.row.itemId) {
        return {
          rowspan: spanObj.rowSpan,
          colspan: 1
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    },
     handleDisableRow(row) {
      row.enable = false;
      this.freshCategoryData();
    },
    freshCategoryData() {
      var sz = [];
      sz = sz.concat(this.tableData2);
      this.tableData2 = sz;
    },
    handleDisableRow2(row) {
      row.enable = true;
      this.freshCategoryData();
    },
        //人员选择
        add: function () {
            this.add_opt = true;
        },
        peopleclose: function () {
            this.add_opt = false;
        },
        //辖区选择
        regionAdd: function () {
            this.regionCheck = true;
        },
        regionclose: function () {
            this.regionCheck = false;
        },
         //获取dailog中传过来的选中的人员
     viewpeople: function(person) {
      this.evaluatePeople = person;
      var szId = [];
      var szName = [];
      for (var i = 0; i < person.length; i++) {
        szId.push(person[i].personId);
        szName.push(person[i].name);
      }
      this.ruleForm.evulatePepoleId = szId.join(",");
      this.ruleForm.evulatePepole = szName.join(",");
    },
    //获取dailog中传过来的选中的辖区
    viewregion: function(region) {
      this.ruleForm.locationName = region.fullTitle;
      this.ruleForm.location = region.itemCode;
    },
    }
}
</script>

<style>
.bianju {
    margin-top: 20px;
}
</style>
