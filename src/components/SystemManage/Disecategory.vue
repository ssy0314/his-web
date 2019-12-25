<template>
    <div>
        <div class="blogHeader">
            <el-input style="width: 200px" size="mini" v-model="keywords" placeholder="请输入疾病分类编码或名称"></el-input>
            <el-button size="mini"  type="primary" class=" el-icon-view" @click="searchDiagnosis"> 查看疾病分类</el-button>
            <el-button size="mini" type="primary" class=" el-icon-edit" @click="addDiagnosis"> 新增疾病分类</el-button>
            <el-button size="mini" type="primary" class=" el-icon-edit" @click="rumDiagnosis"> 疾病管理</el-button>
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
                        prop="sequenceno"
                        label="显示顺序号">
                </el-table-column>
                <el-table-column
                        prop="dicacode"
                        label="分类编码">
                </el-table-column>
                <el-table-column
                        prop="dicaname"
                        label="分类名称">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                @click="handleEdit(scope.row)"
                                size="small">编辑</el-button>
                        <el-button
                                @click="handleDelete(scope.row)"
                                type="danger"
                                size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-button type="danger" size="mini" @click="delMany" :disabled="delManyEabled">批量删除</el-button>
        <el-pagination
                hide-on-single-page
                background
                layout="prev, pager, next"
                :page-count="pageNum"
                :page-size="pageSize"
                @current-change="currentChange"
                :total="total">
        </el-pagination>

        <!--新增疾病类别 -->
        <div>
            <el-dialog
                    title="新增疾病类别"
                    :visible.sync="centerDialogVisible"
                    width="35%"
                    center>
                疾病分类编码：<el-input v-model="registlevel.dicacode" placeholder="疾病分类编码" size="mini" class="abc"></el-input>
                疾病分类名称：<el-input v-model="registlevel.dicaname" placeholder="疾病分类名称" size="mini" class="abc"></el-input>
                疾病类型：<el-select v-model="registlevel.dicatype" placeholder="请选择" size="mini" class="abc">
                <el-option
                        v-for="item in deptList2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
                显示顺序号：<el-input v-model="registlevel.sequenceno" placeholder="显示顺序号" size="mini" class="abc"></el-input>

                <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="addCanael" size="mini">取 消</el-button>
                <el-button type="primary" @click="addReg" size="mini">保存</el-button>
              </span>
            </el-dialog>
        </div>

        <!--编辑疾病类别 -->
        <div>
            <el-dialog
                    title="修改疾病类别"
                    :visible.sync="centerDialogVisible2"
                    width="35%"
                    center>
                疾病分类编码：<el-input v-model="registleve2.dicacode" placeholder="疾病分类编码" size="mini" class="abc"></el-input>
                疾病分类名称：<el-input v-model="registleve2.dicaname" placeholder="疾病分类名称" size="mini" class="abc"></el-input>
                疾病类型：<el-select v-model="registleve2.dicatype" placeholder="请选择" size="mini" class="abc">
                <el-option
                        v-for="item in deptList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
                显示顺序号：<el-input v-model="registleve2.sequenceno" placeholder="显示顺序号" size="mini" class="abc"></el-input>

                <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="updateCanael" size="mini">取 消</el-button>
                <el-button type="primary" @click="updateReg" size="mini">保存</el-button>
              </span>
            </el-dialog>
        </div>

        <!--疾病管理 -->
        <div class="blogHeader">
            <el-dialog
                    title="疾病列表"
                    :visible.sync="centerDialogVisible3"
                    width="70%"
                    center>
                <div style="text-align: center">
                    <el-input style="width: 200px" size="mini" v-model="keywords2" placeholder="请输入疾病编码或名称"></el-input>
                    <el-button size="mini"  type="primary" class=" el-icon-view" @click="searchDisease"> 查看疾病</el-button>
                    <el-button size="mini" type="primary" class=" el-icon-edit" @click="addDisease"> 新增疾病</el-button>
                </div>
                <div>
                    <el-table
                            ref="multipleTable"
                            :data="tableData2"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange2">
                        <el-table-column
                                type="selection">
                        </el-table-column>
                        <el-table-column
                                prop="diseasecode"
                                label="疾病编码">
                        </el-table-column>
                        <el-table-column
                                prop="diseasename"
                                label="疾病名称">
                        </el-table-column>
                        <el-table-column
                                prop="diseaseicd"
                                label="国际ICD编码">
                        </el-table-column>
                        <el-table-column
                                prop="disecategory.dicaname"
                                label="疾病所属分类">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        @click="updateDisease(scope.row)"
                                        size="small">编辑</el-button>
                                <el-button
                                        @click="delDisease(scope.row)"
                                        type="danger"
                                        size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="Canael2" size="mini" :disabled="delManyDisease">批量删除</el-button>
                <el-button type="primary" @click="centerDialogVisible3=false" size="mini">关闭</el-button>
              </span>
                <el-pagination
                        hide-on-single-page
                        background
                        layout="prev, pager, next"
                        :page-count="pageNum2"
                        :page-size="pageSize2"
                        @current-change="currentChange2"
                        :total="total2">
                </el-pagination>
            </el-dialog>
        </div>
        <!--新增疾病 -->
        <div>
            <el-dialog
                    title="新增疾病"
                    :visible.sync="centerDialogVisible4"
                    width="35%"
                    center>
                疾病编码：<el-input v-model="registleve3.diseasecode" placeholder="疾病编码" size="mini" class="abc"></el-input>
                疾病名称：<el-input v-model="registleve3.diseasename" placeholder="疾病名称" size="mini" class="abc"></el-input>
                国际ICD编码：<el-input v-model="registleve3.diseaseicd" placeholder="国际ICD编码" size="mini" class="abc"></el-input>
                疾病所属类型：<el-select v-model="registleve3.disecategoryid" placeholder="疾病所属类型" size="mini" class="abc">
                <el-option
                        v-for="item in deptList3"
                        :key="item.id"
                        :label="item.dicaname"
                        :value="item.id">
                </el-option>
            </el-select>

                <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="diseaseCanael" size="mini">取 消</el-button>
                <el-button type="primary" @click="diseaseReg" size="mini">保存</el-button>
              </span>
            </el-dialog>
        </div>

        <!--编辑疾病 -->
        <div>
            <el-dialog
                    title="修改疾病"
                    :visible.sync="centerDialogVisible5"
                    width="35%"
                    center>
                疾病编码：<el-input v-model="registleve4.diseasecode" placeholder="疾病编码" size="mini" class="abc"></el-input>
                疾病名称：<el-input v-model="registleve4.diseasename" placeholder="疾病名称" size="mini" class="abc"></el-input>
                国际ICD编码：<el-input v-model="registleve4.diseaseicd" placeholder="国际ICD编码" size="mini" class="abc"></el-input>
                疾病所属类型：<el-select v-model="registleve4.disecategoryid" placeholder="疾病所属类型" size="mini" class="abc">
                <el-option
                        v-for="item in deptList4"
                        :key="item.id"
                        :label="item.dicaname"
                        :value="item.id">
                </el-option>
            </el-select>

                <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="updatadiseaseCanael" size="mini">取 消</el-button>
                <el-button type="primary" @click="updatadiseaseReg" size="mini">保存</el-button>
              </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Diagnosis",
        data(){
            return{
                tableData:[],
                total:0,
                pageNum:1,
                pageSize:10,
                keywords:'',
                centerDialogVisible:false,
                centerDialogVisible2:false,
                centerDialogVisible3:false,
                centerDialogVisible4:false,
                centerDialogVisible5:false,
                delManyEabled:true,
                delManyDisease:true,
                registlevel:{
                    dicacode:'',
                    dicaname:'',
                    sequenceno:'',
                    dicatype:'',
                },
                registleve2:{
                    id:'',
                    dicacode:'',
                    dicaname:'',
                    sequenceno:'',
                    dicatype:'',
                },
                deptList:[
                    {
                        label:'西医',
                        value:1
                    },
                    {
                        label:'中医',
                        value:2
                    }
                ],
                deptList2:[
                    {
                        label:'西医',
                        value:1
                    },
                    {
                        label:'中医',
                        value:2
                    }
                ],
                keywords2:'',
                delManyDisease:true,
                tableData2:[],
                total2:0,
                pageNum2:1,
                pageSize2:5,
                deptList3:[],
                registleve3:{
                    diseasecode:'',//疾病编码
                    diseasename:'',//疾病名称
                    diseaseicd:'',//ICD
                    disecategoryid:'',//疾病类别id
                },
                deptList4:[],
                registleve4:{
                    diseasecode:'',//疾病编码
                    diseasename:'',//疾病名称
                    diseaseicd:'',//ICD
                    disecategoryid:0,//疾病类别id
                    id:'',
                },

            }
        },
        mounted() {
            this.searchDiagnosis();

        },
        methods:{
            //疾病批量删除
            Canael2(){
                this.$confirm('确定删除'+'"'+this.length+'"'+'条信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postRequest('/delManyDisease?'+this.delIds2).then(resp=>{
                        this.searchDisease();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });

                })
            },
            //多选框监听
            handleSelectionChange2(data){
                this.length=data.length;
                if (data.length>0){
                    this.delManyDisease=false;
                    this.delIds2='';
                    for (let i in data){
                        this.delIds2 +='ids='+data[i].id+'&'
                    }
                }else {
                    this.delManyDisease=true;
                }
            },
            //删除疾病
            delDisease(row){
                console.log(row)
                this.id=row.id;
                this.$confirm('确定删除'+'"'+row.diseasename+'"'+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.putRequest('/delDisease?id='+this.id).then(resp=>{
                        if (resp){
                            this.searchDisease();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //保存编辑疾病
            updatadiseaseReg(){
                // console.log(this.registleve4.disecategoryid)
                this.putRequest('/updateDisease',this.registleve4).then(resp=>{
                    this.centerDialogVisible5=false;
                    this.searchDisease();
                })
            },
            //取消编辑疾病
            updatadiseaseCanael(){
                this.centerDialogVisible5=false;
            },
            //编辑疾病
            updateDisease(row){
                this.centerDialogVisible5=true;
                this.registleve4.id=row.id;
                this.registleve4.diseasecode=row.diseasecode;
                this.registleve4.diseasename=row.diseasename;
                this.registleve4.diseaseicd=row.diseaseicd;
                this.registleve4.disecategoryid=row.disecategory.id;
            },
            //新增疾病保存
            diseaseReg(){
                this.postRequest('/addDisease',this.registleve3).then(resp=>{
                    if (resp){
                        this.centerDialogVisible4=false;
                        this.searchDisease();
                    }
                })
            },
            //新增疾病取消
            diseaseCanael(){
                this.centerDialogVisible4=false;
            },
            //新增疾病
            addDisease(){
                this.centerDialogVisible4=true;

            },
            //疾病管理分页
            currentChange2(pageNum){
                this.pageNum2=pageNum;
                this.searchDisease();
            },
            //点击疾病管理
            rumDiagnosis(){
                this.centerDialogVisible3=true;
                this.searchDisease();

            },
            //查看疾病
            searchDisease(){
                this.getRequest('/searchDiseaseBynameOrcode?keywords='+this.keywords2+'&pageNum='+this.pageNum2+'&pageSize='+this.pageSize2).then(resp=>{
                    if (resp){
                        this.total2=resp.total;
                        this.tableData2=resp.list;
                    }
                })
            },
            //批量删除
            delMany(){
                this.$confirm('确定删除'+'"'+this.length+'"'+'条信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postRequest('/delManyDisecategory?'+this.delIds).then(resp=>{
                        if(resp){
                            this.searchDiagnosis();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //对选框监听
            handleSelectionChange(data){
                this.length=data.length;
                if(data.length>0){
                    this.delManyEabled=false;
                    this.delIds='';
                    for (let i in data){
                        this.delIds +='ids='+data[i].id+'&'
                    }
                }else {
                    this.delManyEabled=true;
                }
            },

            //删除疾病分类
            handleDelete(row){
                this.id=row.id;
                this.$confirm('确定删除'+'"'+row.dicaname+'"'+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.putRequest('/delDisecategory?id='+this.id).then(resp=>{
                        if (resp){
                            this.searchDiagnosis();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //保存修改疾病分类
            updateReg(){
                this.putRequest('/updateDisecategory',this.registleve2).then(resp=>{
                    if (resp){
                        this.searchDiagnosis();
                        this.centerDialogVisible2=false;
                    }
                })
            },
            //取消疾病分类
            updateCanael(){
                this.centerDialogVisible2=false;
            },
            //编辑疾病分类
            handleEdit(row){
                this.centerDialogVisible2=true;
                this.registleve2.id=row.id;
                this.registleve2.dicacode=row.dicacode;
                this.registleve2.dicaname=row.dicaname;
                this.registleve2.sequenceno=row.sequenceno;
                this.registleve2.dicatype=row.dicatype;

            },
            //保存新增疾病分类
            addReg(){
                this.postRequest('/addDisecategory',this.registlevel).then(resp=>{
                    if (resp){
                        this.searchDiagnosis();
                        this.centerDialogVisible=false;
                    }
                })
            },
            //取消新增疾病分类
            addCanael(){
                this.centerDialogVisible=false;
            },
            //新增疾病分类
            addDiagnosis(){
                this.centerDialogVisible=true;
            },
            //分页更新
            currentChange(pageNum){
                this.pageNum=pageNum;
                this.searchDiagnosis();
            },
            //查看疾病分类信息
            searchDiagnosis(){
                this.getRequest('/searchDisecategoryBynameOrcode?keywords='+this.keywords+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize).then(resp=>{
                    if(resp){
                        this.total=resp.total;
                        this.tableData=resp.list;
                        this.deptList3=resp.list;
                        this.deptList4=resp.list;
                    }
                })
            }
        },

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
        width: 110px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
</style>