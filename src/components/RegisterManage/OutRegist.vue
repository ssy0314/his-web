<template>
<!-- 退号   -->
    <div>
        <div>患者信息查询</div>
                <span>病历号:</span><el-input v-model="casenumber" size="mini" placeholder="病历号" style="width: 10%;margin: 8px"></el-input>
                <el-button @click="searchBtn" type="primary" size="mini" class="el-icon-search">搜索</el-button>
        <div>患者信息确认</div>

        <span>姓名:</span><el-input v-model="realname" size="mini" placeholder="姓名" style="width: 10%;margin: 8px"></el-input>
        <span>身份证号:</span><el-input v-model="idnumber" size="mini" placeholder="身份证号" style="width: 30%;margin: 8px"></el-input>
        <span>家庭住址:</span> <el-input v-model="homeaddress" size="mini" placeholder="家庭住址" style="width: 30%;margin: 8px"></el-input>

        <div>患者挂号信息</div>
        <el-table
                :data="registerInfo"
                style="width: 100%"
        >
            <el-table-column
                    prop="casenumber"
                    label="病历号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="realname"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="idnumber"
                    label="身份证号">
            </el-table-column>
            <el-table-column
                    prop="visitdate"
                    label="挂号日期">
            </el-table-column>、
            <el-table-column
                    prop="noon"
                    label="挂号午别">
            </el-table-column>
            <el-table-column
                    prop="department.deptname"
                    label="看诊科室">
            </el-table-column>
            <el-table-column
                    prop="visitstate"
                    :formatter="formatter"
                    label="看诊状态">
            </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">

                    <el-button
                            v-if="scope.row.visitstate!=1"
                            disabled
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.row)">退号</el-button>
                    <el-button
                            v-if="scope.row.visitstate==1"
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.row)">退号</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    export default {
        name: "OutRegist",
        data(){
            return{
                casenumber:'',
                realname:'',
                idnumber:'',
                homeaddress:'',
                registerInfo:[],
                disabled:false

            }
        },
        methods:{
            formatter(row){
                if(row.visitstate==1){
                    return '已挂号'
                }else if(row.visitstate==2){
                    return '医生接诊'
                }else if(row.visitstate==3){
                    return '看诊结束'
                }else if(row.visitstate==4){
                    return '已退号'
                }
            },
            searchBtn(){
                this.getRequest('/searchAllRegister?casenumber='+this.casenumber).then(resp=>{
                    if(resp){
                        this.registerInfo=resp;
                        for (let i = 0; i <1; i++) {
                            this.casenumber=resp[i].casenumber;
                            this.realname=resp[i].realname;
                            this.idnumber=resp[i].idnumber;
                            this.homeaddress=resp[i].homeaddress;
                            if(resp[i].visitstate!=1){
                                this.disabled=true
                            }else{this.disabled=false}
                        }


                    }
                })
            },
            handleEdit(row){
                this.$confirm('是否确定退号?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.putRequest('/updateVisitstate?id='+row.id).then(resp=>{
                        if(resp){
                            this. searchBtn();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退号'
                    });
                });

            },
        }
    }
</script>

<style scoped>

</style>

