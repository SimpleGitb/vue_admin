<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="'iconfont '+item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            <i :class="'iconfont '+subItem.icon"></i><span slot="title">{{ subItem.title }}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="'iconfont ' + item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                iconfont:'iconfont',
                items: [
                    {
                        icon: 'icon-xitong1',
                        index: 'application',
                        title: '应用程序名单'
                    },
                    {
                        icon: 'icon-mingdan',
                        index: 'listcheck',
                        title: '名单审核'
                    },
                    {
                        icon: 'icon-baogaochaxun',
                        index: 'reportquery',
                        title: '报告查询'
                    },
                    {
                        icon: 'icon-yonghuguanli',
                        index: 'usermanagement',
                        title: '用户管理'
                    },
                    {
                        icon: 'icon-yonghuzuguanli',
                        index: 'usergroup',
                        title: '用户组管理'
                    },
                    {
                        icon: 'icon-xitong',
                        index: 'dashboard',
                        title: '系统基线'
                    }
                    // {
                    //     icon: 'icon-guanlis',
                    //     index: '1',
                    //     title: '1',
                    //     subs: [
                    //         {
                    //             icon: 'icon-wangzhan',
                    //             index: 'assets',
                    //             title: '1-1'
                    //         }
                    //     ]
                    // },
                    //  {
                    //     icon: 'icon-xinxiguanli',
                    //     index: '2',
                    //     title: '2',
                    //     subs: [
                    //         {
                    //             icon: 'icon-weibiaoti2010101',
                    //             index: 'unitlist',
                    //             title: '2-1',
                    //         }
                    //     ]
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
 @import url('//at.alicdn.com/t/font_754796_0cgprhtaqo8d.css');
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 200px;
    }
    .sidebar > ul {
        height:100%;
    }

    .sidebar .el-menu .iconfont{
                font-size: 20px;
                padding-right: 10px;
    }

     .sidebar .el-menu .el-menu:nth-of-type(1) .iconfont{
                font-size: 18px;
                padding-right: 10px;
     }

     .sidebar .el-menu .el-menu-item .icon-xinxiguanli{
         font-size: 18px;
     }

     .sidebar .el-menu .el-menu-item .icon-shouye{
                font-size: 20px;
                padding-right: 10px;
     }
</style>
