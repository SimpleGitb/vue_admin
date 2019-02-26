<template>
    <div class="usermanagement">
      <header>
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline">添加用户</el-button>
      </header>
      <el-table
        :data="tableData"
        @filter-change="filterChange"
        style="width: 100%"
        @cell-click="userDetail"
        :default-sort = "{prop: 'register_time', order: 'descending'}"
        >
        <el-table-column
          prop="name"
          label="用户名"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="用户组"
          show-overflow-tooltip
          prop="role"
          column-key="用户组"
          :filters="user_group"
          filter-placement="bottom"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.role" v-text="scope.row.role"></span>
            <span v-else>空</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_reports"
          label="报告数"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="total_machines"
          label="检查机器数"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="integral"
          label="积分"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="register_time"
          label="加入时间"
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
                    <el-button icon="el-icon-remove" circle></el-button>
                    <el-button class="list-item blue" @click="deleteList($event,scope.row._id.$oid)">删除</el-button>
                    <el-button class="list-item orange" @click="edit($event,scope.row._id.$oid)">编辑</el-button>
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
      <el-dialog
          title="用户详情"
          :visible.sync="infoVisible"
          width="25%"
          :close-on-click-modal="false"
          :before-close="handleClose">
          <span class="popsinterface">
              <div v-for="(info,key) in infoData" :key="key">
                <div v-if="key == 'total_contributions'" @click="listRouter">
                  <span>{{key}}：</span>{{infoData[key]}}
                </div>
                <div v-else>
                  <span>{{key}}：</span>{{infoData[key]}}
                </div>
              </div>
          </span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="infoVisible = false" type="primary">我知道了</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: "usermanagement",
  data: function() {
    return {
      tableData:[{
        '积分':10
      }],
      currentPage:1,
      total: 0,
      pageSize:10,
      infoVisible:false,
      infoData:[],
      user_group:[],
      filter1:[]
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
    edit(event,id){
        event.stopPropagation();
    },
    deleteList(event,id){
        event.stopPropagation();
        this.$axios.delete(process.env.API_HOST+"/api/AppInfoList",{
          data:{
            id:id
          }
        }).then((res) => {
          // console.log(res)
          this.fetchData();
            this.$message.success("删除成功！");
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
    },
   fetchData(){
      this.$axios.get(process.env.API_HOST+"/api/user/index?page="+this.currentPage+"&pageSize="+this.pageSize+"&sort=desc"+"&filter_condition[user_group]="+this.filter1).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.user_group = res.data.user_group.map(element => {
          return { text: element, value: element }
        });
      }).catch((error) => {
          this.$message.error(error.response.data.message);
      });
    },
    userDetail(row, column, cell, event){
      if(column.label=='手机号'||column.label=='邮箱'){
        this.infoVisible = true;
        this.$axios.get(process.env.API_HOST+"/api/user/show?id="+row._id.$oid).then((res) => {
          this.infoData = res.data.data[0];
          delete this.infoData._id;
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
      }
    },
    handleClose(done) {
        done();
    },
    listRouter(){
      this.$router.push('/application');
    },
    filterChange(filters){
      if(filters){
        if(filters.用户组){
          this.filter1 =filters.用户组;
        }
        // this.fetchData();
      }
      this.fetchData();
    }
    // sortChange({ column, prop, order }){
    //   console.log(order);
    // }
  },
  created() {
    this.fetchData();
  },
}
</script>
<style scoped lang="less">
.usermanagement{
  padding: 20px;
}

.popsinterface{
    display: inline-block;
    width: 100%;
    overflow: hidden;
    word-break: break-word;
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

</style>
<style>
.usermanagement .el-table thead tr{
  background: #EEEEEE !important;
}
.usermanagement .el-table td,
.el-table th {
  text-align: center !important;
}
.usermanagement .el-button--default {
    border-radius: 50% !important;
    padding: 8px;
}
.usermanagement .list-item{
  padding: 7px ;
  border-radius: 0 !important;
}
.usermanagement .el-dialog__body {
    padding: 0px 20px;
}
</style>


