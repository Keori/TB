import Vue from 'vue'
import VueI18n from 'vue-i18n'//多语言
import ch from './ch.js'//中文
import en from './en.js'//英文
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: window.localStorage.getItem('lang')||'zh_tw',
  messages:{
    'zh_tw': ch,
    'en': en  
  }
})
export default i18n