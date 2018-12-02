<template>
  <div>
    <!--辖区选择-->
    <el-dialog
      ref="dialog"
      @close="close"
      title="辖区选择"
      :visible.sync="show"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="21">
            <el-form-item label="所属辖区">
              <el-input v-model="form.region" placeholder="所属辖区"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <el-button type="primary" @click="handleGetTableData('form')">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="regionLvl" border style="width: 100%">
        <el-table-column align="center" label width="55" type="selection">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.itemCode"
              v-model="templateRadio"
              @change.native="getTemplateRow(scope.$index,scope.row)"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" width="55"></el-table-column>
        <el-table-column label="所属辖区" prop="fullTitle"></el-table-column>
      </el-table>
      <div class="block">
        
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkRegion()">确定</el-button>
        <el-button type="primary" @click="show=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      templateRadio: "",
      form: {
        location: "",
        region: "",
        area: ""
      },
      code: "POPEDOM",
      tableData: [],
      //分页
      page: {
        total: 0, //总数
        currentPage: 1, //当前页
        pageSize: 10 //每页条数
      },
      multipleSelection: []
    };
  },
  props: ["show"],
  created: function() {
    this.handleGetTableData();
  },
  computed: {
    regionLvl: function() {
      var sz = [];
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].lvl == 2) {
          sz.push(this.tableData[i]);
        }
      }
      return sz;
    }
  },
  methods: {
    //关闭按钮
    close: function() {
      this.$emit("region-close");
    },
    //（分页）改变每页条数事件
    handleSizeChange: function(val) {
      this.page.pageSize = val;
      this.handleGetTableData();
    },
    //(分页)改变页数事件
    handleCurrentChange: function(val) {
      this.page.currentPage = val;
      this.handleGetTableData();
    },
    //加载数据
    handleGetTableData() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url: "/config/findLocation",
          data: {
            location: _this.form.region,
            moduleCode: ",POPEDOM,", //
            page: {
              pageNum: _this.page.currentPage, //页数,
              pageSize: _this.page.pageSize //每页条数
            }
          }
        })
        .then(res => {
          _this.page.total = 0;
          _this.tableData = [];
          if (res.data.status == 200) {
            _this.page.total = res.data.data.total;
            _this.tableData = res.data.data.list;
          } else {
            _this.tableData = [];
          }
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getTemplateRow(index, row) {
      //获取选中数据
      this.multipleSelection = row;
    },
    checkRegion: function() {
      this.$emit("view-region", this.multipleSelection);
      this.$emit("region-close");
    }
  }
};
</script>
 

