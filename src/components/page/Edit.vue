<template>
    <div class="edit">
        <div>
          <i class="iconfont icon-bianji"></i>
          <span style="vertical-align: super;">编辑</span>
        </div>

        <div class="el-tree el-tree-node1">
					<span style="vertical-align: middle;" @click="openclose1($event)"><img src="/static/img/tree.png"/></span>	
					<el-input value="root" placeholder="请输入内容" :disabled="true"></el-input>
          <el-checkbox v-model="checked"></el-checkbox>
          <div class="mock">
            <el-input placeholder="mock" >
              <template slot="append"><i class="iconfont icon-bi"></i></template>
            </el-input>
          </div>
          <el-select v-model="check1" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="description">
            <el-input placeholder="description" >
              <template slot="append"><i class="iconfont icon-bi"></i></template>
            </el-input>
          </div>
          <!-- <i class="iconfont icon-cuo"></i>
          <i class="iconfont icon-jia"></i> -->
				</div>
        <div class="node1">
          <div style="margin-left:20px" class="tree1" v-for="(item,indexkey) in items" v-if="Object.prototype.toString.call(items[indexkey])!='[object Object]'">
            <el-input placeholder="请输入内容" :value="indexkey" :disabled="true"></el-input>
            <el-checkbox v-model="checked"></el-checkbox>
            <div class="mock">
              <el-input placeholder="mock" v-model="items[indexkey]">
                <template slot="append"><i class="iconfont icon-bi"></i></template>
              </el-input>
            </div>
            <el-select v-model="check1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div class="description">
              <el-input placeholder="description" >
                <template slot="append"><i class="iconfont icon-bi"></i></template>
              </el-input>
            </div>
            <span class="title_mouse">
                <el-tooltip effect="dark" content="删除" placement="top">
                    <el-button ><i class="iconfont icon-cuo" @click="removeSibling(indexkey)"></i></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="添加" placement="top">
                    <el-button ><i class="iconfont icon-jia" @click="addSibling"></i></el-button>
                </el-tooltip>
            </span>
          </div>
          <!-- 第二级目录 -->
          <div class="el-tree el-tree-node2 tree2" v-for="(item,indexkey) in items" v-if="Object.prototype.toString.call(items[indexkey])==='[object Object]'">
            <span style="vertical-align: middle;" @click="openclose1($event)"><img src="/static/img/tree.png"/></span>	
						<el-input :value="indexkey" placeholder="请输入内容" :disabled="true"></el-input>
            <el-checkbox v-model="checked"></el-checkbox>
            <div class="mock">
              <el-input placeholder="mock">
                <template slot="append"><i class="iconfont icon-bi"></i></template>
              </el-input>
            </div>
            <el-select v-model="check1" placeholder="请选择">
              <el-option
                v-for="option in options"
                :key="option.value"
                :label="option.label"
                :value="option.value">
              </el-option>
            </el-select>
            <div class="description">
              <el-input placeholder="description" >
                <template slot="append"><i class="iconfont icon-bi"></i></template>
              </el-input>
            </div>
            <span class="title_mouse">
                <el-tooltip effect="dark" content="删除" placement="top">
                    <el-button ><i class="iconfont icon-cuo" @click="removeSibling(indexkey)"></i></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="添加" placement="top">
                    <el-button ><i class="iconfont icon-jia" @click="addSibling"></i></el-button>
                </el-tooltip>
              </span>
          </div>
          <div class="node1" v-for="(item,indexkey) in items" v-if="Object.prototype.toString.call(items[indexkey])==='[object Object]'">
            <div  class="tree1" v-for="(seconditem,secondkey) in item" :key="secondkey" v-if="Object.prototype.toString.call(item[secondkey])!='[object Object]'">
              <el-input :value="secondkey" placeholder="请输入内容" :disabled="true"></el-input>
              <el-checkbox v-model="checked"></el-checkbox>
              <div class="mock">
                <el-input placeholder="mock" v-model="item[secondkey]">
                  <template slot="append"><i class="iconfont icon-bi"></i></template>
                </el-input>
              </div>
              <el-select v-model="check1" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="description">
                <el-input placeholder="description" >
                  <template slot="append"><i class="iconfont icon-bi"></i></template>
                </el-input>
              </div>
              <span class="title_mouse">
                <el-tooltip effect="dark" content="删除" placement="top">
                    <el-button ><i class="iconfont icon-cuo" @click="removeSiblingSec(indexkey,secondkey)"></i></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="添加" placement="top">
                    <el-button ><i class="iconfont icon-jia" @click="addSiblingSec(indexkey)"></i></el-button>
                </el-tooltip>
              </span>
            </div>
            <!-- 第三级 -->
            <template v-for="(seconditem,secondkey) in item"  v-if="Object.prototype.toString.call(item[secondkey])==='[object Object]'">
              <div class="el-tree el-tree-node2 tree2" :key="secondkey" style="margin-left:-20px">
                <span style="vertical-align: middle;" @click="openclose1($event)"><img src="/static/img/tree.png"/></span>	
                <el-input :value="secondkey" placeholder="请输入内容" :disabled="true"></el-input>
                <el-checkbox v-model="checked"></el-checkbox>
                <div class="mock">
                  <el-input placeholder="mock">
                    <template slot="append"><i class="iconfont icon-bi"></i></template>
                  </el-input>
                </div>
                <el-select v-model="check1" placeholder="请选择">
                  <el-option
                    v-for="option in options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value">
                  </el-option>
                </el-select>
                <div class="description">
                  <el-input placeholder="description" >
                    <template slot="append"><i class="iconfont icon-bi"></i></template>
                  </el-input>
                </div>
                <span class="title_mouse">
                    <el-tooltip effect="dark" content="删除" placement="top">
                        <el-button ><i class="iconfont icon-cuo"></i></el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="添加" placement="top">
                        <el-button ><i class="iconfont icon-jia" @click="addSibling"></i></el-button>
                    </el-tooltip>
                  </span>
              </div>
              <div class="tree1" style="margin-left:20px;">
                <div v-for="(third,thirdkey) in seconditem" v-if="Object.prototype.toString.call(seconditem[thirdkey])!='[object Object]'" style="margin-bottom:10px;">
                  <el-input :value="thirdkey" placeholder="请输入内容" :disabled="true"></el-input>
                  <el-checkbox v-model="checked"></el-checkbox>
                  <div class="mock">
                    <el-input placeholder="mock" v-model="seconditem[thirdkey]">
                      <template slot="append"><i class="iconfont icon-bi"></i></template>
                    </el-input>
                  </div>
                  <el-select v-model="check1" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="description">
                    <el-input placeholder="description" >
                      <template slot="append"><i class="iconfont icon-bi"></i></template>
                    </el-input>
                  </div>
                  <span class="title_mouse">
                    <el-tooltip effect="dark" content="删除" placement="top">
                        <el-button ><i class="iconfont icon-cuo" @click="removeSiblingThird(indexkey,secondkey,thirdkey)"></i></el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="添加" placement="top">
                        <el-button ><i class="iconfont icon-jia" @click="addSiblingThird(indexkey,secondkey)"></i></el-button>
                    </el-tooltip>
                  </span>
                </div>
              </div>
              <!-- 第三级结尾标签 -->
            </template>
          </div> 

        </div>
        <div style="width:100%;text-align:center">
          <el-button @click="backList">取消</el-button>
          <el-button @click="saveForm" type="primary">保存</el-button>
        </div>
    </div>
</template>
<script>

export default {
  name: "edit",
  data: function() {
    return {
      input1:"",
      options: [{
          value: '1',
          label: 'string'
        }, {
          value: '2',
          label: 'number'
        }, {
          value: '3',
          label: 'array'
        }, {
          value: '4',
          label: 'object'
        }, {
          value: '5',
          label: 'boolean'
        }, {
          value: '6',
          label: 'integer'
        }],
        check1: '4',
        checked:false,
        items:[],
        detailData:[],
        addNum:0,
        addNumSec:0,
        addNumThird:0
    };
  },
  // beforeRouteEnter: (to, from, next) => {
  //   this.detailData = this.$route.params.id;
  //   if(this.detailData != undefined){
  //     this.fetchEditData();
  //   }
  //   next();
  // },
  methods: {
   backList(){
    //  this.$router.push('/list');
     this.$router.back(-1)
   },
    openclose1(event){
      $(event.currentTarget).parent().next().slideToggle("fast");
      
      var nowDeg = $(event.currentTarget).find("img").css("transform");
      function getmatrix(a,b,c,d){
          var aa=Math.round(180*Math.asin(a)/ Math.PI);
          var bb=Math.round(180*Math.acos(b)/ Math.PI);
          var cc=Math.round(180*Math.asin(c)/ Math.PI);
          var dd=Math.round(180*Math.acos(d)/ Math.PI);
          var deg=0;
          if(aa==bb||-aa==bb){
              deg=dd;
          }else if(-aa+bb==180){
              deg=180+cc;
          }else if(aa+bb==180){
              deg=360-cc||360-dd;
          }
          return deg>=360?0:deg;
          // return (aa+','+bb+','+cc+','+dd);
      }
      var values = nowDeg.split('(')[1].split(')')[0].split(',');
      var a = values[0];
      var b = values[1];
      var c = values[2];
      var d = values[3];
      nowDeg = getmatrix(a,b,c,d);
    
      if(nowDeg == 90){
        $(event.currentTarget).find("img").css("transform","rotate(0deg)");
      }else{
        $(event.currentTarget).find("img").css("transform","rotate(90deg)");
      }
    },
    addSibling(){
      this.addNum ++;
      this.$set(this.$data.items, "add"+this.addNum, 'yy');
      // this.items["add"+this.addNum] = 'yy';
    },
    removeSibling(key){
      this.$delete(this.items,key);
      // this.items.splice(this.items.length-1,1);
    },
    addSiblingSec(sec){
      this.addNumSec ++;
      this.$set(this.$data.items[sec], "sec"+this.addNumSec, 'yy');
    },
    removeSiblingSec(sec,third){
      this.$delete(this.items[sec],third);
    },
    addSiblingThird(sec,third){
      this.addNumThird ++;
      this.$set(this.$data.items[sec][third],"thd"+this.addNumThird,'yy');
      console.log(this.items);
    },
    removeSiblingThird(key,sec,third){
      this.$delete(this.items[key][sec],third);
    },
    saveForm(){
      let _self = this;
      if( this.detailData.length ==1 ){
        this.$axios.put(process.env.API_HOST+"/api/manual_whitelist",{
          id:this.detailData[0],
          update_content:this.items
        }).then((res) => {
            _self.$message.success("保存成功");
            setTimeout(function(){_self.$router.back(-1)},1000)
        }).catch((error) => {
            _self.$message.error(error.response.data.message);
        });
      }else{
        this.$axios.put(process.env.API_HOST+"/api/base_whitelist",{
          os_type:this.detailData[0],
          os_name:this.detailData[1],
          attr_name:this.detailData[2],
          id:this.detailData[3],
          list_attr:this.items
        }).then((res) => {
            _self.$message.success("保存成功");
            setTimeout(function(){_self.$router.back(-1)},1000)
        }).catch((error) => {
            _self.$message.error(error.response.data.message);
        });
      }
    },
    //系统类型获取白名单全部信息
    fetchEditData(){
      var _self = this;
      this.$axios.get(process.env.API_HOST+"/api/base_whitelist/show?os_type="+this.detailData[0]+"&os_name="+this.detailData[1]+"&attr_name="+this.detailData[2]+"&id="+this.detailData[3]).then((res) => {
            
            this.items = res.data.data[0];
            delete this.items._id;
            delete this.items.attr_id
            delete this.items.attr_name_id
            // console.log(this.items);
        }).catch((error) => {
            _self.$message.error(error.response.data.message);
        });
    },
    //从属性白名单获取全部信息
    fetchEditDataAttr(){
      var _self = this;
      this.$axios.get(process.env.API_HOST+"/api/manual_whitelist/show?id="+this.detailData[0]).then((res) => {
            
            this.items = res.data.data[0];
            delete this.items._id;
            delete this.items.attr_id
            delete this.items.attr_name_id
            // console.log(this.items);
        }).catch((error) => {
            _self.$message.error(error.response.data.message);
        });
    }
  },
  created() {
    // console.log(this.detailData);
    this.detailData = this.$route.params.id;
    // this.fetchEditData();
    if(this.detailData.length == 1){
      this.fetchEditDataAttr();
    }else{
      this.fetchEditData();
    }
  },
  mounted() {

  },
  watch:{
    $route() {
     // to 和 from 都是 路由信息对象
     this.detailData = this.$route.params.id;
      if(this.detailData != undefined){
        // this.fetchEditData();
        if(this.detailData.length == 1){
          this.fetchEditDataAttr();
        }else{
          this.fetchEditData();
        }
      }
    },
  }
}
</script>
<style scoped lang="less">
.edit{
  padding: 40px 30px;
}
.icon-fanhui1{
  cursor: pointer;
}
.icon-bianji{
  font-size: 30px;
  color: #409EFF;
}
.el-tree{
	font-size: 14px;
	// border-bottom: 1px solid #e6e7e7;
	padding-bottom: 10px;
	margin-bottom: 0;
}
.el-tree-node1{
  margin-top: 30px;
}
.el-tree span:nth-child(1){
  margin-right: 5px;
  cursor: pointer;
}
.el-tree img {
	width: 12px;
  height: 12px;
  transform: rotate(90deg);
}
.el-input--small{
  width: 16.5%;
}
.icon-cuo{
  color: #ff561b;
}
.icon-jia{
  margin-left: 5px;
  color:#2395f1;
}
.iconfont{
  cursor: pointer;
}
.node1{
  margin-left: 30px;
}
.node1 .el-select{
  width: 15.5%
}
.node1 .mock{
  width: 29%;
}
.node1 .description{
  width: 16.5%;
}
.tree1{
  margin-bottom: 10px;
}
.tree1 .el-input--small{
  width: 15%;
}

.tree2 .el-input--small{
  width: 14.5%;
}
.tree2 .el-select{
  width: 15.3%
}
.tree2 .description{
  width: 16.3%;
}
// 文字提示封装修改
.title_mouse .el-button{
    border: 0;
    padding: 0;
    background: transparent;
}
.title_mouse .el-button+.el-tooltip{
    margin-left: 0;
}
.title_mouse .el-button+.el-button{
    margin-left: 0;
}
</style>
<style>
.edit .el-select{
  width: 15%
}
.edit .el-checkbox__inner{
  margin-left: 10px;
  margin-right: 30px;
}
.edit .mock{
  width: 28%
}
.edit .mock,.description{
  display: inline-block;
  margin-left: 20px;
  margin-right: 20px;
}
.edit .description{
  width: 16%
}
.edit .mock .el-input{
  width: 100%;
}
.edit .description .el-input{
  width: 100%;
}
.edit .el-input-group__append, .el-input-group__prepend{
  padding: 0 10px;
  cursor: pointer;
}
</style>


