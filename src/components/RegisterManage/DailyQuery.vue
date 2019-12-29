<template>
    <div>
        统计时间从:
        <el-date-picker
                v-model="dailyStartDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                size="mini"
                style="width: 130px;margin-right:5px">
        </el-date-picker>
        <el-time-picker
                v-model="dailyStartTime"
                placeholder="任意时间点"
                size="mini"
                value-format="HH:mm:ss"
                style="width: 150px;margin-right:30px">
        </el-time-picker>
        至：
        <el-date-picker
                v-model="dailyEndDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                size="mini"
                style="width: 130px;margin-right:5px">
        </el-date-picker>
        <el-time-picker
                v-model="dailyEndTime"
                placeholder="任意时间点"
                size="mini"
                value-format="HH:mm:ss"
                style="width: 150px;margin-right:30px">
        </el-time-picker>
        <el-button type="primary" size="mini" icon="el-icon-date" @click="searchBtn">查询</el-button>
        <br>
        <el-container width="100%">
            <el-aside width="270px">
                <div style="display: inline-block;margin-top: 15px;">
                    <el-table
                            :data="registWorkInfo"
                            style="width: 100%;margin-top: 8px;"
                            border>

                        <el-table-column
                                align="center"
                                prop="realname"
                                label="收款员"
                                width="70%">
                        </el-table-column>
                        <el-table-column
                                prop="endtime"
                                align="center"
                                label="日结日期"
                                width="100%">
                        </el-table-column>
                        <el-table-column align="center" label="操作" width="95%">
                            <template slot-scope="scope">
                                <el-button
                                        type="text"
                                        size="mini"
                                        @click="handleEdit(scope.row)">查看明细</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-aside>
            <el-main >
                <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="display: inline-block;box-shadow: 3px 3px 3px darkgray;width:98%;margin: 0;">
                    <el-tab-pane label="日结单" name="first">
                        <div style="padding: 8px;margin: 0">
                            <span>门诊收费日结单</span>
                            <table border="1" style="border-color: red" width="750px" cellspacing="0">
                                <tr>
                                    <td width="15%" align="center">日结时间范围</td>
                                    <td colspan="8" align="center">{{registWork.starttime}}----{{registWork.endtime}}</td>
                                </tr>
                                <tr>
                                    <td align="center">制表人</td>
                                    <td colspan="2" align="center">{{registUser}}</td>
                                    <td width="8%" v>收款人</td>
                                    <td colspan="2" align="center">{{registUser}}</td>
                                    <td width="10%" align="center">制表时间</td>
                                    <td colspan="2" align="center">{{now}}</td>
                                </tr>
                                <tr>
                                    <td align="center">起止发票号</td>
                                    <td colspan="8" align="center">{{beginNum}}----{{endNum}}</td>
                                </tr>
                                <tr>
                                    <td align="center">作废发票号</td>
                                    <td colspan="8" align="center"><span v-for="(item,index) in this.badInvoice" :key="index">{{item.invoicenum}}</span></td>
                                </tr>
                                <tr>
                                    <td align="center">重打发票号</td>
                                    <td colspan="8" align="center"><span v-for="(item,index) in this.repInvoice" :key="index">{{item.invoicenum}}</span></td>
                                </tr>
                                <tr>
                                    <td align="center">收费金额</td>
                                    <td width="10%" align="center">现金支付</td>
                                    <td colspan="3" align="center">{{cash}}</td>
                                    <td width="10%" align="center">账户支付</td>
                                    <td colspan="3" align="center">{{other}}</td>
                                </tr>
                                <tr>
                                    <td align="center">共计</td>
                                    <td width="10%" align="center">（大写）</td>
                                    <td colspan="3" width="32%" align="center">{{sum|toChies}}</td>
                                    <td width="10%" align="center">（小写）</td>
                                    <td colspan="3" width="32%" align="center">{{sum}}</td>
                                </tr>
                            </table>

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="发票信息" name="second">
                        <div style="margin-left:50px">
                            <el-table
                                    :data="registerInfo"
                                    style="width: 95%;margin-top: 8px;display: inline-block;;"
                                    border>
                                <el-table-column
                                        prop="invoicenum"
                                        label="单据号">
                                </el-table-column>
                                <el-table-column
                                        prop="register.casenumber"
                                        label="病历号">
                                </el-table-column>
                                <el-table-column
                                        prop="register.realname"
                                        label="姓名">
                                </el-table-column>
                                <el-table-column
                                        prop="money"
                                        label="发票总额">
                                </el-table-column>
                                <el-table-column
                                        prop="register.settleid"
                                        :formatter="settleidInfo"
                                        label="结算类别">
                                </el-table-column>
                                <el-table-column
                                        prop="state"
                                        :formatter="stateInfo"
                                        label="状态">
                                </el-table-column>
                                <el-table-column
                                        :formatter="payOwnInfo"
                                        label="自费支付">
                                </el-table-column>
                                <el-table-column
                                        :formatter="payOtherInfo"
                                        label="账户支付">
                                </el-table-column>
                            </el-table>
                        </div>
                        <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page.sync="pageNum"
                                :page-size="pageSize"
                                layout="prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>

                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>


    </div>
</template>

<script>
    export default {
        name: "DailyQuery",
        data(){
            return{
                pageSize:10,
                pageNum:1,
                total:0,
                dailyStartTime:'',
                dailyStartDate:'',
                dailyEndDate:'',
                dailyEndTime:'',
                activeName: 'first',
                registerInfo:[

                ],
                settleOption:[],
                registWorkInfo:[],
                registUser:'',
                sum:'',
                badInvoice:[],
                repInvoice:[],
                now:'',
                cash:'',
                other:'',
                beginNum:'',
                endNum:'',
                registWork:{
                    registerid:'',
                    starttime:'',
                    endtime:'',
                },
                invoiceState:[
                    {
                        label:'正常',
                        value:'1',
                    },
                    {
                        label:'作废',
                        value:'2',
                    },
                    {
                        label:'未打印',
                        value:'3',
                    },
                    {
                        label:'已打印',
                        value:'4',
                    },
                    {
                        label:'已重打',
                        value:'5',
                    },
                    {
                        label:'已补打',
                        value:'6',
                    },
                    {
                        label:'冲红',
                        value:'7',
                    },
                ]
            }
        },
        methods:{
            handleCurrentChange(val){
                this.pageNum=val;
                this.getRequest('/searchOwnRegistworkInvoice?startTime='+this.registWork.starttime+'&endTime='+this.registWork.endtime+'&pageSize='+this.pageSize+'&pageNum='+this.pageNum).then(resp=>{
                    if(resp){
                        this.registerInfo=resp.list;
                        this.total=resp.total;
                    }
                });
            },
            payOwnInfo(row){
                if(row.feetype!=52){
                    return row.money;
                }else {return 0}
            },
            payOtherInfo(row){
                if(row.feetype==52){
                    return row.money;
                }else {return 0}
            },
            stateInfo(row){

                for (let i = 0; i <this.invoiceState.length; i++) {
                    if(row.state==this.invoiceState[i].value){
                        return this.invoiceState[i].label;
                    }
                }
            },
            settleidInfo(row){
                for (let i = 0; i <this.settleOption.length; i++) {
                    if(row.register.settleid==this.settleOption[i].id){
                      return this.settleOption[i].settlename;
                    }
                }

            },
            changeNowTime(){
                let now = new Date()
                let year=now.getFullYear();
                let month=now.getMonth();
                let data=now.getDate();
                this.now=year+'-'+month+'-'+data;
            },
            searchBtn(){
                let start =this.dailyStartDate+' '+this.dailyStartTime;
                let end =this.dailyEndDate+' '+this.dailyEndTime;
                this.getRequest('/searchAllRegistwork?startTime='+start+'&endTime='+end).then(resp=>{
                    if(resp){
                        console.log(resp)
                        this.registWorkInfo=resp;
                    }
                })

            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleEdit(row){
                console.log(row)
                this.sum=0;
                this.registUser='';
                this.badInvoice=[];
                this.repInvoice=[];
                this.cash='';
                this.other='';
                this.beginNum='';
                this.endNum='';
                this.registWork.starttime='';
                this.registWork.endtime='';
                this.registUser=row.realname;
                this.registWork.starttime=row.starttime;
                this.registWork.endtime=row.endtime;
                this.getRequest('/searchBeginInvoiceNum?beginTime='+row.starttime+'&endTime='+row.endtime).then(resp=>{
                    if(resp){
                        this.beginNum=resp.invoicenum;
                    }
                });
                this.getRequest('/searchEndInvoiceNum?beginTime='+row.starttime+'&endTime='+row.endtime).then(resp=>{
                    if(resp){
                        this.endNum=resp.invoicenum;
                    }
                });
                this.getRequest('/searchBad?beginTime='+row.starttime+'&endTime='+row.endtime).then(resp=>{
                    if(resp){
                        this.badInvoice=resp;
                    }
                });
                this.getRequest('/searchRepeat?beginTime='+row.starttime+'&endTime='+row.endtime).then(resp=>{
                    if(resp){
                        this.repInvoice=resp;
                    }
                });
                this.getRequest('/searchCash?beginTime='+row.starttime+'&endTime='+row.endtime).then(resp=>{
                    if(resp){
                        this.cash=resp.sum;
                        this.sum+=Number(resp.sum);
                    }
                });
                this.getRequest('/searchOther?beginTime='+row.starttime+'&endTime='+row.endtime).then(resp=>{
                    if(resp){
                        this.other=resp.sum;
                        this.sum+=Number(resp.sum);
                    }
                });
                this.getRequest('/searchOwnRegistworkInvoice?startTime='+row.starttime+'&endTime='+row.endtime+'&pageSize='+this.pageSize+'&pageNum='+this.pageNum).then(resp=>{
                    if(resp){
                        this.registerInfo=resp.list;
                        this.total=resp.total;
                    }
                });


            },
            initSettle(){
                this.getRequest('/searchSettle').then(resp=>{
                    if(resp){
                        this.settleOption=resp;
                    }
                });
            },
        },
        mounted(){
            this.changeNowTime();
            this.initSettle();
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

</style>