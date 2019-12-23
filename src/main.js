import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

import {getRequest,postRequest,postKeyValueRequest,putRequest,delRequest,delManyRequest,updateManyRequest} from "./utils/api";
Vue.prototype.getRequest=getRequest
Vue.prototype.postRequest=postRequest
Vue.prototype.postKeyValueRequest=postKeyValueRequest
Vue.prototype.putRequest=putRequest
Vue.prototype.delRequest=delRequest
Vue.prototype.delManyRequest=delManyRequest
Vue.prototype.updateManyRequest=updateManyRequest


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
