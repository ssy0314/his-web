<template>
    <div>
        <div>患者信息查询</div>
        <el-form :inline="true" :model="patient" class="demo-form-inline">
            <el-form-item label="病历号：">
                <el-input v-model="patient.casenumber" size="mini" placeholder="病历号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="searchBtn" type="primary" size="mini">搜索</el-button>
            </el-form-item>
        </el-form>
        <div>患者信息确认</div>
        <el-form :inline="true" :model="regist"  class="demo-form-inline">
            <el-form-item label="姓 名：">
                <el-input v-model="regist.realname" size="mini" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：">
                <el-input v-model="regist.idnumber" size="mini" placeholder="身份证号"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址：">
                <el-input v-model="regist.homeaddress" size="mini" placeholder="家庭住址"></el-input>
            </el-form-item>
        </el-form>
        <div>患者消费信息</div>
        <el-table
                :data="patientInfo"
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
                    prop="register.realname"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="项目名称">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="单价">
            </el-table-column>、
            <el-table-column
                    prop="amount"
                    label="数量">
            </el-table-column>
            <el-table-column
                    prop="createtime"
                    label="开立时间">
            </el-table-column>
            <el-table-column
                    prop="createtime"
                    label="状态">
            </el-table-column>

        </el-table>

    </div>
</template>
<script>
    export default {
        name: "Charge",
        data(){
            return{
                count:'',
                priceSum:'',
                patient:{
                    casenumber:'',
                    starttime:'',
                    endtime:'',
                    // IDnumber:'',
                    // HomeAddress:'',
                    // realName:'',
                    // name:'',
                    // price:'',
                    // amount:'',
                    // createTime:''
                },
                patientInfo:[],
                regist:{
                    realname:'',
                    homeaddress:'',
                    idnumber:''
                }
            }
        },
        methods:{
            searchBtn(){
                this.getRequest('/searchPatientInfo',this.patient).then(resp=>{
                    this.regist=resp;
                }),
                    this.getRequest('/getPatientCosts',this.patient).then(resp=>{
                        this.patientInfo=resp;
                    }),
                    this.getRequest('/getCount',this.patient).then(resp=>{
                        console.log(resp);
                        this.count=resp.count;
                        this.priceSum=resp.sum;
                    })
            }
        }
    }
</script>

<style scoped>

</style>