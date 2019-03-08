<template>
    <div class="dashboard">
        <el-menu class="sidebar-el-menu" background-color="rgba(240, 243, 245, 1)"
            text-color="#333333" active-text-color="#20a0ff" >
            <el-tabs v-model="activeName">
                <el-tab-pane label="系统属性" name="first">
                    <el-input v-model="searchInterface" placeholder="搜索接口"></el-input>
                    <el-scrollbar>
                        <div style="height:700px;background:white">
                            <el-menu
                            :default-active="onRoutes"
                            @select="handleSelectAttr"
                            class="el-menu-vertical-demo">
                            <template v-for="item in items">
                                <el-submenu :index="item.value" :key="item.value">
                                    <template slot="title">
                                        <i class="iconfont icon-wenjianjia"></i>
                                        <span>{{item.value}}</span>
                                        <!-- <span v-on:mouseenter="mouseEnter($event)" v-on:mouseleave="mouseLeave($event)" class="title_mouse">
                                            <span v-show="sort">
                                                <el-tooltip class="item" effect="dark" content="添加接口" placement="top">
                                                    <el-button><i class="iconfont icon-jia"></i></el-button>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="修改分类" placement="top">
                                                    <el-button><i class="iconfont icon-bi"></i></el-button>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="删除分类" placement="top">
                                                    <el-button><i class="iconfont icon-shanchu"></i></el-button>
                                                </el-tooltip>
                                            </span>
                                        </span> -->
                                    </template>
                                    <template v-for="seconitem in item.child">
                                        <el-submenu :index="seconitem.value" :key="seconitem.value" class="sub_2">
                                            <template slot="title">
                                                <span>{{seconitem.value}}</span>
                                                <span v-on:mouseenter="mouseEnter($event)" v-on:mouseleave="mouseLeave($event)" class="title_mouse">
                                                    <span v-show="sort">
                                                        <el-tooltip class="item" effect="dark" content="添加系统版本" placement="top">
                                                            <el-button><i class="iconfont icon-jia" @click="addSysversion($event,item.value,seconitem.value)"></i></el-button>
                                                        </el-tooltip>
                                                        <!-- <el-tooltip class="item" effect="dark" content="修改分类" placement="top">
                                                            <el-button><i class="iconfont icon-bi"></i></el-button>
                                                        </el-tooltip>
                                                        <el-tooltip class="item" effect="dark" content="删除分类" placement="top">
                                                            <el-button><i class="iconfont icon-shanchu"></i></el-button>
                                                        </el-tooltip> -->
                                                    </span>
                                                </span>
                                            </template>
                                            <template v-for="thirditem in seconitem.child">
                                                <el-menu-item :index="thirditem.value" :key="thirditem.value">
                                                    <span>{{thirditem.value}}</span>
                                                    <span v-on:mouseenter="mouseEnter($event)" v-on:mouseleave="mouseLeave($event)" class="title_mouse">
                                                        <span v-show="sort">
                                                            <el-tooltip class="item" effect="dark" content="添加白名单" placement="top">
                                                                <el-button><i class="iconfont icon-jia" @click="addWhitelist($event,item.value,seconitem.value,thirditem.value)"></i></el-button>
                                                            </el-tooltip>
                                                            <!-- <el-tooltip class="item" effect="dark" content="修改分类" placement="top">
                                                                <el-button><i class="iconfont icon-bi"></i></el-button>
                                                            </el-tooltip> -->
                                                            <el-tooltip class="item" effect="dark" content="删除版本" placement="top">
                                                                <el-button><i class="iconfont icon-shanchu" @click="deleteSysversion($event,item.value,seconitem.value,thirditem.value)"></i></el-button>
                                                            </el-tooltip>
                                                        </span>
                                                    </span>
                                                </el-menu-item>
                                            </template>
                                        </el-submenu>
                                    </template>
                                </el-submenu>
                            </template>
                            </el-menu>
                        </div>
                    </el-scrollbar>
                    
                </el-tab-pane>
                <el-tab-pane label="系统类型" name="second">
                    <el-input v-model="searchInterface" placeholder="搜索类别"></el-input>
                    <el-scrollbar>
                        <div style="height:700px">
                            <el-menu
                            default-active=""
                            @select="handleSelect"
                            collapse-transition
                            class="el-menu-vertical-demo">
                            <template v-for="item in items2">
                                <el-submenu :index="item.value" :key="item.value">
                                    <template slot="title">
                                        <i class="iconfont icon-wenjianjia"></i>
                                        <span>{{item.value}}</span>
                                        <span v-on:mouseenter="mouseEnter($event)" v-on:mouseleave="mouseLeave($event)" class="title_mouse">
                                            <span v-show="sort">
                                                <el-tooltip class="item" effect="dark" content="添加系统版本" placement="top">
                                                    <el-button ><i class="iconfont icon-jia" @click="interfaceDia($event,item.value)"></i></el-button>
                                                </el-tooltip>
                                                <!-- <el-tooltip class="item" effect="dark" content="修改分类" placement="top">
                                                    <el-button><i class="iconfont icon-bi"></i></el-button>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="删除分类" placement="top">
                                                    <el-button><i class="iconfont icon-shanchu"></i></el-button> 
                                                </el-tooltip> -->
                                            </span>
                                        </span>
                                    </template>
                                    <template v-for="seconitem in item.child">
                                        <el-submenu :index="seconitem.value" :key="seconitem.value" class="sub_2">
                                            <template slot="title">
                                                <span>{{seconitem.value}}</span>
                                                <span v-on:mouseenter="mouseEnter($event)" v-on:mouseleave="mouseLeave($event)" class="title_mouse">
                                                    <span v-show="sort">
                                                        <el-tooltip class="item" effect="dark" content="添加系统属性" placement="top">
                                                            <el-button ><i class="iconfont icon-jia" @click="attrDia($event,item.value,seconitem.value)"></i></el-button>
                                                        </el-tooltip>
                                                        <el-tooltip class="item" effect="dark" content="修改版本" placement="top">
                                                            <el-button><i class="iconfont icon-bi" @click="putVersion($event,item.value,seconitem.value)"></i></el-button>
                                                        </el-tooltip>
                                                        <el-tooltip class="item" effect="dark" content="删除版本" placement="top">
                                                            <el-button><i class="iconfont icon-shanchu" @click="deleteVersion($event,item.value,seconitem.value)"></i></el-button>
                                                        </el-tooltip>
                                                    </span>
                                                </span>
                                            </template>
                                            
                                            <template v-for="thirditem in seconitem.child">
                                                <el-menu-item :index="thirditem.value" :key="thirditem.value">
                                                    <span>{{thirditem.value}}</span>
                                                    <span v-on:mouseenter="mouseEnter($event)" v-on:mouseleave="mouseLeave($event)" class="title_mouse">
                                                        <span v-show="sort">
                                                            <!-- <el-tooltip class="item" effect="dark" content="添加接口" placement="top">
                                                                <el-button ><i class="iconfont icon-jia"></i></el-button>
                                                            </el-tooltip> -->
                                                            <el-tooltip class="item" effect="dark" content="修改属性" placement="top">
                                                                <el-button><i class="iconfont icon-bi" @click="putAttributes($event,item.value,seconitem.value,thirditem.value)"></i></el-button>
                                                            </el-tooltip>
                                                            <el-tooltip class="item" effect="dark" content="删除属性" placement="top">
                                                                <el-button><i class="iconfont icon-shanchu" @click="deleteAttributes($event,item.value,seconitem.value,thirditem.value)"></i></el-button>
                                                            </el-tooltip>
                                                        </span>
                                                    </span>
                                                </el-menu-item>
                                            </template>
                                        </el-submenu>
                                    </template>
                                </el-submenu>
                            </template>
                            </el-menu>
                        </div>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
        </el-menu>
        <div style="width:100%">
            <transition name="move" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
            <!-- <child :message="parentMsg"></child> -->
        </div>
        <!-- 添加系统版本 -->
        <el-dialog
        title="添加系统版本"
        :visible.sync="addVisible"
        width="25%"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <span class="popsinterface">
            <el-form ref="form" :model="form" label-width="80px">
                <!-- <el-form-item label="接口分类">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="系统属性" value="shanghai"></el-option>
                    <el-option label="系统类型" value="beijing"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="系统类别">
                    <el-input v-model="form.os_type"></el-input>
                </el-form-item>
                <el-form-item label="系统版本">
                    <el-input v-model="form.os_name"></el-input>
                </el-form-item>
            </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addMethod">提 交</el-button>
        </span>
        </el-dialog>
        <!-- 在某一类型系统下的某一系统版本下增加一个新属性 -->
        <el-dialog
        title="添加新属性"
        :visible.sync="addAttrVisible"
        width="25%"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <span class="popsinterface">
            <el-form ref="form" :model="form" label-width="80px">
                <!-- <el-form-item label="接口分类">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="系统属性" value="shanghai"></el-option>
                    <el-option label="系统类型" value="beijing"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="系统类别">
                    <el-input v-model="form.os_type"></el-input>
                </el-form-item>
                <el-form-item label="系统版本">
                    <el-input v-model="form.os_name"></el-input>
                </el-form-item>
                <el-form-item label="版本属性">
                    <el-input v-model="form.attr_name"></el-input>
                </el-form-item>
            </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addAttrVisible = false">取 消</el-button>
            <el-button type="primary" @click="addAttrMethod">提 交</el-button>
        </span>
        </el-dialog>
        <!-- 修改版本 -->
        <el-dialog
        title="修改版本"
        :visible.sync="putVisible"
        width="25%"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <span class="popsinterface">
            <el-form ref="form" :model="putform" label-width="80px">
                <el-form-item label="版本名">
                    <el-input v-model="putform.os_name"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="putform.remarks"></el-input>
                </el-form-item>
            </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="putVisible = false">取 消</el-button>
            <el-button type="primary" @click="putVersionMethod">提 交</el-button>
        </span>
        </el-dialog>
         <!-- 修改属性 -->
        <el-dialog
        title="修改属性"
        :visible.sync="putAttrVisible"
        width="25%"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <span class="popsinterface">
            <el-form ref="form" :model="putAttrform" label-width="80px">
                <el-form-item label="属性名">
                    <el-input v-model="putAttrform.attr_name"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="putAttrform.remarks"></el-input>
                </el-form-item>
            </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="putAttrVisible = false">取 消</el-button>
            <el-button type="primary" @click="putAttrMethod">提 交</el-button>
        </span>
        </el-dialog>
        <!-- 系统属性添加系统版本 -->
        <el-dialog
        title="添加新版本"
        :visible.sync="addSysversionVisible"
        width="25%"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <span class="popsinterface">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="版本属性">
                    <el-input v-model="form.attr_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="系统类别">
                    <el-input v-model="form.os_type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="系统版本">
                    <el-input v-model="form.os_name"></el-input>
                </el-form-item>
                
            </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addSysversionVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSysversionMethod">提 交</el-button>
        </span>
        </el-dialog>
        <!-- 系统属性添加一条白名单 -->
        <el-dialog
        title="添加白名单"
        :visible.sync="whitelistVisible"
        width="25%"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <span class="popsinterface">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="版本属性">
                    <el-input v-model="form.attr_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="系统类别">
                    <el-input v-model="form.os_type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="系统版本">
                    <el-input v-model="form.os_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="文件名">
                    <el-input v-model="form.file_name"></el-input>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="whitelistVisible = false">取 消</el-button>
            <el-button type="primary" @click="addWhitelistMethod">提 交</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import child from './List'
export default {
  name: "dashboard",
  data: function() {
    return {
        parentMsg: {},
        iconfont:'iconfont',
        activeName: 'second',
        searchInterface: '',
        sort: false,
        addVisible: false,
        addAttrVisible: false,
        putVisible: false,
        putAttrVisible: false,
        addSysversionVisible:false,
        whitelistVisible: false,
        items: [],
        items2: [],
        form:{
            os_type:"",
            os_name:"",
            attr_name:"",
            name:"",
            file_name:"",
            description:""
        },
        putform:{
            os_type:"",
            os_name:"",
            oldos_name:"",
            attr_name:"",
            oldattr_name:"",
            remarks:""
        },
        putAttrform:{
            os_type:"",
            os_name:"",
            oldos_name:"",
            attr_name:"",
            oldattr_name:"",
            remarks:""
        }
    };
  },
  methods: {
    handleOpen(key, keyPath) {
        // console.log(key, keyPath);
    },
    handleSelectAttr(key, keyPath){
        // console.log(keyPath);
        // keyPath[3] = "2";
        this.$router.push({
            name:'attrlist',
            query:{id_path:keyPath}
        });
    },
    handleSelect(key, keyPath) {
        // console.log(key);
        // console.log(keyPath);
        // keyPath[3] = "1";
        this.$router.push({
            name:'list',
            query:{id_path:keyPath}
        });
        // this.parentMsg = keyPath;
    },
    mouseEnter(event){
       $(event.currentTarget).children('span').css("display","");  
    },
    mouseLeave(event){
        $(event.currentTarget).children('span').css("display","none"); 
    },
    handleClose(done) {
    // this.$confirm('确认关闭？')
    //     .then(_ => {
    //     done();
    //     })
    //     .catch(_ => {});
        done();
    },
    //类型添加系统版本
    interfaceDia(event,value){
        event.stopPropagation();
        this.addVisible = true;
        this.form.os_type = value;
        this.form.os_name = "";
    },
    //属性添加系统版本弹出框
    addSysversion(event,attr_name,os_type){
        event.stopPropagation();
        this.addSysversionVisible = true;
        this.form.os_type = os_type;
        this.form.attr_name = attr_name;
    },
    //属性添加系统版本方法
    addSysversionMethod(){
        var _self = this;
        this.$axios.post(process.env.API_HOST+"/api/navigation_list/manual/os_name",{
            attr_name:this.form.attr_name,
            os_type:this.form.os_type,
            os_name:this.form.os_name
        }).then((res) => {
            // console.log(res);
            _self.SyspropertyData();
            this.addSysversionVisible = false;
        }).catch((error) => {
             _self.$message.error(error.response.data.message);
        });
    },
    attrDia(event,type,name){
        event.stopPropagation();
        this.addAttrVisible = true;
        this.form.os_type = type;
        this.form.os_name = name;
        this.attr_name = "";
    },
    putVersion(event,type,name){
        event.stopPropagation();
        this.putVisible = true;
        this.putform.os_type = type;
        this.putform.oldos_name = name;
        this.putform.os_name = name;
    },
    putAttributes(event,type,name,attr_name){
        event.stopPropagation();
        this.putAttrVisible = true;
        this.putAttrform.os_type = type;
        this.putAttrform.os_name = name;
        this.putAttrform.oldattr_name = attr_name;
        this.putAttrform.attr_name = attr_name;
    },
    addMethod(){
        var _self = this;
        this.$axios.post(process.env.API_HOST+"/api/navigation_list/base/os_name",{
            os_type:this.form.os_type,
            os_name:this.form.os_name
        }).then((res) => {
            // console.log(res);
            _self.baseIndex();
            this.addVisible = false;
        }).catch((error) => {
             _self.$message.error(error.response.data.message);
        });
    },
    addAttrMethod(){
        var _self = this;
        this.$axios.post(process.env.API_HOST+"/api/navigation_list/base/os_attr",{
            os_type:this.form.os_type,
            os_name:this.form.os_name,
            attr_name:this.form.attr_name
        }).then((res) => {
            // console.log(res);
            _self.baseIndex();
            this.addAttrVisible = false;
        }).catch((error) => {
             _self.$message.error(error.response.data.message);
        });
    },
    putVersionMethod(){
        var _self = this;
        this.$axios.put(process.env.API_HOST+"/api/navigation_list/base/os_name",{
            os_type:this.putform.os_type,
            os_name:this.putform.oldos_name,
            new_os_name:this.putform.os_name
        }).then((res) => {
            // console.log(res);
            _self.baseIndex();
            this.putVisible = false;
        }).catch((error) => {
             _self.$message.error(error.response.data.message);
        });
    },
    putAttrMethod(){
        var _self = this;
        this.$axios.put(process.env.API_HOST+"/api/navigation_list/base/os_attr",{
            os_type:this.putAttrform.os_type,
            os_name:this.putAttrform.os_name,
            attr_name:this.putAttrform.oldattr_name,
            new_attr_name:this.putAttrform.attr_name
        }).then((res) => {
            // console.log(res);
            _self.baseIndex();
            this.putAttrVisible = false;
        }).catch((error) => {
             _self.$message.error(error.response.data.message);
        });
    },
    deleteVersion(event,type,name){
        var _self = this;
        event.stopPropagation();
        this.$confirm('温馨提示：该操作会删除该分类与其下所有属性，删除后无法恢复', '确定删除此版本分类吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.delete(process.env.API_HOST+"/api/navigation_list/base/os_name",{
                data: {
                    os_type:type,
                    os_name:name
                }
            }).then((res) => {
                _self.baseIndex();
                _self.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch((error) => {
                _self.$message.error(error.response.data.message);
            });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    deleteAttributes(event,type,name,attr_name){
        var _self = this;
        event.stopPropagation();
        this.$confirm('温馨提示：该操作会删除该属性，删除后无法恢复', '确定删除此版本属性吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.delete(process.env.API_HOST+"/api/navigation_list/base/os_attr",{
                data: {
                    os_type:type,
                    os_name:name,
                    attr_name:attr_name
                }
            }).then((res) => {
                _self.baseIndex();
                _self.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch((error) => {
                _self.$message.error(error.response.data.message);
            });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 删除系统属性下的系统版本
    deleteSysversion(event,attr_name,type,name){
        var _self = this;
        event.stopPropagation();
        this.$confirm('温馨提示：该操作会删除该系统版本，删除后无法恢复', '确定删除此版本吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.delete(process.env.API_HOST+"/api/navigation_list/manual/os_name",{
                data: {
                    attr_name:attr_name,
                    os_type:type,
                    os_name:name
                }
            }).then((res) => {
                _self.SyspropertyData();
                _self.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch((error) => {
                _self.$message.error(error.response.data.message);
            });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 系统属性添加一条白名单输入框
    addWhitelist(event,attr_name,os_type,os_name){
        event.stopPropagation();
        this.whitelistVisible = true;
        this.form.attr_name = attr_name;
        this.form.os_type  = os_type;
        this.form.os_name = os_name;       
    },
    // 系统属性添加一条白名单提交
    addWhitelistMethod(){
        var _self = this;
        this.$axios.post(process.env.API_HOST+"/api/manual_whitelist",{
            attr_name:this.form.attr_name,
            os_type:this.form.os_type,
            os_name:this.form.os_name,
            name:this.form.name,
            file_name:this.form.file_name,
            description:this.form.description
        }).then((res) => {
            // console.log(res);
            this.whitelistVisible = false;
            _self.$message.success("提交成功！");
        }).catch((error) => {
             _self.$message.error(error.response.data.message);
        });
    },
    baseIndex(){
        var _self = this;
        this.$axios.get(process.env.API_HOST+"/api/navigation_list/base/index").then((res) => {
            this.items2 = res.data.data;
            // console.log(this.items2);

        }).catch(error => {
                _self.$message.error(error.response.data.message);
        });
    },
    SyspropertyData(){
        var _self = this;
        this.$axios.get(process.env.API_HOST+"/api/navigation_list/manual/index").then((res) => {
            this.items = res.data.data;
            // console.log(this.items);
        }).catch(error => {
                _self.$message.error(error.response.data.message);
        });
    }
  },
  computed:{
    onRoutes(){
        return this.$route.path.replace('/','');
    },
  },
  created() {
    // this.$axios.defaults.baseURL = '';
    this.baseIndex();
    this.SyspropertyData();
    // this.$router.push({
    //     name:'list',
    //     query:{id:2}
    // });
    
  },
  mounted() {

  },
  components: {
        child
    }
}
</script>
<style scoped lang="less">
.dashboard{
    display: flex;
    flex-wrap: nowrap;
    background: #ffffff;
    margin: -20px;
}
.el-menu {
    width: 200px;
}
.el-tab-pane .el-input--small{
    width: 80%;
    margin-left: 10%;
    margin-bottom: 20px;
}
// .icon-jia{
//     position: absolute;
//     right: 50px;
// }
// .icon-bi{
//     position: absolute;
//     right: 30px;
// }
// .icon-shanchu{
//     position: absolute;
//     right: 10px;
// }
.icon-wenjianjia{
    margin-left: 5px;
}
.title_mouse{
display:inline-block;width:120px;height:56px
}
.title_mouse span{
    position: absolute;
    right: 10px;
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
.popsinterface .el-form-item__content{
    width: 70%;
}
.popsinterface .el-select{
    width: 100%;
}

</style>
<style>
.dashboard .el-tabs__nav{
    /* margin-left: 10px; */
}
.dashboard .sidebar-el-menu .el-tabs__item{
    padding: 0;
    width: 89px;
    text-align: center;
}
.dashboard .sidebar-el-menu .el-tabs__active-bar{
    height: 0;
}
.dashboard .el-submenu__icon-arrow{
    position: absolute;
    margin-right: 160px;
}
.dashboard .sub_2 .el-submenu__icon-arrow {
    margin-right: 145px;
}
.dashboard .sub_3 .el-submenu__icon-arrow {
    margin-left: -30px;
}
.el-submenu>.el-submenu__title .el-submenu__icon-arrow{
	-webkit-transform: rotateZ(-90deg); 
	-ms-transform: rotate(-90deg);
	transform: rotateZ(-90deg); 
}
.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
	-webkit-transform: rotateZ(0deg); 
	-ms-transform: rotate(0deg);
	transform: rotateZ(0deg); 
}
.el-dialog__header{
  border: 1px solid #e9e9e9;
}
.el-dialog__footer{
  padding: 10px 15px 10px;
  border-top: 1px solid #e9e9e9;
}
</style>


