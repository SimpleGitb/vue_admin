<template>
    <div class="listcheck">
      <header>
        <el-button type="danger" size="medium" :disabled="deleteDisabled" @click="deleteMethods">批量删除</el-button>
      </header>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'register_time', order: 'descending'}"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="100">
        </el-table-column>
        <el-table-column
          prop="文件名"
          label="文件名"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="文件属性"
          label="文件属性"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="right-start" :disabled="scope.row.文件属性 == ''?true:false">
              <div slot="content" style="width:330px">
                {{scope.row.文件属性}}
              </div>
              <el-button type="text">
                查看
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="标签"
          label="标签"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.标签 == '系统'">{{scope.row.标签}}</el-tag>
            <el-tag type="danger" v-else-if="scope.row.标签 == '黑客工具'">{{scope.row.标签}}</el-tag>
            <el-tag v-else-if="scope.row.标签 == 'web软件'">{{scope.row.标签}}</el-tag>
            <el-tag type="success" v-else-if="scope.row.标签 == '应用程序'">{{scope.row.标签}}</el-tag>
            <el-tag type="warning" v-else-if="scope.row.标签 == '行业软件'">{{scope.row.标签}}</el-tag>
            <el-tag v-else class="tagsixcolor">{{scope.row.标签}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          show-overflow-tooltip
          prop="备注"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.备注" v-text="scope.row.备注"></span>
            <span v-else>空</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="添加人"
          label="提交用户"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="时间"
          label="时间"
          sortable
          show-overflow-tooltip>
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.register_time" v-text="scope.row.register_time"></span>
            <span v-else>空</span>
          </template> -->
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <div class="btn-list">
                    <!-- <i class="iconfont icon-jinyong"></i> -->
                    <el-button class="list-item blue" @click="passCheck($event,scope.row._id.$oid)">通过</el-button>
                    <el-button class="list-item orange" @click="refuseCheck($event,scope.row._id.$oid)">拒绝</el-button>
                </div>
            </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px;text-align:right;">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
      </div>
    </div>
</template>
<script>
export default {
  name: "listcheck",
  data: function() {
    return {
      tableData:[],
      currentPage:1,
      total: 0,
      pageSize:10,
      multipleSelection: [],
      deleteDisabled: true
    };
  },
  methods: {
      //分页
      handleSizeChange(val){
        // console.log(`每页 ${val} 条`);
        // console.log(val);
        this.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val){
        // console.log(val);
        this.currentPage = val;
        this.fetchData();
      },
      fetchData(){
        let config = {
            headers: {
                'token':localStorage.token,
                'username':localStorage.ms_username
            }
        };
        this.$axios.get(process.env.API_HOST+"/api/list_review/index?page="+this.currentPage+"&pageSize="+this.pageSize,config).then((res) => {
          this.total = res.data.total;
          if(res.data.data){
            this.tableData = res.data.data;
          }
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
      },
      passCheck(event,id){
          event.stopPropagation();
          var _self = this;
          this.$axios.post(process.env.API_HOST+"api/list_review/store",{
            id:id,
            is_update:false
          }).then((res) => {
            if(res.data.data){
              _self.$confirm('名单中存在与该标记记录SHA256相等的记录,是否要更新?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                _self.$axios.post(process.env.API_HOST+"api/list_review/store",{
                  id:id,
                  is_update:true
                }).then((res) => {
                  // console.log(res);
                  _self.$message.success(res.data.info);
                  this.fetchData();
                }).catch((error) => {
                  _self.$message.error(error.response.data.message);
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消更新'
                });          
              });
            }else{
              this.fetchData();
              this.$message.success(res.data.info);
            }
          }).catch((error) => {
              this.$message.error(error.response.data.message);
          });
      },
      refuseCheck(event,id){
        event.stopPropagation();
        this.$axios.delete(process.env.API_HOST+"api/list_review/delete",{
            data:{
              id:id,
            }
          }).then((res) => {
            this.$message.success(res.data.info);
            this.fetchData();
          }).catch((error) => {
              this.$message.error(error.response.data.message);
          });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        if(this.multipleSelection){
          this.deleteDisabled = false;
        };
        
      },
      deleteMethods(){
        var ids =[];
        this.multipleSelection.forEach(element => {
            ids.push(element._id.$oid);
        });
        this.$axios.delete(process.env.API_HOST+"api/list_review/batch_delete",{
            data:{
              id_collections:ids,
            }
          }).then((res) => {
            this.$message.success(res.data.info);
            this.fetchData();
          }).catch((error) => {
              this.$message.error(error.response.data.message);
          });
      }
  },
  created() {
    this.fetchData();
  },
}
</script>
<style scoped lang="less">
.listcheck{
  padding: 20px;
  background: #ffffff;
}
header{
  font-size: 14px;
  text-align: right;
  .el-button{
    margin-right: 20px;
  }
}
.el-table{
  margin-top: 20px;
}
.tagsixcolor{
  background: #E5E9F2;
}
</style>
<style>
.listcheck .el-table thead tr{
  background: #EEEEEE !important;
}
.listcheck .el-table td,.el-table th {
  text-align: center !important;
}
.listcheck .list-item{
  padding: 7px ;
  border-radius: 0 !important;
}
.listcheck .el-dialog__body {
    padding: 0px 20px;
}
/* .listcheck .el-button--danger{
    background-color: #f56c6c;
    border-color: #f56c6c;
} */
</style>


