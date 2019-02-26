<template>
    <div class="attrlist">
        <el-tabs v-model="activeName">
          <el-tab-pane label="白名单" name="first">
            <el-table
              :data="tableData"
              style="width: 100%"
              @row-click="rowClick">
              <el-table-column
                prop="name"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                label="文件名">
                <template slot-scope="scope">
                  <span v-if="scope.row.file_name">{{scope.row.file_name}}</span>
                  <span v-else>空</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="description"
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
          <el-tab-pane label="黑名单" name="second">
            <el-table
              :data="tableData"
              style="width: 100%"
              @row-click="rowClick">
              <el-table-column
                prop="name"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                label="文件名">
                <template slot-scope="scope">
                  <span v-if="scope.row.file_name">{{scope.row.file_name}}</span>
                  <span v-else>空</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="description"
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
        <span class="jsonImport">
          <i class="iconfont icon-daoru" @click="importInfo"></i>
        </span>
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
              <el-form :model="form">
                <el-form-item label="系统选择">
                  <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="windows" value="windows"></el-option>
                    <el-option label="linux" value="linux"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
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
  name: "attrlist",
  data: function() {
    return {
      activeName: 'first',
      tableData:[],
      newvalAttr:[],
      editVal:[],
      infoVisible: false,
      importVisible: false,
      infoData:[],
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      form:{
        region:'windows'
      }
    };
  },
  methods: {
    edit(event,id){
        event.stopPropagation();
        // this.editVal = this.newval;
        this.editVal = [];
        this.editVal.push(id);
      	this.$router.push({
          name:'edit',
          params:{id:this.editVal}
        })
    },
    deleteList(event,id){
      event.stopPropagation();
      this.$axios.delete(process.env.API_HOST+"/api/manual_whitelist",{
        data:{
          id:id
        }
      }).then((res) => {
        // console.log(res)
        this.fetchDataAttr();
          this.$message.success("删除成功！");
      }).catch((error) => {
          this.$message.error(error.response.data.message);
      });
    },
    fetchDataAttr(){
        var _self = this;
        this.$axios.get(process.env.API_HOST+"/api/manual_whitelist?attr_name="+this.newvalAttr[0]+"&os_type="+this.newvalAttr[1]+"&os_name="+this.newvalAttr[2]).then((res) => {
              // console.log(res.data.data);
              this.tableData = res.data.data;
          }).catch((error) => {
              // _self.$message.error(error.response.data.message);
          });
    },
    rowClick(row, event, column){
      this.infoVisible = true;
      this.$axios.get(process.env.API_HOST+"/api/manual_whitelist/show?id="+row._id.$oid).then((res) => {
          this.infoData = res.data.data[0];
          delete this.infoData._id;
          delete this.infoData.attr_id
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
      form.append("file",fileObj);
      console.log(fileObj);
    },
    onSuccess(response, file, fileList){
      // console.log(response);
      // console.log(file);
      // console.log(fileList)
    }

  },
  created() {
      this.newvalAttr = this.$route.query.id_path;
  },
  mounted() {
  },
  watch:{
    $route(){
      this.newvalAttr = this.$route.query.id_path;
    },
    newvalAttr:{
      handler:function(oldValue,newValue){
          if(this.$route.query.id_path){
            this.fetchDataAttr();
          }
        },
        deep:true
    }
    
  }
}
</script>
<style scoped lang="less">
.attrlist{
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
</style>
<style>
.el-table thead tr{
  background: #EEEEEE !important;
}
.el-table td,
.el-table th {
  text-align: center !important;
}
.attrlist .el-upload--text{
  width: auto;
  height: auto;
  border-radius: 0;
  border: 0;
  overflow: inherit;
}
.attrlist .upload-demo{
  /* width: 90%;
  margin: auto; */
  border: 1px dashed #d9d9d9;
  padding: 10px 20px;
}
</style>


