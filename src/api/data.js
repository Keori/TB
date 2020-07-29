import axios from '../router/http.js'
//获取流水列表
export const myFlows = (params) => {
  return axios({
    url: '/accounts/flows',
    method: 'get',
    params
  })
}

//用户登录
export const login = (data) => {
  return axios({
    url: '/users/login',
    data,
    method: 'post',
  })
}
//注册
export const register = (data) => {
  return axios({
    url: '/users',
    method: 'post',
    data
  })
}
//未登录发送邮件
export const sendemail = (data) => {
  return axios({
    url: '/users/email/send',
    method: 'post',
    data
  })
}
//已登录发送邮件
export const userEmail = (data) => {
  return axios({
    url: '/users/email/auth',
    method: 'post',
    data
  })
}
//校验邮箱
export const checkemail = (data) => {
  return axios({
    url: '/users/email/check',
    method: 'post',
    data
  })
}
//用户登录信息
export const userInfo = (data) => {
  return axios({
    url: '/users',
    method: 'get',
    data
  })
}
//用户账户信息
export const account = (params) => {
  return axios({
    url: '/accounts',
    method: 'get',
    params
  })
}
//修改登录密码
export const reLoginPass = (data) => {
  return axios({
    url: '/users/password',
    method: 'put',
    data
  })
}
//忘记登录密码
export const forgetLoginPass = (data) => {
  return axios({
    url: '/users/password/forget',
    method: 'post',
    data
  })
}
//修改支付密码
export const rePayPass = (data) => {
  return axios({
    url: '/users/pay-password',
    method: 'put',
    data
  })
}
//获取谷歌验证二维码
export const getGoogle = () => {
  return axios({
    url: '/users/ga/secret',
    method: 'get',
  })
}
//绑定谷歌验证
export const googleGa = (data) => {
  return axios({
    url: '/users/ga',
    method: 'post',
    data
  })
}

//谷歌登录验证
export const loginGa = (data) => {
  return axios({
    url: '/users/ga/verify',
    method: 'post',
    data
  })
}

export const unGoogle = (data) => {
  return axios({
    url: '/users/ga',
    method: 'delete',
    // 正式解绑谷歌验证需要传值
    data
  })
}
//上传实名认证信息
export const upKyc = (data) => {
  return axios({
    url: '/users/kyc/verify',
    method: 'post',
    data
  })
}
//获取实名认证信息
export const getKyc = () => {
  return axios({
    url: '/users/kyc/verify',
    method: 'get',
  })
}
//刷新token
export const refreshToken = () => {
  return axios({
    url: '/users/token/refresh',
    method: 'get',
  })
}
//获取国籍列表
export const getNations = () => {
  return axios({
    url: '/users/nationalities',
    method: 'get',
  })
}
//文章查询
export const getArticle = () => {
  return axios({
    url: '/articles',
    method: 'get',
  })
}

//云算力页面

// 初次填写邀请码和忽略按钮(忽略不传值) 返回邀请码
export const firstInvite = (data) => {
  return axios({
    url: '/minings/invite/codes/is_first',
    method: 'put',
    data
  })
}

// 是否展示弹框邀请码（是否点击过忽略按钮）
export const isFirstInvite = () => {
  return axios({
    url: '/minings/invite/codes',
    method: 'get',
  })
}

//算力商品列表-云算力页面下方
export const yunMining = (params) => {
  return axios({
    url: '/minings/minings',
    method: 'get',
    params
  })
}
//云算力商品推荐列表
export const yunProList = (params) => {
  return axios({
    url: '/minings/minings/recommends',
    method: 'get',
    params
  })
}

//云算力商品详情页面
export const proDetail = (params) => {
  return axios({
    url: '/minings/detail',
    method: 'get',
    params
  })
}
//云算力邀请首页
export const InviteEvent = () => {
  return axios({
    url: '/minings/invite/users',
    method: 'get',
  })
}
//云算力收益
export const gains = () => {
  return axios({
    url: '/minings/gains',
    method: 'get',
  })
}

//云算力页面顶部收益统计
export const summery = () => {
  return axios({
    url: '/minings/profit/totals/yesterday',
    method: 'get',
  })
}

//云算力商品购买确认支付
export const yunPayOrder = (data) => {
  return axios({
    url: '/minings/orders',
    method: 'post',
    data
  })
}
//云算力订单查询
export const yunOrder = (params) => {
  return axios({
    url: '/minings/orders',
    method: 'get',
    params
  })
}
//云算力订单购买记录
export const yunBuyRecord = (params) => {
  return axios({
    url: '/minings/orders/history',
    method: 'get',
    params
  })
}
//订单收益查询
export const yunOrderIncomes = (params) => {
  return axios({
    url: '/minings/orders/profit',
    method: 'get',
    params
  })
}
//邀请推荐收益查询
export const yunInviteIncomes = (params) => {
  return axios({
    url: '/minings/invite/records',
    method: 'get',
    params
  })
}

//算力列表-合约已结束
export const endOrder = (params) => {
  return axios({
    url: '/minings/minings/contract',
    method: 'get',
    params
  })
}

//算力详情页面-包括基础信息,该算力收益 《算力概况
export const orderDetail = (params) => {
  return axios({
    url: '/minings/profit/bills/total',
    method: 'get',
    params
  })
}

//算力列表-云算力页面下方 《产出明细
export const yunBill = (params) => {
  return axios({
    url: '/minings/profit/bills/details',
    method: 'get',
    params
  })
}

//推广收益-上
export const inviteGains = () => {
  return axios({
    url: '/minings/invite/gains',
    method: 'get',
  })
}

//推广收益 - 下
export const inviteIncome = () => {
  return axios({
    url: '/minings/invite/income',
    method: 'get',
  })
}

//收益记录页面-日报表
export const summeryDay = () => {
  return axios({
    url: '/minings/profit/all/days',
    method: 'get',
  })
}

//收益记录页面-月报表
export const summeryMonth = () => {
  return axios({
    url: '/minings/profit/all/months',
    method: 'get',
  })
}

//收益记录页面-总报表
export const summeryTotal = () => {
  return axios({
    url: '/minings/profit/all',
    method: 'get',
  })
}

//理财产品页面(手机理财) 

//推荐列表
 export const recommends = (params) =>{
  return axios({
    url: '/funds/funds/recommends',
    method: 'get',
    params
  })
 }

//理财产品列表
 export const fundsList = (params) =>{
  return axios({
    url: '/funds/funds/fundslist',
    method: 'get',
    params
  })
 }

 //轮播图列表
 export const showList = () =>{
  return axios({
    url: '/funds/funds/rotationchats',
    method: 'get',
  })
 }

 //理财产品详情
 export const fundsDetail = (params) =>{
  return axios({
    url: '/funds/funds/fundDetail',
    method: 'get',
    params
  })
 }
 
 //购买理财产品
 export const buyFunds = (data) =>{
  return axios({
    url: '/funds/funds/buy',
    method: 'post',
    data
  })
 }
 
 //轮播图详情
 export const showDetail = (params) =>{
  return axios({
    url: '/funds/funds/rotationchat/detail',
    method: 'get',
    params
  })
 }


 //理财产品页面(手机订单)

 //用户累计收益
 export const totalIncome = () =>{
  return axios({
    url: '/funds/order/currencycumulativeprofits',
    method: 'get',
  })
 }

//查询货币
export const exchange = () =>{
  return axios({
    url: '/utilities/currencies',
    method: 'get',
  })
  }

 //手机订单列表
// 包含了正在收益和已完结 通过传的值不同 来判断 这个数据返回了列表和详情 点击哪个带到下一个页面
 export const phoneList = (params) =>{
  return axios({
    url: '/funds/order/list',
    method: 'get',
    params
  })
 }
//用户订单详情
 export const userOrderDetail = (params) =>{
  return axios({
    url: '/funds/order/userOrderDetail',
    method: 'get',
    params
  })
 }
  //订单收益明细
  export const incomeDetail = (params) =>{
    return axios({
      url: '/funds/order/incomedetail',
      method: 'get',
      params
    })
   }

    //申请赎回
  export const redemptions = (data) =>{
    return axios({
      url: '/funds/order/redemptions',
      method: 'put',
      data
    })
   }

   //审核详情
  export const checkDetail = (params) =>{
    return axios({
      url: '/funds/order/auditdetails',
      method: 'get',
      params
    })
   }

   //理财购买订单详情 2601
   export const fundOrderDetail = (params) =>{
    return axios({
      url: '/funds/order/orderdetail',
      method: 'get',
      params
    })
   }
   
   //理财分红收入 2602
   export const investOrder = (params) =>{
    return axios({
      url: '/funds/order/investorder',
      method: 'get',
      params
    })
   }

   //奖励订单详情 2603
   export const rewardOrder = (params) =>{
    return axios({
      url: '/funds/order/rewardorder',
      method: 'get',
      params
    })
   }

   //赎回订单详情 2604
   export const redeemOrder = (params) =>{
    return axios({
      url: '/funds/order/redeemorder',
      method: 'get',
      params
    })
   }

//支付接口
export const payMent = (data) =>{
  return axios({
    url: '/charges/orders',
    method: 'post',
    data
  })
 }

 //支付订单查询接口
 export const checkPayMent = (params) =>{
  return axios({
    url: '/charges/orders',
    method: 'get',
    params
  })
 }

//提币确认接口
export const takeCoin = (data) =>{
  return axios({
    url: '/withdraws/orders',
    method: 'post',
    data
  })
 }
 //提币查询接口
 export const takeCoinSearch = (params) =>{
  return axios({
    url: '/withdraws/orders',
    method: 'get',
    params
  })
 }

//提币地址查詢接口
  export const takeCoinAdd = (params) =>{
    return axios({
      url: '/withdraws/addresses/',
      method: 'get',
      params
    })
   }

  //刪除提幣地址
  export const delCoinAdd = (params) =>{
    return axios({
      url: '/withdraws/addresses/'+params,
      method: 'delete',
      params
    })
   }

 //充币查询接口
 export const getCoinAdress = (params) =>{
  return axios({
    url: '/deposits/addresses',
    method: 'get',
    params
  })
 }

 //充币范围查询
 export const searchScope = (params) =>{
  return axios({
    url: '/charges/range',
    method: 'get',
    params
  })
 }

//提币费率查询接口
export const takeCoinRate = (params) =>{
  return axios({
    url: '/withdraws/currencies',
    method: 'get',
    params
  })
 }

//获取发送邮件前的验证码
export const beforeEmailCdk = (params) =>{
  return axios({
    url: '/users/captcha',
    method: 'get',
    params
  })
 }



















