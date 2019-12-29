<template>
<!-- 挂号   -->
    <div class="app">
        <div>
            <span class="text">*</span>发票号：<el-input size="mini" v-model="register.invoice.invoicenum" placeholder="发票号" style="width: 140px;margin:8px 0;margin-right: 50px"></el-input> <el-button size="mini" type="primary" class="el-icon-edit" @click="registerd">挂号</el-button><el-button size="mini" type="primary" class="el-icon-refresh" @click="clear">清空</el-button>
        </div>
        <div>
            <span>挂号信息</span><br>
            <span class="text" style="letter-spacing:12px">*</span>病历号：<el-input v-model="register.casenumber" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px" @keyup.enter.native="searchByCasenumber"></el-input>
            <span class="text">*</span><label>姓<i style="padding-left: 24px"></i>名：</label><el-input v-model="register.realname" placeholder="输入姓名" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px"></el-input>
            <span class="text">*</span>性<i style="padding-left: 24px"></i>别：<el-select v-model="register.gender" placeholder="性别" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px">
                <el-option
                        v-for="item in genderOptions"
                        :key="item.id"
                        :label="item.constantName"
                        :value="item.id">
                </el-option>
            </el-select>
            <span class="text">*</span>年<i style="padding-left: 24px"></i>龄：<el-input v-model="register.age" placeholder="输入年龄" size="mini" style="width: 140px;margin:8px"></el-input>
            <span class="text">*</span><el-select v-model="register.agetype" placeholder="请选择" size="mini" style="width: 140px;">
                <el-option
                        v-for="item in ageUnitOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <br>
            <i style="padding-left: 3px"></i>
            出生日期：
            <span>
            <el-date-picker
                v-model="register.birthdate"
                type="date"
                size="mini"
                style="width: 140px;margin:8px 0;margin-right: 50px"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                @change="ageChange">
            </el-date-picker>
            </span>
            身份证号：<el-input v-model="register.idnumber" placeholder="在此输入身份证号" size="mini" style="width: 200px;margin:8px 0;margin-right: 50px"></el-input>
            家庭住址：<el-input v-model="register.homeaddress" placeholder="在此输入家庭住址" size="mini" style="width: 200px;margin:8px 0;margin-right: 50px"></el-input>
            <br><span class="text">*</span>结算类别：<el-select v-model="register.settleid" placeholder="结算类别" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px">
                <el-option
                        v-for="item in settleOptions"
                        :key="item.id"
                        :label="item.settlename"
                        :value="item.id">
                </el-option>
            </el-select>
            <span class="text">*</span>看诊日期：
            <span>
            <el-date-picker
                    v-model="register.visitdate"
                    type="date"
                    size="mini"
                    style="width: 140px;margin:8px 0;margin-right: 50px"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
            </el-date-picker>
            </span>
            <span class="text">*</span>午<i style="padding-left: 24px"></i>别：<el-select v-model="register.noon" placeholder="午别" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px">
                <el-option
                        v-for="item in noonOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <span class="text">*</span>挂号科室：<el-select v-model="register.deptid" placeholder="挂号科室" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px">
                <el-option
                        v-for="item in deptOptions"
                        :key="item.id"
                        :label="item.deptname"
                        :value="item.id">
                </el-option>
            </el-select>
            <br>
            <span class="text">*</span>号<i style="padding-left: 24px"></i>别：<el-select v-model="register.registleid" placeholder="号别" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px" @change="registlevelchange">
                <el-option
                        v-for="item in registlevelOptions"
                        :key="item.id"
                        :label="item.registname"
                        :value="item.id"
                        >
                </el-option>
            </el-select>
            <span class="text">*</span>看诊医生：<el-select v-model="register.userid" placeholder="看诊医生" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px" @visible-change="searchDoctor">
                <el-option
                        v-for="item in doctorOptions"
                        :key="item.userid"
                        :label="item.realname"
                        :value="item.userid">
                </el-option>
            </el-select>
            <i style="padding-left: 6px"></i>初始号额：<el-input v-model="registQuota" placeholder="初始号额" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px"></el-input>
            <i style="padding-left: 6px"></i>已用号额：<el-input size="mini" v-model="registquotaUsed" placeholder="已用号额" style="width: 140px;margin:8px 0;margin-right: 50px"></el-input>
            <br><i style="padding-left: 6px"></i><span style="letter-spacing: 6px">病历本</span><el-checkbox size="mini" style="margin:8px 0;margin-right: 183px" v-model="register.isbook" @change="valueChange"></el-checkbox>
            <span class="text">*</span>应收金额：<el-input size="mini" placeholder="应收金额" v-model="register.invoice.money" style="width: 140px;margin:8px 0;margin-right: 50px"></el-input>
            <span class="text">*</span>收费方式：<el-select v-model="register.invoice.feetype" placeholder="收费方式" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px">
            <el-option
                    v-for="item in chargeOptions"
                    :key="item.id"
                    :label="item.constantName"
                    :value="item.id">
            </el-option>
        </el-select>




        </div>

    </div>
</template>

<script>
    export default {
        name: "Regist",
        data(){
          return{
              register:{
                  casenumber:'', 
                  realname:'',
                  gender:'',
                  idnumber:'',
                  birthdate:'',
                  age:'',
                  agetype:'岁',
                  homeaddress:'',
                  visitdate:'',
                  noon:'',
                  deptid:'',
                  userid:'',
                  registleid:'',
                  settleid:'',
                  isbook:false,
                  registtime:'',
                  registerid:'',
                  visitstate:1,
                  invoice:{
                      invoicenum:'',
                      money:'',
                      state:3,
                      creationtime:'',
                      userid:'',
                      registid:'',
                      feetype:'',
                      back:'',
                      dailystate:0,
                  },
              },

              invoiceNum:'',
              registquotaUsed:'',
              registQuota:'',
              chargeOptions:[],
              doctorOptions:[],
              registlevelOptions:[],
              deptOptions:[],
              settleOptions:[],
              genderOptions:[],
              noonOptions:[
                  {
                      label:'上午',
                      value:'上午'
                  },
                  {
                      label:'下午',
                      value:'下午'
                  }
              ],
              ageUnitOptions:[
                  {
                  label:'岁',
                  value:'岁',
              },
                  {
                      label:'月',
                      value:'月',
                  },
                  {
                      label:'天',
                      value:'天',
                  },
              ],
          }
        },
        methods:{
            clear(){
                this.initMessage();
                this.register.realname='';
                this.register.gender='';
                this.register.age='';
                this.register.agetype='岁';
                this.register.birthdate='';
                this.register.idnumber='';
                this.register.homeaddress='';
                this.register.settleid='';
                this.register.deptid='';
                this.register.registleid='';
                this.register.userid='';
                this.registQuota='';
                this.registquotaUsed='';
                this.register.isbook=false;
                this.register.invoice.money='';
                this.register.invoice.feetype='';
            },
            registerd(){
                let date = new Date();
                this.register.invoice.creationtime=date;
                this.changeDate(date);

                let user = window.sessionStorage.getItem('user');
                this.register.registerid=JSON.parse(user).id;
                this.register.invoice.userid=JSON.parse(user).id;
              this.postRequest('/addRegister',this.register).then(resp=>{
                  if(resp){
                        this.clear();
                  }
              })
            },
            ageChange(){
                if(this.register.agetype=='岁'){
                    let date = new Date(this.register.birthdate)
                    let nowDate = new Date()
                    this.register.age=nowDate.getFullYear()-date.getFullYear()

                }else if(this.register.agetype=='月'){
                    let date = new Date(this.register.birthdate)
                    let nowDate = new Date()
                    this.register.age=(nowDate.getFullYear()-date.getFullYear())*12+(nowDate.getMonth()+1)-(date.getMonth()+1)

                }else if(this.register.agetype=='天'){
                    let date = new Date(this.register.birthdate)
                    let nowDate = new Date()
                    this.register.age=Math.floor((nowDate.getTime()-date.getTime())/1000/60/60/24)

                }

            },
            valueChange(){
                console.log(this.value)


            },
            searchDoctor(){
                this.getRequest('/searchSpecilScheduing?deptid='+this.register.deptid+'&registlevelid='+this.register.registleid+'&noon='+this.register.noon+'&nowdate='+this.register.visitdate).then(resp=>{
                    if(resp){
                        this.doctorOptions=resp
                    }
                })
            },
            registlevelchange(value){
                this.getRequest('/searchOneRegistlevel?id='+value).then(resp=>{
                    if(resp){
                        this.register.invoice.money=resp.registfee;
                        this.registQuota=resp.registquota;
                    }
                })
            },
            initMessage(){
                let date = new Date();
                let year=date.getFullYear()
                let month=date.getMonth()+1
                let data=date.getDate()
                let str =year+'-'+month+'-'+data
                this.register.visitdate=str;
                let time = date.getHours()
                if(time>12){
                    this.register.noon = '下午';
                }else{this.register.noon = '上午';};
                this.getRequest('/searchRegistlevel').then(resp=>{
                    if(resp){
                        this.registlevelOptions=resp;
                    }
                });
                this.getRequest('/searchDeptName').then(resp=>{
                    if(resp){
                        this.deptOptions=resp;
                    }
                });
                this.getRequest('/searchGender').then(resp=>{
                    if(resp){
                        this.genderOptions=resp;

                    }
                });
                this.getRequest('/searchCharge').then(resp=>{
                    if(resp){
                        this.chargeOptions=resp;

                    }
                });
                this.getRequest('/searchSettle').then(resp=>{
                    if(resp){
                        this.settleOptions=resp;

                    }
                });
                this.getRequest('/searchRegister').then(resp=>{
                    if(resp){
                        this.register.casenumber=Number(resp.casenumber)+1;

                    }
                });
                this.getRequest('/searchInvoice').then(resp=>{
                    if(resp){
                        this.register.invoice.invoicenum=Number(resp.invoicenum)+1;

                    }
                });
            },
            changeDate(date){
                let year=date.getFullYear();
                let month=date.getMonth();
                let data=date.getDate();
                let hour=date.getHours();
                let minute=date.getMinutes();
                let second=date.getSeconds();
                this.register.registtime=year+'-'+month+'-'+data+' '+hour+':'+minute+':'+second;
            },
            searchByCasenumber(){
                this.getRequest('searchOneRegisterByCasenumber?casenumber='+this.register.casenumber).then(resp=>{
                    if(resp){
                        if(resp.counts>0){
                                this.register.realname= resp.realname;
                                this.register.gender=resp.gender;
                                this.register.idnumber=resp.idnumber;
                                this.register.birthdate=resp.birthdate;
                                this.register.age=resp.age;
                                this.register.agetype=resp.agetype;
                                this.register.homeaddress=resp.homeaddress;
                        }

                    }
                })
            }
        },
        mounted() {
            this.initMessage();
        }
    }
</script>

<style scoped>
    .text{
        color: red;
    }
    .app{
        font-size: 12px;
    }

</style>