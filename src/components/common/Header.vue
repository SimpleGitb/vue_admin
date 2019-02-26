<template>
    <div class="header"
    v-loading="loading"
    element-loading-text="数据上传中，请耐心等待。"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <!-- 折叠按钮 -->
        <div class="collapse-btn">
            <img src="/static/img/u128.png" alt="" class="logoPicture">
        </div>
        <div class="logo">捕影主机检查系统后台</div>
        <div class="collapse-btn border"  @click.self="collapseChage($event)">
            <img src="/static/img/folds.png" class="fold" @click.stop="collapseChage($event)">
        </div>
       <div class="collapse-btn border import" @click="importInfo">
           <i class="iconfont icon-daoru"></i>导入信息
       </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <ul>
                        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                            <li @click="handleFullScreen">
                                        <i class="el-icon-rank"></i>
                            </li>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="消息中心" placement="bottom">
                            <li >
                                        <i class="el-icon-bell"><span class="btn-bell-badge" ></span></i>
                            </li>
                        </el-tooltip>
                    <li>
                        <div class="user-avator"><img src="static/img/img.jpg"></div>
                        <!-- 用户名下拉菜单 -->
                       <el-col>
                        <el-dropdown  @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <router-link to="/ModifyData" tag="p">
                                        修改资料
                                    </router-link>
                                    </el-dropdown-item>
                                <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    </li>
                </ul>
                <!-- 消息中心 -->

                <!-- 用户头像 -->
            </div>
        </div>
       <!-- 导入信息 -->
        <el-dialog
          title="导入信息"
          :visible.sync="importVisible"
          width="25%"
          :close-on-click-modal="false"
          :before-close="handleClose">
          <span>
              <!-- <el-form >
                <el-form-item label="系统选择">
                  <el-cascader
                    expand-trigger="hover"
                    :options="form"
                    v-model="selectedOptions"
                    @change="handleChange"
                    :show-all-levels="false">
                  </el-cascader>
                </el-form-item>
              </el-form> -->
              <div style="margin-bottom: 10px;">
                  请上传最新版本数据包，导入的程序默认为“系统”标签
                  <!-- <el-checkbox v-model="checked">添加应用程序名单</el-checkbox> -->
                </div>
              <el-upload
                class="upload-demo"
                drag
                ref="upload"
                action="customize"
                :http-request="requsetHttp"
                :before-upload="beforeAvatarUpload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传json文件，且不超过50M</div>
              </el-upload>
          </span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="importVisible = false" type="info">关闭</el-button>
              <!-- <el-button @click="importVisible = false" type="primary">确定</el-button> -->
          </span>
        </el-dialog>
        <!-- 常驻弹窗 -->
        <el-dialog
          title="导入基本信息"
          :visible.sync="infoVisible"
          width="25%"
          :close-on-click-modal="false"
          :before-close="handleClose">
          <span class="popsinterface">
              <div v-text="importinfo">名单已导入完成，共导入 xxx 个应用程序</div>
              <div>
                  <!-- <el-button type="text" @click="searchList">查看名单</el-button>
                  <el-button type="text" @click="infoVisible = false,importVisible = true">继续导入</el-button> -->
              </div>
          </span>
          <span slot="footer" class="dialog-footer">
              <el-button type="text" @click="searchList">查看名单</el-button>
              <el-button type="text" @click="infoVisible = false,importVisible = true">继续导入</el-button>
              <!-- <el-button @click="infoVisible = false" type="primary">我知道了</el-button> -->
          </span>
        </el-dialog>
        <div class="progressStyle" :class="{progressIs:!loading}"><el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress></div>
    </div>
</template>

<script>
    import bus from '../common/bus';
    // import { Loading } from 'element-ui';
    // import store from '../../store/index';
    

    export default {
        data() {
            return {
                collapse: true,
                fullscreen: false,
                checkeds:['首页检测'],
                username: 'admin',
                importVisible: false,
                infoVisible: false,
                checked: true,
                infoData:[],
                form:[],
                selectedOptions:[],
                token:"",
                importinfo:"",
                loading:false,
                percentage: 0,
            }
        },
        computed:{
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                //     this.$loading({fullscreen:true});
                //     this.$axios.get(localStorage.baseUrl+'/logout').then((res)=>{
                //         if(res.data.status){
                //             localStorage.removeItem('JWT_TOKEN');
                //             localStorage.removeItem('role');
                //             localStorage.removeItem('ms_username');
                //             localStorage.removeItem('owner');
                //             localStorage.removeItem('client');
                //             sessionStorage.removeItem('ms_username');
                //             localStorage.removeItem('baseUrl');
                //             this.$loading({fullscreen:false});
                //             this.$router.push({
                //                 name:'login'
                //             });
                //                 window.location.href='/login';
                //         }else{
                //         }
                // })
                 window.location.href='/login';
                }
            },
            // 侧边栏折叠
            collapseChage(event){
                bus.$emit('collapse', this.collapse);
                    this.collapse = !this.collapse;
                        if(this.collapse){
                            if(event.target && event.target.children[0]){
                                event.target.children[0].src = '/static/img/folds.png';
                            }else{
                                event.target.src = '/static/img/folds.png';
                            }
                        }else{
                             if(event.target && event.target.children[0]){
                                event.target.children[0].src = '/static/img/fold.png';
                            }else{
                                event.target.src = '/static/img/fold.png';
                            }
                        };

            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            importInfo(){
                this.importVisible = true;
            },
            handleClose(done) {
                done();
            },
            requsetHttp(params){
            this.importVisible = false;
            this.loading = true;
            var fileObj = params.file;
            var form = new FormData();
            // 文件对象
            form.append("file_name", fileObj);
            // form.append("os_type", this.selectedOptions[0]);
            // form.append("os_name", this.selectedOptions[1]);
            form.append("only_appInfo", this.checked);
            // console.log(form.get("file_name"));
            // console.log(form.get('os_type'))
            // console.log(form);
            var _self = this;
            if(sessionStorage.token){
                this.token = sessionStorage.token;
            }
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token':this.token,
                    'username':sessionStorage.ms_username
                },
                onUploadProgress: progressEvent => {
                    var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                    this.percentage = complete
                },
                timeout: 600000
            }
            this.$axios.post(process.env.API_HOST+"/api/import_checkdata",form,config).then((res) => {
                // _self.$message.success(res.data.status);
                _self.loading = false;
                _self.importinfo = res.data.info;
                _self.importVisible = false;
                _self.infoVisible = true;
            }).catch(error => {
                _self.loading = false;
                _self.$message.error(error.response.data.message);
                _self.importVisible = false;
                _self.$router.push('/login');
            });
            },
            handleChange(value) {
                console.log(value);
            },
            beforeAvatarUpload(file){
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)				
				const extension = testmsg === 'json'
				const extension2 = testmsg === 'JSON'
				const isLt2M = file.size / 1024 / 1024 < 50
				if(!extension && !extension2) {
					this.$message({
						message: '上传文件只能是 json格式!',
						type: 'warning'
                    });
				}
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 50MB!',
						type: 'warning'
					});
				}
				return extension || extension2 && isLt2M
            },
            searchList(){
                this.infoVisible = false;
                this.$router.push('/application');
            }
        },
        created(){
            // this.$axios.get(localStorage.baseUrl+'/person',{
            //     headers:{
            //                     'Authorization':localStorage.JWT_TOKEN
            //             }
            // }).then((res)=>{
            //     localStorage.role = res.data.data.role;
            //     if(localStorage.baseUrl == 'http://client_monitor.yunsee.cn'){
            //         this.username = res.data.data.owner ?  res.data.data.owner : res.data.data.email;
            //     }else{
            //         this.username = res.data.data.email ?  res.data.data.email : res.data.data.owner;
            //     }
            // })
            //         if(document.body.clientWidth < 1080){
            //             this.collapseChage();
            //         };
            //         this.$axios.get(localStorage.baseUrl+'/notice',{
            //             headers:{
            //                             'Authorization':localStorage.JWT_TOKEN
            //                     }
            //         }).then((res)=>{
            //             let data = res.data.data;
            //             this.message = data.threat;
            //         }).catch(v => {
            //                 console.log(v);
            //        });

        }
    }

</script>
<style scoped lang="less">
    .el-dropdown-menu{
        top: 58px!important;
    }
    .el-dropdown-menu .el-dropdown-menu__item{
        line-height: 40px;
    }
    .aseetRecord{
        display: inline-block;
    }
    .aseetRecord li{
        float: left;
        line-height: 69px;
        border-left:1px solid #282b33;
        list-style: none;
        font-size: 16px;
        padding-left: 25px;
        padding-right: 25px;
        color: #bfcbd9;
        cursor: pointer;
        position: relative;
        transition: .3s linear;
    }


    .msg{
        color: #fff;
        position: relative;
    }

    .aseetRecord li .box{
        background: #fff;
        position: absolute;
        bottom: -72px;
        z-index: 10;
        width: 100%;
        text-align: center;
        left: 0;
        color: #333;
        box-shadow: 4px 4px 2px #ddd;
        display: none;
    }
    .aseetRecord li:nth-of-type(2) .icon-jiance1{
        font-size: 20px;
    }
    // .collapse-btn:hover{
    //     background: #283446;
    // }
    .collapse-btn .fold{
        width: 20px
    }
    .aseetRecord li:nth-of-type(2){
        border-right: 1px solid #282b33;
    }
    .aseetRecord li:hover{
        background: #283446;
    }
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        color: #fff;
        font-family: '微软雅黑';
        .import{
            border-left: 0;
            font-size: 16px;
            color: #bfcbd9;
            .icon-daoru{
                padding-right: 10px;
            }
        }
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .collapse-btn .icon-weibiaoti26{
        font-size: 22px;
    }
    .border{
        border-left:1px solid #282b33;
        border-right: 1px solid #282b33;
    }
    .header .logo{
        float: left;
        width:210px;
        line-height: 70px;
        color: #bfcbd9;
        font-size: 18px
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-right li:hover{
        background: #283446;
    }
    .header-user-con{
        height: 70px;
    }
    .header-user-con li:nth-of-type(1),.header-user-con li:nth-of-type(3){
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
    }
    .header-user-con .el-icon-rank{
        font-size: 20px;
    }
    .header-user-con li{
            float: left;
            height: 70px;
            line-height: 70px;
            border-left: 1px solid #282b33;
            list-style: none;
            font-size: 16px;
            padding-left: 25px;
            padding-right: 25px;
            color: #bfcbd9;
            cursor: pointer;
    }
    .header-user-con li.el-tooltip .el-icon-bell{
        position: relative;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: -4px;
        top: -4px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-avator{
        margin-left: 20px;
        margin-right: 10px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .logoPicture{
        width:40px;
        margin-top:15px;
    }
    .header .logo{
        width:210px;
    }
    .progressStyle{
        position: relative;
        width: 24%;
        margin: auto;
        top: 360px;
        z-index:10001;
    }
    .progressIs{
    display: none;
    }
    
</style>
<style>
.header .el-upload--text{
  width: auto;
  height: auto;
  border-radius: 0;
  border: 0;
  overflow: inherit;
}
.header .upload-demo{
  /* width: 90%;
  margin: auto; */
  border: 1px dashed #d9d9d9;
  padding: 10px 20px;
}
.header .el-loading-spinner {
    top: 32%;
}
.header .el-loading-mask{
    height: 1000px;
}
</style>
