import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Regist from "../components/RegisterManage/Regist";
import OutRegist from "../components/RegisterManage/OutRegist";
import Constatnt from "../components/SystemManage/Constatnt";
import Dept from "../components/SystemManage/Dept";
import User from "../components/SystemManage/User";
import Charge from "../components/RegisterManage/Charge";
import Refund from "../components/RegisterManage/Refund";
import RepBill from "../components/RegisterManage/RepBill";
import FlogHeavily from "../components/RegisterManage/FlogHeavily";
import CostQuery from "../components/RegisterManage/CostQuery";
import Daily from "../components/RegisterManage/Daily";
import DailyQuery from "../components/RegisterManage/DailyQuery";
import Registlevel from "../components/SystemManage/Registlevel";
import Settlecategory from "../components/SystemManage/Settlecategory";
import Disecategory from "../components/SystemManage/Disecategory";
import Fmeditem from "../components/SystemManage/Fmeditem";
import Scheduling from "../components/SystemManage/Scheduling";




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    hidden:true
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta:{
      title:" 挂号收费"
    },
    children:[ {
      path: '/Regist',
      name: 'Regist',
      component: Regist,
      meta:{
        title:"现场挂号"
      }
    },
      {
        path: '/OutRegist',
        name: 'OutRegist',
        component: OutRegist,
        meta:{
          title:"退号"
        }
      },
      {
        path: '/Charge',
        name: 'Charge',
        component: Charge,
        meta:{
          title:"收费"
        }
      },
      {
        path: '/Refund',
        name: 'Refund',
        component: Refund,
        meta:{
          title:"退费"
        }
      },
      {
        path: '/RepBill',
        name: 'RepBill',
        component: RepBill,
        meta:{
          title:"发票补打"
        }
      },
      {
        path: '/FlogHeavily',
        name: 'FlogHeavily',
        component: FlogHeavily,
        meta:{
          title:"发票重打"
        }
      },
      {
        path: '/CostQuery',
        name: 'CostQuery',
        component: CostQuery,
        meta:{
          title:"患者费用查询"
        }
      },
      {
        path: '/Daily',
        name: 'Daily',
        component: Daily,
        meta:{
          title:"日结*"
        }
      },
      {
        path: '/DailyQuery',
        name: 'DailyQuery',
        component: DailyQuery,
        meta:{
          title:"日结查询*"
        }
      },

    ]
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta:{
      title:" 系统信息"
    },
    children:[ {
      path: '/RegisterManage',
      name: 'Constatnt',
      component: Constatnt,
      meta:{
        title:"常数类别管理"
      }
    },
      {
        path: '/Dept',
        name: 'Dept',
        component: Dept,
        meta:{
          title:"科室管理"
        }
      },
      {
        path: '/User',
        name: 'User',
        component: User,
        meta:{
          title:"用户管理"
        }
      },
      {
        path: '/Registlevel',
        name: 'Registlevel',
        component: Registlevel,
        meta:{
          title:"挂号级别管理"
        }
      },
      {
        path: '/Settlecategory',
        name: 'Settlecategory',
        component: Settlecategory,
        meta:{
          title:"结算类别管理"
        }
      },
      {
        path: '/Disecategory',
        name: 'Disecategory',
        component: Disecategory,
        meta:{
          title:"诊断目录管理"
        }
      },
      {
        path: '/Fmeditem',
        name: 'Fmeditem',
        component: Fmeditem,
        meta:{
          title:"非药品收费项目管理"
        }
      },
      {
        path: '/Scheduling',
        name: 'Scheduling',
        component: Scheduling,
        meta:{
          title:"医生排班管理"
        }
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
