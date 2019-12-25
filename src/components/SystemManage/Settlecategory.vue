<template>
    <div>
        <div class="blogHeader">
            <el-input style="width: 200px; margin-right:3px;" size="mini" prefix-icon="el-icon-search" placeholder="请输入结算类别编码或名称" v-model="keywords"></el-input>
            <el-button class="el-icon-view" size="mini" type="primary" @click="searchSettlement"> 查询结算类别</el-button>
            <el-button class="el-icon-edit" size="mini" type="primary" @click="addSettlement">  新增结算类别</el-button>
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
                        prop="settlecode"
                        label="类别编码">
                </el-table-column>
                <el-table-column
                        prop="settlename"
                        label="类别名称">
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


        <!--新增结算类别 -->
        <div>
            <el-dialog
                    title="新增结算类别"
                    :visible.sync="centerDialogVisible"
                    width="35%"
                    center>
                类别编码：<el-input v-model="registlevel.settlecode" placeholder="类别编码" size="mini" class="abc"></el-input>
                类别名称：<el-input v-model="registlevel.settlename" placeholder="类别名称" size="mini" class="abc"></el-input>
                显示顺序号：<el-input v-model="registlevel.sequenceno" placeholder="显示顺序号" size="mini" class="abc"></el-input>

                <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="addCanael" size="mini">取 消</el-button>
                <el-button type="primary" @click="addReg" size="mini">保存</el-button>
              </span>
            </el-dialog>
        </div>

        <!--编辑结算类别 -->
        <div>
            <el-dialog
                    title="修改结算类别"
                    :visible.sync="centerDialogVisible2"
                    width="35%"
                    center>
                类别编码：<el-input v-model="registleve2.settlecode" placeholder="类别编码" size="mini" class="abc"></el-input>
                类别名称：<el-input v-model="registleve2.settlename" placeholder="类别名称" size="mini" class="abc"></el-input>
                显示顺序号：<el-input v-model="registleve2.sequenceno" placeholder="显示顺序号" size="mini" class="abc"></el-input>

                <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="updateCanael" size="mini">取 消</el-button>
                <el-button type="primary" @click="updateReg" size="mini">保存</el-button>
              </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Settlement",
        data(){
            return{
                total:0,
                tableData:[],
                pageSize:10,
                pageNum:1,
                keywords:'',
                centerDialogVisible:false,
                centerDialogVisible2:false,
                registlevel:{
                    settlecode:'',//类别编码
                    settlename:'',//类别名称
                    sequenceno:'',//显示顺序号
                },
                registleve2:{
                    settlecode:'',//类别编码
                    settlename:'',//类别名称
                    sequenceno:'',//显示顺序号
                    id:'',
                },
            }
        },
        mounted(){
            this.searchSettlement();
        },
        methods:{
            //删除
            handleDelete(row){
                this.id=row.id;
                this.$confirm('确定删除'+'"'+row.settlename+'"'+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.putRequest('/delSettlecategory?id='+this.id).then(resp=>{
                        this.searchSettlement();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //编辑取消
            updateCanael(){
                this.centerDialogVisible2=false;
            },
            //保存编辑
            updateReg(){
                this.putRequest('/updateSettlecategory',this.registleve2).then(resp=>{
                    if (resp){
                        this.centerDialogVisible2=false;
                        this.searchSettlement();
                    }
                })
            },
            //点击编辑按钮
            handleEdit(row){
                this.registleve2.id=row.id;
                this.registleve2.settlecode=row.settlecode;
                this.registleve2.settlename=row.settlename;
                this.registleve2.sequenceno=row.sequenceno;
                this.centerDialogVisible2=true;
            },
            /*分页pageNum更新*/
            currentChange(pageNum) {
                this.pageNum = pageNum;
                this.searchSettlement();
            },
            //新增保存
            addReg(){
                this.postRequest('/addSettlecategory',this.registlevel).then(resp=>{
                    if (resp){
                        this.searchSettlement();
                        this.centerDialogVisible=false;
                    }
                })
            },
            //新增取消
            addCanael(){
                this.centerDialogVisible=false;
            },
            //点击新增结算类别
            addSettlement(){
                this.centerDialogVisible=true;
            },
            //点击查看类别
            searchSettlement(){
                this.getRequest('/searchSettlecategoryBynameOrcode?keywords='+this.keywords+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize).then(resp=>{
                    if(resp){
                        this.total=resp.total;
                        this.tableData=resp.list;
                        this.keywords='';
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