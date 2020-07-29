/**
 * 给邮箱加星号
 * @param {*} value 
 */
//给邮箱加星号
const emailStar=function(value){
    return value.replace(/(.{3}).+(.{2}@.+)/g, "$1****$2");
}
//给昵称加星号
const nameStar=function(value){
    return value.replace(/(.{1}).+(.{1})/g, "$1****$2")
}
// 过滤多余的0 保留8位
const cutZreo = function(value){
    //如果是0 则直接补足小数点和后续的0位
    if(value==0){
        return '0.00000000'
    }
    //如果是个空值 则返回0
    if(!value){
        return '0.00000000'
    }
    let a, b, c, i;
    if(typeof(value)== 'number'){
        a = value.toString();
    }else{
        a = value;
    }
    b = a.indexOf(".");
    c = a.length;
    if (8 == 0) {
        if (b != -1) {
            a = a.substring(0, b);
        }
    } else {//如果没有小数点
        if (b == -1) {
            a = a + ".";
            for (i = 1; i <= 8; i++) {
                a = a + "0";
            }
        } else {//有小数点，超出位数自动截取，否则补0
            a = a.substring(0, b + 8 + 1);
            for (i = c; i <= b + 8; i++) {
                a = a + "0";
            }
        }
    }
    return a;
}
//保留4位
const cutZreoFour = function(value){
    if(value==0){
        return '0.0000'
    }
    if(!value){
        return '0.0000'
    }
     let  a, b, c, i;
     if(typeof(value) == 'number'){
         a = value.toString();
     }else{
         a = value;
     }
     b = a.indexOf(".");
     c = a.length;
     if (4 == 0) {
         if (b != -1) {
             a = a.substring(0, b);
         }
     } else {//如果没有小数点
         if (b == -1) {
             a = a + ".";
             for (i = 1; i <= 4; i++) {
                 a = a + "0";
             }
         } else {//有小数点，超出位数自动截取，否则补0
             a = a.substring(0, b + 4 + 1);
             for (i = c; i <= b + 4; i++) {
                 a = a + "0";
             }
         }
     }
     return a;
}
//保留2位
const cutZreoTwo = function(value){
    if(value==0){
        return '0.00'
    }
    if(!value){
        return '0.00'
    }
     let  a, b, c, i;
     if(typeof(value) == 'number'){
         a = value.toString();
     }else{
         a = value;
     }
     b = a.indexOf(".");
     c = a.length;
     if (2 == 0) {
         if (b != -1) {
             a = a.substring(0, b);
         }
     } else {//如果没有小数点
         if (b == -1) {
             a = a + ".";
             for (i = 1; i <= 2; i++) {
                 a = a + "0";
             }
         } else {//有小数点，超出位数自动截取，否则补0
             a = a.substring(0, b + 2 + 1);
             for (i = c; i <= b + 2; i++) {
                 a = a + "0";
             }
         }
     }
     return a;
}
//判断是正数补加号 是负数 不做操作
const isProNum = function(val){
    let a = val.substring(0,1);
    let b;
    if(a!='-'){
        b = '+'+val;
        return b;
    }else{
        return val;
    }
}
//秒数转换为时分秒
const formatSeconds=function(value) {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if(minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = "" + parseInt(secondTime) + "秒";

    if(minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
    }
    if(hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
    }
    return result;
}
// 格化式时间为年月日 时分秒格式
const formatDate = (val,type) =>{
    if(!val){
       return '0000-00-00 00:00:00'
    }
    // 时间戳10位乘以1000 13位则无需
    let date = new Date(val*1000);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    if(type){
        return y + '-' + MM + '-' + d;
    }
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}
//格式化年月日
const formatYear = (val) =>{
    let a = val.split('-');
}
//过滤后裁切保留4位小数点后加上后缀单位
const typeAdd = (val,type) =>{
    return val + ' '+type
}
//在某个日期上增加多少天数
const addDate = (val,days) => { 
    var d=new Date(val); 
    d.setDate(d.getDate()+days); 
    var m=d.getMonth()+1; 
    m = m < 10 ? ('0' + m) : m;
    var ds = d.getDate();
    ds = ds < 10 ? ('0' + ds) : ds;
    return d.getFullYear()+'-'+ m +'-'+ ds; 
  } 
//根据当前语言判断 返回值
const checklang = (val) =>{
    if(!val){
        return ''
    }
    let reg = /({[^{]*})/g;
    if(reg.test(val)){
        //有中英文
        val = JSON.parse(val);
        let lang = window.localStorage.getItem('lang')
        switch (lang) {
            case 'zh_tw':
                return val.zh_tw
                break;
            case 'en':
                if(!val.en){
                    return val.zh_tw 
                }else{
                    return val.en
                }
                break;
            default:
                break;
        }
    }else{
        //单中文
        return val
    }
}
export default {
    emailStar,cutZreo,cutZreoFour,isProNum,formatSeconds,formatYear,formatDate,cutZreoTwo,typeAdd,addDate,nameStar,checklang
}