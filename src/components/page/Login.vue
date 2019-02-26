<template>
	<div class="login-wrap">
		<div class="login login1" :class="rotate">
			<div class="login_title">
				<span>捕影后台管理系统</span>
			</div>
			<div class="login_fields">
				<div class="login_fields__user">
					<div class="icon">
						<img src="/static/img/login/user_icon_copy.png">
					</div>
					<input name="login" id="username" v-model="ruleForm.username" style="font-family: 微软雅黑;font-size: 14px;" placeholder="邮箱" type="username">
				</div>
				<div class="login_fields__password">
					<div class="icon">
						<img src="/static/img/login/lock_icon_copy.png">
					</div>
					<input name="pwd" id="password" v-model="ruleForm.password" style="font-family: 微软雅黑;font-size: 14px;" placeholder="密码" type="password">
				</div>
				<!-- <div class="login_fields__Keep">
					<label for="pass">
                    <span>记住密码</span>
                    <input type="checkbox" name="pass" class="checkbox" v-model="checked">
                </label>
				</div> -->
                <!-- <div class="login_fields__Keep">
					 <el-radio v-model="radio" label="admin">应急响应</el-radio>
                     <el-radio v-model="radio" label="sales">主管单位</el-radio>
				</div> -->
			</div>
			<div class="success"></div>
			<div id="captcha" class="wait" :style="{display:display1}">
				<div class="loading">
					<div class="bounce1"></div>
					<div class="bounce2"></div>
					<div class="bounce3"></div>
				</div>
			</div>
			<div class="login_fields__submit" id="btn">
				<input style="padding: 10px 105px" type="button" value="登录">
			</div>
		</div>
		<div class='authent authent1' :style="{display:display,left:left,opacity:opacity}">
			<div class="loader" style="height: 44px;width: 44px;margin-left: 28px;">
				<div class="loader-inner ball-clip-rotate-multiple">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<p>认证中...</p>
		</div>
	</div>
</template>
<script>
    require('../../../static/js/gt.js');
    import axios from 'axios';
    import Vue from 'vue';
	export default {
		name: 'login',
		data: function() {
			return {
				rotate: 'test2',
                display: 'none',
                radio:'admin',
				display1: 'block',
				transition: '',
				checked: false,
				isThere: false,
				left: '400px',
				opacity: 0,
				ruleForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {},
		created() {
			var _this = this;
            this.$nextTick(function(){
                var handler = function(captchaObj) {
                    captchaObj.onReady(function() {
                        _this.display1 = 'none';
                    }).onSuccess(function() {
                        var result = captchaObj.getValidate();
                        if(!result) {
                            _this.$message.error('请完成验证');
                            return;
                        };
                        _this.rotate = 'test';
                        _this.display = "block";
                        _this.opacity = "1";
                        _this.$axios.post(process.env.API_HOST+'/api/admin/login', {
                            phone_email: _this.ruleForm.username,
                            password: _this.ruleForm.password
                            // remember: Number(_this.checked),
                            // geetest_challenge: result.geetest_challenge,
                            // geetest_validate: result.geetest_validate,
                            // geetest_seccode: result.geetest_seccode
                        }).then((res) => {
                            let data = res.data;
                            // axios.defaults.headers.common['Authorization'] = 'Bearer '+res.headers.authorization;
                            // _this.$store.state.JWT_TOKEN = res.headers.authorization;
                            // localStorage.JWT_TOKEN = 'Bearer '+res.headers.authorization;
                            _this.$message.success("登录成功!");
                            sessionStorage.ms_username = data.data.user_name;
                            sessionStorage.token = data.data.token;
                            _this.$router.push('/application');
                            setTimeout(function() {
                                    _this.rotate = 'test2';
                                    _this.display = "none";
                                    _this.opacity = "0";
                                    captchaObj.reset();
                                }, 1500);
                            // sessionStorage.setItem('ms_username',_this.ruleForm.username);
                        }).catch((error) => {
                            _this.$message.error(error.response.data.message);
                            setTimeout(function() {
                                    _this.rotate = 'test2';
                                    _this.display = "none";
                                    _this.opacity = "0";
                                    captchaObj.reset();
                                }, 1500);
                        });
                    });
                    document.getElementById('btn').onclick = function() {
                        // if(_this.radio == 'admin'){
                        //     localStorage.client = 1;
                        //     localStorage.baseUrl = 'http://api.yx_monitor.yunsee.cn';
                        // }else{
                        //     localStorage.client = 0;
                        //     localStorage.baseUrl = 'http://client_monitor.yunsee.cn';
                        // }
                        // if(!_this.ruleForm.username){
                        //     _this.$message.error('请输入账号');
                        //     return;
                        // }else if(!_this.ruleForm.password){
                        //     _this.$message.error('请输入密码');
                        //     return;
                        // };
                        captchaObj.verify();
                    };
    
                    // 更多前端接口说明请参见：http://docs.geetest.com/install/client/web-front/
                };
                this.$axios.get("http://api.yx_monitor.yunsee.cn/captcha?t=" + (new Date()).getTime()).then((res) => {
                    let data = res.data;
                    initGeetest({
                        // 以下 4 个配置参数为必须，不能缺少
                        gt: data.gt,
                        challenge: data.challenge,
                        offline: !data.success, // 表示用户后台检测极验服务器是否宕机
                        new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
                        timeout: '5000',
                        product: "bind", // 产品形式，包括：float，popup
                        width: "300px"
                        // 更多前端配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
                    }, handler);
                })

            })


		}

	}
</script>
<style scoped>
    .ball-clip-rotate-multiple {
        position: relative; 
    }
    .ball-clip-rotate-multiple > div {
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        position: absolute;
        left: 0px;
        top: 0px;
        border: 2px solid #fff;
        border-bottom-color: transparent;
        border-top-color: transparent;
        border-radius: 100%;
        height: 35px;
        width: 35px;
        -webkit-animation: rotate 1s 0s ease-in-out infinite;
        animation: rotate 1s 0s ease-in-out infinite;
    }
    .ball-clip-rotate-multiple > div:last-child {
      display: inline-block;
      top: 10px;
      left: 10px;
      width: 15px;
      height: 15px;
      -webkit-animation-duration: 0.5s;
      animation-duration: 0.5s;
      border-color: #fff transparent #fff transparent;
      -webkit-animation-direction: reverse;
      animation-direction: reverse; }

    body .authent1{
            transition: all 1s linear;
    }
    body .authent {
            box-shadow: 0px 20px 30px 3px rgba(0, 0, 0, 0.55);
            display: none;
            background: #35394a;
            background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
            /* W3C */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='rgba(53, 57, 74, 0)', endColorstr='rgb(0, 0, 0)',GradientType=1 );
            /* IE6-9 fallback on horizontal gradient */
            position: absolute;
            left: -640px;
            right: 90px;
            margin: auto;
            width: 100px;
            color: white;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-align: center;
            padding: 20px 70px;
            top: 200px;
            bottom: 0;
            height: 70px;
            opacity: 0;
            transition:all 1s linear;
    }
    body .authent p {
    text-align: center;
    color: white;
    }
    .clear{
        clear: both;
    }
    .login .validation {
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 14px;
    opacity: 0;
    }
    .login .disclaimer {
    position: absolute;
    bottom: 20px;
    left: 35px;
    width: 250px;
    }
    .login_title {
    color: #D3D7F7;
    height: 60px;
    text-align: left;
    font-size: 16px;
    }
    .login_fields {
        height: 208px;
        position: absolute;
    }

    body .test {
        box-shadow: 0px 20px 30px 3px rgba(0, 0, 0, 0.55);
        pointer-events: none;
        top: -100px !important;
        -webkit-transform: rotateX(70deg) scale(0.8) !important;
                transform: rotateX(70deg) scale(0.8) !important;
        opacity: .6 !important;
        -webkit-filter: blur(1px);
                filter: blur(1px);
        left:-320px!important;
    }

    .login_fields .icon {
        position: absolute;
        z-index: 1;
        left: 36px;
        top: 8px;
        opacity: .5;
    }
    .login_fields input[type='password'], .login_fields input[type='username'] {
        color: #61BFFF !important;
    }
    .login_fields input[type='username'],  .login_fields input[type='password'] {
        color: #afb1be;
        width: 220px;
        margin-top: -2px;
        background: rgba(57, 61, 82, 0);
        left: 0;
        padding: 10px 9px;
        border-top: 2px solid rgba(57, 61, 82, 0);
        border-bottom: 2px solid rgba(57, 61, 82, 0);
        border-right: none;
        border-left: none;
        outline: none;
        font-family: 'Gudea', sans-serif;
        box-shadow: none;
        margin-left: 54px;
    }
    .login_fields__user,  .login_fields__password {
        position: relative;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        margin-top:10px;
    }

    .login_fields__Keep{
        position: relative;
        padding-left:58px;
        display: flex;
        align-items:center;
        margin-bottom: 10px;
        margin-top:10px;
    }

    #captchaBox{
        padding-left: 37px;
        padding-right: 37px;
    }

    .login_fields__Keep span{
        color:#fff;
        opacity: .5;
        font-size: 14px;
    }

    .login_fields__Keep input{
        margin-left: 10px;
        margin-top: 6px;
        display: inline-block;
        float: right;
    }

    .login_fields__password .icon{
            color:rgba(146, 145, 146, 1)
    }

    .login_fields__submit {
        position: relative;
        bottom: -145px;
    }
    .login_fields__submit .forgot {
        float: right;
        font-size: 10px;
        margin-top: 11px;
        text-decoration: underline;
    }
    .login_fields__submit .forgot a {
        color: #606479;
    }
    .login_fields__submit input {
        border-radius: 50px;
        background: transparent;
        padding: 10px 50px;
        border: 2px solid #4FA1D9;
        color: #4FA1D9;
        text-transform: uppercase;
        font-size: 11px;
        -webkit-transition-property: background,color;
                transition-property: background,color;
        -webkit-transition-duration: .2s;
                transition-duration: .2s;
    }
    .login_fields__submit input:focus {
        box-shadow: none;
        outline: none;
    }
    .login_fields__submit input:hover {
        color: white;
        background: #4FA1D9;
        cursor: pointer;
        -webkit-transition-property: background,color;
                transition-property: background,color;
        -webkit-transition-duration: .2s;
                transition-duration: .2s;
    }

    body .login_fields .icon {
        position: absolute;
        z-index: 1;
        left: 36px;
        color: #fff;
    }
    body .login_fields .icon{
        top:9px;
    }
    body .login_fields input[type='text']{
        color: #afb1be;
        width: 190px;
        margin-top: -2px;
        background: rgba(57, 61, 82, 0);
        left: 0;
        padding: 10px 65px;
        border-top: 2px solid rgba(57, 61, 82, 0);
        border-bottom: 2px solid rgba(57, 61, 82, 0);
        border-right: none;
        border-left: none;
        outline: none;
        font-family: 'Gudea', sans-serif;
        box-shadow: none;
    }
    .login{
        box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
        opacity: 1;
        top: 20px;
        -webkit-transition-timing-function: cubic-bezier(0.68, -0.25, 0.265, 0.85);
        -webkit-transition-property: -webkit-transform,opacity,box-shadow,top,left;
        transition-property: transform,opacity,box-shadow,top,left;
        -webkit-transition-duration: .5s;
        transition-duration: .5s;
        -webkit-transform-origin: 161px 100%;
        -ms-transform-origin: 161px 100%;
        transform-origin: 161px 100%;
        -webkit-transform: rotateX(0deg);
        transform: rotateX(0deg);
        position: relative;
        width: 240px;
        /* border-top: 2px solid #D8312A; */
        height: 230px;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: 0;
        bottom: 0;
        padding: 100px 40px 40px 40px;
        background: #35394a;
        background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, #35394a), color-stop(100%, rgb(0, 0, 0)));
        background: -webkit-linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
        background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='rgba(53, 57, 74, 0)', endColorstr='rgb(0, 0, 0)',GradientType=1 );
    }

    .login_fields {
        height: 208px;
        position: absolute;
        left: 0;
    }

    .login_title{
        color: #D3D7F7;
        height: 35px;
        text-align: left;
        font-size: 16px;
    }

    .login .disclaimer {
        position: absolute;
        bottom: 20px;
        left: 35px;
        width: 250px;
    }
    .login .disclaimer p{
        color: #D3D7F7;
        font-size: 10px;
        text-align: left;

    }

        .login-wrap{
            position: relative;
            width:100%;
            height:100%;
            background: url('/static/img/login/bg1.png') no-repeat;
            background-size: cover;
        }
        .ms-title{
            position: absolute;
            top:50%;
            width:100%;
            margin-top: -230px;
            text-align: center;
            font-size:30px;
            color: #fff;

        }
        .ms-login{
            position: absolute;
            left:50%;
            top:50%;
            width:300px;
            height:160px;
            margin:-150px 0 0 -190px;
            padding:40px;
            border-radius: 5px;
            background: #fff;
        }
        .login-btn{
            text-align: center;
        }
        .login-btn button{
            width:100%;
            height:36px;
        }
</style>