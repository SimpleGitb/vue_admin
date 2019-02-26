<template>
    <div class="editData">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 修改资料</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="formList">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="修改邮箱">
                            <el-input type="email" placeholder="pony@qq.com" v-model="ruleForm.email" class="alertInput"></el-input>
                        </el-form-item>
                        <el-form-item label="修改手机">
                            <el-input type="number" placeholder="13888888888" v-model="ruleForm.phone" class="alertInput"></el-input>
                        </el-form-item>
                        <el-form-item label="旧密码">
                            <el-input type="password" placeholder="123456" v-model="ruleForm.oldPass" class="alertInput"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码">
                            <el-input type="password" placeholder="123456" v-model="ruleForm.newPass" class="alertInput"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码">
                            <el-input type="password" placeholder="123456" v-model="ruleForm.confirmPass" class="alertInput"></el-input>
                        </el-form-item>
                    </el-form>
                <div slot="footer" class="dialog-footer">
                         <el-button>取消</el-button>
                          &nbsp;&nbsp;
                         <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                includedComponents:'baseform',
                ruleForm: {
                    email: '',
                    phone: '',
                    oldPass:'',
                    newPass:'',
                    confirmPass:''
                },
                rules: {
                    email: [
                        {  message: '请填写邮箱', trigger: 'blur' },               
                    ],
                    phone: [
                        {  message: '请填写手机', trigger: 'blur' },               
                    ],
                    oldPass:[
                        {  message: '请填写旧密码', trigger: 'blur'}
                    ],
                    newPass:[
                        {  message: '请填写新密码', trigger: 'blur' }
                    ],
                    confirmPass: [
                        {  message: '请填写确认密码', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            cancle(){

            },
            submitForm(formName) {
               this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(localStorage.baseUrl+'/person',{
                                email:this.ruleForm.email,
                                oldPass:this.ruleForm.oldPass,
                                password:this.ruleForm.newPass,
                                password_confirmation:this.ruleForm.confirmPass,
                                phone:Number(this.ruleForm.phone)
                        }).then((res)=>{
                            let data = res.data;
                            if(!data.status){
                                this.$message.error(data.msg);
                            }else{
                                this.$message.success(data.msg);
                                this.ruleForm.confirmPass = '';
                                this.ruleForm.newPass = '';
                            }
                        })
                    } else {
                                return false;
                    }
                });
            }
        },
        created(){
            this.$axios.get(localStorage.baseUrl+'/person',{
                         headers:{
								'Authorization':localStorage.JWT_TOKEN
						},
            }).then((res)=>{
                if(res.data.status == 403){
                    window.location.href = '/login';
                    return;
                }
                let data = res.data.data;
                this.ruleForm.email = data.email;
                this.ruleForm.phone = Number(data.phone);
                this.ruleForm.oldPass = data.password;
            })
        }
    }
</script>
<style>
        .editData .el-breadcrumb .el-breadcrumb__inner{
            font-size:18px;
        }
</style>
<style scope lang="scss">
    .formList{
        width: 450px;
        input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
                -webkit-appearance:textfield;
        }
    }
    .clear{
        clear: both;
    }

    .formList {
        .dialog-footer{
            display: flex;
            justify-content: flex-end;
        }
    }

    .el-form-item--small .el-form-item__label{
        text-align: left;
    }
</style>