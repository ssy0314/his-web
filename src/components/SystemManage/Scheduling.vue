<template>
    <div>
       <span class="demonstration" style="font-size: 14px">开始时间</span>
            <el-date-picker
                    v-model="startDate"
                    type="date"
                    placeholder="选择日期"
                    size="mini"
                    class="date"
                    value-format="yyyy-MM-dd">
            </el-date-picker>
            <span class="demonstration" style="font-size: 14px">结束时间</span>
            <el-date-picker
                    v-model="endDate"
                    type="date"
                    placeholder="选择日期"
                    size="mini"
                    class="date"
                    value-format="yyyy-MM-dd">
            </el-date-picker>
        <el-button type="primary" class="el-icon-view" size="mini" style="margin: 0 8px" @click="searchScheduling">查询医生排班</el-button>
        <el-button type="primary" class="el-icon-edit" size="mini" style="margin: 0 8px" @click="addVisible=true">新增排班规则</el-button>
        <el-button type="primary" class="el-icon-view" size="mini" style="margin: 0 8px" @click="searchVisible=true">查询排班规则（生成排班计划）</el-button>
        <el-table
                ref="multipleTable"
                :data="scheduingData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @select="select">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="scheddate"
                    label="日期">
            </el-table-column>
            <el-table-column
                    prop="deptname"
                    label="科室">
            </el-table-column>
            <el-table-column
                    prop="realname"
                    label="医生">
            </el-table-column>
            <el-table-column
                    prop="noon"
                    label="午别">
            </el-table-column>
            <el-table-column
                    prop="registname"
                    label="挂号级别">
            </el-table-column>
            <el-table-column
                    prop="registquota"
                    label="挂号限额">
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total"
                id="scheduling">
        </el-pagination>
        <!-- 新增排班规则       -->
        <el-dialog
                :visible.sync="addVisible"
                width="80%"
                center>
            <div slot="title" class="el-dialog-title" style="font-size: 14px">新增排班规则</div>
            <div style="margin: 8px auto;width: 45%">
                <!--科室选择            -->
                <span style="font-size: 12px">科室选择：</span>
                <el-select v-model="adddeptvalue" placeholder="科室" size="mini"  style="width: 100px;margin-right:8px">
                    <el-option
                            v-for="item in adddeptoptions"
                            :key="item.id"
                            :label="item.deptname"
                            :value="item.id">
                    </el-option>
                </el-select>
                <!--挂号级别选择            -->
                <span style="font-size: 12px">挂号级别：</span>
                <el-select v-model="registvalue" placeholder="挂号级别" size="mini" style="width: 100px;margin-right:8px">
                    <el-option
                            v-for="item in registoptions"
                            :key="item.id"
                            :label="item.registname"
                            :value="item.id">
                    </el-option>
                </el-select>
                <el-button type="primary" size="mini" @click="searchUserByDeptAndRegist">查询</el-button>
                <el-button type="primary" class="el-icon-refresh" size="mini" @click="addclear">清空</el-button>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="addSchedData"
                    tooltip-effect="dark"
                    style="width: 100%;font-size: 12px;"
                    @selection-change="addhandleSelectionChange"
                    border
                    align="center">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="realname"
                        label="医生名称"
                        align="center"
                       >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="星期一上午"
                        align="center"
                        >
                    <el-checkbox true-label="1" false-label="0" @change="change"></el-checkbox>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="星期一下午"
                        align="center"
                       >
                    <el-checkbox true-label="1" false-label="0"></el-checkbox>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="星期二上午"
                        align="center"
                >
                    <el-checkbox true-label="1" false-label="0"></el-checkbox>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="星期二下午"
                        align="center"
                >
                    <el-checkbox true-label="1" false-label="0"></el-checkbox>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="星期三上午"
                        align="center"
                >
                    <el-checkbox true-label="1" false-label="0"></el-checkbox>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="星期三下午"
                        align="center"
                >
                    <el-checkbox true-label="1" false-label="0"></el-checkbox>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="星期四上午"
                        align="center"
                >
                    <el-checkbox true-label="1" false-label="0"></el-checkbox>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="星期四下午"
                        align="center"
                >
                    <el-checkbox true-label="1" false-label="0"></el-checkbox>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="星期五上午"
                        align="center"
                >
                    <el-checkbox true-label="1" false-label="0"></el-checkbox>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="星期五下午"
                        align="center"
                >
                    <el-checkbox true-label="1" false-label="0"></el-checkbox>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="星期六上午"
                        align="center"
                >
                    <el-checkbox  true-label="1" false-label="0"></el-checkbox>

                </el-table-column>
                <el-table-column
                        prop="address"
                        label="星期六下午"
                        align="center"
                >
                    <el-checkbox  true-label="1" false-label="0"></el-checkbox>

                </el-table-column>
                <el-table-column
                        prop="name"
                        label="星期日上午"
                        align="center"
                >
                    <el-checkbox  true-label="1" false-label="0"></el-checkbox>

                </el-table-column>
                <el-table-column
                        prop="address"
                        label="星期日下午"
                        align="center"
                >
                    <el-checkbox true-label="1" false-label="0"></el-checkbox>
                </el-table-column>
            </el-table>
            <div style="margin: 0 auto;width: 18%;margin-top: 15px">
                <span style="font-size: 12px">规则名称：</span><el-input size="mini" v-model="rulename" placeholder="规则名称" style="width: 100px;margin-bottom: 8px"></el-input><span style="color: red">*</span>
            </div>
            <span slot="footer" class="el-dialog-footer">
                <el-button @click="addVisible = false" type="warning" size="mini">取 消</el-button>
                <el-button @click="addVisible = false" type="primary" size="mini" :disabled="disabled" style="display: none" >保存</el-button>
            </span>
        </el-dialog>
        <!--  查询排班规则（生成排班计划）      -->
        <el-dialog
                :visible.sync="searchVisible"
                width="50%"
                center>
            <div slot="title" class="el-dialog-title" style="font-size: 14px">新增排班规则</div>
            <div style="margin: 8px auto;width: 50%">
                <!--科室选择            -->
                <span style="font-size: 12px">科室选择：</span>
                <el-select v-model="deptvalue" placeholder="科室" size="mini"  style="width: 100px;margin-right:8px">
                    <el-option
                            v-for="item in deptoptions"
                            :key="item.id"
                            :label="item.deptname"
                            :value="item.id">
                    </el-option>
                </el-select>
                <!--挂号级别选择            -->
                <el-button type="primary" size="mini">查询</el-button>
                <el-button type="primary" class="el-icon-refresh" size="mini" @click="clear">清空</el-button>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="addSchedData"
                    tooltip-effect="dark"
                    style="width: 100%;font-size: 12px;"
                    @selection-change="ruleHandleSelectionChange"
                    size="small"
                    align="center">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="规则名称"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="科室名称"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="医生名称"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="时间"
                        align="center"
                >
                </el-table-column>

            </el-table>
            <div style="margin: 0 auto;width: 90%;margin-top: 15px">
                <span style="font-size: 12px">开始时间：</span>
                <el-date-picker
                        v-model="ruleStartDate"
                        type="date"
                        placeholder="选择日期"
                        size="mini"
                        class="date"
                        style="margin: 0"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <span style="color: red;margin-right: 8px">*</span>
                <span style="font-size: 12px">结束时间：</span>
                <el-date-picker
                        v-model="ruleEndDate"
                        type="date"
                        placeholder="选择日期"
                        size="mini"
                        class="date"
                        style="margin: 0"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <span style="color: red;margin-right: 8px">*</span>
                <el-button type="primary" size="mini" :disabled="disabled">选择规则生成排班计划</el-button>
            </div>
            <span slot="footer" class="el-dialog-footer">
                <el-button @click="searchVisible = false" type="primary" size="mini">关闭</el-button>
            </span>


        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Scheduling",
        data(){
            return{
                endDate:'',
                startDate:'',
                ruleEndDate:'',
                ruleStartDate:'',
                scheduingData:[],
                addSchedData:[],
                addVisible:false,
                searchVisible:false,
                adddeptoptions:[],
                deptoptions:[],
                registoptions:[],
                adddeptvalue:'',
                deptvalue:'',
                registvalue:'',
                rulename:'',
                ruleDisable:true,
                disabled:true,
                pageNum:1,
                pageSize:5,
                total:0,
                checked:''
            }
        },
        methods:{
            change(data){
                console.log(data)
            },
            addhandleSelectionChange(data){
                console.log(data)
            },
            select(data,row){
                console.log(data)
                console.log(row)
            },
            ruleHandleSelectionChange(data){

            },
            searchUserByDeptAndRegist(){

                this.getRequest('/searchUserByDeptAndRegist?adddeptvalue='+this.adddeptvalue+'&registvalue='+this.registvalue).then(resp=>{
                    if(resp){
                        this.addSchedData=resp;
                    }
                })
            },
            clear(){
                this.deptvalue='';
            },
            addclear(){
                this.adddeptvalue='';
                this.registvalue='';
            },
            handleSelectionChange(data){
                console.log(data)
            },
            searchScheduling(){
                this.getRequest('/searchScheduing?pageNum='+this.pageNum+'&pageSize='+this.pageSize+'&startDate='+this.startDate+'&endDate='+this.endDate).then(resp=>{
                    if(resp){
                        this.scheduingData=resp.list;
                        this.total=resp.total;
                    }
                })
            },
            handleCurrentChange(data){
                this.pageNum=data;
                this.searchScheduling();
            },
            initDept(){
                this.getRequest('/searchDeptName').then(resp=>{
                    if(resp){
                        this.deptoptions=resp;
                        this.adddeptoptions=resp;
                    }
                })
            },
            initRegistLeve(){
                this.getRequest('/searchRegistlevel').then(resp=>{
                    if(resp){
                        this.registoptions=resp;
                    }
                })
            },
        },
        mounted() {
            this.searchScheduling();
            this.initDept();
            this.initRegistLeve();
        }

    }

</script>

<style scoped>
    .date{
        width: 130px!important;
        margin: 0 8px;
    }

</style>