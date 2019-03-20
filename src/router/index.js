import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/sysdashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统基线',permission: true ,keepAlive:true},
                    children:[
                        {
                            path: '/list',
                            component: resolve => require(['../components/page/List.vue'], resolve),
                            meta: { title: '名单',permission: true ,keepAlive:true},
                            name:'list',
                        },
                        {
                            path: '/attrlist',
                            component: resolve => require(['../components/page/AttrList.vue'], resolve),
                            meta: { title: '属性名单',permission: true ,keepAlive:true},
                            name:'attrlist'
                        },
                        {
                            path: '/edit',
                            component: resolve => require(['../components/page/Edit.vue'], resolve),
                            meta: { title: '编辑',permission: true ,keepAlive:true},
                            name:'edit'
                        },
                        {
                            path: '/tree',
                            component: resolve => require(['../components/page/Tree.vue'], resolve),
                            meta: { title: '树',permission: true ,keepAlive:true}
                        },
                    ],
                    redirect:'/list',
                    name:'sysdashboard'
                },
                {
                    path: '/application',
                    component: resolve => require(['../components/page/Application.vue'], resolve),
                    meta: { title: '应用程序名单',permission: true ,keepAlive:true},
                    name:'application'
                },
                {
                    path: '/appedit',
                    component: resolve => require(['../components/page/Appedit.vue'], resolve),
                    meta: { title: '应用程序编辑',permission: true ,keepAlive:true},
                    name:'appedit'
                },
                {
                    path: '/listcheck',
                    component: resolve => require(['../components/page/ListCheck.vue'], resolve),
                    meta: { title: '名单审核',permission: true ,keepAlive:true},
                    name:'listcheck'
                },
                {
                    path: '/reportquery',
                    component: resolve => require(['../components/page/ReportQuery.vue'], resolve),
                    meta: { title: '报告查询',permission: true ,keepAlive:true},
                    name:'reportquery'
                },
                {
                    path: '/usermanagement',
                    component: resolve => require(['../components/page/UserManagement.vue'], resolve),
                    meta: { title: '用户管理',permission: true ,keepAlive:true},
                    name:'usermanagement'
                },
                {
                    path: '/monitoring',
                    component: resolve => require(['../components/page/Threatview.vue'], resolve),
                    meta: { title: '威胁总览',keepAlive:true},
                    name:'monitoring'
                },
                {
                    path: '/modifyData',
                    component: resolve => require(['../components/page/ModifyData.vue'], resolve),
                    meta: { title: '修改资料',keepAlive:true},
                    name:'modifyData'
                },
                {
                    path: '/text',
                    component: resolve => require(['../components/page/text.vue'], resolve),
                    meta: { title: 'text',keepAlive:true},
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve),
            name: 'login'
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
