import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	// mode: 'history',
	linkActiveClass: 'active',
  routes: [
    {//首页
      path: '/',
			name: 'index',  
      component: r => require.ensure([], () => r(require('@/view')), 'index')
    },
    {//云算力
      // 云算力首页 
      path: '/yun-power',
//      name: 'yun-power', 
      component: r => require.ensure([], () => r(require('@/view/yun-power')), 'yun-power'),
      children:[
        {//云算力首页
          path: '/',
					name: 'yuns-power',
          component: r => require.ensure([], () => r(require('@/view/yun-power/yuns-power')), 'yuns-power'),
				},
				{//云收益计算
          path: 'yun-calc',
					name: 'yun-calc',
          component: r => require.ensure([], () => r(require('@/view/yun-power/yun-calc')), 'yun-calc'),
        },
        {
          // 云商品详情和购买
      	 path: 'yun-buy',
					name: 'yun-buy', 
     		  component: r => require.ensure([], () => r(require('@/view/yun-power/yun-buy')), 'yun-buy')
        },
        {
         // 云算力收益
      	 path: 'yun-Income',
     		//  name: 'yun-Income', 
           component: r => require.ensure([], () => r(require('@/view/yun-power/yun-Income')), 'yun-Income'),
           children:[
             {
              path: '/',
							name: 'yun-Incomes', 
							meta: {
								requireAuth: true, 
						},
               component: r => require.ensure([], () => r(require('@/view/yun-power/yun-Income/yun-Incomes')), 'yun-Incomes'),
             },
             {
              //  云算力矿机详情
              path: 'yun-Income-detail',
							name: 'yun-Income-detail', 
							meta: {
								requireAuth: true, 
						},
              component: r => require.ensure([], () => r(require('@/view/yun-power/yun-Income/yun-Income-detail')), 'yun-Income-detail'),
             },
             {
              //  云算力推广收益
              path: 'yun-Income-extension',
							name: 'yun-Income-extension', 
							meta: {
								requireAuth: true, 
						},
              component: r => require.ensure([], () => r(require('@/view/yun-power/yun-Income/yun-Income-extension')), 'yun-Income-extension'),
             },
             {
              //云算力收益记录
              path: 'yun-Income-my',
							name: 'yun-Income-my', 
							meta: {
								requireAuth: true, 
						},
              component: r => require.ensure([], () => r(require('@/view/yun-power/yun-Income/yun-Income-my')), 'yun-Income-my'),
             },

           ]
        },
        {
          // 云算力邀请好友
         path: 'yun-invite',
					name: 'yun-invite', 
					meta: {
						requireAuth: true, 
				},
     		  component: r => require.ensure([], () => r(require('@/view/yun-power/yun-invite')), 'yun-invite')
        }
        
      ]
    },
    {//理财
      // 理财首页 
      path: '/fund',
      // name: 'fund', 
      component: r => require.ensure([], () => r(require('@/view/fund')), 'fund'),
      children:[
        {//理财首页
          path: '/',
          name: 'funds', 
          component: r => require.ensure([], () => r(require('@/view/fund/funds')), 'funds'),
        },
        {
          //我的定期理财
      	 path: 'fund-myregular',
          // name: 'fund-myregular', 
     		  component: r => require.ensure([], () => r(require('@/view/fund/fund-myregular')), 'fund-myregular'),
           children:[
             {
              path: '/',
							name: 'fund-myregulars', 
							meta: {
								requireAuth: true, 
						},
     		      component: r => require.ensure([], () => r(require('@/view/fund/fund-myregular/fund-myregulars')), 'fund-myregulars'),
             },
             {
              // 我的定期理财-理财产品详情页
      	      path: 'fund-myregular-detail',
							name: 'fund-myregular-detail', 
              component: r => require.ensure([], () => r(require('@/view/fund/fund-myregular/fund-myregular-detail')), 'fund-myregular-detail'),
             },
             {
              //  我的定期理财-理财产品详情-申请提前赎回
              path: 'fund-myregular-detail-early',
							name: 'fund-myregular-detail-early', 
							meta: {
								requireAuth: true, 
						},
              component: r => require.ensure([], () => r(require('@/view/fund/fund-myregular/fund-myregular-detail-early')), 'fund-myregular-detail-early'),
             },
             {
              //  我的定期理财-理财产品详情-昨日收益明细
              path: 'fund-myregular-datail-yesterday',
							name: 'fund-myregular-datail-yesterday', 
							meta: {
								requireAuth: true, 
						},
              component: r => require.ensure([], () => r(require('@/view/fund/fund-myregular/fund-myregular-datail-yesterday')), 'fund-myregular-datail-yesterday'),
             },
           ]
        },
        {
          // 理财产品页
         path: 'fund-product',
       		  // name: 'fund-product', 
           component: r => require.ensure([], () => r(require('@/view/fund/fund-product')), 'fund-product'),
           children:[
            {//理财产品页
              path: '/',
              name: 'fund-products', 
               component: r => require.ensure([], () => r(require('@/view/fund/fund-product/fund-products')), 'fun-products')
            },
            {
             // 理财产品详情
             path: 'fund-product-detail',
						 name: 'fund-product-detail', 
             component: r => require.ensure([], () => r(require('@/view/fund/fund-product/fund-product-detail')), 'fund-product-detail'),
            },
            {
             //  理财产品购买
             path: 'fund-product-detail-buy',
						 name: 'fund-product-detail-buy',
						 meta: {
							requireAuth: true, 
							kyc:true,
							google:true,
							getAcc:true
					}, 
             component: r => require.ensure([], () => r(require('@/view/fund/fund-product/fund-product-detail-buy')), 'fund-product-detail-buy'),
            },
          ]
        }
      ]
    },{ //用户
			path: '/user',
			name: 'user',
			component: r => require.ensure([], () => r(require('@/view/User')), 'user'),
			children: [
				{ //登录页
				path: 'login',
				name: 'login',
				component: r => require.ensure([], () => r(require('@/view/User/login')), 'login')
			}, 
			{ //忘记密码
				path: 'emailRePwd',
				name: 'emailRePwd',
				component: r => require.ensure([], () => r(require('@/view/User/login/emailRePwd')), 'emailRePwd')
			}, 
			{//提示Kyc认证页
					path: 'kycCheck',
					name: 'kycCheck',
					meta: {
						requireAuth: true, 	
					}, 
					component: r => require.ensure([], () => r(require('@/view/User/checkPoint/kycCheck')), 'kycCheck')
				},
				{//提示Google认证页
					path: 'googleCheck',
					name: 'googleCheck',
					meta: {
						requireAuth: true, 	
					}, 
					component: r => require.ensure([], () => r(require('@/view/User/checkPoint/googleCheck')), 'googleCheck')
			},
			{//注册
				path: 'register',
				name: 'register',
				component: r => require.ensure([], () => r(require('@/view/User/register/register')), 'register')
			},
			{//邮箱验证码
				path: 'emailCode',
				name: 'emailCode',
				component: r => require.ensure([], () => r(require('@/view/User/register/emailCode')), 'emailCode')
			}, 
			{//设置昵称
				path: 'setName',
				name: 'setName',
				component: r => require.ensure([], () => r(require('@/view/User/register/setName')), 'setName')
			}, 
			{//设置登录密码
				path: 'setLoginPwd',
				name: 'setLoginPwd',
				component: r => require.ensure([], () => r(require('@/view/User/register/setLoginPwd')), 'setLoginPwd')
			}, 
			{//设置支付密码
				path: 'setPayPwd',
				name: 'setPayPwd',
				component: r => require.ensure([], () => r(require('@/view/User/register/setPayPwd')), 'setPayPwd')
			}]

		},{
			//账户
			path:'/account',
			name:'account',
			component: r => require.ensure([], () => r(require('@/view/account')), 'account'),
			children:[{//HKP购买和转出
				path: 'HKP',
				name: 'HKP',
				meta: {
					requireAuth: true, 
					kyc:true,
					google:true
					
			}, 
				component: r => require.ensure([], () => r(require('@/view/account/HKP')), 'HKP')
			},{//二维码购买
				path: 'PaymentCode',
				name: 'PaymentCode',
				meta: {
					requireAuth: true, 
					kyc:true,
					google:true
			}, 
				component: r => require.ensure([], () => r(require('@/view/account/HKP/PaymentCode')), 'PaymentCode')
			},{//BTC购买和转出
				path: 'BTC',
				name: 'BTC',
				meta: {
					requireAuth: true, 
					kyc:true,
					google:true
			}, 
				component: r => require.ensure([], () => r(require('@/view/account/BTC')), 'BTC')
			},{//BTC购买和转出
				path: 'myCode',
				name: 'myCode',
				meta: {
					requireAuth: true, 
					kyc:true,
					google:true
			}, 
				component: r => require.ensure([], () => r(require('@/view/account/myCode')), 'myCode')
			}]
		},{
			//个人中心
			path:'/profile',
//			name:'profile',
			component: r => require.ensure([], () => r(require('@/view/profile')), 'profile'),
			children:[{
				path:'/',
				name:'profile-index',
				component: r => require.ensure([], () => r(require('@/view/profile/profile-index')), 'profile-index')
			},{//账单
				path:'bill',
				name:'bill',
				meta: {
					requireAuth: true, 
			},
				component: r => require.ensure([], () => r(require('@/view/profile/bill')), 'bill')
			},{//账单信息
				path:'bill-info',
				name:'bill-info',
				meta: {
					requireAuth: true, 
			},
				component: r => require.ensure([], () => r(require('@/view/profile/bill/bill-info.vue')), 'bill-info')
			},{//填写kyc信息
				path:'fill-kyc',
				name:'fill-kyc',
				meta: {
					requireAuth: true, 
			},
				component: r => require.ensure([], () => r(require('@/view/profile/kyc/upload/fill-kyc.vue')), 'fill-kyc')
			},{//上传证件正反面
				path:'upload_kyc_photo1',
				name:'upload_kyc_photo1',
				meta: {
					requireAuth: true, 
			},
				component: r => require.ensure([], () => r(require('@/view/profile/kyc/upload/upload_kyc_photo1.vue')), 'upload_kyc_photo1')
			},{//上传证件手持照
				path:'upload_kyc_photo2',
				name:'upload_kyc_photo2',
				meta: {
					requireAuth: true, 
			},
				component: r => require.ensure([], () => r(require('@/view/profile/kyc/upload/upload_kyc_photo2.vue')), 'upload_kyc_photo2')
			},{//认证结果
				path:'kyc-info',
				name:'kyc-info',
				meta: {
					requireAuth: true, 
			},
				component: r => require.ensure([], () => r(require('@/view/profile/kyc')), 'kyc-info')
			},{//个人信息
				path:'myInfo',
				name:'myInfo',
				meta: {
					requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			},
				component: r => require.ensure([], () => r(require('@/view/profile/myInfo')), 'myInfo')
			},{//绑定手机
				path:'phone',
				name:'phone',
				meta: {
					requireAuth: true, 
			},
				component: r => require.ensure([], () => r(require('@/view/profile/myInfo/phone')), 'phone')
			},{//谷歌验证器
				path:'Google',
				name:'Google',
				meta: {
					requireAuth: true, 
			},
				component: r => require.ensure([], () => r(require('@/view/profile/myInfo/Google')), 'Google')
			},{//修改登录密码
				path:'loginPwd',
				name:'loginPwd',
				meta: {
					requireAuth: true, 
			},
				component: r => require.ensure([], () => r(require('@/view/profile/myInfo/loginPwd')), 'loginPwd')
			},{//修改支付密码
				path:'payPwd',
				name:'payPwd',
				meta: {
					requireAuth: true, 
			},
				component: r => require.ensure([], () => r(require('@/view/profile/myInfo/payPwd')), 'payPwd')
			},{//重置登录密码
				path:'resetLoginPwd',
				name:'resetLoginPwd',
				meta: {
					requireAuth: true, 
			},
				component: r => require.ensure([], () => r(require('@/view/profile/myInfo/resetLoginPwd')), 'resetLoginPwd')
			},
			{//重置支付密码
				path:'resetPayPwd',
				name:'resetPayPwd',
				meta: {
					requireAuth: true, 
			},
				component: r => require.ensure([], () => r(require('@/view/profile/myInfo/resetPayPwd')), 'resetPayPwd')
			},
			{//地址管理
				path:'myAddress',
				name:'myAddress',
				meta: {
					requireAuth: true, 
			},
				component: r => require.ensure([], () => r(require('@/view/profile/myAddress')), 'myAddress')
			},
			{//帮助中心
				path:'help-center',
				name:'help-center',
				component: r => require.ensure([], () => r(require('@/view/profile/OurHelpSettings/help-center')), 'help-center')
			},
			{//关于我们
				path:'about-us',
				name:'about-us',
				component: r => require.ensure([], () => r(require('@/view/profile/OurHelpSettings/about-us')), 'about-us')
			},
			{//系统设置
				path:'system-set',
				name:'system-set',
				component: r => require.ensure([], () => r(require('@/view/profile/OurHelpSettings/system-set')), 'system-set')
			}]
		}
  ]
})

