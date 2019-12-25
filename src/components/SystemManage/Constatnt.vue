<template>
    <div >
<!--        常数类别管理-->
        <div style="float: left">
            <el-input prefix-icon="el-icon-search" placeholder="请输入常数类别编码或类别名称" size="mini" v-model="typeName" style="width: 230px;margin-right: 60px"></el-input>
            <el-button size="mini" type="primary" style="margin-right: 60px" class="el-icon-view" @click="searchBtn">查询常数类别</el-button>
            <el-button size="mini" type="primary" style="margin-right: 60px" class="el-icon-edit" @click="innerVisibleType=true">新增常数类别</el-button>
            <el-button size="mini" type="primary" style="margin-right: 60px" class="el-icon-edit" @click="outerVisible = true">常数项管理</el-button>
        </div>

        <el-table
                :data="typeTableData"
                style="width: 100%">
            <el-table-column
                    prop="constantTypeCode"
                    label="类别编码"
                   >
            </el-table-column>
            <el-table-column
                    prop="constantTypeName"
                    label="类别名称"
                   >
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="ID">
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="pageNum"
                :page-size="pageSize"
                hide-on-single-page
                layout="prev, pager, next, jumper"
                :total="total">
        </el-pagination>
        <el-dialog  :visible.sync="outerVisible" center style="padding: 0;margin: 0" width="60%">
            <div slot="title" class="dialog-title" style="font-size: 14px">常数项列表</div>
            <el-input placeholder="请输入常数项编码或名称" size="mini" v-model="itemName" style="width: 170px;margin-right:10px;margin-left: 30px;: "></el-input>
            <el-select v-model="value" placeholder="所属分类" size="mini" style="width: 140px;margin: 0 10px">
                <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.constantTypeName"
                        :value="item.id"
                        >
                </el-option>
            </el-select>
            <el-button size="mini" type="primary" style="margin: 0 10px" class="el-icon-view" @click="searchItemBtn">查询常数项</el-button>
            <el-button size="mini" type="primary" style="margin: 0 10px" class="el-icon-edit" @click="innerVisible = true">新增常数项</el-button>
            <el-table
                    size="mini"
                    ref="multipleTable"
                    :data="itemTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="80%">
                </el-table-column>
                <el-table-column
                    prop="constantCode"
                    label="常数项编码"
                    width="120">
            </el-table-column>
                <el-table-column
                        prop="constantName"
                        label="常数项名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="constantTypeName"
                        label="常数项类别"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="常数项ID"
                        show-overflow-tooltip>
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
                    @current-change="handleCurrentChangeItem"
                    :current-page.sync="pageNumItem"
                    :page-size="pageSizeItem"
                    hide-on-single-page
                    layout="prev, pager, next, jumper"
                    :total="totalItem">
            </el-pagination>
            <el-dialog
                    width="30%"
                    :visible.sync="innerVisible"
                    append-to-body
                    center
                    >
                <div slot="title" class="dialog-title" style="font-size: 14px">新增常数项</div>
                <span style="font-size: 12px">常数项编码：</span><el-input size="mini" placeholder="常数项编码" v-model="constatntItem.constantCode" style="width: 110px;margin-right:16px;margin-bottom: 16px"></el-input>
                <span style="font-size: 12px">常数项名称：</span><el-input size="mini" placeholder="常数项名称" v-model="constatntItem.constantName" style="width: 110px"></el-input>
                <span style="font-size: 12px;padding-left: 10px;">所属分类：</span> <el-select v-model="constatntItem.constantTypeID" placeholder="所属分类" size="mini" style="width: 110px;">
                <el-option
                        v-for="item in addOptions"
                        :key="item.id"
                        :label="item.constantTypeName"
                        :value="item.id"
                >
                </el-option>
            </el-select>
                <div  slot="footer" class="dialog-footer" >
                    <el-button type="warning" size="mini" @click="innerVisible=false">取消</el-button>
                    <el-button type="primary" size="mini" @click="addItemBtn">保存</el-button>
                </div>

            </el-dialog>

            <div slot="footer" class="dialog-footer">
                <el-button :disabled="disabled" size="mini" type="danger" style="text-align: center" @click="delManyBtn">批量删除</el-button>
                <el-button type="primary" @click="closeAddItem" size="mini">关闭</el-button>
            </div>
        </el-dialog>

        <el-dialog
                width="35%"
                :visible.sync="innerVisibleType"
                append-to-body
                center
        >
            <div slot="title" class="dialog-title" style="font-size: 14px">新增常数项类别</div>
            <span style="font-size: 12px">常数类别编码：</span><el-input size="mini" placeholder="常数类别编码" v-model="constatntType.constantTypeCode" style="width: 110px;margin-right:8px;margin-bottom: 16px"></el-input>
            <span style="font-size: 12px">常数类别名称：</span><el-input size="mini" placeholder="常数类别名称" v-model="constatntType.constantTypeName" style="width: 110px"></el-input>
            <div  slot="footer" class="dialog-footer" >
                <el-button type="warning" size="mini" @click="innerVisibleType=false">取消</el-button>
                <el-button type="primary" size="mini" @click="addTypeBtn">保存</el-button>
            </div>

        </el-dialog>
        <!--编辑常数项        -->
        <el-dialog
                width="30%"
                :visible.sync="innerVisibleEdit"
                append-to-body
                center
        >
            <div slot="title" class="dialog-title" style="font-size: 14px">编辑常数项</div>
            <span style="font-size: 12px">常数项编码：</span><el-input size="mini" placeholder="常数项编码" v-model="constatntItemEdit.constantCode" style="width: 110px;margin-right:16px;margin-bottom: 16px"></el-input>
            <span style="font-size: 12px">常数项名称：</span><el-input size="mini" placeholder="常数项名称" v-model="constatntItemEdit.constantName" style="width: 110px"></el-input>
            <span style="font-size: 12px;padding-left: 10px;">所属分类：</span> <el-select v-model="constatntItemEdit.constantTypeID" placeholder="所属分类" size="mini" style="width: 110px;">
            <el-option
                    v-for="item in addOptions"
                    :key="item.id"
                    :label="item.constantTypeName"
                    :value="item.id"
            >
            </el-option>
        </el-select>
            <div  slot="footer" class="dialog-footer" >
                <el-button type="warning" size="mini" @click="innerVisibleEdit=false">取消</el-button>
                <el-button type="primary" size="mini" @click="editItemBtn">保存</el-button>
            </div>

        </el-dialog>


    </div>
</template>

<script>
    export default {
        name: "Constatnt",
        data(){
            return{
                typeName:'',
                itemName:'',
                typeTableData:[],
                itemTableData:[],
                outerVisible: false,
                innerVisible: false,
                innerVisibleType:false,
                innerVisibleEdit:false,
                addOptions:[],
                options:[],
                addValue:'',
                value:'',
                pageNum:1,
                pageNumItem:1,
                pageSize:5,
                pageSizeItem:5,
                constatntType:{
                    id:'',
                    constantTypeCode:'',
                    constantTypeName:'',
                    delMark:1
                },
                constatntItem:{
                    id:'',
                    constantTypeID:'',
                    constantCode:'',
                    constantName:'',
                    delMark:1
                },
                constatntItemEdit:{
                    id:'',
                    constantTypeID:'',
                    constantCode:'',
                    constantName:'',
                    delMark:1
                },
                total:0,
                totalItem:0,
                ids:[],
                disabled:true
            }
        },
        methods:{
            closeAddItem(){
                this.outerVisible = false;
                this.value='';



            },
            //批量删除
            delManyBtn(){
                this.$confirm('此操作将永久这些常数项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delManyRequest('/constanttype/delMulConstantitemById',this.ids).then(resp=>{
                        if(resp){
                            this.searchItemBtn();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //分页跳转
            handleCurrentChange(data){
                this.pageNum=data;
                this.searchBtn();
            },
            handleCurrentChangeItem(data){
                this.pageNumItem=data;
                this.searchItemBtn();
            },
            //查询常数项
            searchItemBtn(){
                this.getRequest('/constanttype/getConstantitem?keywords='+this.itemName+'&typeId='+this.value+'&pageNum='+this.pageNumItem+'&pageSize='+this.pageSizeItem).then(resp=>{
                    if(resp){
                        this.itemTableData=resp.list;
                        this.totalItem=resp.total;
                    }
                })
            },
            //查看常数类别
            searchBtn(){
                let constatnt = {
                    keywords:this.typeName,
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
                this.getRequest('/constanttype/categoryAllInfo',constatnt).then(resp=>{
                    if(resp){
                        this.typeTableData=resp.list;
                        this.total=resp.total;
                    }
                })

            },
            //添加常数类别
            addTypeBtn(){

                this.postRequest('/constanttype/addCategory',this.constatntType).then(resp=>{
                    if(resp){
                        this.searchBtn();
                        this.constatntType.constantTypeCode='';
                        this.constatntType.constantTypeName='';
                        this.innerVisibleType=false;

                    }
                })
            },
            //添加常数项
            addItemBtn(){
                this.postRequest('/constanttype/addConstantitem',this.constatntItem).then(resp=>{
                    if(resp){
                         this.searchItemBtn();
                        this.constatntItem.constantCode='';
                        this.constatntItem.constantName='';
                        this.constatntItem.constantTypeID='';
                        this.innerVisible=false;

                    }
                })


            },
            //更改常数项
            handleEdit(row){
                this.constatntItemEdit.constantTypeID=row.constantTypeID;
                this.constatntItemEdit.constantCode=row.constantCode;
                this.constatntItemEdit.constantName=row.constantName;
                this.constatntItemEdit.id=row.id;
                this.innerVisibleEdit=true;

            },
            //保存更改后常数项
            editItemBtn(){
                this.$confirm('此操作将永久更改该常数项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   this.putRequest('/constanttype/updateConstantitem',this.constatntItemEdit).then(resp=>{
                       if(resp){
                           this.innerVisibleEdit=false;
                           this.searchItemBtn();
                       }
                   })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleDelete(row){
                this.$confirm('此操作将永久删除该常数项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest('/constanttype/delConstantitemById?id='+row.id).then(resp=>{
                        if(resp){
                            this.searchItemBtn();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            change1(){
                this.handleSelectionChange();
            },

            handleSelectionChange(data){
                console.log(data)
                this.ids=[];
                if(data.length>0){
                    this.disabled=false
                }else{this.disabled=true}
                for (let i in data) {
                    this.ids.push(data[i].id)
                }
                console.log(this.ids)
            },
            initConstatntItem(){
                this.getRequest('/constanttype/categoryName').then(resp=>{
                    if(resp){
                        this.addOptions=resp;
                        this.options=resp;
                    }
                })
            }

        },
        mounted() {
            this.searchBtn();
            this.initConstatntItem();
        }
    }
</script>

<style scoped>

</style>