import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import axios from './router/http.js'
import store from './store'
import i18n from './i18n'//多语言
//公用组件
import g_head from '@/components/G_header'
import g_tab from '@/components/G_tab'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Title from '@/components/Title'
import Button from '@/components/Button'
import Form from '@/components/Form'
import Checkbox from '@/components/Checkbox'
import Tips from '@/components/Tips'
import Transform from '@/components/Transform'
import PayPassword from '@/components/PayPassword'
import Cell from '@/components/Cell'
import AwesomePicker from 'vue-awesome-picker';
import Picker from '@/components/Picker'
import Alert from '@/components/Alert'
import EmailDialog from '@/components/EmailDialog'
import Repassdone from '@/components/Repassdone'
import Google from '@/components/Google'
import md5 from 'js-md5'
import QRCode from '@/components/QRCode'
import Vaptcha from '@/components/Vaptcha'
import Vscroll from '@/components/Vscroll'

import clipboard from 'clipboard';
import filters from '@/api/filters';

//过滤器统一处理加载
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//解决使用vue-router切换页面时 页面显示没有在顶部的问题
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

//注册到vue原型上
Vue.prototype.clipboard = clipboard;
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = (pass)=>{
 return md5(pass+'tbond'+md5(pass));
};
//格式化日期
Date.prototype.YMD = function (AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;
      m=m>=10?m:("0"+m)
  var d = dd.getDate();
    d = d >= 10 ? d : ("0" + d)
  return y + "-" + m + "-" + d;
}
// Vue.prototype.$passReg = () =>{
//   let reg  =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
//   }
Vue.config.productionTip = false
import  { ToastPlugin , AlertPlugin , LoadingPlugin } from 'vux'//ui组件
Vue.use(ToastPlugin,{position:'middle'})
Vue.use(LoadingPlugin)
Vue.use(axios, Vuex)
Vue.use(AwesomePicker)
/* eslint-disable no-new */

Vue.component('Header', g_head)//头部组件
Vue.component('Tab', g_tab)//首页tab
Vue.component('Input', Input)//输入框
Vue.component('Label', Label)//label
Vue.component('Title', Title)
Vue.component('Button', Button)
Vue.component('Form', Form)
Vue.component('Checkbox', Checkbox)
Vue.component('Tips', Tips)
Vue.component('Transform', Transform)
Vue.component('PayPassword', PayPassword)
Vue.component('Cell', Cell)
Vue.component('Picker', Picker)
Vue.component('QRCode',QRCode)
Vue.component('Alert',Alert)
Vue.component('Repassdone',Repassdone)
Vue.component('Vaptcha',Vaptcha)
Vue.component('Vscroll',Vscroll)
Vue.component('EmailDialog',EmailDialog)
Vue.component('Google',Google)



new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
  i18n
})

