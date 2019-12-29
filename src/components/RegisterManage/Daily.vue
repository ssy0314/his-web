<template>
<!--    日结-->
    <div>
        <div class="title">
            收款员：
            <el-input size="mini" v-model="registUser" readonly style="width: 80px;margin-right: 15px"></el-input>
            <span class="abc">*</span>
            统计日期（上次结束日期）:
            <el-input size="mini" v-model="registWork.starttime" readonly style="width: 150px;margin-right: 15px"></el-input>
            至：
            <el-date-picker
                    v-model="dailyDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :picker-options="options0"
                    size="mini"
                    style="width: 130px;margin-right:5px">
            </el-date-picker>
            <el-time-picker
                    v-model="dailyTime"
                    placeholder="任意时间点"
                    size="mini"
                    :picker-options="{selectableRange:`${nowTime} - 23:59:00`}"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="change"
                    style="width: 150px;margin-right:30px">
            </el-time-picker>
            <el-button type="primary" size="mini" icon="el-icon-date" @click="searchBtn">查询</el-button>
            <el-button type="primary" size="mini" icon="el-icon-time" @click="dailyBtn">日结</el-button>

        </div>
        <div>
            <p>门诊收费日结单</p>
            <table border="1" style="border-color: red" width="800px" cellspacing="0">
                <tr>
                    <td width="100px">日结时间范围</td>
                    <td colspan="6">{{registWork.starttime}}----{{registWork.endtime}}</td>
                </tr>
                <tr>
                    <td>制表人</td>
                    <td>{{registUser}}</td>
                    <td>收款员</td>
                    <td>{{registUser}}</td>
                    <td>制表时间</td>
                    <td colspan="2">{{now}}</td>
                </tr>
                <tr>
                    <td>起止发票号</td>
                    <td colspan="6">{{beginNum}}----{{endNum}}</td>
                </tr>
                <tr>
                    <td>作废发票号</td>
                    <td colspan="6"><span v-for="(item,index) in this.badInvoice" :key="index">{{item.invoicenum}}</span></td>
                </tr>
                <tr>
                    <td>重打发票号</td>
                    <td colspan="6"><span v-for="(item,index) in this.repInvoice" :key="index">{{item.invoicenum}}</span></td>
                </tr>
                <tr>
                    <td>收费金额</td>
                    <td>现金金额</td>
                    <td colspan="2">{{cash}}</td>
                    <td>非现金金额</td>
                    <td colspan="2">{{other}}</td>
                </tr>
                <tr>
                    <td>共计</td>
                    <td >（大写）</td>
                    <td colspan="2">{{sum|toChies}}</td>
                    <td>（小写）</td>
                    <td colspan="2">{{sum}}</td>
                </tr>
            </table>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Daily",
        data(){
            return{
                nowTime:'',
                registUser:'',
                sum:'',
                badInvoice:[],
                repInvoice:[],
                now:'',
                cash:'',
                other:'',
                beginNum:'',
                endNum:'',
                options:[],
                value:'',
                dailyDate:'',
                dailyTime:'',
                registWork:{
                    registerid:'',
                    starttime:'',
                    endtime:'',
                },

            }
        },
        methods:{
            minTime(){
                return '{selectableRange:'+Date.now()+'- 23:59:59}'
            },
            dailyBtn(){
                this.$confirm('是否确定日结?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.postRequest('/addRegistWork',this.registWork).then(resp=>{

                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消日结'
                    });
                });


            },
            change(){
                this.nowTime=new Date();
                this.registWork.endtime=this.dailyTime;
            },
            searchBtn(){
                this.sum=0;
                this.getRequest('/searchBeginInvoiceNum?beginTime='+this.registWork.starttime+'&endTime='+this.registWork.endtime).then(resp=>{
                    if(resp){
                        this.beginNum=resp.invoicenum;
                    }
                });
                this.getRequest('/searchEndInvoiceNum?beginTime='+this.registWork.starttime+'&endTime='+this.registWork.endtime).then(resp=>{
                    if(resp){
                        this.endNum=resp.invoicenum;
                    }
                });
                this.getRequest('/searchBad?beginTime='+this.registWork.starttime+'&endTime='+this.registWork.endtime).then(resp=>{
                    if(resp){
                        this.badInvoice=resp;
                    }
                });
                this.getRequest('/searchRepeat?beginTime='+this.registWork.starttime+'&endTime='+this.registWork.endtime).then(resp=>{
                    if(resp){
                        this.repInvoice=resp;
                    }
                });
                this.getRequest('/searchCash?beginTime='+this.registWork.starttime+'&endTime='+this.registWork.endtime).then(resp=>{
                    if(resp){
                        this.cash=resp.sum;
                        this.sum+=Number(resp.sum);
                    }
                });
                this.getRequest('/searchOther?beginTime='+this.registWork.starttime+'&endTime='+this.registWork.endtime).then(resp=>{
                    if(resp){
                        this.other=resp.sum;
                        this.sum+=Number(resp.sum);
                    }
                });

            },
            initBeforeEndTime(){
                let now = new Date()
                this.changeTime(now)
                this.dailyDate=now;
                this.registWork.endtime=this.dailyTime;
                this.getRequest('/searchBeforeEndTime').then(resp=>{
                    if(resp){
                        console.log(resp)
                        this.registWork.starttime=resp.endtime
                    }
                })
            },
            changeTime(date){
                let year=date.getFullYear();
                let month=date.getMonth()+1;
                let data=date.getDate();
                let hour=date.getHours();
                let minute=date.getMinutes();
                let second=date.getSeconds();
                this.dailyTime=year+'-'+month+'-'+data+' '+this.change(hour)+':'+this.change(minute)+':'+this.change(second);
            },
            change(data){
                if(Number(data)<10){
                    return '0'+data;
                }else{return data}
            },
            changeNowTime(){
                let now = new Date()
                let year=now.getFullYear();
                let month=now.getMonth();
                let data=now.getDate();
                this.now=year+'-'+month+'-'+data;
            },
        },
        mounted() {
            this.nowTime=new Date();
            this.registWork.registerid=JSON.parse(window.sessionStorage.getItem('user')).id;
            this.registUser=JSON.parse(window.sessionStorage.getItem('user')).realname;
            this.initBeforeEndTime();
            this.changeNowTime();
        },
        filters: { //局部过滤器
            toChies: function(amount) { //形参
                // 汉字的数字
                const cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
                // 基本单位
                const cnIntRadice = ["", "拾", "佰", "仟"];
                // 对应整数部分扩展单位
                const cnIntUnits = ["", "万", "亿", "兆"];
                // 对应小数部分单位
                const cnDecUnits = ["角", "分"];
                // 整数金额时后面跟的字符
                const cnInteger = "整";
                // 整型完以后的单位
                const cnIntLast = "元";
                // 最大处理的数字
                const maxNum = 9999999999999999.99;
                // 金额整数部分
                let integerNum;
                // 金额小数部分
                let decimalNum;
                // 输出的中文金额字符串
                let chineseStr = "";
                // 分离金额后用的数组，预定义
                let parts;
                if (amount === "") {
                    return "";
                }
                amount = parseFloat(amount);
                if (amount >= maxNum) {
                    // 超出最大处理数字
                    return "";
                }
                if (amount === 0) {
                    chineseStr = cnNums[0] + cnIntLast + cnInteger;
                    return chineseStr;
                }
                // 转换为字符串
                amount = amount.toString();
                if (amount.indexOf(".") === -1) {
                    integerNum = amount;

                    decimalNum = "";
                } else {
                    parts = amount.split(".");
                    integerNum = parts[0];
                    decimalNum = parts[1].substr(0, 4);
                }
                // 获取整型部分转换
                if (parseInt(integerNum, 10) > 0) {
                    let zeroCount = 0;
                    const IntLen = integerNum.length;
                    for (let i = 0; i < IntLen; i++) {
                        const n = integerNum.substr(i, 1);
                        const p = IntLen - i - 1;
                        const q = p / 4;
                        const m = p % 4;
                        if (n === "0") {
                            zeroCount++;
                        } else {
                            if (zeroCount > 0) {
                                chineseStr += cnNums[0];
                            }
                            // 归零
                            zeroCount = 0;
                            //alert(cnNums[parseInt(n)])
                            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                        }
                        if (m === 0 && zeroCount < 4) {
                            chineseStr += cnIntUnits[q];
                        }
                    }
                    chineseStr += cnIntLast;
                }
                // 小数部分
                if (decimalNum !== "") {
                    const decLen = decimalNum.length;
                    for (let i = 0; i < decLen; i++) {
                        const n = decimalNum.substr(i, 1);
                        if (n !== "0") {
                            chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                        }
                    }
                }
                if (chineseStr === "") {
                    chineseStr += cnNums[0] + cnIntLast + cnInteger;
                } else if (decimalNum === "") {
                    chineseStr += cnInteger;
                }
                return chineseStr;
            }
        },
        //计算金额总和保留小数点两位
        computed: {
            addtotal() {
                let total = 0;
                let totalSmall = this.infoData.detail
                totalSmall.map((item) => {
                    if (item.amount == '') {
                        item.amount = 0;
                    }
                    total += Number(item.amount)
                })
                return total.toFixed(2)//四舍五入保留两位
            }
        },


    }
</script>

<style scoped>
    .title{
        font-size: 13px;
    }
    .abc{
        color: red;
        margin-right: 70px;
    }
</style>



