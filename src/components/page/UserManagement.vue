<template>
    <div class="usermanagement">
      <header>
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="addUserVisible = true">添加用户</el-button>
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
          <template slot-scope="scope">
            <span v-text="scope.row.total_reports" class="Total_report"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_machines"
          label="检查机器数"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-text="scope.row.total_machines" class="Total_machines"></span>
          </template>
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
                    <!-- <i class="iconfont icon-jinyong"></i> -->
                    <el-button class="list-item blue" @click="deleteList($event,scope.row._id.$oid)">删除</el-button>
                    <el-button class="list-item orange" @click="edit($event,scope.row)">编辑</el-button>
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
            <table style="border: 1px solid RGB(220,220,220);font-weight: normal;" frame="border" cellpadding="8" cellspacing="5" align="center" rules="all">
					    <template v-for="(info,key) in infoData">
                <tr align="center" :key="key" v-if="key == '贡献名单数'" @click="listRouter(infoData[key])" style="cursor: pointer">
					        <th>{{key}}：</th>
					        <td>{{infoData[key]}}</td>
					      </tr>
                <tr align="center" :key="key" v-else>
					        <th>{{key}}：</th>
					        <td>{{infoData[key]}}</td>
					      </tr>
              </template>
					  </table>
              <!-- <div v-for="(info,key) in infoData" :key="key">
                <div v-if="key == 'total_contributions'" @click="listRouter">
                  <span>{{key}}：</span>{{infoData[key]}}
                </div>
                <div v-else>
                  <span>{{key}}：</span>{{infoData[key]}}
                </div>
              </div> -->
          </span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="infoVisible = false" type="primary">我知道了</el-button>
          </span>
        </el-dialog>
        <!-- 添加用户 -->
        <el-dialog
          title="添加用户"
          :visible.sync="addUserVisible"
          width="25%"
          :close-on-click-modal="false"
          :before-close="handleClose">
          <span class="popsinterface">
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="用户组" prop="users">
                <el-select v-model="ruleForm.users" placeholder="请选择">
                  <el-option label="管理员" value="admin"></el-option>
                  <el-option label="工程师" value="engineer"></el-option>
                  <el-option label="用户" value="user"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" class="elwidth"></el-input>
                <el-button @click="mathProduce">随机生成</el-button>
              </el-form-item>
              <el-form-item label="积分" prop="integral">
                <el-input v-model="ruleForm.integral"></el-input>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="addUserVisible = false">取消</el-button>
              <el-button @click="addUserMethod" type="primary">提交</el-button>
          </span>
        </el-dialog>
        <!-- 编辑用户 -->
        <el-dialog
          title="编辑用户"
          :visible.sync="editUserVisible"
          width="25%"
          :close-on-click-modal="false"
          :before-close="handleClose">
          <span class="popsinterface">
             <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm2.name"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm2.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm2.phone"></el-input>
              </el-form-item>
              <el-form-item label="用户组" prop="users">
                <el-select v-model="ruleForm2.users" placeholder="请选择">
                  <el-option label="管理员" value="admin"></el-option>
                  <el-option label="工程师" value="engineer"></el-option>
                  <el-option label="用户" value="user"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm2.password" class="elwidth"></el-input>
                <el-button @click="mathProduce2">随机生成</el-button>
              </el-form-item>
              <el-form-item label="积分" prop="integral">
                <el-input v-model="ruleForm2.integral"></el-input>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="editUserVisible = false">取消</el-button>
              <el-button @click="editUserMethod" type="primary">提交</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: "usermanagement",
  data: function() {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机'));
      } else {
        let rephone = /^1\d{10}$/;
        if (rephone.test(value)) {
          callback();
        } else {
          callback(new Error('请输入正确的手机号'));
        }
        // callback();
      }
    };
    return {
      tableData:[],
      currentPage:1,
      total: 0,
      pageSize:10,
      infoVisible:false,
      addUserVisible: false,
      editUserVisible:false,
      editId:'',
      infoData:[],
      user_group:[],
      filter1:[],
      ruleForm:{
        name: '',
        email: '',
        phone:'',
        users:'admin',
        password:'',
        integral:10
      },
      ruleForm2:{
        name: '',
        email: '',
        phone:'',
        users:'admin',
        password:'',
        integral:10
      },
      rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'change' },
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'change' },
          ],
          phone: [
            { required: true, validator: validatePhone, trigger: 'change' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' },
          ],
          users: [
            { required: true, message: '请选择用户组', trigger: 'change' }
          ],
          integral: [
            { required: true, message: '请输入积分', trigger: 'change' },
          ],
      },
      config:{}
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
    deleteList(event,id){
        event.stopPropagation();
        this.$axios.delete(process.env.API_HOST+"/api/user/delete",{
          data:{
            id:id
          }
        },this.config).then((res) => {
          // console.log(res)
          this.fetchData();
            this.$message.success("删除成功！");
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
    },
   fetchData(){
     this.config = {
            headers: {
                'token':localStorage.token,
                'userid':localStorage.userid
            }
        };
      this.$axios.get(process.env.API_HOST+"/api/user/index?page="+this.currentPage+"&pageSize="+this.pageSize+"&sort=desc"+"&filter_condition[user_group]="+this.filter1,this.config).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.user_group = res.data.user_group.map(element => {
          var name;
          if(element == 'admin'){
            name = "管理员";
          }
          if(element == 'user'){
            name = "用户";
          }
          if(element == 'engineer'){
            name = "工程师";
          }
          return { text: name, value: element }
        });
      }).catch((error) => {
          this.$message.error(error.response.data.message);
      });
    },
    userDetail(row, column, cell, event){
      if(column.label=='手机号'||column.label=='邮箱'){
        this.infoVisible = true;
        this.$axios.get(process.env.API_HOST+"/api/user/show?id="+row._id.$oid,this.config).then((res) => {
          this.infoData = res.data.data[0];
          delete this.infoData._id;
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
      }
      if(column.label == '报告数'){
        if(row.total_reports != 0){
          this.$router.push({
            path:'/reportquery',
            query:{user_name:row.name}
          })
        }
      }
      if(column.label == '检查机器数'){
        if(row.total_machines != 0){
          this.$router.push({
            path:'/reportquery',
            query:{machines_name:row.name}
          })
        }
      }
    },
    handleClose(done) {
        done();
    },
    listRouter(val){
      if(val != 0){
        this.$router.push('/application');
      }
    },
    filterChange(filters){
      if(filters){
        if(filters.用户组){
          this.filter1 =filters.用户组;
        }
        // this.fetchData();
      }
      this.fetchData();
    },
    addUserMethod(){
      if(!this.ruleForm.name){
        this.$message.error("请填写用户名");
        return
      }
      if(!this.ruleForm.password){
        this.$message.error("请填写密码");
        return
      }
      if(!this.ruleForm.phone){
        this.$message.error("请填写手机号");
        return
      }
      if(!this.ruleForm.email || !this.ruleForm.integral){
        this.$message.error("请填写邮箱");
        return
      }
      if(!this.ruleForm.integral){
        this.$message.error("请填写积分");
        return
      }
      this.$axios.post(process.env.API_HOST+"/api/user/create",{
        name:this.ruleForm.name,
        role:this.ruleForm.users,
        password:this.ruleForm.password,
        phone:this.ruleForm.phone,
        email:this.ruleForm.email,
        integral:this.ruleForm.integral,
      },this.config).then((res) => {
          this.$message.success("创建用户成功");
          this.addUserVisible = false;
          this.fetchData();
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
    },
    edit(event,id){
        event.stopPropagation();
        this.editUserVisible = true;
        this.editId = id;
        // if(this.editid.role == "用户"){
        //   this.ruleForm2.users = 'user'
        // }else{
        //   this.ruleForm2.users = 'admin'
        // }
        this.ruleForm2.name = this.editId.name;
        this.ruleForm2.email = this.editId.email;
        this.ruleForm2.phone = this.editId.phone;
        this.ruleForm2.integral = this.editId.integral;
        this.ruleForm2.password = '';
        if(this.editId.role == '管理员'){
          this.ruleForm2.users = 'admin';
        }else if(this.editId.role == '用户'){
          this.ruleForm2.users = 'user';
        }else if(this.editId.role == '工程师'){
          this.ruleForm2.users = 'engineer';
        }
        // this.ruleForm2.users = this.editid.role;
        // if(this.ruleForm2.users === '用户'){
        //   this.ruleForm2.users = 'user'
        // }else{
        //   this.ruleForm2.users = 'admin'
        // }
    },
    editUserMethod(){
      // if(!this.ruleForm2.name || !this.ruleForm2.users || !this.ruleForm2.phone || !this.ruleForm2.email || !this.ruleForm2.integral){
      //   this.$message.error("请填写完整的表单再进行提交");
      //   return
      // }
      if(!this.ruleForm2.name){
        this.$message.error("请填写用户名");
        return
      }
      if(!this.ruleForm2.phone){
        this.$message.error("请填写手机号");
        return
      }
      if(!this.ruleForm2.email){
        this.$message.error("请填写邮箱");
        return
      }
      if(!this.ruleForm2.integral){
        this.$message.error("请填写积分");
        return
      }
      this.$axios.put(process.env.API_HOST+"/api/user/edit",{
        id:this.editId._id.$oid,
        update_content:{
          name:this.ruleForm2.name,
          role:this.ruleForm2.users,
          password:this.ruleForm2.password,
          phone:this.ruleForm2.phone,
          email:this.ruleForm2.email,
          integral:this.ruleForm2.integral,
        }
      },this.config).then((res) => {
          this.$message.success("编辑用户成功");
          this.editUserVisible = false;
          // this.fetchData();
          // setTimeout(function(){
          //   window.location.href='/login';
          //   localStorage.clear();
          // },500);
          if(this.ruleForm2.name == localStorage.ms_username){
            setTimeout(function(){
              window.location.href='/login';
              localStorage.clear();
            },500);
          }
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
    },
    mathProduce(){
      this.ruleForm.password = this.randomPassword(8);
    },
    mathProduce2(){
      this.ruleForm2.password = this.randomPassword(8);
    },
    randomPassword(size)
    {
      var seed = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z',
      'a','b','c','d','e','f','g','h','i','j','k','m','n','p','Q','r','s','t','u','v','w','x','y','z',
      '2','3','4','5','6','7','8','9'
      );//数组
      var seedlength = seed.length;//数组长度
      var createPassword = '';
      for (var i=0;i<size;i++) {
        var j = Math.floor(Math.random()*seedlength);
        createPassword += seed[j];
      }
      return createPassword;
    }
    
  },
  created() {
    this.fetchData();
  },
}
</script>
<style scoped lang="less">
.usermanagement{
  padding: 20px;
  background: #ffffff;
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
.el-form{
  padding-top: 20px;
  margin-left: -30px;
}
.elwidth{
  width: 76%;
}
@media screen and (max-width: 1566px) {
.elwidth{
  width: 63%;
}
.btn-list{
  .orange{
    margin-top: 10px;
    margin-left: 0;
  }
}
}
@media screen and (max-width: 1327px) {
.elwidth{
  width: 61%;
}
}
.Total_report{
  width:41px;height:25px;background:#CFEFDF;display: inline-block;border-radius: 4px;color:#63B588;cursor: pointer;
}
.Total_machines{
  width:41px;height:25px;background:#DDEEFF;display: inline-block;border-radius: 4px;color:#409EFF;cursor: pointer;
}
table{
  margin-top: 20px;
  width: 100%;
}
table th {
	background: #F7F9FA;
	width: 35%;
	font-weight: normal;
  border: 1px solid RGB(220, 220, 220);
  padding: 5px 10px ;
}

table td {
	border: 1px solid RGB(220, 220, 220);
	font-size: 14px;
	text-align: left;
	padding: 0 20px;
	color: #797979;
}
</style>
<style>
.usermanagement .el-table thead tr{
  background: #EEEEEE !important;
}
.usermanagement .el-table td,.el-table th {
  text-align: center !important;
}
.usermanagement .list-item{
  padding: 7px ;
  /* border-radius: 0 !important; */
}
.usermanagement .el-dialog__body {
    padding: 0px 20px;
}
.el-dialog__header {
    background: #f8f8f8;
    border-bottom: 1px solid #e2e2e2;
    padding: 10px 15px;
}
.el-dialog__title {
    font-size: 16px;
}
.usermanagement .el-form-item__label {
    text-align: right !important;
}
.usermanagement .popsinterface .el-button--small{
  vertical-align: bottom;
}
</style>


