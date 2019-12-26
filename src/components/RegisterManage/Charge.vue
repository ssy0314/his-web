<template>
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
        <div>患者消费信息</div>
        <el-table
                :data="registerInfo"
                style="width: 100%"
                @selection-change="handleSelection"
        >
            <el-table-column
                    type="selection"
                    width="80%">
            </el-table-column>
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
                    prop="itemname"
                    label="项目名称">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="单价">
            </el-table-column>、
            <el-table-column
                    prop="num"
                    label="数量">
            </el-table-column>
            <el-table-column
                    prop="creationtime"
                    label="开立时间"
                    width="200px">
            </el-table-column>
            <el-table-column
                    prop="state"
                    :formatter="formatter"
                    label="状态">
            </el-table-column>

        </el-table>
        <el-button @click="charge" :disabled="disabled" v-if="display" style="margin: 8px" type="primary" class="el-icon-goods" size="mini">收费结算</el-button>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                center>
            <span slot="title" class="title">发票信息（交费）</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "Charge",
        data(){
            return{
                dialogVisible:false,
                disabled:true,
                display:false,
                registerInfo:[],
                count:'',
                priceSum:'',
                casenumber:'',
                register:{
                    realname:'',
                    homeaddress:'',
                    idnumber:''
                }
            }
        },
        methods:{
            formatter(row){
                return '已开立'
            },
            handleSelection(data){
                if(data.length>0){
                    this.disabled=false;
                }else{this.disabled=true}
            },
            searchBtn(){
                this.getRequest('/searchRegisterByasenumber?casenumber='+this.casenumber).then(resp=>{
                   if(resp){
                       this.registerInfo=resp;
                       if(resp.length>0){
                        this.display=true;
                       }else { this.display=false;}
                       for (let i = 0; i <resp.length; i++) {
                           this.register.realname=resp[i].realname
                           this.register.homeaddress=resp[i].homeaddress
                           this.register.idnumber=resp[i].idnumber
                       }
                   }
                })

            },
            charge(){
                this.$confirm('确认结算这一条数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dialogVisible=true;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消结算'
                    });
                });

            }
        }
    }
</script>

<style scoped>

</style>