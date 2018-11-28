<template>
  <div class="">

    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect">
      <el-menu-item index="0">危废</el-menu-item>
      <el-menu-item index="1"> 可回收</el-menu-item>
    </el-menu>

    <!-- 表数据 -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="enterpriseName"
        label="企业名称"
        width="280">
      </el-table-column>
      <el-table-column
        prop="registrationCapital"
        label="注册资本">
      </el-table-column>
      <el-table-column
        label="邮箱"
        prop="email">
      </el-table-column>
      <el-table-column
        label="电话"
        prop="phone">
      </el-table-column>
      <el-table-column
        label="所属行业">
        <template slot-scope="scope">
          <span v-if="scope.row.title">{{scope.row.title}}</span>
          <span v-else>{{findConfigItem(scope.row.industry,$store.state.dictionary.sshy).title}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name: 'partner',//合作伙伴
    data() {
      return {
        activeIndex: "0",
        tableData: [],
        page: {//分页
          total: 0,//总数
          pageNum: 1,//当前页
          pageSize: 10,//每页条数
        },//分页
      };
    },
    created() {
      let _this = this;
      _this.handleGetTableData();  //获取危废合作伙伴数据
    },
    methods: {

      handleSelect(val) {
        let _this = this;
        if (val == 0) _this.handleGetTableData();  //获取危废合作伙伴数据
        else if (val == 1) _this.handleGetRecTableData(); //获取合作伙伴数据
      },

      //获取危废合作伙伴数据
      handleGetTableData() {
        let _this = this;
        _this.$axios({
          method: "post",
          url: "/order/myPartner",
          data: {
            pageNum: _this.page.pageNum, //页数
            pageSize: _this.page.pageSize,//条数
          }
        }).then((res) => {
          switch (res.data.status) {
            case 200:
              _this.page.total = res.data.data.total;
              _this.tableData = res.data.data.list;
              break;
            case 300:
              _this.tableData = [];
              break;
            case -500:
              _this.tableData = [];
              break;
          }
        })
      },

      //获取可回收合作伙伴数据
      handleGetRecTableData() {
        let _this = this;
        _this.$axios({
          method: "post",
          url: "/order/recMyPartner",
          data: {
            pageNum: _this.page.pageNum, //页数
            pageSize: _this.page.pageSize,//条数
          }
        }).then((res) => {
          switch (res.data.status) {
            case 200:
              _this.page.total = res.data.data.total;
              _this.tableData = res.data.data.list;
              break;
            case 300:
              _this.tableData = [];
              break;
            case -500:
              _this.tableData = [];
              break;
          }
        })
      },

      //分页事件
      handleSizeChange(val) {
        let _this = this;
        _this.page.pageSize = val;
        _this.handleGetTableData();//获取表数据
      },

      handleCurrentChange(val) {
        let _this = this;
        _this.page.currentPage = val;
        _this.handleGetTableData();//获取表数据
      },
    }
  };
</script>
<style lang="less" scoped>

  .pagination {
    padding-top: 11px;
    height: 50px;
    line-height: 50px;
    padding-left: 40%;
  }

</style>
