<template>
    <div>
        <div class="blogHeader">
            <el-input style="width: 200px; margin-right:3px;" size="mini" prefix-icon="el-icon-search" placeholder="请输入科室编码或名称" v-model="keywords"></el-input>
            <el-button class="el-icon-view" size="mini" type="primary" @click="searchDepartment">查询科室 </el-button>
            <el-button class="el-icon-edit" size="mini" type="primary" @click="addDepartment"> 新增科室</el-button>
        </div>
        <div>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection">
                </el-table-column>
                <el-table-column
                        prop="deptcode"
                        label="科室编码"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="deptname"
                        label="科室名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="constant.constantName"
                        label="科室分类">
                </el-table-column>

                    <el-table-column
                            prop="depttype"
                            :formatter="formatter"
                            label="科室类别">
                    </el-table-column>

                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row) ">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <el-button @click="doDelMany" type="danger" size="small" style="margin-top:3px;" :disabled="delManyEabled" >批量删除</el-button>
        <el-pagination
                style="display: inline-block"
                hide-on-single-page
                background
                layout="prev, pager, next"
                :page-count="pageNum"
                :page-size="pageSize"
                @current-change="currentChange"
                :total="total">
        </el-pagination>


        <!--新增科室 -->
        <div>
            <el-dialog
                    title="新增科室"
                    :visible.sync="centerDialogVisible1"
                    width="30%"
                    center>
                科室编码：<el-input v-model="department.deptcode"  size="mini" class="abc"></el-input>
                科室名称：<el-input v-model="department.deptname"  size="mini" class="abc"></el-input>

                科室分类：<el-select v-model="department.deptcategoryid" placeholder="请选择" size="mini" class="abc">
                <el-option
                        v-for="item in deptList"
                        :key="item.id"
                        :label="item.constantName"
                        :value="item.id">
                </el-option>
            </el-select>
                科室类别：<el-select v-model="department.depttype" placeholder="请选择"size="mini" class="abc">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>

                <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="centerDialogVisible" size="mini">取 消</el-button>
                <el-button type="primary" @click="addDept" size="mini">保存</el-button>
              </span>
            </el-dialog>
        </div>
        <!--编辑科室 -->
        <div>
            <el-dialog
                    title="编辑科室"
                    :visible.sync="centerDialogVisible2"
                    width="30%"
                    center>
                科室编码：<el-input v-model="department2.deptcode"  size="mini" class="abc"></el-input>
                科室名称：<el-input v-model="department2.deptname"  size="mini" class="abc"></el-input>

                科室分类：<el-select v-model="department2.deptcategoryid" placeholder="请选择" size="mini" class="abc">
                <el-option
                        v-for="item in deptList2"
                        :key="item.id"
                        :label="item.constantName"
                        :value="item.id">
                </el-option>
            </el-select>
                科室类别：<el-select v-model="department2.depttype" placeholder="请选择"size="mini" class="abc">
                <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>

                <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="centerDialogVisibleS1 " size="mini">取 消</el-button>
                <el-button type="primary" @click="updataDept" size="mini">保存</el-button>
              </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Department",
        data(){
            return{
                tableData:[],
                centerDialogVisible1: false,
                centerDialogVisible2: false,
                keywords:'',
                options:[{
                    label:'临床',
                    value:1
                },{
                    label:'医技',
                    value:2
                },{
                    label:'财务',
                    value:3
                },{
                    label:'行政',
                    value:4
                },{
                    label:'其他',
                    value:5
                }],
                options2:[{
                    label:'临床',
                    value:1
                },{
                    label:'医技',
                    value:2
                },{
                    label:'财务',
                    value:3
                },{
                    label:'行政',
                    value:4
                },{
                    label:'其他',
                    value:5
                }],
                pageSize:10,
                pageNum:1,
                total: 0,
                delManyEabled:true,
                input3:'',
                input4:'',
                pageSize1:10,
                pageNum1:1,
                deptTypeValue:'',
                deptList: [],
                deptList2: [],
                department:{
                    deptcategoryid:'',
                    depttype:'',
                    deptcode:'',
                    deptname:'',
                },
                department2:{
                    id:'',
                    deptcategoryid:'',
                    depttype:'',
                    deptcode:'',
                    deptname:'',
                },
                ids:[],


            }
        },
        mounted() {
            this.searchDepartment();
        },
        methods:{
            formatter: function (row, column) {
                for (let i = 0; i <this.options.length ; i++) {
                    if(this.options[i].value==row.depttype){
                        return this.options[i].label
                    }
                }
            },
            centerDialogVisible(){
                this.centerDialogVisible1=false;
            },
            centerDialogVisibleS1(){
                this.centerDialogVisible2=false;
            },
            /*删除*/
            handleDelete(row){
                console.log(row.id)

                this.$confirm('此操作将永久删除所选信息, 是否继续?', '批量删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest('/delDept?id='+row.id).then(resp=> {
                        if (resp) {
                            this.searchDepartment();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*批量删除*/
            doDelMany() {
                this.$confirm('此操作将永久删除所选信息, 是否继续?', '批量删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delManyRequest('/delManyDept?',this.ids).then(resp => {
                        if (resp) {
                            this.searchDepartment();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //多选框监听
            handleSelectionChange(data){
                if(data.length > 0){
                    this.delManyEabled = false;
                    this.ids = [];
                    for (let i in data) {
                        this.ids.push(data[i].id)
                    }
                }else{
                    this.delManyEabled = true;
                }
            },
            /*查询科室*/
            serchDept() {
                this.getRequest('/searchAllDeptca').then(resp => {
                    if (resp) {
                        console.log(resp);
                        this.deptList = resp;
                        this.deptList2 = resp;

                    }
                })
            },
            //编辑科室
            updataDept(){

                this.putRequest('/updateDept',this.department2).then(resp=>{
                    if (resp){
                        console.log(resp)
                        this.centerDialogVisible2=false;
                        this.searchDepartment();
                    }
                })
            },
            handleEdit(row){
                this.department2.id=row.id
                this.department2.deptcategoryid=row.constant.id
                this.department2.depttype=row.depttype
                this.department2.deptcode=row.deptcode
                this.department2.deptname=row.deptname
                console.log(row)
                this.centerDialogVisible2=true;
                this.deptTypeValue=row.depttype;
                this.serchDept();
            },

            //新建科室
            addDept(){
                this.postRequest('/addDept',this.department).then(resp=>{
                    if (resp){
                        this.centerDialogVisible1=false;
                        this.searchDepartment();
                    }
                })
            },
            addDepartment(){
                this.centerDialogVisible1=true;
                this.serchDept();

            },
            /*分页pageNum更新*/
            currentChange(pageNum) {
                this.pageNum = pageNum;
                this.searchDepartment();
            },
            //输入框查询
            searchDepartment(){
                this.getRequest('/searchDept?keywords='+this.keywords+'&pageSize='+this.pageSize+'&pageNum='+this.pageNum).then(resp=>{
                    if (resp){
                        this.total = resp.total;
                        this.tableData=resp.list;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .blogHeader button{
        margin-left: 50px;
    }
    .abc{
        width: 105px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
</style>