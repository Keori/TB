import axios from 'axios'
import router from '../router'
import store from '../store'
import Vue from 'vue'
import i18n from '@/i18n'
import { userInfo,account } from '@/api/data'
import timestamp from 'time-stamp';

let regs = /users/
let reg = /charges\/orders/
// 默认配置
axios.defaults.baseURL = 'http://user-api.test.tbond.io/'
// axios.defaults.baseURL = 'http://user-api.tbond.test/'
//设置请求超时时间
axios.defaults.timeout = 10000;
//设置一个值,记录当前的TOKEN是否刷新过
// axios.defaults.retry = 4;
// axios.defaults.retryDelay = 1000;
//设置重新请求次数和间隔
var reToken = false;
// http request 请求拦截器
axios.interceptors.request.use(
    config => {
        if(!reg.test(config.url)||(config.method!='get')){ //
            Vue.$vux.loading.show(
                {position:'middle'}
            )
        }
        // 拿到登录成功token的存值
        var xtoken = window.localStorage.getItem('token');
        // 如果token不是空 则每次发送请求在头部带上token
        if (xtoken != null) {
            config.headers.Authorization = 'Bearer ' + xtoken;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
        
    });
 
// http response 响应拦截器
axios.interceptors.response.use(
    response => {
        Vue.$vux.loading.hide()
        switch (response.data.errcode) {
            case 11003: //谷歌校验失败，输入正确的谷歌验证码
                Vue.$vux.toast.show(
                {
                    text: i18n.t('Google.Googleverfail'),
                    type:'cancel',
                    width: '3.5rem'
                })
                break;
            case 11004: //请求路由错误请检查
                Vue.$vux.toast.show(
                {
                    //此界面多语言使用这种方式引入即可
                    text: i18n.t('public.requstrouterfail'),
                    // text: this.$t('public.yetaccountregister'),
                    type:'cancel',
                    width: '3.5rem'
                })
                break;
            case 11005: //系统异常
                Vue.$vux.toast.show(
                {
                    text: i18n.t('public.SysteError'),
                    type:'cancel',
                    width: '3.5rem'
                })
                break;
            case 11009: //邮箱验证码不正确
                Vue.$vux.toast.show(
                {
                    text: i18n.t('public.EmailError'),
                    type:'cancel',
                    width: '3.5rem'
                })
                break;
            case 11015: //今日邮箱校验错误次数已达到上限
                Vue.$vux.toast.show(
                {
                    text: i18n.t('public.emailErrorLast'),
                    type:'cancel',
                    width: '3.5rem'
                })
                break;
            case 11016: //今日Ga校验错误次数已达到上限
                Vue.$vux.toast.show(
                {
                    text: i18n.t('public.GaErrorLast'),
                    type:'cancel',
                    width: '3.5rem'
                })
                break;
            case 11018: //今日密码错误次数已达上限
                Vue.$vux.toast.show(
                {
                    text: i18n.t('public.pwdErrorLast'),
                    type:'cancel',
                    width: '4.5rem'
                })
                break;
            case 11019:
                window.localStorage.clear();
                router.replace({
                    path: '/user/login'
                })
                break;
            case 11024: //用户被禁止登陆
                Vue.$vux.toast.show(
                {
                    text: i18n.t('login.StopLogin'),
                    type:'cancel',
                    width: '3.5rem'
                })
                break;
            case 11401: //今日密码错误次数已达到上限
                Vue.$vux.toast.show(
                {
                    text: i18n.t('public.pwdErrorLast'),
                    type:'cancel',
                    width: '3.5rem'
                })
                break;
            case 26029: //谷歌验证码错误
                Vue.$vux.toast.show(
                {
                    text: '谷歌验证码错误!',
                    type:'cancel',
                    width: '3.5rem'
                })
            case 26037: //谷歌验证码错误
                Vue.$vux.toast.show(
                {
                    text: '谷歌验证码错误!',
                    type:'cancel',
                    width: '3.5rem'
                })
                break;
            default:
                break;
        }
        return response;
    },
    //根据错误码来进行相应的提示和操作
    err => {
        Vue.$vux.loading.hide()
        // 1. 最近一次请求拦截到响应401错误 证明原TOKEN过期了
        if(err.response&&err.response.status == 401) {
            // 先保存这最后一次请求
            let config = err.config;
             //判断是否已经刷新过token
            if(!reToken){
                // 调刷新token的接口
                axios('/users/token/refresh').then((res)=>{
                    //把新获取的token替换老的token值
                    let newToken = res.data.data.new_token;
                    localStorage.setItem('token',newToken); 
                    //修改reToken为刷新过的状态
                    reToken = true;
                    // return config;
                    window.location.reload();
                    // 再次请求最后的一次访问
                })
                //调接口失败重新登录
                .catch(()=>{
                    tips();
                })
                //已刷新 则提示用户重新登录
            }else{
                tips();
            }
            return false
        }
        // 422 请求路由发生错误 请检查路由
        if(err.response&&err.response.status == 422) {
            Vue.$vux.toast.show(
            {
                text: i18n.t('public.requstrouterfail'),
                type:'cancel',
                // position:'middle',
                width: '3.5rem'
            })
            return false;
        }
        Vue.$vux.toast.show(
            {
                // text:'访问超时',
                text:i18n.t('public.VisitTimeout'),
                type:'cancel',
                position:'middle'
            })
        return Promise.reject(err)   // 返回接口返回的错误信息
    });
//获取用户信息
let getUser = (call) =>{
    userInfo().then(res=>{
        store.commit('setUserInfo',res.data.data.user)
        call()
    })
}
//获取用户账户信息
let getUserAccount = (call) =>{
    account().then(res=>{
        //如果用户信息不存在则跳出
        if(!store.state.userInfo.email) return false;
        store.commit('setUserAccount',res.data.data.accounts);
        call()
    })
}
//登录信息过期提示
let tips = () => {
        Vue.$vux.toast.show(
            {
                text: i18n.t('public.pastdueRelogin'),
                type:'cancel',
                width:'5rem'
            })
        window.localStorage.removeItem('token');
        router.replace({
        path: '/user/login'
    })
    return false
}
//判断kyc和google验证
let kycGa = function (to,from,next){
    //kyc未认证
    if(store.state.userInfo.status_kyc_verify!=2&&to.meta.kyc){
        next({
            path:'/User/kycCheck',
            query: {
				// 将跳转的路由path作为参数，登录成功后跳转到该路由
				redirect: from.fullPath
			} 
        })
        return false
    }
    //需要谷歌认证的页面
    if(store.state.userInfo.is_go_verify==0&&to.meta.google){
        next({
            path:'/User/googleCheck',
            query: {
				// 将跳转的路由path作为参数，登录成功后跳转到该路由
				redirect: from.fullPath
			} 
        })
        return false
    }
}
// 使用路由守卫判断路由跳转条件(主要判断当前页面是否需要登录才能访问 to即将要访问的路由对象 form当前导航正要离开的路由 next下一步要走的路由(增加判断条件))
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
            if(window.localStorage.getItem('token')) {
                 //访问正常需要登录页面 判断没有用户信息就调接口获取用户信息
                if(!store.state.userInfo.email){
                    userInfo().then(res=>{
                        switch (res.data.errcode) {
                            case 0:
                                store.commit('setUserInfo',res.data.data.user)
                                kycGa(to,from,next);
                                //如果要去需要账户信息的路由 并且没有账户信息
                                if(to.meta.getAcc&&!store.state.accounts){
                                    getUserAccount(next);
                                    return false;
                                }
                                next();
                                break;
                            case 11019:
                                window.localStorage.removeItem('token');
                                Vue.$vux.toast.show(
                                    {
                                        text: i18n.t('public.Relogin'),
                                        type:'cancel',
                                        position:'middle'
                                    })
                                router.replace({
                                    path: '/user/login'
                                })
                                break;
                        }
                    })
                }else{
                    // 有用户信息先判断是否去需要谷歌和实名认证的页面
                    kycGa(to,from,next);
                    if(to.meta.getAcc&&!store.state.accounts){ //判断账户信息是否存在
                        getUserAccount(next)
                        return false;
                    }
                    //不是则直接跳转
                    next();
                }
                // 如果没有token信息说明没有登录 打到登录页面
            }else {
                next({
                    path: '/User/login',
                    query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }
        } else{ //登录状态下在不需要登录的页面刷新页面从新走token判断的流程 页面刷新等于重新进入路由 可以直接进入判断
            if(window.localStorage.getItem('token')) {
                // 判断没有用户信息就调接口获取用户信息
               if(!store.state.userInfo){
                    getUser(next)
               }else{
                // 有用户信息可以直接跳转
                next();
               }
           }else {
               //无需登录页面无token也可以直接跳转
                next();
           }
        }
})

export default axios;