<template>
  <div>
    <!--人员选择-->
    <el-dialog
      ref="dialog"
      @close="close"
      title="人员选择"
      :visible.sync="show"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="21">
            <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="3">
            <el-button type="primary" @click="handleGetTableData('form')">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="手机" prop="phone"></el-table-column>
        <el-table-column label="座机号" prop="telephone"></el-table-column>
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
        <el-button type="primary" @click="checkPeople()">确定</el-button>
        <el-button type="primary" @click="show=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        area: "",
        work: "",
        name: ""
      },
      //分页
      page: {
        total: 0, //总数
        currentPage: 1, //当前页
        pageSize: 10 //每页条数
      },
      tableData: [],
      multipleSelection: []
      // multipleSelection:[
      //    {
      //        name:"",
      //    }
      //  ],
    };
  },
  props: ["show"],
  created: function() {
    this.handleGetTableData();
  },
  mounted:function(){
  },
  methods: {
    //changeFun (val) {
    // this.multipleSelection = val // 返回的是选中的列的数组集合
    // this.$store.state.name=this.multipleSelection
    // },
    //关闭按钮
    close: function() {
      this.$emit("people-close");
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
          url: "/person/list",
          data: {
            name: _this.form.name, //
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
    checkPeople: function(data) {
      this.$emit("view-People", this.multipleSelection);
      this.$emit("people-close");
    }
  }
};
</script>
