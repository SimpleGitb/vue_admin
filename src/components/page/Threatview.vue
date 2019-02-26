<template>
    <div class="threatview">
		<div class="crumbs">
			<el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="iconfont icon-yingyongshuli"></i> 威胁详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <div>
                    <el-tabs v-model="activeName2" @tab-click="tabclick">
                        <el-tab-pane label="最新威胁" name="threat">
                            <div class="left_l">
                                <!-- 省市区三级联动 -->
                                <img src="/static/img/monitoring/screening.png">
                                  <el-select v-model="valueSelect1" multiple placeholder="请选择" style="width:490px" @change="selectType1">
                                        <el-option
                                        v-for="item in options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                                <!-- 搜索类型 -->
                            </div>
                            <div class="right">
                                 <el-input @keyup.enter.native="sendSearch" placeholder="请输入内容" v-model="select_word" class="input-with-select">
                                        <el-button slot="append" icon="el-icon-search" @click="sendSearch"></el-button>
                                </el-input>
                            </div>
                            <div class="table-threat">
                                    <!-- <div class="tips" ref="tips" :style="{left:tipsLeft,top:tipsTop,display:display}">
                                        <span>{{tipsMsgs}}</span>
                                        <a v-show="isshow" href="javascript:;" @click="hrefAsset" class="view">立即查看</a>
                                        <div class="border"></div>
                                        <a href="javascript:;" class="close" @click="closeTips">x</a>
                                    </div> -->
                                     <el-table border ref="multipleTable" :data="tableData3" tooltip-effect="dark"  @selection-change="handleSelectionChange">
                                        <el-table-column label="主管单位" width="150">
                                                <template slot-scope="scope">
                                                                {{ scope.row.owner }}
                                                </template>
                                        </el-table-column>
                                        <el-table-column prop="" label="单位">
                                            <template slot-scope="scope">
                                                                {{ scope.row.name }}
                                                </template>
                                        </el-table-column>
                                         <el-table-column prop="" label="URL">
                                            <template slot-scope="scope">
                                                                {{ scope.row.url }}
                                            </template>
                                        </el-table-column>
                                          <el-table-column prop="" label="敏感链接">
                                            <template slot-scope="scope">                                               
                                                                {{ scope.row.link }}
                                            </template>
                                        </el-table-column> 
                                          <el-table-column prop="" label="发生时间">
                                            <template slot-scope="scope">
                                                        <div v-if="scope.row.event == 0" class="tipsbox">
                                                            <el-popover
                                                                    placement="top-start"
                                                                    trigger="hover"
                                                                    content="该站点从未发生过威胁">
                                                                <el-button slot="reference">{{ scope.row.created_at }}</el-button>
                                                            </el-popover>
                                                        </div>
                                                        <div v-if="scope.row.event == 1" class="tipsbox">
                                                            <el-popover
                                                                    placement="top-start"
                                                                    trigger="hover"
                                                                    content="该站点第一次发生威胁">
                                                                <el-button slot="reference">{{ scope.row.created_at }}</el-button>
                                                            </el-popover>
                                                        </div>
                                                        <div v-if="scope.row.event !== 0 && scope.row.event !== 1" class="tipsbox">
                                                            <el-popover
                                                                    placement="top-start"
                                                                    trigger="hover"
                                                                    >
                                                                    上次发生威胁事件时间:{{scope.row.event}}
                                                                    &nbsp;&nbsp;
                                                                    <a href="javascript:;" class="view" @click="hrefAsset(scope.row.site_id)">点击查看</a>
                                                                <el-button slot="reference">{{ scope.row.created_at }}</el-button>
                                                            </el-popover>
                                                        </div>
                                                                
                                                </template>
                                        </el-table-column>
                                         <el-table-column prop="" label="关键词">
                                            <template slot-scope="scope">                                                  
                                                                {{ scope.row.keywords }}
                                               </template>
                                        </el-table-column>
                                        <el-table-column prop="" label="类型" width="120">
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.type == 'pic_hack'">
                                                    <img src="/static/img/monitoring/chain.png">
                                                    图片篡改
                                                </div>  
                                                <div  v-if="scope.row.type == 'js_link'">
                                                    <img src="/static/img/monitoring/script.png">
                                                    恶意脚本
                                                </div>
                                                <div  v-if="scope.row.type == 'hijack'">
                                                    <img src="/static/img/monitoring/event.png">
                                                    劫持事件
                                                </div>    
                                                <div  v-if="scope.row.type == 'site_link'">
                                                    <img src="/static/img/monitoring/sensitive.png">
                                                    可疑链接
                                                </div>      
                                                 <div  v-if="scope.row.type == 'site'">
                                                    <img src="/static/img/monitoring/sensitive.png">
                                                    敏感词
                                                </div>      
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="" label="快照" width="60">
                                            <template slot-scope="scope">
                                                <a v-if="scope.row.cache" :href="scope.row.cache" target="_blank"> <i class="iconfont kuaizhao">&#xe609;</i></a>                                           
                                             </template>
                                        </el-table-column>
                                        <el-table-column label="操作" width="150">
                                            <template slot-scope="scope">
                                                <div class="btn-list">
                                                            <el-button size="mini" class="list-item blue" @click="confrim(scope.row.id)">确认</el-button>
                                                            <el-button size="mini" class="list-item orange" @click="ignore(scope.row.id)">忽略</el-button>
                                                            <el-dropdown>
                                                                <el-button size="mini">
                                                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                                                </el-button>
                                                             <el-dropdown-menu slot="dropdown">
                                                                  <el-dropdown-item>
                                                                      <template>
                                                                            <p @click="positive(scope.row.id)">误报</p>
                                                                    </template>
                                                                 </el-dropdown-item>
                                                                 <el-dropdown-item v-if="scope.row.type == 'site' || scope.row.type == 'hijack'">
                                                                      <template>
                                                                            <a style="color: #5a5e66;" :href="env+'/threat/'+scope.row.id+'/export?token='+token">导出</a>
                                                                     </template>
                                                                 </el-dropdown-item>
                                                             </el-dropdown-menu>
                                                             </el-dropdown>
                                                </div>
                                             </template> 
                                         </el-table-column>
                                    </el-table>
                                    </div>
                                        <div class="pagination">
                                        <el-pagination layout="prev, pager, next" :total="totalpage" 
                                        @current-change="changepage"
                                        >
                                        </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="待处置" class="waiteSetting" name="waiteSetting">
                            <div class="left_l">
                                <!-- 省市区三级联动 -->
                                <img src="/static/img/monitoring/screening.png">
                                  <el-select v-model="valueSelect2" multiple placeholder="请选择" style="width:490px;height:40px;" @change="selectType2">
                                        <el-option
                                        v-for="item in options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                                <!-- 搜索类型 -->
                            </div>
                            <div class="right">
                                 <el-input  @keyup.enter.native="sendSearch1" placeholder="请输入内容" v-model="select_word1" class="input-with-select">
                                        <el-button slot="append" icon="el-icon-search" @click="sendSearch1"></el-button>
                                </el-input>
                            </div>
                            <div class="table-threat">
                                     <el-table border v-loading="loading1"  ref="multipleTable" :data="tableData4" tooltip-effect="dark"  @selection-change="handleSelectionChange">
                                        <!-- <el-table-column type="selection" width="55">
                                        </el-table-column>  -->
                                        <el-table-column label="主管单位" width="150">
                                            <template slot-scope="scope">{{ scope.row.owner }}</template>
                                        </el-table-column>
                                        <el-table-column prop="" label="单位">
                                            <template slot-scope="scope">{{ scope.row.name }}</template>
                                        </el-table-column>
                                         <el-table-column prop="" label="URL">
                                            <template slot-scope="scope">{{ scope.row.url }}</template>
                                        </el-table-column>
                                          <el-table-column prop="" label="敏感链接">
                                            <template slot-scope="scope">{{ scope.row.link }}</template>
                                        </el-table-column> 
                                          <el-table-column prop="" label="发生时间">
                                            <template slot-scope="scope">{{ scope.row.created_at }}</template>
                                        </el-table-column>                                                    
                                         <el-table-column prop="" label="关键词">
                                            <template slot-scope="scope">{{ scope.row.keywords }}</template>
                                        </el-table-column>           
                                        <el-table-column prop="" label="类型" width="120">
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.type == 'pic_hack'">
                                                    <img src="/static/img/monitoring/chain.png">
                                                    图片篡改
                                                </div>  
                                                <div  v-if="scope.row.type == 'js_link'">
                                                    <img src="/static/img/monitoring/script.png">
                                                    恶意脚本
                                                </div>
                                                <div  v-if="scope.row.type == 'hijack'">
                                                    <img src="/static/img/monitoring/event.png">
                                                    劫持事件
                                                </div>    
                                                <div  v-if="scope.row.type == 'site_link'">
                                                    <img src="/static/img/monitoring/sensitive.png">
                                                    可疑链接
                                                </div>      
                                                 <div  v-if="scope.row.type == 'site'">
                                                    <img src="/static/img/monitoring/sensitive.png">
                                                    敏感词
                                                </div>      
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="" label="快照" width="60">
                                            <template slot-scope="scope">
                                                <a :href="scope.row.cache" v-if="scope.row.cache"  target="_blank"> <i class="iconfont kuaizhao">&#xe609;</i></a>                                           
                                            </template>
                                        </el-table-column>
                                    <el-table-column prop="" label="操作" width="150">
                                        <template slot-scope="scope">
                                            <div class="btn-list">
                                                    <div class="btn">
                                                        <el-button size="mini" class="list-item blue" @click="disposal(scope.row.id)">处置</el-button>
                                                    </div>
                                                    <div class="btn" v-if="scope.row.type == 'site'||scope.row.type == 'hijack'">
                                                        <a class="list-item orange" :href="env+'/threat/'+scope.row.id+'/export?token='+token">导出</a>
                                                    </div>
                                            </div>
                                        </template> 
                                    </el-table-column>
                                    </el-table>
                                    </div>
                                        <div class="pagination">
                                        <el-pagination layout="prev, pager, next" :total="totalpage1" 
                                        @current-change="changepage1"
                                        >
                                        </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="已处置" name="disposal">
                               <div class="left_l">
                                <!-- 省市区三级联动 -->
                                <img src="/static/img/monitoring/screening.png">
                                  <el-select v-model="valueSelect3" @change="selectType3" multiple placeholder="请选择" style="width:490px">
                                        <el-option
                                         v-for="item in options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                                <!-- 搜索类型 -->
                            </div>
                            <div class="right">
                                 <el-input  @keyup.enter.native="sendSearch2" placeholder="请输入内容" v-model="select_word2" class="input-with-select">
                                        <el-button slot="append" icon="el-icon-search" @click="sendSearch2"></el-button>
                                </el-input>
                            </div>
                            <div class="table-threat">
                                     <el-table border  v-loading="loading2"  ref="multipleTable" :data="tableData5" tooltip-effect="dark"  @selection-change="handleSelectionChange">
                                        <el-table-column label="主管单位" width="150">
                                            <template slot-scope="scope">{{ scope.row.owner }}</template>
                                        </el-table-column>
                                        <el-table-column prop="" label="单位">
                                            <template slot-scope="scope">{{ scope.row.name }}</template>
                                        </el-table-column>
                                         <el-table-column prop="" label="URL">
                                            <template slot-scope="scope">{{ scope.row.url }}</template>
                                        </el-table-column>
                                          <el-table-column prop="" label="敏感链接">
                                            <template slot-scope="scope">{{ scope.row.link }}</template>
                                        </el-table-column> 
                                          <el-table-column prop="" label="发生时间">
                                            <template slot-scope="scope">{{ scope.row.created_at }}</template>
                                        </el-table-column>                                                    
                                         <el-table-column prop="" label="关键词">
                                            <template slot-scope="scope">{{ scope.row.keywords }}</template>
                                        </el-table-column>           
                                        <el-table-column prop="" label="类型" width="120">
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.type == 'pic_hack'">
                                                    <img src="/static/img/monitoring/chain.png">
                                                    图片篡改
                                                </div>  
                                                <div  v-if="scope.row.type == 'js_link'">
                                                    <img src="/static/img/monitoring/script.png">
                                                    恶意脚本
                                                </div>
                                                <div  v-if="scope.row.type == 'hijack'">
                                                    <img src="/static/img/monitoring/event.png">
                                                    劫持事件
                                                </div>    
                                                <div  v-if="scope.row.type == 'site_link'">
                                                    <img src="/static/img/monitoring/sensitive.png">
                                                    可疑链接
                                                </div>      
                                                 <div  v-if="scope.row.type == 'site'">
                                                    <img src="/static/img/monitoring/sensitive.png">
                                                    敏感词
                                                </div>      
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="" label="快照" width="60">
                                            <template slot-scope="scope">
                                                <a :href="scope.row.cache" v-if="scope.row.cache"  target="_blank"> <i class="iconfont kuaizhao">&#xe609;</i></a>                                           
                                            </template>
                                        </el-table-column>
                                    <el-table-column prop="" label="操作" width="150">
                                        <template slot-scope="scope">
                                        </template> 
                                    </el-table-column>                             
                                    </el-table>
                                    </div>
                                        <div class="pagination">
                                        <el-pagination layout="prev, pager, next" :total="totalpage2" 
                                        @current-change="changepage2"
                                        >
                                        </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="误报回收站" class="positivesRecycling" name="positives">
                             <div class="left_l">
                                <!-- 省市区三级联动 -->
                                <img src="/static/img/monitoring/screening.png">
                                  <el-select  v-model="valueSelect4" @change="selectType4" multiple placeholder="请选择" style="width:490px">
                                        <el-option
                                        v-for="item in options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                                <!-- 搜索类型 -->
                            </div>
                                <div class="right">
                                 <el-input @keyup.enter.native="sendSearch3" placeholder="请输入内容" v-model="select_word3" class="input-with-select">
                                        <el-button slot="append" icon="el-icon-search" @click="sendSearch3"></el-button>
                                </el-input>
                                </div>
                            <div class="table-threat">
                                     <el-table  v-loading="loading3"  border  ref="multipleTable" :data="tableData6" tooltip-effect="dark"  @selection-change="handleSelectionChange">
                                        <el-table-column label="主管单位" width="150">
                                            <template slot-scope="scope">{{ scope.row.owner }}</template>
                                        </el-table-column>
                                        <el-table-column prop="" label="单位">
                                            <template slot-scope="scope">{{ scope.row.name }}</template>
                                        </el-table-column>
                                         <el-table-column prop="" label="URL">
                                            <template slot-scope="scope">{{ scope.row.url }}</template>
                                        </el-table-column>
                                          <el-table-column prop="" label="敏感链接">
                                            <template slot-scope="scope">{{ scope.row.link }}</template>
                                        </el-table-column> 
                                          <el-table-column prop="" label="发生时间">
                                            <template slot-scope="scope">{{ scope.row.created_at }}</template>
                                        </el-table-column>                                                    
                                         <el-table-column prop="" label="关键词">
                                            <template slot-scope="scope">{{ scope.row.keywords }}</template>
                                        </el-table-column>           
                                        <el-table-column prop="" label="类型" width="120">
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.type == 'pic_hack'">
                                                    <img src="/static/img/monitoring/chain.png">
                                                    图片篡改
                                                </div>  
                                                <div  v-if="scope.row.type == 'js_link'">
                                                    <img src="/static/img/monitoring/script.png">
                                                    恶意脚本
                                                </div>
                                                <div  v-if="scope.row.type == 'hijack'">
                                                    <img src="/static/img/monitoring/event.png">
                                                    劫持事件
                                                </div>    
                                                <div  v-if="scope.row.type == 'site_link'">
                                                    <img src="/static/img/monitoring/sensitive.png">
                                                    可疑链接
                                                </div>      
                                                 <div  v-if="scope.row.type == 'site'">
                                                    <img src="/static/img/monitoring/sensitive.png">
                                                    敏感词
                                                </div>      
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="" label="快照" width="60">
                                            <template slot-scope="scope">
                                                <a :href="scope.row.cache" v-if="scope.row.cache"  target="_blank"> <i class="iconfont kuaizhao">&#xe609;</i></a>                                           
                                            </template>
                                        </el-table-column>
                                    <el-table-column prop="" label="操作" width="150">
                                        <template slot-scope="scope">
                                            <div class="btn-list">
                                                <el-button type="primary" class="list-item blue" @click="undo(scope.row.id)">撤销</el-button>
                                            </div>
                                        </template> 
                                    </el-table-column>                             
                                    </el-table>
                                    </div>
                                        <div class="pagination">
                                        <el-pagination layout="prev, pager, next" :total="totalpage3" 
                                        @current-change="changepage3"
                                        >
                                        </el-pagination>
                                </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
        </div>
        <el-dialog title="信息" :close-on-click-modal="false" :visible.sync="editVisible" width="35%" class="confrim">
            <el-form :label-position="labelPosition" label-width="100px">
                 <el-form-item>
                               该操作将会确认该页面所有威胁 确定要确认吗？
                            </el-form-item>
                <el-form-item>
                      <el-checkbox v-model="alertData.customer">客户</el-checkbox>
                      <el-checkbox v-model="alertData.sales">销售</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-input type="textarea" resize="none" v-model="alertData.remark" placeholder="说明"></el-input>
                    </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEdit">发送</el-button>
            </div>
        </el-dialog>
        <el-dialog title="信息" :close-on-click-modal="false" :visible.sync="ignoreVisible" width="35%">
                    <el-form :label-position="labelPosition" label-width="100px">
                            <el-form-item>
                               该操作将会忽略该页面所有威胁 确定要忽略吗？
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="ignoreVisible = false">取消</el-button>
                            <el-button type="primary" @click="saveEditignore">确定</el-button>
                        </div>
        </el-dialog>
        <el-dialog title="信息" :close-on-click-modal="false" :visible.sync="positives" width="35%">
            <el-form :label-position="labelPosition" label-width="100px">
                <el-form-item>
                      该操作将会误报该页面所有威胁 确定要误报吗？
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="positives = false">取消</el-button>
                <el-button type="primary" @click="saveEditPositives">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="信息" :close-on-click-modal="false" :visible.sync="undoVisible" width="35%">
            <el-form :label-position="labelPosition" label-width="100px">
                <el-form-item>
                      该操作将会撤销该页面所有威胁 确定要撤销吗？
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="undoVisible = false">取消</el-button>
                <el-button type="primary" @click="saveEditUndo">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="信息" :close-on-click-modal="false" :visible.sync="disposalVisible" width="35%">
            <el-form :label-position="labelPosition" label-width="100px">
                <el-form-item>
                      该操作将会处置该页面所有威胁 确定要处置吗？
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="disposalVisible = false">取消</el-button>
                <el-button type="primary" @click="saveEditdisposal">确定</el-button>
            </div>
        </el-dialog> 
        </div>
    </div>
</template>
<script>
    export default {
        name:'Threatview',
        data() {
            return {
                labelPosition: 'center',
                activeName2: 'threat',
                content:'',
                loading:true,
                loading1:true,
                loading2:true,
                loading3:true,
                disabled:true,
                editVisible:false,
                disposalVisible:false,
                positives:false,
                ignoreVisible:false,
                undoVisible:false,
                display:'none',
                tableData3: [],
                tableData4: [],
                tableData5: [],
                tableData6: [],
                alertData:{
                    customer:false,
                    sales:false,
                    remark :''
                },
                options1: [{
                        value: 'hijack',
                        label: '劫持事件'
                        }, {
                        value: 'site',
                        label: '敏感词'
                        }, {
                        value: 'site_link',
                        label: '可疑链接'
                    },
                     {
                        value: 'js',
                        label: '恶意脚本'
                    },
                     {
                        value: 'pic_hack',
                        label: '图片篡改'
                     }
                ],
                multipleSelection: [],
                select_word: '',
                select_word1: '',
                select_word2: '',
                select_word3: '',
                type1:'',
                type2:'',
                type3:'',
                type4:'',
                totalpage:0,
                totalpage1:0,
                totalpage2:0,
                totalpage3:0,
                deleteArr:[],
                tipsLeft:'0px',
                tipsTop:'0px',
                cpage:1,
                selectedAlertAdress: [],
                options2: [],
                id:'',
                valueSelect1:'',
                valueSelect2:'',
                valueSelect3:'',
                valueSelect4:'',
                positiveId:'',
                ignoreId:'',
                undoId:'',
                disposalId:'',
                timer:null,
                isshow:true,
                tipsMsgs:'',
                row:{},
                token:'',
                role:''
            }
        },
        methods: {
            saveEdit(){
                this.$axios.post(localStorage.baseUrl+'/threat/'+this.id+'/confirm',{
                        owner:Number(this.alertData.customer),
                        salesman:Number(this.alertData.sales),
                        remark:this.alertData.remark
                }).then((res)=>{
                    if(!res.data.status){
                        this.$message.error(res.data.msg);
                    }else{
                        this.$message.success(res.data.msg);
                        this.getDeal();
                        this.getThreat();
                        this.getpositives();
                        this.getCheck();
                    }
                        this.editVisible = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            saveEditPositives(){
                this.$axios.post(localStorage.baseUrl+'/threat/'+this.positiveId+'/check',{
                        headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                    
                }).then((res)=>{
                    if(!res.data.status){
                        this.$message.error(res.data.msg);
                    }else{
                        this.$message.success(res.data.msg);
                        this.getThreat();
                        this.getDeal();
                        this.getpositives();
                        this.getCheck();
                    }
                        this.positives = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            saveEditignore(){
                    this.$axios.post(localStorage.baseUrl+'/threat/'+this.ignoreId+'/ignore',{
                        headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                        
                    }).then((res)=>{
                    if(!res.data.status){
                        this.$message.error(res.data.msg);
                    }else{
                        this.$message.success(res.data.msg);
                        this.getThreat();
                        this.getpositives();
                        this.getDeal();
                        this.getCheck();
                    }
                        this.ignoreVisible = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            saveEditUndo(){
                this.$axios.post(localStorage.baseUrl+'/threat/'+this.undoId+'/uncheck',{
                        headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                    
                }).then((res)=>{
                    if(!res.data.status){
                        this.$message.error(res.data.msg);
                    }else{
                        this.$message.success(res.data.msg);
                        this.getThreat();
                        this.getpositives();
                        this.getCheck();
                        this.getDeal();
                    }
                        this.undoVisible = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            saveEditdisposal(){
                this.$axios.post(localStorage.baseUrl+'/threat/'+this.disposalId+'/ignore',{
                         headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                   
                }).then((res)=>{
                    if(!res.data.status){
                        this.$message.error(res.data.msg);
                    }else{
                        this.$message.success(res.data.msg);
                        this.getThreat();
                        this.getpositives();
                        this.getCheck();
                        this.getDeal();
                    }
                        this.disposalVisible = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            tabclick(tab){
                if(tab.name == 'waiteSetting'){
                    if(this.tableData4.length==0){
                        this.getDeal();
                    }
                }else if(tab.name == 'disposal'){
                    if(this.tableData5.length==0){
                        this.getpositives();
                    }
                }else if(tab.name == 'positives'){ 
                    if(this.tableData6.length==0){
                        this.getCheck();
                    }
                }
            },
            hrefAsset(id){
                var row = {
                   id:id,
                   name:'assets'
               };
               this.$router.push({  name:'assets','params': row });
            },
            closeTips(){
                   this.$refs.tips.parentElement.removeChild(this.$refs.tips);
            },
            disposal(id){
                this.disposalVisible = true;
                this.disposalId = id;
            },
            confrim(id){
                this.editVisible = true;
                this.id = id;
            },
            ignore(id){
                 this.ignoreVisible = true;
                 this.ignoreId = id;
            },
            positive(id){
              this.positives = true;
              this.positiveId = id;
            },
            selectType1(d){
                this.loading = true;
                this.type1 = d;
                this.$axios.get(localStorage.baseUrl+'/threat?page=1&limit=10&type='+d+'&search='+this.select_word,{
                         headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                   
                }).then((res)=>{
                        this.tableData3 = (res.data.data.data);
                        this.totalpage = res.data.data.count;
                        this.loading = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            selectType2(d){
                this.loading1 = true;
                this.type2 = d;
                 this.$axios.get(localStorage.baseUrl+"/threat?page=1&limit=10&deal=1&type="+d+'&search='+this.select_word1,{
                         headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                    
                 }).then((res)=>{ 
                    let data = res.data;
                    this.tableData4 = data.data.data;
                    this.totalpage1 = res.data.data.count;
                    // this.loading1 = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            selectType3(d){
                this.loading2 = true;
                this.type3 = d;
                this.$axios.get(localStorage.baseUrl+'/threat?page=1&limit=10&where=deal&type='+d+'&search='+this.select_word2,{
                          headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                  
                }).then((res)=>{
                        this.tableData5 = (res.data.data.data);
                        this.totalpage2 = res.data.data.count;          
                        this.loading2 = false;
                }).catch(v => {
                    console.log(v);
                });
            },  
            selectType4(d){
                this.loading3 = true;
                this.type4 = d;
                this.$axios.get(localStorage.baseUrl+'/threat?page=1&limit=10&where=check&type='+d+'&search='+this.select_word3,{
                         headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                   
                }).then((res)=>{
                        this.tableData6 = (res.data.data.data);
                        this.totalpage3 = res.data.data.count;
                        this.loading3 = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            changepage(t){
                this.loading = true;
               this.$axios.get(localStorage.baseUrl+"/threat?page="+t+"&limit=10&search="+this.select_word+"&type="+this.type1,{
                        headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                   
               }).then((res)=>{
                        let data = res.data;
                        this.tableData3 = data.data.data;
                        this.totalpage = Math.ceil(data.data.count);
                        this.loading = false;
               }).catch(v=>{
                    console.log(v)
               })
            },
            changepage1(t){
               this.loading1 = true;
               this.$axios.get(localStorage.baseUrl+"/threat?page="+t+"&limit=10&search="+this.select_word1+"&deal=1&type="+this.type2,{
                        headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                  
               }).then((res)=>{
                        let data = res.data;
                        this.tableData4 = data.data.data;
                        this.totalpage1 = Math.ceil(data.data.count);
                        this.loading1 = false;
               }).catch(v=>{
                    console.log(v)
               })
            },
            changepage2(t){
               this.loading2 = true;
               this.$axios.get(localStorage.baseUrl+"/threat?page="+t+"&limit=10&search="+this.select_word2+"&where=deal&type="+this.type3,{
                        headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                   
               }).then((res)=>{
                        let data = res.data;
                        this.tableData5 = data.data.data;
                        this.totalpage2 = Math.ceil(data.data.count);
                        this.loading2 = false;
               }).catch(v=>{
                    console.log(v)
               })
            },
            changepage3(t){
               this.loading3 = true;
               this.$axios.get(localStorage.baseUrl+"/threat?page="+t+"&limit=10&search="+this.select_word3+"&where=check&type="+this.type4,{
                         headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                  
               }).then((res)=>{
                        let data = res.data;
                        this.totalpage3 = Math.ceil(data.data.count);
                        this.tableData6 = data.data.data;
                        this.loading3 = false;
               }).catch(v=>{
                    console.log(v)
               })
            },
            undo(id){
                this.undoVisible = true;
                this.undoId = id;
            },
            showTips(row, column, cell, ev){
                var _this = this;
                     this.tipsTop = ev.target.offsetTop+(ev.target.offsetHeight/2) + 70 +'px';
                     this.tipsLeft = 51.5+'%';
                     this.row.id = row.site_id;
                    //  ev.path[6].children[0].innerHTML = ' <div class="border"></div>正在获取最新威胁...';
                     if(this.timer){ // 如果上一次还存在就立马停止
                         clearTimeout(this.timer);
                         this.timer = null;
                     };
                         this.display = "block";
                        //  this.timer=setTimeout(function(){
                             if(row.event == 0){
                                  _this.isshow = false;
                                  _this.tipsMsgs = '该站点从未发生过威胁';
                              }else if(row.event == 1){
                                  _this.isshow = false;
                                  _this.tipsMsgs = '该站点第一次发生威胁';
                              }else{
                                  _this.isshow = true;
                                  _this.tipsMsgs = '上次发生威胁事件时间:'+row.event;
                            }
                        //  },500);
            },
            hideTips(){
                this.display = "none";
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            alertAccount(val){  
                this.alertData.role=val;
                // console.log(val);
                for(var i=0;i<this.options2.length;i++){
                    if(!this.options2[i].name.indexOf(val)){
                        this.alertData.salesman_id = this.options2[i].id;
                    }
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            sendSearch() {
                // if(!this.select_word){
                //     this.$message.error('请输入搜索内容');
                //     return;
                // }else{
                     this.loading = true;
                     this.$axios.get(localStorage.baseUrl+"/threat?page=1&limit=10&search="+this.select_word+"&type="+this.type1,{
                        headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                         
                     }).then((res)=>{ 
                            this.tableData3 = (res.data.data.data);
                            this.totalpage = res.data.data.count;
                            this.loading = false;
                        }).catch(v => {
                            console.log(v)
                });
                // };
            },
            sendSearch1() {
                // if(!this.select_word){
                //     this.$message.error('请输入搜索内容');
                //     return;
                // }else{
                     this.loading1 = true;
                     this.$axios.get(localStorage.baseUrl+"/threat?page=1&limit=10&search="+this.select_word1+"&deal=1&type="+this.type2,{
                        headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                         
                     }).then((res)=>{ 
                            this.tableData4 = (res.data.data.data);
                            this.totalpage1 = res.data.data.count;
                            this.loading1 = false;
                        }).catch(v => {
                            console.log(v)
                });
                // };
            },
            sendSearch2() {
                // if(!this.select_word){
                //     this.$message.error('请输入搜索内容');
                //     return;
                // }else{
                     this.loading2 = true;
                     this.$axios.get(localStorage.baseUrl+"/threat?page=1&limit=10&search="+this.select_word2+"&where=deal&type="+this.type3,{
                         headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                        
                     }).then((res)=>{ 
                            this.tableData5 = (res.data.data.data);
                            this.totalpage2 = res.data.data.count;
                            this.loading2 = false;
                        }).catch(v => {
                            console.log(v)
                });
                // };
            },
            sendSearch3() {
                // if(!this.select_word){
                //     this.$message.error('请输入搜索内容');
                //     return;
                // }else{
                     this.loading3 = true;
                     this.$axios.get(localStorage.baseUrl+"/threat?page=1&limit=10&search="+this.select_word3+"&where=check&type="+this.type4,{
                        headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                         
                     }).then((res)=>{ 
                            this.tableData6 = (res.data.data.data);
                            this.totalpage3 = res.data.data.count;
                            this.loading3 = false;
                        }).catch(v => {
                            console.log(v)
                });
                // };
            },                        
            getThreat(){
                this.loading = true;
                this.$axios.get(localStorage.baseUrl+"/threat?page=1&limit=10",{
                        headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                    
                }).then((res)=>{ 
                let data = res.data;
                if(res.data.status == 403){
                        window.location.href = '/login';
                        return;
                }
                this.totalpage = Math.ceil(data.data.count);
                this.tableData3 = data.data.data;
                this.loading = false;
                }).catch(v => {
                    console.log(v)
                });
            },
            getDeal(){
                this.loading1 = true;
                this.$axios.get(localStorage.baseUrl+"/threat?page=1&limit=10&deal=1",{
                        headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                    
                }).then((res)=>{ 
                    let data = res.data;
                    this.totalpage1 = Math.ceil(data.data.count);
                    this.tableData4 = data.data.data;
                    this.loading1 = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            getpositives(){
                    this.loading2 = true;
                    this.$axios.get(localStorage.baseUrl+"/threat?limit=10&page=1&where=deal",{
                         headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                       
                    }).then((res)=>{ 
                        let data = res.data;
                        this.totalpage2 = Math.ceil(data.data.count);
                        this.tableData5 = data.data.data;
                        this.loading2 = false;
                        
                    }).catch(v => {
                            console.log(v);
                    });
            },
            getCheck(){
                    this.loading3 = true;
                    this.$axios.get(localStorage.baseUrl+'/threat?page=1&limit=10&where=check',{
                         headers:{
								'Authorization':localStorage.JWT_TOKEN
                        },                       
                    }).then((res)=>{
                        let data = res.data;
                        this.totalpage3 = Math.ceil(data.data.count);
                        this.tableData6 = data.data.data;
                        this.loading3 = false;
                    }).catch(v => {
                    console.log(v);
                });
            }        
        },
        created(){
            this.env = localStorage.baseUrl;
            this.role = Boolean(Number(localStorage.client));
            if(!this.role){
                this.activeName2 = 'waiteSetting';
                this.getDeal();
            }else{
                this.getThreat();
            }
            this.token = localStorage.JWT_TOKEN.split(' ')[1];
               var text = document.getElementsByClassName('el-table__empty-text');
                for(var i=0;i<text.length;i++){
                    text[i].innerHTML = '<img src="/static/img/assets/noText.png" class="noText"><span>目前没有内容</span>';
                }
        }
        }

</script>

<style lang="scss" scoped>

        @media screen and (max-width: 1920px) {
            .threatview .btn-list .list-item{
                margin-right: 3px;
         }
        }
        @media screen and (max-width: 1380px) {
         .threatview .cell{
             padding: 0;
         }
         .threatview .btn-list .list-item{
             margin-left: 5px!important;
         }
         .threatview .btn-list .el-dropdown{
             left:5px!important;
         }
    }

    .threatview .crumbs .el-breadcrumb .el-icon-tickets{
        font-size:18px;
    }

    .threatview .crumbs .el-breadcrumb{
        font-size:18px;
    }
    ul,li{
        list-style: none;
    }

    .threatview .handle-box .left_l{
        float: left;
        .screen{
            font-size: 14px;
        }
        img{
                margin-top: 7px;
                float: left;
                margin-right: 15px;
        }
    }
    .threatview .handle-box .right{
        margin-left: 530px;
        .el-input{
            width: 230px
        }
    }
    .threatview .el-icon-picture{
        font-size: 16px;
    }
    .threatview .el-table{
        font-size:12px;
    }
    .threatview .btn-list{
        .el-dropdown{
                    width: 46px;
                    left: 6px;
                    position: relative;
                    height: 20px;
            .el-button{
                    width: 45px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 20px;
                span{
                    position: absolute;
                    left: 3px;
                    top: 3px;
                }
            }

            .el-icon--right{
                margin-left:0
            }
        }
        .list-item{
                width: 37px;
                height: 20px;
                line-height: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                float: left;
                color: #fff;
                border-color: transparent;
                margin-right: -1px;
                margin-left: 5px;
                position: relative;

        }
         .list-item.blue{
            background: #409dff
         }
        .list-item.orange{
            background: #ff9933
        }
        .list-item.pink{
            background: #f56b6b;
        }
    }
    .threatview .cell .iconfont{
        font-size: 20px;
        cursor: pointer;
    }
    .threatview .intelligence{
        padding{
            left:20px;
            right: 20px;
        }
        li{
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid #d7d7d7;
            font-size: 14px;
        }
        li:hover{
            background: #f2f2f2;
        }
        
    }
    .threatview .el-table--small {
        font-size: 14px;
        width: 100%;
    }

</style>
<style>
    .threatview .el-table td .tipsbox button{
        border: none;
        padding: 0;
        background: transparent;
    }
    .threatview .el-table td .tipsbox button span{
        font-size: 14px;
    }
    .threatview .el-table td .tipsbox button:hover{
        color: #5a5e66;
        border-color: #fff;
        background-color: transparent;
    }
    .threatview .el-table td .tipsbox button:focus{
        color: #5a5e66;
        border-color: transparent;
        background-color: transparent
    }

    .threatview .el-table tr:hover .tipsbox button,.threatview .el-table td:hover .tipsbox button{
        background: #f5f7fa;
    }


    .threatview .el-table .cell .btn-list .list-item span{
        position: absolute;
    }
    .popper__arrow{
        display: none!important;
    }
    .threatview .cell  .btn-list .el-dropdown .el-button span{
        position: absolute;
        left:3px;
        top:3px;
        padding-left: 2px;
    }
    .threatview .cell{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .threatview .el-breadcrumb .el-breadcrumb__inner .iconfont{
       font-size:20px;
    }
    .threatview .confrim .dialog-footer{
        display: flex;
        justify-content: center;
    }
    .threatview .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
        padding: 10px 15px 10px;
    }
    .threatview .el-dialog__title{
        font-size: 16px;
    }
    .waiteSetting .el-table .cell .btn-list,.positivesRecycling .el-table .cell .btn-list{
        display: flex;
        justify-content: center;
        align-items: center;
    }

     .threatview .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
    }

    .el-button+.el-button{
        margin-left: 0;
    }
    .threatview .el-dialog{
        width: 20%!important;
    }
    .threatview .el-dialog .el-form-item__content{
        margin-left:0!important;
    }
    .threatview .el-table__empty-text{
        display: flex;
        align-items:center;
    }
    .threatview .el-table__empty-text span{
        margin-left: 15px;
    }
    .threatview .noText{
        width: 24px;
        height: 24px;
    }
    .threatview .el-table thead{
        color: #666;
    }
    .threatview .el-input__inner{
        height: 37px!important;
    }

    .threatview .el-table .cell i{
        color: #333;
    }
    .popper__arrow{
        display:none!important;
    }

    .threatview .el-table__body-wrapper{
        overflow: inherit;
    }

    .threatview button{
        cursor: pointer;
    }

    .threatview tbody td{
        text-align: center;
    }

    .threatview .el-table{
        margin-top: 10px;
    }

    .threatview .el-table__header-wrapper .has-gutter tr th{
        background: #f2f2f2
    }

    .threatview .tips{
        font-size:14px;
        color:#ddd;
        padding-left: 20px;
        padding-right:20px;
        background: #4d4d4d;
        z-index: 20;
        display:none;
        position: absolute;
        padding-top:5px;
        padding-bottom: 5px;        
    }

    .threatview .tips .view{
        color: #6aa5ff;
        margin-left:10px;
    }

    .threatview .tips .close{
        color:#ddd;
        margin-left:15px;
    }
    .threatview .tips .border{
        border-left: 5px solid transparent;
        border-right: 5px solid #393D49;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        position: absolute;
        left: -10px;
        top: 32%;
    }

    .threatview .el-table th{
        text-align: center;
    }

</style>
