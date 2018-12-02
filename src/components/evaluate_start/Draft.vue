<template>
<div>
    <el-card class="box-card">
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="flowName" label="流程类型"></el-table-column>
             <el-table-column prop="locationName" label="所属辖区"></el-table-column>
             <el-table-column prop="" label="评估人员"></el-table-column>
              <el-table-column prop="" label="评估场所"></el-table-column>
               <el-table-column prop="" label="评估标题"></el-table-column>
            <el-table-column prop="applyDate" label="申请日期"></el-table-column>
            <el-table-column prop="" label="备注"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="handleRemove(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
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

    </el-card>
</div>
</template>

<script>
export default {
    data() {
        return {
             //分页
      page: {
        total: 0, //总数
        currentPage: 1, //当前页
        pageSize: 10 //每页条数
      },
    

        }
    },
    created:function(){
        this.handleGetDraftTableData();
    },
    methods:{
    //加载草稿数据
    handleGetDraftTableData() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url: "/flow/findDraft",
          data: {
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
    //修改按钮
    handleEdit:function(){

    },
    //删除按钮
    handleRemove:function(){
        
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


    }
}
</script>
