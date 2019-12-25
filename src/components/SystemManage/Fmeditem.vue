<template>
    <div>
        <el-input  class="search" v-model="name" size="mini" placeholder="请输入非药品收费项目编码或名称"></el-input>
        <el-button type="primary" @click="onSubmit" size="mini" class="el-icon-view">查询非药品收费项目</el-button>
        <el-button type="primary"  size="mini" class="el-icon-edit" @click="addFormBtn">新增非药品收费项目</el-button>
        <el-table
                ref="multipleTable"
                :data="tableData"
                border
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="itemcode"
                    label="项目编码"
            >
            </el-table-column>
            <el-table-column
                    prop="itemname"
                    label="项目名称"
            >
            </el-table-column>
            <el-table-column
                    prop="recordtype"
                    label="项目类型"
            >
            </el-table-column>
            <el-table-column
                    prop="format"
                    label="规格"
            >
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="单价"
            >
            </el-table-column>
            <el-table-column
                    prop="expenseclass.expname"
                    label="费用科目"
            >
            </el-table-column>
            <el-table-column
                    prop="department.deptname"
                    label="执行科室"
            >
            </el-table-column>
            <el-table-column class="cz" label="操作">
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
        <el-button @click="doDelMany" type="danger" size="small" style="margin-top:3px;" :disabled="delManyEnabled">批量删除</el-button>


        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :page-count="pageNum"
                @current-change="currentChange">
        </el-pagination>





        <el-dialog
                :visible.sync="dialogVisible1"
                title="新增非药品收费项目"
                width="50%"
                center
        >

            <el-form ref="form" :model="addForm" label-width="80px" >
                <el-form-item  >
                    项目编码:<el-input class="input" v-model="addForm.itemcode" size="mini"></el-input>
                    项目名称: <el-input class="input" v-model="addForm.itemname" size="mini"></el-input>
                </el-form-item>
                <el-form-item >
                    规格:<el-input class="input" v-model="addForm.format" size="mini"></el-input>
                    单价: <el-input class="input" v-model="addForm.price" size="mini"></el-input>
                </el-form-item>
                <el-form-item >
                    费用分类:<el-select v-model="addForm.expclassid"  size="mini" placeholder="请选择">
                    <el-option
                            v-for="item in cost"
                            :key="item.id"
                            :label="item.expname"
                            :value="item.id">
                    </el-option>
                </el-select>
                    执行科室:  <el-select size="mini" v-model="addForm.deptid" placeholder="请选择活动区域">
                    <el-option
                            v-for="item in dept"
                            :key="item.id"
                            :label="item.deptname"
                            :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item >
                    项目类型:<el-select size="mini" v-model="addForm.recordtype" placeholder="请选择活动区域">
                    <el-option
                            v-for="item in itemtype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                    拼音助记码:<el-input class="input" v-model="addForm.mnemoniccode" size="mini"></el-input>
                </el-form-item>


            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="dialogVisible1 = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="saveAddForm" size="mini">保存</el-button>
            </span>
        </el-dialog>






        <el-dialog
                :visible.sync="dialogVisible2"
                title="新增非药品收费项目"
                width="50%"
                center
        >

            <el-form ref="form" :model="updateForm" label-width="80px" >
                <el-form-item  >
                    项目编码:<el-input class="input" v-model="updateForm.itemcode" size="mini"></el-input>
                    项目名称: <el-input class="input" v-model="updateForm.itemname" size="mini"></el-input>
                </el-form-item>
                <el-form-item >
                    规格:<el-input class="input" v-model="updateForm.format" size="mini"></el-input>
                    单价: <el-input class="input" v-model="updateForm.price" size="mini"></el-input>
                </el-form-item>
                <el-form-item >
                    费用分类:<el-select v-model="updateForm.expclassid"  size="mini" placeholder="请选择">
                    <el-option
                            v-for="item in cost"
                            :key="item.id"
                            :label="item.expname"
                            :value="item.id">
                    </el-option>
                </el-select>
                    执行科室:  <el-select size="mini" v-model="updateForm.deptid" placeholder="请选择活动区域">
                    <el-option
                            v-for="item in dept"
                            :key="item.id"
                            :label="item.deptname"
                            :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item >
                    项目类型:<el-select size="mini" v-model="updateForm.recordtype" placeholder="请选择活动区域">
                    <el-option
                            v-for="item in itemtype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                    拼音助记码:<el-input class="input" v-model="updateForm.mnemoniccode" size="mini"></el-input>
                </el-form-item>


            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="dialogVisible2 = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="saveUpdateForm" size="mini">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Project",
        data() {
            return {
                delIds:'',
                name:'',
                pageNum : 1,
                pageSize: 5,
                total:0,
                tableData: [],
                multipleSelection: [],
                addForm:{
                    itemcode:'',
                    itemname:'',
                    recordtype:'',
                    format:'',
                    price:'',
                    recordtype:'',
                    deptid:'',
                    expclassid:'',
                    mnemoniccode:''

                },
                updateForm:{
                    itemcode:'',
                    itemname:'',
                    recordtype:'',
                    format:'',
                    price:'',
                    recordtype:'',
                    deptid:'',
                    expclassid:'',
                    mnemoniccode:''
                },
                prices:[],
                cost:[],
                dept:[],
                itemtype:[{
                    value: '1',
                    label: '检查'
                }, {
                    value: '2',
                    label: '检验'
                }, {
                    value: '3',
                    label: '处置'
                }],
                dialogVisible1: false,
                dialogVisible2: false,
                delManyEnabled:true
            }
        },
        mounted(){
            this.initUser();
        },
        methods:
            {
                //点击查询
                initUser(){
                    let url='/searchFmeditemBynameOrcode?keywords=&pageNum='+this.pageNum+'&pageSize='+this.pageSize;
                    this.getRequest(url).then(resp=>{

                        this.tableData=resp.list;
                        this.total=resp.total;
                    })
                },
                //点击查询用户按钮
                onSubmit(){
                    if(this.name==''||this.name.trim()==''){
                        this.$message('请正确填写名称');
                    }else{
                        let url='/searchFmeditemBynameOrcode?keywords='+this.name+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize;
                        this.getRequest(url).then(resp=>{
                            console.log(resp);
                            this.tableData=resp.list;
                            this.total=resp.total;
                        })
                    }
                },
                currentChange(num){
                    this.pageNum=num;
                    this.initUser();
                },
                // 点击复选框
                handleSelectionChange(data){
                    if(data.length>0){
                        this.delManyEnabled=false;
                        this.delIds='';
                        for(let i in data){
                            this.delIds+='ids='+data[i].id+'&'
                        }
                    }else{
                        this.delManyEnabled=true;
                    }
                },
                doDelMany(){
                    this.$confirm('此操作将永久删除所选记录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.postRequest("/delManyFmeditem?"+this.delIds).then(resp=>{
                            if(resp){
                                this.initUser();
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });

                }
                ,
                addFormBtn(){
                    this.dialogVisible1=true;
                    this.getCost();
                    this.getDept();

                },
                //点击增加按钮
                saveAddForm(){
                    this.dialogVisible1=false;
                    this.postRequest('/addFmeditem',this.addForm).then(resp=>{
                        if(resp){
                            this.$message('增加用户成功！')
                        }
                    });
                },

                //点击修改按钮
                handleEdit(row){
                    this.dialogVisible2=true;
                    this.updateForm.id=row.id;
                    this.getCost();
                    this.getDept();
                },


                saveUpdateForm(){
                    this.putRequest('/updateFmeditem',this.updateForm).then(resp=>{

                        if(resp){
                            this.$message('修改用户成功');
                        }
                    })
                },
                handleDelete(row){
                    this.putRequest('/delFmeditem?id='+row.id).then(resp=>{
                        if(resp){
                            this.$message('用户删除成功');
                            this.initUser();
                        }
                    })
                },
                getCost(){
                    this.getRequest('/searchExpenseclass').then(resp=>{
                        this.cost=resp;
                    });
                },
                getDept(){
                    this.getRequest('/searchDeptName').then(resp=>{
                        this.dept=resp;
                    });
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
    .cz{
        width: 20% !important;
    }
</style>