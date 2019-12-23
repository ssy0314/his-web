<template>
    <div>
        <div class="blogHeader">
            <el-input style="width: 200px; margin-right:3px;" size="mini" prefix-icon="el-icon-search" placeholder="请输入挂号级别编码或名称" v-model="keywords"></el-input>
            <el-button class="el-icon-view" size="mini" type="primary" @click="searchRegistlevel"> 查看挂号级别</el-button>
            <el-button class="el-icon-edit" size="mini" type="primary" @click="addRegistlevel">  新增挂号级别</el-button>
        </div>
        <div>
            <el-table
                    :data="tableData"
                    class="tableData">
                <el-table-column
                        prop="sequenceno"
                        label="显示顺序号">
                </el-table-column>
                <el-table-column
                        prop="registcode"
                        label="号别编码">
                </el-table-column>
                <el-table-column
                        prop="registname"
                        label="号别名称">
                </el-table-column>
                <el-table-column
                        prop="registfee"
                        label="挂号费">
                </el-table-column>
                <el-table-column
                        prop="registquota"
                        label="挂号限额">
                </el-table-column>
                <el-table-column label="操作" >
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
        </div>
        <el-pagination
                hide-on-single-page
                background
                layout="prev, pager, next"
                :page-count="pageNum"
                :page-size="pageSize"
                @current-change="currentChange"
                :total="total">
        </el-pagination>
        <!--新增挂号级别 -->
        <div>
            <el-dialog
                    title="新增挂号级别"
                    :visible.sync="centerDialogVisible"
                    width="35%"
                    center>
                号别编码：<el-input v-model="registlevel.registcode" placeholder="号别编码" size="mini" class="abc"></el-input>
                号别名称：<el-input v-model="registlevel.registname" placeholder="号别名称" size="mini" class="abc"></el-input>
                显示顺序号：<el-input v-model="registlevel.sequenceno" placeholder="显示顺序号" size="mini" class="abc"></el-input>
                挂号费：<el-input v-model="registlevel.registfee" placeholder="挂号费" size="mini" class="abc"></el-input>
                挂号限额：<el-input v-model="registlevel.registquota" placeholder="挂号限额" size="mini" class="abc"></el-input>

                <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="addCanael" size="mini">取 消</el-button>
                <el-button type="primary" @click="addReg" size="mini">保存</el-button>
              </span>
            </el-dialog>
        </div>
        <!--编辑挂号级别 -->
        <div>
            <el-dialog
                    title="编辑挂号级别"
                    :visible.sync="centerDialogVisible2"
                    width="35%"
                    center>
                号别编码：<el-input v-model="registlevel2.registcode" placeholder="号别编码" size="mini" class="abc"></el-input>
                号别名称：<el-input v-model="registlevel2.registname" placeholder="号别名称" size="mini" class="abc"></el-input>
                显示顺序号：<el-input v-model="registlevel2.sequenceno" placeholder="显示顺序号" size="mini" class="abc"></el-input>
                挂号费：<el-input v-model="registlevel2.registfee" placeholder="挂号费" size="mini" class="abc"></el-input>
                挂号限额：<el-input v-model="registlevel2.registquota" placeholder="挂号限额" size="mini" class="abc"></el-input>

                <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="centerDialogVisible2=false" size="mini">取 消</el-button>
                <el-button type="primary" @click="updataReg" size="mini">保存</el-button>
              </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Registlevel",
        data(){
            return{
                tableData:[],
                keywords:'',
                pageSize:10,
                pageNum:1,
                total:0,
                centerDialogVisible:false,//新增弹出框
                registlevel:{
                    registcode:'',//号别编码
                    registname:'',//号别名称
                    sequenceno:'',//显示顺序号
                    registfee:'',//挂号费
                    registquota:'',//挂号限额
                },
                centerDialogVisible2:false,//编辑弹出框
                registlevel2:{
                    id:'',
                    registcode:'',//号别编码
                    registname:'',//号别名称
                    sequenceno:'',//显示顺序号
                    registfee:'',//挂号费
                    registquota:'',//挂号限额
                },
                id:'',
            }
        },
        mounted(){
            this.searchRegistlevel();
        },
        methods:{
            handleDelete(row){
                this.$confirm('此操作将永久这个挂号级别, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.putRequest('/delRegist?id='+row.id).then(resp=>{
                        if(resp){
                            this.searchRegistlevel();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            //保存更改
            updataReg(){
                this.putRequest('/updateRegist',this.registlevel2).then(resp=>{
                    if(resp){
                        this.centerDialogVisible2=false;
                        this.searchRegistlevel();
                    }
                })
            },
            //编辑
            handleEdit(row){
                    this.registlevel2.id=row.id;
                    this.registlevel2.registcode=row.registcode
                    this.registlevel2.registname=row.registname
                    this.registlevel2.sequenceno=row.sequenceno
                    this.registlevel2.registfee=row.registfee
                    this.registlevel2.registquota=row.registquota
                    this.centerDialogVisible2=true;
            },

            //新增挂号级别弹出框取消按钮
            addCanael(){
                this.centerDialogVisible=false;
            },
            //保存新增挂号级别
            addReg(){

                this.postRequest('/addRegist',this.registlevel).then(resp=>{
                    if(resp){
                        this.centerDialogVisible=false;
                        this.searchRegistlevel();
                    }
                })
            },
            //点击新增挂号级别
            addRegistlevel(){
                this.centerDialogVisible=true;
            },
            /*分页pageNum更新*/
            currentChange(pageNum) {
                this.pageNum = pageNum;
                this.searchRegistlevel();
            },
            //显示或模糊查询显示挂号级别或名称
            searchRegistlevel(){
                this.getRequest('/searchRegistByRegistnameOrRegistcode?keywords='+this.keywords+'&pageSize='+this.pageSize+'&pageNum='+this.pageNum).then(resp=>{
                    if(resp){
                        this.total=resp.total;
                        this.tableData=resp.list;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .blogHeader button{
        margin-left: 20px;
    }
    .tableData{
        width: 80%;
        margin-top: 10px;
        font-size: 15px;
    }
    .abc{
        width: 140px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

</style>