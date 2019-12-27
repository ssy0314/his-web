<template>
    <!-- 退费   -->
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
        <div>患者交费信息</div>
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
                    prop="fmeditem.itemname"
                    label="项目名称">
            </el-table-column>
            <el-table-column
                    prop="fmeditem.price"
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
        <el-button @click="charge" :disabled="disabled" v-if="display" style="margin: 8px" type="primary" class="el-icon-goods" size="mini">退费结算</el-button>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                center>
            <span slot="title" class="title">发票信息（退费）</span>
            <span style="font-size: 12px;margin-left: 12px">发票号：</span><el-input v-model="invoice.invoicenum" size="mini" style="width: 100px;margin-right: 24px;margin-bottom: 12px"></el-input>
            <span style="font-size: 12px;margin-left: 12px">病例号：</span><el-input v-model="casenumber" size="mini" style="width: 100px"></el-input>
            <br><span style="font-size: 12px">患者姓名：</span><el-input v-model="register.realname" size="mini" style="width: 100px;margin-right: 24px;margin-bottom: 12px"></el-input>
            <span style="font-size: 12px">应退金额：</span><el-input v-model="invoice.money" size="mini" style="width: 100px;margin-right: 24px;margin-bottom: 12px"></el-input>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="mini" type="warning">取 消</el-button>
    <el-button type="primary" @click="printInvoice" size="mini">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "Refund",
        data(){
            return{
                charged:'',
                change:'',
                dialogVisible:false,
                disabled:true,
                display:false,
                registerInfo:[],
                chargeOptions:[],
                ids:[],
                casenumber:'',
                register:{
                    realname:'',
                    homeaddress:'',
                    idnumber:''
                },
                invoice:{
                    invoicenum:'',
                    money:0,
                    state:7,
                    creationtime:'',
                    userid:'',
                    registid:'',
                    feetype:'',
                    back:'',
                    dailystate:0,
                },
            }
        },
        methods:{
            printInvoice(){
                let date = new Date();
                this.invoice.creationtime=date;
                this.invoice.userid=JSON.parse(window.sessionStorage.getItem('user')).id;
                this.invoice.money=-this.invoice.money;
                this.invoice.feetype=51;
                this.delManyRequest('/updateRefundState',this.ids).then(resp=>{
                    if(resp){
                        this.postRequest('/addInvoice',this.invoice).then(resp=>{
                            if(resp){
                                this.dialogVisible = false;
                                this.searchBtn();
                            }
                        });
                    }
                });

            },
            changeBtn(){
                this.change=Number(this.charged)-Number(this.invoice.money);
            },
            formatter(row){
                return '已交费'
            },
            handleSelection(data){
                this.ids=[];
                this.invoice.money=0;
                if(data.length>0){
                    this.disabled=false;
                }else{this.disabled=true}
                for (let i = 0; i <data.length ; i++) {
                    this.ids.push(data[i].id);
                    this.invoice.money+=Number(data[i].fmeditem.price*data[i].num);
                }
            },
            searchBtn(){
                this.getRequest('/searchRegisterRefundByasenumber?casenumber='+this.casenumber).then(resp=>{
                    if(resp){
                        if(resp.length>0){
                            this.display=true;
                        }else { this.display=false;}
                        for (let i = 0; i <resp.length; i++) {
                            this.registerInfo=resp[i].lists;
                            this.register.realname=resp[i].realname;
                            this.register.homeaddress=resp[i].homeaddress;
                            this.register.idnumber=resp[i].idnumber;
                            this.invoice.registid=resp[i].id;
                        }
                    }
                })

            },
            charge(){
                this.$confirm('确认退费这1条数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dialogVisible=true;
                    this.getRequest('/searchInvoice').then(resp=>{
                        if(resp){
                            this.invoice.invoicenum=Number(resp.invoicenum)+1;
                        }
                    });
                    this.getRequest('/searchCharge').then(resp=>{
                        if(resp){
                            this.chargeOptions=resp;

                        }
                    });
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




