<template>
    <div>
        <!--场所选择--> 
 <el-dialog ref="dialog" @close="close" title="场所选择" :visible.sync="show" :close-on-click-modal="false" width="80%">
        <el-form ref="form" :model="form" label-width="80px">
        <el-row>
            <el-col :span="6">
                <el-form-item label="所属辖区">
                    <el-input v-model="form.area" placeholder="请输入姓名"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="所属行业(领域)">
                    <el-input v-model="form.work" placeholder="请输入所属行业(领域)"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="场所名称">
                    <el-input v-model="form.name" placeholder="请输入场所名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="2">
                &nbsp;
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="handleGetTableData('form')">查询</el-button>
            </el-col>
        </el-row>
    </el-form>
        <el-table :data="tableData"  border  style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  type="selection" width="55"> </el-table-column>
             <el-table-column type="index" width="50"  label="序号"/> 
           
            <el-table-column label="所属辖区" prop="locationTitle"></el-table-column>
            <el-table-column label="场所名称" prop="locationName"></el-table-column>
            <el-table-column label="所在地址" prop="addr"></el-table-column>
            <el-table-column label="所属行业(领域)" prop="accountingType"></el-table-column>
            <el-table-column label="负责人" prop="personInCharge"></el-table-column>
            <el-table-column label="负责人联系电话" prop="phone"></el-table-column>
            <el-table-column label="营业执照号码" prop="number"></el-table-column>
        </el-table>
         <div class="block">
         
       <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage" 
                :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
    </el-pagination>
    </div>
         <div slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="checkArea()">确定</el-button>
            <el-button type="primary" @click="show=false" >关闭</el-button>
        </div>
    </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{
                area:"",
                work:"",
                name:"",
            },
              //分页
            page: {
                total: 0, //总数
                currentPage: 1, //当前页
                pageSize: 10, //每页条数
            },
            type:"THREE",
            area:"XI_XIANG",
            tableData:[],
              multipleSelection: []
        }
    },
    props:["show"],
     created:function(){
        this.handleGetTableData();
    },
    methods:{
        //关闭按钮
        close:function(){
           this.$emit("area-close")
        },
         //（分页）改变每页条数事件
        handleSizeChange: function (val) {
            this.page.pageSize = val;
            this.handleGetTableData();
        },
        //(分页)改变页数事件
        handleCurrentChange: function (val) {
            this.page.currentPage = val;
            this.handleGetTableData();
        },
        
        //加载数据
        handleGetTableData() {
            let _this = this;
            _this.$axios({
                method: "post",
                url: "/accounting/list",
                data: {                    
                    "location": this.area,
                    "accountingType":"THREE",
                    "page": {
                    "pageNum": _this.page.currentPage, //页数,
                     "pageSize":_this.page.pageSize, //每页条数
                        }
                }
            }).then((res) => {
                _this.page.total = 0;
                _this.tableData = [];
                if (res.data.status == 200) {
                    _this.page.total = res.data.data.total;
                    _this.tableData = res.data.data.list;
                } else {
                    _this.tableData = [];
                }
            })
        },

         handleSelectionChange(val) {
         this.multipleSelection = val;
      },

       checkArea:function(data){
            this.$emit("view-area",  this.multipleSelection)
            this.$emit("area-close")
        }
    }
}
</script>
