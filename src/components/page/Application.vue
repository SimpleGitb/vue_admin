<template>
    <div class="application">
      <header>
        <label for="">名单来源：</label>
        <el-select v-model="listValue" size="medium" @change="listValueFilter">
          <el-option label="全部" value="all_report"></el-option>
          <el-option label="数据包" value="packet_imported"></el-option>
          <el-option label="报告" value="report_added"></el-option>
        </el-select>
        <div style="display:inline-block;min-width:550px;padding-left:10px">
          <el-input placeholder="请输入关键字搜索" v-model="input5" class="input-with-select" size="medium">
            <el-select v-model="filename" slot="prepend" placeholder="请选择" size="medium">
              <el-option label="MD5" value="MD5"></el-option>
              <el-option label="sha256" value="SHA256"></el-option>
              <el-option label="文件名" value="file_name"></el-option>
              <el-option label="用户名" value="user_name"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" size="medium" @click="keyWordSearch"></el-button>
          </el-input>
        </div>
      </header>
        <!-- <el-tabs v-model="activeName">
          <el-tab-pane label="白名单" name="first"> -->
            <el-table
              :data="tableData"
               @filter-change="filterChange"
              style="width: 100%"
              @cell-click="rowdbClick"
              @row-click="rowClick">
              <el-table-column
                prop="文件名"
                label="文件名"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-text="scope.row.文件名" style="color:#409EFF;cursor: pointer;"></span>
                </template>
              </el-table-column>
              <el-table-column
                label="标签"
                prop="标签"
                column-key="标签"
                :filters="label_list"
                filter-placement="bottom"
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.标签" @click="showInput($event,scope.row._id.$oid)">
                    <span v-bind:class="'btn'+scope.row._id.$oid">
                      <el-tag type="info" v-if="scope.row.标签 == '系统'">{{scope.row.标签}}</el-tag>
                      <el-tag type="danger" v-else-if="scope.row.标签 == '黑客工具'">{{scope.row.标签}}</el-tag>
                      <el-tag v-else-if="scope.row.标签 == 'web软件'">{{scope.row.标签}}</el-tag>
                      <el-tag type="success" v-else-if="scope.row.标签 == '应用程序'">{{scope.row.标签}}</el-tag>
                      <el-tag type="warning" v-else-if="scope.row.标签 == '行业软件'">{{scope.row.标签}}</el-tag>
                      <el-tag v-else class="tagsixcolor">{{scope.row.标签}}</el-tag>
                    </span>
                    <el-select
                     v-model="inputValue" 
                     placeholder="请选择"
                     v-bind:class="'tag'+scope.row._id.$oid"
                     class="tagover"
                      @change="handleInputConfirm(scope.row._id.$oid)">
                      <el-option
                        v-for="item in options"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </span>
                  <span v-else>
                    <el-select
                     v-model="inputValue" 
                     placeholder="请选择"
                     v-bind:class="'tag'+scope.row._id.$oid"
                     class="tagover"
                      @change="handleInputConfirm(scope.row._id.$oid)">
                      <el-option
                        v-for="item in options"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                    <el-button v-if="!inputVisible" class="button-new-tag" v-bind:class="'btn'+scope.row._id.$oid" size="small" @click="showInput(scope.row._id.$oid)">+ 添加标签</el-button>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="文件类型"
                show-overflow-tooltip
                prop="文件类型"
                column-key="文件类型"
                :filters="file_type"
                filter-placement="bottom"
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.文件类型" v-text="scope.row.文件类型"></span>
                  <span v-else>空</span>
                </template>
              </el-table-column>
              <!-- <el-table-column
                label="名单来源"
                show-overflow-tooltip
                prop="名单来源"
                column-key="名单来源"
                :filters="[{ text: '检测报告添加', value: '检测报告添加' },{ text: '干净系统导入', value: '干净系统导入' }]"
                filter-placement="bottom"
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.名单来源" v-text="scope.row.名单来源"></span>
                  <span v-else>空</span>
                </template>
              </el-table-column> -->
              <el-table-column
                label="来源系统"
                show-overflow-tooltip
                prop="来源系统"
                column-key="来源系统"
                :filters="system_source_list"
                filter-placement="bottom"
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.来源系统" v-text="scope.row.来源系统"></span>
                  <span v-else>空</span>
                </template>
              </el-table-column>
              <el-table-column
                label="名单类型"
                show-overflow-tooltip
                prop="名单类型"
                column-key="名单类型"
                :filters="[{ text: '黑名单', value: '黑名单' },{ text: '白名单', value: '白名单' }]"
                filter-placement="bottom"
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.名单类型" v-text="scope.row.名单类型"></span>
                  <span v-else>空</span>
                </template>
              </el-table-column>
               <el-table-column
                label="备注"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.备注">
                    <el-input
                      type="textarea"
                      autosize
                      :value="scope.row.备注"
                      v-bind:class="'tta'+scope.row._id.$oid"
                      class="tta"
                      @focus="textareaFos(scope.row._id.$oid)"
                      @blur="textareaBlur(scope.row._id.$oid)"
                      @change="getTextareaValue($event,scope.row._id.$oid)">
                    </el-input>
                  </span>
                  <span v-else>
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="添加备注"
                      @change="getTextareaValue($event,scope.row._id.$oid)">
                    </el-input>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="添加时间"
                show-overflow-tooltip
                prop="时间"
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.时间" v-text="scope.row.时间"></span>
                  <span v-else>空</span>
                </template>
              </el-table-column>
              <el-table-column
                label="贡献人"
                show-overflow-tooltip
                prop="添加人"
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.添加人" v-text="scope.row.添加人"></span>
                  <span v-else>空</span>
                </template>
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
          <!-- </el-tab-pane>   
        </el-tabs> -->
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
        <!-- 基本信息 -->
        <el-dialog
          title="基本信息"
          :visible.sync="infoVisible"
          width="25%"
          :close-on-click-modal="false"
          :before-close="handleClose">
          <span class="popsinterface">
              <div v-for="(info,key) in infoData" :key="key"><span>{{key}}：</span>{{infoData[key]}}</div>
          </span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="infoVisible = false" type="primary">我知道了</el-button>
          </span>
        </el-dialog>
        <!-- 标签 -->
        <!-- <el-dialog
          title="标签"
          :visible.sync="inputVisible"
          width="25%"
          :close-on-click-modal="false"
          :before-close="handleClose">
          <span>
              <el-select value="" placeholder="请选择" @change="Rgvs">
                <el-option
                  v-for="item in options"
                  :key="item.label_name"
                  :label="item.label_name"
                  :value="item.label_name"
                  >
                </el-option>
              </el-select>
          </span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="inputTag" type="primary">我知道了</el-button>
          </span>
        </el-dialog> -->
    </div>
</template>
<script>
export default {
  name: "application",
  data: function() {
    return {
      activeName: 'first',
      tableData:[],
      infoVisible:false,
      infoData:[],
      editVal:[],
      //标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      tagId: '',
      options: [],
      currentPage:1,
      total: 0,
      pageSize:10,
      clickScope:true,
      listValue:"all_report",
      input5:'',
      filename:"",
      filter1:[],
      filter2:[],
      filter3:[],
      filter4:[],
      filter5:[],
      label_list:[],
      file_type:[],
      system_source_list:[]
    };
  },
  methods: {
    
      showInput(event,id) {
        event.stopPropagation();
        // this.inputVisible = true;
        $('.tag'+id).css("display","block");
        $('.btn'+id).css("display","none");
        // this.$nextTick(_ => {
        //   this.$refs.saveTagInput.$refs.input.focus();
        // });
      },
      handleInputConfirm(id) {
        let inputValue = this.inputValue;
        this.tagId = id;
        this.$axios.put(process.env.API_HOST+"/api/AppInfoList",{
          id:this.tagId,
          update_content:{"标签":this.inputValue}
        }).then((res) => {
          this.fetchData();
          $('.tag'+id).css("display","none");
          $('.btn'+id).css("display","block");
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
        this.inputValue = '';
      },
      //获取备注value
      getTextareaValue(value,tagId){
        this.$axios.put(process.env.API_HOST+"/api/AppInfoList",{
          id:tagId,
          update_content:{"备注":value}
        }).then((res) => {
          this.fetchData();
          this.$message.success("添加备注成功!");
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
      },
      //改变文本框焦点
      textareaFos(id){
        $('.tta'+id+'>textarea').css("color","#5a5e66");
      },
      textareaBlur(id){
        $('.tta'+id+'>textarea').css("color","#B4BCCC");
      },
      //分页
      handleSizeChange(val){
        // console.log(`每页 ${val} 条`);
        // console.log(val);
        this.pageSize = val;
        if(this.filter1.length||this.filter2.length||this.filter3.length||this.filter4.length||this.filter5.length){
          this.filterChange();
          return
        }
        if(this.input5){
          this.keyWordSearch();
          return
        }
        this.fetchData();
      },
      handleCurrentChange(val){
        // console.log(val);
        this.currentPage = val;
        if(this.filter1.length||this.filter2.length||this.filter3.length||this.filter4.length||this.filter5.length){
          this.filterChange();
          return
        }
        if(this.input5){
          this.keyWordSearch();
          return
        }
        this.fetchData();
      },
    edit(event,id){
        event.stopPropagation();
        this.editVal = [];
        this.editVal = id;
      	this.$router.push({
          name:'appedit',
          params:{id:this.editVal}
        })
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
      // console.log(this.newval[0][3]);
      var _self = this;
      this.$axios.get(process.env.API_HOST+"/api/AppInfoList?page="+this.currentPage+"&pageSize="+this.pageSize).then((res) => {
            if(res.data.data.length){
              this.tableData = res.data.data;
              this.options = res.data.label_list;
              //分页
              this.total = res.data.total; 
              this.label_list = res.data.label_list.map(element => {
                return { text: element, value: element }
              });
              this.file_type = res.data.file_type.map(element => {
                return { text: element, value: element }
              });
              this.system_source_list = res.data.system_source_list.map(element =>{
                return { text: element, value: element }
              })
            }else{
              _self.$message.error("列表为空！");
            }
        }).catch((error) => {
            _self.$message.error(error.response.data.message);
        });
    },
    rowdbClick(row, column, cell, event){
      if(column.label=='文件名'){
        this.infoVisible = true;
        this.$axios.get(process.env.API_HOST+"/api/AppInfoList/show?id="+row._id.$oid).then((res) => {
            this.infoData = res.data.data[0];
            delete this.infoData._id;
            delete this.infoData.attr_name_id
            // console.log(res.data.data)
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
      }
    },
    rowClick(row, event, column){
        $('.tag'+row._id.$oid).css("display","none");
        $('.btn'+row._id.$oid).css("display","block");

    },
    handleClose(done) {
        done();
    },
    keyWordSearch(){
      this.$axios.get(process.env.API_HOST+"/api/AppInfoList/search?list_source="+this.listValue+"&condition="+this.filename+"&keyword="+this.input5+"&page="+this.currentPage+"&pageSize="+this.pageSize).then((res) => {
            this.total = 0;
            this.tableData = [];
            if(res.data.data){
              this.tableData=res.data.data;
              this.total = res.data.total
            }
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
    },
    filterChange(filters){
      if(filters){
        if(filters.标签){
          this.filter1 =filters.标签;
        }
        if(filters.文件类型){
          this.filter2 = filters.文件类型;
        }
        if(filters.名单来源){
          this.filter3 = filters.名单来源;
        }
        if(filters.来源系统){
          this.filter4 = filters.来源系统;
        }
        if(filters.名单类型){
          this.filter5 = filters.名单类型;
        }
      }
      if(this.input5){
        this.$axios.get(process.env.API_HOST+"/api/AppInfoList/search?list_source="+this.listValue+"&condition="+this.filename+"&keyword="+this.input5+"&filter_condition[label_name]="+this.filter1+"&filter_condition[file_type]="+this.filter2+"&filter_condition[list_source]="+this.filter3+"&filter_condition[system_source]="+this.filter4+"&filter_condition[list_type]="+this.filter5+"&page="+this.currentPage+"&pageSize="+this.pageSize).then((res) => {
            this.total = 0;
            this.tableData = [];
            if(res.data.data){
              this.tableData=res.data.data;
              this.total = res.data.total
            }
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
      }else{
        this.$axios.get(process.env.API_HOST+"/api/AppInfoList?filter_condition[label_name]="+this.filter1+"&filter_condition[file_type]="+this.filter2+"&filter_condition[list_source]="+this.filter3+"&filter_condition[system_source]="+this.filter4+"&filter_condition[list_type]="+this.filter5+"&page="+this.currentPage+"&pageSize="+this.pageSize).then((res) => {
            this.tableData = res.data.data;
            this.total = res.data.total
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
      }
    },
    listValueFilter(){
      this.$axios.get(process.env.API_HOST+"/api/AppInfoList/search?list_source="+this.listValue+"&page="+this.currentPage+"&pageSize="+this.pageSize).then((res) => {
            this.total = 0;
            this.tableData = [];
            if(res.data.data){
              this.tableData=res.data.data;
              this.total = res.data.total
            }
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {
  }
}
</script>
<style scoped lang="less">
.application{
  padding: 20px;
}

.popsinterface{
    display: inline-block;
    width: 100%;
    overflow: hidden;
    word-break: break-word;
}
.tagover{
  display: none;
  width: 95px;
  margin: auto;
}
header{
  font-size: 14px;
  .el-select{
    width: 120px;
  }
}
.el-table{
  margin-top: 20px;
}
@media screen and (max-width: 1566px) {
.btn-list{
  .orange{
    margin-top: 10px;
    margin-left: 0;
  }
}
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
.tagsixcolor{
  background: #E5E9F2;

}
.tta>textarea{
  color: #B4BCCC;
}
.el-textarea__inner{
  font-family: "微软雅黑";
}
.el-input-group__append, .el-input-group__prepend{
  padding: 0 20px !important;
  background-color: #ffffff;
}
</style>


