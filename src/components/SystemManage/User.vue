<template>
    <div>
        <el-input  class="search" v-model="form.name" size="mini" placeholder="请输入登录名或姓名"></el-input>
        <el-button type="primary" @click="onSubmit" size="mini" class="el-icon-view">查询用户</el-button>
        <el-button type="primary"  size="mini" class="el-icon-edit" @click="addFormBtn">新增用户</el-button>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="username"
                    label="登录名"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="realname"
                    label="真实姓名"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="usetype"
                    :formatter="formatter"
                    label="用户类别"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="constantitem.constantName"
                    label="医生职称"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="department.deptname"
                    label="所在科室"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="registlevel.registname"
                    label="挂号级别"
                    width="100">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="currentChange">
        </el-pagination>


        <el-dialog
                :visible.sync="dialogVisible1"
                title="新增用户"
                width="50%"
                center
        >

            <el-form ref="form" :model="addForm" label-width="80px" >
                <el-form-item  >
                    登录名：<el-input class="input" v-model="addForm.username" size="mini"></el-input>
                    密码：<el-input class="input" v-model="addForm.password" size="mini"></el-input>
                </el-form-item>
                <el-form-item >
                    真实姓名：<el-input class="input" v-model="addForm.realname" size="mini"></el-input>
                    所在科室: <el-select v-model="addForm.deptid" placeholder="请选择" size="mini">
                    <el-option
                            v-for="item in deptNameoptions"
                            :key="item.id"
                            :label="item.deptname"
                            :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item >
                    用户类别:<el-select v-model="addForm.usetype"  size="mini" placeholder="请选择">
                    <el-option
                            v-for="item in usertypeoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                    医生职称:  <el-select size="mini" v-model="addForm.doctitleid" placeholder="请选择活动区域">
                    <el-option
                            v-for="item in constantnameoptions"
                            :key="item.id"
                            :label="item.constantName"
                            :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item >
                    挂号级别:<el-select size="mini" v-model="addForm.registleid" placeholder="请选择活动区域">
                    <el-option
                            v-for="item in registnameoptions"
                            :key="item.id"
                            :label="item.registname"
                            :value="item.id">
                    </el-option>
                </el-select>
                    是否参与排班：<el-radio v-model="addForm.isscheduling" label="1">是</el-radio>
                    <el-radio v-model="addForm.isscheduling" label="2">否</el-radio>
                </el-form-item>


            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="dialogVisible1 = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="saveAddForm" size="mini">保存</el-button>
                <el-button type="primary" @click="clear1" size="mini">清空</el-button>
            </span>
        </el-dialog>

        <el-dialog
                :visible.sync="dialogVisible2"
                title="修改用户"
                width="50%"
                center
        >

            <el-form ref="form" :model="updateForm" label-width="80px" >
                <el-form-item  >
                    登录名：<el-input class="input" v-model="updateForm.username" size="mini"></el-input>
                    密码：<el-input class="input" v-model="updateForm.password" size="mini"></el-input>
                </el-form-item>
                <el-form-item >
                    真实姓名：<el-input class="input" v-model="updateForm.realname" size="mini"></el-input>
                    所在科室: <el-select v-model="updateForm.deptid" placeholder="请选择"  size="mini">
                    <el-option
                            v-for="item in deptNameoptions"
                            :key="item.id"
                            :label="item.deptname"
                            :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item >
                    用户类别:<el-select v-model="updateForm.usetype" size="mini" placeholder="请选择">
                    <el-option
                            v-for="item in usertypeoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                    医生职称:  <el-select size="mini" v-model="updateForm.doctitleid" placeholder="请选择活动区域">
                    <el-option
                            v-for="item in constantnameoptions"
                            :key="item.id"
                            :label="item.constantName"
                            :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item >
                    挂号级别:<el-select size="mini" v-model="updateForm.registleid" placeholder="请选择活动区域">
                    <el-option
                            v-for="item in registnameoptions"
                            :key="item.id"
                            :label="item.registname"
                            :value="item.id">
                    </el-option>
                </el-select>
                    是否参与排班：<el-radio v-model="updateForm.isscheduling" label="是">是</el-radio>
                    <el-radio v-model="updateForm.isscheduling" label="否">否</el-radio>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="dialogVisible2 = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="saveUpdateForm" size="mini">保存</el-button>
                <el-button type="primary" @click="clear2" size="mini">清空</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserManage",
        data(){
            return{
                form:{
                    name:''
                },
                tableData: [],
                pageNum : 1,
                pageSize: 5,
                total:0,
                dialogVisible1: false,
                dialogVisible2: false,
                addForm:{
                    username:'',
                    password:'',
                    realname:'',
                    deptid:'',
                    usetype:'',
                    doctitleid:'',
                    registleid:'',
                    isscheduling:'1'
                },
                updateForm:{
                    id:'',
                    username:'',
                    password:'',
                    realname:'',
                    deptid:'',
                    usetype:'',
                    doctitleid:'',
                    registleid:'',
                    isscheduling:'1'
                },
                deptNameoptions:[],
                usertypeoptions:[{
                    value: 1,
                    label: '医院管理员'
                }, {
                    value: 2,
                    label: '挂号收费员'
                }, {
                    value: 3,
                    label: '门诊医生'
                }, {
                    value: 4,
                    label: '医技医生'
                }, {
                    value: 5,
                    label: '药房操作员'
                },{
                    value: 6,
                    label: '财务管理员'
                }],
                constantnameoptions:[],
                registnameoptions:[]
            }
        },
        mounted(){
            this.initUser();
        },
        methods:{
            formatter(row,column){
                for (let i = 0; i <this.usertypeoptions.length; i++) {
                    if(this.usertypeoptions[i].value==row.usetype){
                        return this.usertypeoptions[i].label;
                    }
                }


            },
            initUser(){
                let url='/searchUserByUsernameOrRealname?keywords=&pageNum='+this.pageNum+'&pageSize='+this.pageSize;
                this.getRequest(url).then(resp=>{
                    console.log(resp.list)
                    this.tableData=resp.list;
                    this.total=resp.total;
                })
            },
            //点击查询用户按钮
            onSubmit(){
                    let url='/searchUserByUsernameOrRealname?keywords='+this.form.name+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize;
                    this.getRequest(url).then(resp=>{
                        if(resp){
                            this.tableData=resp.list;
                            this.total=resp.total;
                        }

                    })

            },
            currentChange(num){
                this.pageNum=num;
                this.initUser();
            },
            handleDelete(row){
                this.putRequest('/delUser?id='+row.id).then(resp=>{
                    if(resp){
                        this.initUser();
                    }
                })
            },
            //点击编辑按钮
            handleEdit(row){
                    this.dialogVisible2=true;
                    this.updateForm.id=row.id;
                    this.updateForm.username=row.username;
                    this.updateForm.password=row.password;
                    this.updateForm.realname=row.realname;
                    this.updateForm.deptid=row.department.id;
                    this.updateForm.usetype=row.usetype;
                    this.updateForm.doctitleid=row.constantitem.id;
                    this.updateForm.registleid=row.registlevel.id;
                    this.updateForm.isscheduling=row.isscheduling;
                    this.getDeptName();
                    this.getConstantname();
                    this.getRegistName();

            },
            saveUpdateForm(){

                this.putRequest('/updateUser',this.updateForm).then(resp=>{

                    if(resp){
                        this.dialogVisible2=false;
                        this.initUser();
                    }
                })
            },
            clear1(){
                this.addForm.username='';
                this.addForm.password='';
                this.addForm.realname='';
                this.addForm.doctitleid='';
                this.addForm.deptid='';
                this.addForm.usetype='';
                this.addForm.registleid='';
                this.addForm.isscheduling='1';
            },
            clear2(){
                this.updateForm.username='';
                this.updateForm.password='';
                this.updateForm.realname='';
                this.updateForm.doctitleid='';
                this.updateForm.deptid='';
                this.updateForm.usetype='';
                this.updateForm.registleid='';
                this.updateForm.isscheduling='1';
            },
            //点击保存按钮
            saveAddForm(){
                this.postRequest('/addUser',this.addForm).then(resp=>{
                    if(resp){
                        this.dialogVisible1=false;
                        this.initUser();
                    }
                });
            },
            //点击增加按钮
            addFormBtn(){
                this.dialogVisible1=true;
                this.getDeptName();
                this.getConstantname();
                this.getRegistName();
            },
            //获取科室职称列表
            getDeptName(){
                this.getRequest('/searchDeptName').then(resp=>{
                    this.deptNameoptions=resp;
                })
            },
            //获取 医生职称 列表
            getConstantname(){
                this.getRequest('/searchAllUserName').then(resp=>{
                    this.constantnameoptions=resp;
                })
            },
            //获取 获取挂号级别列表
            getRegistName(){
                this.getRequest('/searchRegistlevel').then(resp=>{
                    this.registnameoptions=resp;

                })
            }
        }
    }
</script>

<style scoped>
    .search{
        width: 20%;
    }
    .input{
        width: 100px !important;
    }
    .title{
        text-align: center;
    }
    .dialog-footer{
        margin-right: 150px;

    }
</style>