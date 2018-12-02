<template>
  <div>
    <el-card class="box-card">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
          <div>
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="所属辖区" prop="locationName">
                <el-col :span="6">
                  <el-input placeholder="请输入所属辖区" v-model="ruleForm.locationName">
                    <el-button slot="append" icon="el-icon-search" @click="regionAdd"></el-button>
                  </el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="时间" required>
                <el-col :span="6">
                  <el-form-item prop="evulateStartDate">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                      v-model="ruleForm.evulateStartDate"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="text-align:center">起</el-col>
                <el-col :span="6">
                  <el-form-item prop="evulateEndDate">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="ruleForm.evulateEndDate"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="2">止</el-col>
              </el-form-item>
              <el-form-item label="评估人员" prop="evulatePepole ">
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
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="ruleForm.remark" autosize></el-input>
              </el-form-item>
              <el-form-item label="附件" prop>
                <el-upload
                  class="upload-demo"
                  :action="this.$store.state.fileUploadUrl"
                  :on-remove="handleRemove"
                  :on-success="handleAttUpload"
                  multiple
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
        <el-collapse-item title="评估场所" name="2">
          <div>
            <el-button type="primary" @click="addArea">添加</el-button>
            <el-table :data="tableDataSite" border style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column label="所属辖区" prop="locationTitle"></el-table-column>
              <el-table-column label="场所名称" prop="locationName"></el-table-column>
              <el-table-column label="所在地址" prop="addr"></el-table-column>
              <el-table-column label="所属行业(领域)" prop="accountingType"></el-table-column>
              <el-table-column label="负责人" prop="personInCharge"></el-table-column>
              <el-table-column label="负责人联系电话" prop="phone"></el-table-column>
              <el-table-column label="营业执照号码" prop="number"></el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="removeSite(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="评估要素" name="3">
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
        </el-collapse-item>
      </el-collapse>
      <employee-dialog :show="add_opt" @people-close="peopleclose" @view-People="viewpeople"/>
      <site-dialog :show="areaCheck" @area-close="areaclose" @view-area="viewarea"/>
      <region-dialog :show="regionCheck" @region-close="regionclose" @view-region="viewregion"/>
    </el-card>
    <div style="text-align:center;margin-top:20px;margin-bottom:20px;">
      <el-button type="primary" @click="save">提交</el-button>
      <el-button type="info" @click="save">暂存</el-button>
    </div>
  </div>
</template>
<script>
import SiteDialog from "./SiteDialog";
import EmployeeDialog from "./EmployeeDialog";
import RegionDialog from "./RegionDialog";
export default {
  data() {
    return {
      enableDataRowSpan: [], //已启用评估要素夸行数据
      disableDataRowSpan: [], //未启用评估要素夸行数据
      fileList: [],
      evaluatePeople: [],
      activeName: "first",
      activeNames: ["1"],
      add_opt: false, //人员选择dialog
      areaCheck: false, //场所选择dialog
      regionCheck: false,
      tableDataSite: [], //评估场所数据

      type: "THREE",
      area: "XI_XIANG",
      code: "C0000001",

      tableData2: [],
      ruleForm: {
        evluationSiteId: "", //评估场所id
        evluationType: "", //评估类型(可选)
        evulateEndDate: "", //评估结束时间
        evulatePepole: "", //评估人员
        evulatePepoleId: "", //评估人员id
        evulateStartDate: "", //评估开始时间
        itemId: "", //评估项ID
        locationName: "", //所属辖区名称
        location: "", //所属辖区
        remark: "",
        settingsId: "" //记录id
      },
      rules: {
        locationName: [
          { required: true, message: "请输入所属辖区", trigger: "blur" }
        ],
        evulateStartDate: [
          { required: true, message: "请选择开始时间", trigger: "blur" }
        ],
        evulateEndDate: [
          { required: true, message: "请选择结束时间", trigger: "blur" }
        ],
        evulatePepole: [
          { required: true, message: "请选择评估人员", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    "employee-dialog": EmployeeDialog, //人员选择dialog
    "site-dialog": SiteDialog, //场地选择dialog
    "region-dialog": RegionDialog //辖区选择dialog
  },
  computed: {
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
 mounted:function(){
     if(this.$route.query && this.$route.query.type){
            this.ruleForm.evluationType= this.$route.query.type;
            
    } 
       
  },
  created: function() {
    this.handleGetScoreTableData(); //加载评分要素数据
  },
  methods: {
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
    //加载附件
    loadAtt() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url: "/attachment/findByBizObj",
          data: {
            bizObjId: _this.ruleForm.settingsId,
            bizObjName: "evaluate_start_attachment"
          }
        })
        .then(res => {
          if (res.data.status == 200) {
            _this.fileList = res.data.data;
          }
        });
    },

    //加载附件
    getLocationName() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url: "/config/findLocation",
          data: { locationCode: _this.ruleForm.location }
        })
        .then(res => {
          if (res.data.status == 200) {
            _this.ruleForm.locationName = res.data.data.list[0].fullTitle;
          }
        });
    },

    handleAttUpload(response, file, fileList) {
      this.fileList.push({ id: response.data, name: file.name, fileObj: file });
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
    handleRemove(file, fileList) {
      for (var i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].id == file.id) {
          this.fileList.splice(i, 1);
          break;
        }
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

    //人员选择
    add: function() {
      this.add_opt = true;
    },
    peopleclose: function() {
      this.add_opt = false;
    },
    //场所选择
    addArea: function() {
      this.areaCheck = true;
    },
    areaclose: function() {
      this.areaCheck = false;
    },
    //辖区选择
    regionAdd: function() {
      this.regionCheck = true;
    },
    regionclose: function() {
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
    viewarea: function(site) {
      for (var i = 0; i < site.length; i++) {
        var found = false;
        for (var j = 0; j < this.tableDataSite.length; j++) {
          if (this.tableDataSite[j].accountingId == site[i].accountingId) {
            found = true;
            break;
          }
        }
        if (found == false) {
          this.tableDataSite.push(site[i]);
        }
      }
    },

    removeSite(row) {
      for (var i = 0; i < this.tableDataSite.length; i++) {
        if (this.tableDataSite[i] == row) {
          this.tableDataSite.shift(i, 1);
          break;
        }
      }
    },

    concatId(sz, id) {
      var idsz = [];
      for (var i = 0; i < sz.length; i++) {
        idsz.push(sz[i][id]);
      }
      return idsz.join(",");
    },
    //暂存
    save: function() {
      var _this = this;
      _this.ruleForm.itemId = _this.concatId(_this.enabledItemData, "itemId");
      _this.ruleForm.evluationSiteId = _this.concatId(
        _this.tableDataSite,
        "accountingId"
      );
      _this.ruleForm.attachmentId = _this.concatId(_this.fileList, "id");

      _this
        .$axios({
          method: "post",
          url: "/evalSettings/save",
          data: _this.ruleForm
        })
        .then(res => {
          if (res.data.status == 200) {
            _this.ruleForm.settingsId = res.data.data.settingsId;
            _this.$message({
              message: "保存成功"
            });
          }
        });
    },
    submit: function() {
      var _this = this;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          /*
          if(_this.tableDataSite.length==0){
               this.$message({
                message: '评估场所不能为空',
                type: 'warning'
                });
                return;
          }
          
          if (_this.enabledItemData.length == 0) {
            _this.$message({
              message: "评估要素不能为空",
              type: "warning"
            });
            return;
          }
          */
          _this.ruleForm.itemId = _this.concatId(
            _this.enabledItemData,
            "itemId"
          );
          _this.ruleForm.evluationSiteId = _this.concatId(
            _this.tableDataSite,
            "accountingId"
          );
          _this.ruleForm.attachmentId = _this.concatId(_this.fileList, "id");

          _this
            .$axios({
              method: "post",
              url: "/evalSettings/save",
              data: _this.ruleForm
            })
            .then(res => {
              if (res.data.status == 200) {
                _this.ruleForm.settingsId = res.data.data.settingsId;
                _this.$message({
                  message: "保存成功"
                });
              }
            });
        } else {
          _this.$message({
            message: "无法提交，数据完整性校验失败",
            type: "warning"
          });
          return false;
        }
      });
    }
  }
};
</script>
