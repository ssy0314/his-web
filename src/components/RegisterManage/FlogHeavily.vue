<template>
<!--  发票重打  -->
    <div>
        <div>患者信息查询</div>
        <span>病例号：</span><el-input v-model="casenumber" size="mini" placeholder="病历号" style="width: 100px;margin: 8px"></el-input>
        <el-button @click="searchBtn" type="primary" size="mini" class="el-icon-search">搜索</el-button>
        <div>患者信息确认</div>
        <el-form :inline="true" :model="register"  class="demo-form-inline">
            <el-form-item label="姓 名：">
                <el-input v-model="register.realname" size="mini" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：">
                <el-input v-model="register.idnumber" size="mini" placeholder="身份证号"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址：">
                <el-input v-model="register.homeaddress" size="mini" placeholder="家庭住址"></el-input>
            </el-form-item>
        </el-form>
        <div>患者发票信息</div>
        <el-table
                :data="registerInfo"
                style="width: 100%"
        >
            <el-table-column
                    type="selection"
                    width="80%">
            </el-table-column>
            <el-table-column
                    prop="register.casenumber"
                    label="病历号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="invoicenum"
                    label="发票号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="register.realname"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="money"
                    label="金额">
            </el-table-column>、
            <el-table-column
                    prop="state"
                    :formatter="formatter"
                    label="发票状态">
            </el-table-column>
            <el-table-column
                    prop="register.visitdate"
                    label="看诊日期">
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            class="el-icon-printer"
                            @click="handleEdit(scope.row)">发票重打</el-button>
                </template>
            </el-table-column>

        </el-table>

    </div>
</template>
<script>
    export default {
        name: "FlogHeavily",
        data(){
            return{
                casenumber:'',
                registerInfo:[],
                register:{
                    realname:'',
                    homeaddress:'',
                    idnumber:''
                }
            }
        },
        methods:{
            formatter(){
                return '未打印'
            },
            handleEdit(row){
                this.putRequest('/updateFlogHeavily?id='+row.id).then(resp=>{
                    if(resp){
                        this.searchBtn();
                    }
                })
            },
            searchBtn(){
                this.getRequest('/searchInvoiceInformation?casenumber='+this.casenumber).then(resp=>{
                    console.log(resp)
                    for (let i = 0; i <1; i++) {
                        this.registerInfo=resp[i].invoices;
                        this.register.realname=resp[i].realname;
                        this.register.homeaddress=resp[i].homeaddress;
                        this.register.idnumber=resp[i].idnumber;
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>



