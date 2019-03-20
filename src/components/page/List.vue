<template>
    <div class="list">
        <el-tabs v-model="activeName">
          <el-tab-pane label="白名单" name="first">
            <el-table
              :data="tableData"
              style="width: 100%"
              @row-click="rowClick">
              <el-table-column
                prop="Name"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                label="文件名">
                <template slot-scope="scope">
                  <span v-if="scope.row.ExecutablePath">{{scope.row.ExecutablePath}}</span>
                  <span v-else>空</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="Description"
                label="说明">
              </el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                      <div class="btn-list">
                          <el-button size="mini" class="list-item blue" @click="deleteList($event,scope.row._id.$oid)">删除</el-button>
                          <el-button size="mini" class="list-item orange" @click="edit($event,scope.row._id.$oid)">编辑</el-button>
                      </div>
                  </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>   
        </el-tabs>
        <!-- 导入按钮 -->
        <!-- <span class="jsonImport">
          <i class="iconfont icon-daoru" @click="importInfo"></i>
        </span> -->
        <!-- 基本信息 -->
        <el-dialog
          title="基本信息"
          :visible.sync="infoVisible"
          width="25%"
          :close-on-click-modal="false"
          :before-close="handleClose">
          <span class="popsinterface">
              <div v-for="(info,key) in infoData" :key="info.index"><span>{{key}}：</span>{{infoData[key]}}</div>
          </span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="infoVisible = false" type="primary">我知道了</el-button>
          </span>
        </el-dialog>
        <!-- 导入信息 -->
        <el-dialog
          title="导入信息"
          :visible.sync="importVisible"
          width="25%"
          :close-on-click-modal="false"
          :before-close="handleClose">
          <span>
              <el-form >
                <el-form-item label="系统选择">
                  <el-cascader
                    expand-trigger="hover"
                    :options="form"
                    v-model="selectedOptions"
                    @change="handleChange"
                    :show-all-levels="false">
                  </el-cascader>
                </el-form-item>
              </el-form>
              <div style="margin-bottom: 10px;margin-left: 20px;">
                  <el-checkbox v-model="checked">添加应用程序名单</el-checkbox>
                </div>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="customize"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :auto-upload="false"
                :before-upload="beforeUpload"
                :http-request="requsetHttp"
                :on-success="onSuccess">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传json文件，且不超过500kb</div>
                
              </el-upload>
          </span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="importVisible = false" type="info">关闭</el-button>
              <!-- <el-button @click="importVisible = false" type="primary">确定</el-button> -->
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: "list",
  props: ['message'],
  data: function() {
    return {
      activeName: 'first',
      tableData:[],
      newval:[],
      editVal:[],
      infoVisible: false,
      importVisible: false,
      checked: true,
      infoData:[],
      form:[],
      selectedOptions:[],
      config:{}
    };
  },
  methods: {
    handleChange(value) {
        console.log(value);
      },
    edit(event,id){
        event.stopPropagation();
        this.editVal = this.newval;
        this.editVal.push(id);
      	this.$router.push({
          name:'edit',
          params:{id:this.editVal}
        })
    },
    deleteList(event,id){
      event.stopPropagation();
      this.$axios.delete(process.env.API_HOST+"/api/base_whitelist",{
        data:{
          os_type:this.newval[0],
          os_name:this.newval[1],
          attr_name:this.newval[2],
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
      var _self = this;
      this.config = {
          headers: {
              'Content-Type': 'multipart/form-data',
              'token':localStorage.token,
              'userid':localStorage.userid
          }
      };
      this.$axios.get(process.env.API_HOST+"/api/base_whitelist?os_type="+this.newval[0]+"&os_name="+this.newval[1]+"&attr_name="+this.newval[2],this.config).then((res) => {
            // console.log(res.data.data);
            this.tableData = res.data.data;
        }).catch((error) => {
            // _self.$message.error(error.response.data.message);
        });
    },
    rowClick(row, event, column){
      this.infoVisible = true;
      this.$axios.get(process.env.API_HOST+"/api/base_whitelist/show?os_type="+this.newval[0]+"&os_name="+this.newval[1]+"&attr_name="+this.newval[2]+"&id="+row._id.$oid,this.config).then((res) => {
          this.infoData = res.data.data[0];
          delete this.infoData._id;
          delete this.infoData.attr_name_id
      }).catch((error) => {
          this.$message.error(error.response.data.message);
      });
    },
    importInfo(){
      this.importVisible = true;
    },
    handleClose(done) {
    // this.$confirm('确认关闭？')
    //     .then(_ => {
    //     done();
    //     })
    //     .catch(_ => {});
        done();
    },

    beforeUpload(file){
      // console.log(file);
      // return false;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    requsetHttp(params){
      var fileObj = params.file;
      var form = new FormData();
      // 文件对象
      form.append("file_name", fileObj);
      form.append("os_type", this.selectedOptions[0]);
      form.append("os_name", this.selectedOptions[1]);
      form.append("only_appInfo", this.checked);
      // console.log(form.get("file_name"));
      // console.log(form.get('os_type'))
      // console.log(form);
      var _self = this;
      
      this.$axios.post(process.env.API_HOST+"/api/import_checkdata",form,config).then((res) => {
        _self.$message.success(res.data.status)
      }).catch(error => {
          _self.$message.error(error.response.data.message);
      });
    },
    onSuccess(response, file, fileList){
      // console.log(response);
      // console.log(file);
      // console.log(fileList)
    }, 
    diaSelectData(){
      var _self = this;
      this.$axios.get(process.env.API_HOST+"/api/navigation_list/base/index",this.config).then((res) => {
          const Data = res.data.data;
          Data.forEach((element,index) => {
            _self.form.push({
              value: element.value,
              label: element.value
            });
            element.child.forEach(function(childen,num){
                if(num == 0){
                  _self.form[index].children = [];
                }
                _self.form[index].children.push({
                  value: childen.value,
                  label: childen.value
                })
            });
          // console.log(_self.form);
          });
      }).catch(error => {
              _self.$message.error(error.response.data.message);
      });
    }

  },
  created() {
    // this.id_path = this.$route.params.id_path;
    // console.log(this.message);
    this.newval = this.$route.query.id_path;
    // console.log(this.newval[0]);
    // this.fetchData();
    this.diaSelectData();
  },
  watch:{
    // $route(){
    //   this.fetchData()
    // }
    $route(){
         this.newval = this.$route.query.id_path;
    },
    // newval(){
    //   this.fetchData();
    // }
    newval:{
        handler:function(oldValue,newValue){
          if(this.$route.query.id_path){
            this.fetchData();
          }
        },
        deep:true
    }
  }
}
</script>
<style scoped lang="less">
.list{
  padding: 40px 20px;
}
.jsonImport{
  position: absolute;
  top: 50px;
  right: 25px;
}
.jsonImport .iconfont{
  color: #409EFF;
  font-size: 20px;
  cursor: pointer;
}
.popsinterface{
    display: inline-block;
    width: 100%;
    overflow: hidden;
    word-break: break-word;
}
</style>
<style>
.el-table thead tr{
  background: #EEEEEE !important;
}
.el-table td,
.el-table th {
  text-align: center !important;
}
.list .el-upload--text{
  width: auto;
  height: auto;
  border-radius: 0;
  border: 0;
  overflow: inherit;
}
.list .upload-demo{
  /* width: 90%;
  margin: auto; */
  border: 1px dashed #d9d9d9;
  padding: 10px 20px;
}
</style>
