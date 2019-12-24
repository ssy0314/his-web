<template>
    <div class="app">
        <div>
            <span class="text">*</span>发票号：<el-input size="mini" placeholder="发票号" style="width: 140px;margin:8px 0;margin-right: 50px"></el-input> <el-button size="mini" type="primary" class="el-icon-edit">挂号</el-button><el-button size="mini" type="primary" class="el-icon-refresh">清空</el-button>
        </div>
        <div>
            <span>挂号信息</span><br>
            <span class="text" style="letter-spacing:12px">*</span>病历号：<el-input size="mini" style="width: 140px;margin:8px 0;margin-right: 50px"></el-input>
            <span class="text">*</span><label>姓<i style="padding-left: 24px"></i>名：</label><el-input placeholder="输入姓名" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px"></el-input>
            <span class="text">*</span>性<i style="padding-left: 24px"></i>别：<el-select v-model="gender" placeholder="请选择" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px">
                <el-option
                        v-for="item in genderOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <span class="text">*</span>年<i style="padding-left: 24px"></i>龄：<el-input placeholder="输入年龄" size="mini" style="width: 140px;margin:8px"></el-input>
            <span class="text">*</span><el-select v-model="age" placeholder="请选择" size="mini" style="width: 140px;">
                <el-option
                        v-for="item in ageOptions"
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
                v-model="value1"
                type="date"
                size="mini"
                style="width: 140px;margin:8px 0;margin-right: 50px"
                placeholder="选择日期">
            </el-date-picker>
            </span>
            身份证号：<el-input placeholder="在此输入身份证号" size="mini" style="width: 200px;margin:8px 0;margin-right: 50px"></el-input>
            家庭住址：<el-input placeholder="在此输入家庭住址" size="mini" style="width: 200px;margin:8px 0;margin-right: 50px"></el-input>
            <br><span class="text">*</span>结算类别：<el-select v-model="settle" placeholder="请选择" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px">
                <el-option
                        v-for="item in settleOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <span class="text">*</span>看诊日期：
            <span>
            <el-date-picker
                    v-model="value1"
                    type="date"
                    size="mini"
                    style="width: 140px;margin:8px 0;margin-right: 50px"
                    placeholder="选择日期">
            </el-date-picker>
            </span>
            <span class="text">*</span>午<i style="padding-left: 24px"></i>别：<el-select v-model="noon" placeholder="午别" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px">
                <el-option
                        v-for="item in noonOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <span class="text">*</span>挂号科室：<el-select v-model="dept" placeholder="挂号科室" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px">
                <el-option
                        v-for="item in deptOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <br>
            <span class="text">*</span>号<i style="padding-left: 24px"></i>别：<el-select v-model="registlevel" placeholder="请选择" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px">
                <el-option
                        v-for="item in registlevelOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <span class="text">*</span>看诊医生：<el-select v-model="value" placeholder="doctor" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px">
                <el-option
                        v-for="item in doctorOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <i style="padding-left: 6px"></i>初始号额：<el-input placeholder="初始号额" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px"></el-input>
            <i style="padding-left: 6px"></i>已用号额：<el-input size="mini" placeholder="已用号额" style="width: 140px;margin:8px 0;margin-right: 50px"></el-input>
            <br><i style="padding-left: 6px"></i><span style="letter-spacing: 6px">病历本</span><el-checkbox size="mini" style="margin:8px 0;margin-right: 183px"></el-checkbox>
            <span class="text">*</span>应收金额：<el-input size="mini" style="width: 140px;margin:8px 0;margin-right: 50px"></el-input>
            <span class="text">*</span>收费方式：<el-select v-model="charge" placeholder="请选择" size="mini" style="width: 140px;margin:8px 0;margin-right: 50px">
            <span class="text">*</span><el-option
                    v-for="item in chargeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
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
              gender:1,
              age:1,
              settle:1,
              noon:'',
              dept:0,
              registlevel:0,
              doctor:0,
              charge:0,
              chargeOptions:[],
              doctorOptions:[],
              registlevelOptions:[],
              deptOptions:[],
              settleOptions:[],
              genderOptions:[],
              noonOptions:[
                  {
                      label:'上午',
                      value:'上午',
                  },
                  {
                      label:'下午',
                      value:'下午',
                  },
              ],
              ageOptions:[
                  {
                  label:'岁',
                  value:1,
              },
                  {
                      label:'月',
                      value:2,
                  },
                  {
                      label:'天',
                      value:3,
                  },
              ],
          }
        },
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