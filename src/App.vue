<template>
    <div id="app">
        <transition name="move" mode="out-in">
            <!-- include="application,assetsrecord,assetsresult,baselineobserver,dashboard,baseform,monitorDetails,monitorResult,normalobserver,pushSetting,serverAsset,strategicmanage,tabs,Threatview,unIt,user" -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<style>
@import "../static/css/main.css";
@import "../static/css/color-dark.css"; /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
.content-box>.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.el-scrollbar__thumb {
  height: 15% !important;
}
.content-box>.el-scrollbar__bar.is-vertical {
  width: 8px;
}    
</style>
<script>
import Vue from 'vue';
export default {
    data () {
        return {
        }
    },
    methods: {

    },
    mounted () {

    },
    created () {
        // this.$axios.get('api/person').then((res)=>{
        //     if(res.data.data.role !== 1){
        //         window.location.href = '/403'
        //     }
        //     sessionStorage.role = res.data.data.role;
        // });

    }
};

</script>
