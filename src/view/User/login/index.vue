<template>
	<div class="login">
		<Header :noBorder="true" :rightText="$t('login.register')" to='register'></Header>
		<div class="logo">
			<img src="../../../assets/imgs/login_logo.png"/>
		</div>
		<Form @submit="next">
			<div class="con">
				<!-- @keyup="" 触发自动验证事件 -->
				<Input :placeholder="$t('public.inputmail')" v-model="email" @keydown.native="down" :clear="true" :inputEamil="email"/>
				<Input :placeholder="$t('public.inputpwd')" v-model="password" :eyes='true'/>
				<Vaptcha v-model="vaptcha" @input="vap"></Vaptcha>
				<div class="btn">
					<Button :submit="true" :disabled="noVap||!email||!Errormail||!password||!ErrorPWD">{{$t('public.login')}}</Button>
					<Button type="border" to="emailRePwd"><span class='forgetpwd'>{{$t('public.forgetpwd')}}</span></Button>
				</div>
			</div>
			<Alert :value="push" :txt="kycContent" :cancel_text="$t('public.Noapprove')" :ok_text="$t('public.Toapprove')" @on-cancel="goPro" @on-confirm="gokyc"></Alert>
			<Alert :value="fail" :txt="kycConFail" :cancel_text="$t('public.Noapprove')" :ok_text="$t('public.Toapprove')" @on-cancel="goPro" @on-confirm="gokyc"></Alert>
			<Google :value="google" :leftText="$t('public.Nologin')" @on-cancel="cancel" @on-next="checkGoogle"></Google>
		</Form>
	</div>
</template>
<script>
import { login,loginGa } from '../../../api/data'
	export default{
		data(){
			return{
				email: "",
				password: "",
				push:false,
				fail:false,
				kycContent: this.$t('public.kyc'),
				kycConFail: this.$t('public.kycFail'),
				vaptchaObj:'',
				vaptchaToken:'',
				emailReg:'',
				PWDReg:'',
				vaptcha:'',
				noVap:true,
				// show5:false,
				googleNum:'',
				show1:true,
				Errormail: true,
				ErrorPWD: true,
				kycStatus:'',
				google:false
			}
		},
		watch:{
			email(){
				this.emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
				if(!this.emailReg.test(this.email)){
					this.Errormail = false
					// this.$vux.toast.text('请输入正确的邮箱格式')
				}else{
					this.Errormail = true
				}
			},
			password(){
				this.PWDReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
				if(!this.PWDReg.test(this.password)){
					this.ErrorPWD = false
					// this.$vux.toast.text('密码格式错误')
				}else{
					this.ErrorPWD = true
				}
			}
		},
		methods:{
			vap(obj){
				obj.listen('pass',()=>{
					this.vaptchaToken = this.vaptcha.getToken();
					this.noVap = false;
				})
			},
			cancel(){
				window.localStorage.clear();
				setTimeout(() => {
					this.$store.commit('loginOut');
				}, 5);
				this.google = false;
			},
			checkGoogle(num){
				this.googleNum = num;
				if(!this.googleNum){
					this.$vux.toast.show({
						text: this.$t('public.GAVer'),
						type: 'cancel',
						width: '4.3rem'
					})
					return false
				}
				// if(res.data.data.user.status_kyc_verify==3){
				// 	this.fail = true;
				// }
				let data = {
				'onecode':this.googleNum
				}
				loginGa(data).then(res=>{
					switch (res.data.errcode) {
						case 0:
							window.localStorage.setItem('lang','zh_tw');
							this.google = false;
							//谷歌验证登录以后再判断是否有实名认证
							switch (this.kycStatus) {
								case 0:
									this.push = true;
									break;
								case 3:
									this.fail = true;
									break;
								default:
									this.$router.replace({name:'profile-index'})
									break;
							}
							break;
						case 11003:
							this.$vux.toast.show({
								text: this.$t('public.wirtecorrectGavercode'),
								type: 'cancel',
								width: '4.3rem'
							})
							break;
						case 11016:
							this.$vux.toast.show({
								text: this.$t('public.writeGafail'),
								type: 'cancel',
								width: '7.5rem'
							})
							break;
						default:
							break;
					}
					// this.$router.replace({name:'index'})
				})
			},
			next(){
				this.emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
				let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
				if(!this.emailReg.test(this.email)){
					this.$vux.toast.show({
						text: this.$t('public.writecorrectmaillayout'),
						type: 'cancel',
						width: '3.5rem'
					})
					return
				}
				if(!passwordReg.test(this.password)){
					this.$vux.toast.show({
						text: this.$t('public.pwdlayoutmis'),
						type: 'cancel',
						width: '2.5rem'
					})
					return
				}
				let data = {
					'email':this.email,
					'password':this.$md5(this.password),
					'va':this.vaptchaToken
				}
				login(data)
				.then((res)=>{
						switch (res.data.errcode) {
							case 0:
								// 有谷歌验证 则需要用户进一步验证
								let token = res.data.data.token;
								localStorage.setItem('token',token);
								if(res.data.data.user.is_go_verify){
									this.google = true;
									this.kycStatus =  res.data.data.user.status_kyc_verify;
								// 没有谷歌验证直接判断是否有实名认证
								}else{
									let token = res.data.data.token;
									localStorage.setItem('token',token);
									window.localStorage.setItem('lang','zh_tw');
									this.kycStatus =  res.data.data.user.status_kyc_verify;
									switch (this.kycStatus) {
										case 0:
											this.push = true;
											break;
										case 3:
											this.fail = true;
											break;	
										default:
											this.$router.replace({name:'profile-index'})
											break;
									}
									// if(res.data.data.user.status_kyc_verify==0){
									// 	this.push = true;
									// }else{
									// 	this.$router.replace({name:'profile-index'})
									// }
								}
							break;
							case 11001:
								this.$vux.toast.show({
									text: this.$t('public.accountorpwdfail'),
									type: 'cancel',
									width: '2.8rem'
								})
								this.password = '';
							break;
							case 11020:
								this.$vux.toast.show({
									text: this.$t('public.UserNoway'),
									type: 'cancel',
									width: '2.5rem'
								})
							break;
						}
					// }
				})
			},
			down(){
				if(this.email.length>=32){
					this.$vux.toast.show({
						text: this.$t('public.mailaccounttolong'),
						type: 'cancel',
						width: '4.8rem'
					})
					this.email = ''
					return false
				}
			},
			gokyc(){
				this.$router.replace({name:'fill-kyc',query:{isLogin:true}})
			},
			goPro(){
				this.$router.push({name:'profile-index'});
			}
		},
		created(){
			window.localStorage.clear();
			setTimeout(() => {
				this.$store.commit('loginOut');
			}, 10);
			//隐藏式人机验证
			// const script = document.createElement('script');
			// // script.type = 'text/javascript';
			// script.src = 'https://cdn.vaptcha.com/v2.js';
			// script.onload = script.onreadystatechange = () => {
			// 	if(!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
			// 		vaptcha({
			// 		    //配置参数
			// 		    vid: '5c2441e3fc650eb9ac04e8d8', // 验证单元id
			// 		    type: 'invisible', // 展现类型
			// 		    // lang:this.$i18n.locale =='en'?'en':'zh-TW'
			// 		}).then( (vaptchaObj) => {
			// 			  this.vaptchaObj = vaptchaObj;//将VAPTCHA验证实例保存到局部变量中


						// 验证成功进行后续操作
					//   vaptchaObj.listen('pass',()=>{
					// 	//获取验证码的token给本地的值
					// 	this.vaptchaToken = vaptchaObj.getToken()
					//   		this.next()
					//   })
			// 		})
			// 	}
			// };
			// document.body.appendChild(script);
		}
	}
</script>

<style scoped="scoped" lang="less">
.login{
	.logo{
		padding: 1.41rem 0 1.6rem;
		text-align: center;
		img{
			width: 4.12rem;
		}
	}
	.con{
		padding: 0 0.97rem;
		.g_input:first-child{
			margin-bottom: 0.33rem;
			padding-right: 0.6rem;
		}
		.btn{
			padding-top: 0.81rem;
			button:first-child{
				margin-bottom: 0.33rem;
			}
		}
	}
}
.forgetpwd{
	display: block;
	width: 100%;
	height: 100%;
	color:#00A0E9;
}
.vaptcha-init-main {
    display: table;
    width: 100%;
    height: 100%;
    background-color: #EEEEEE;
}
.vaptcha-init-loading {
    display: table-cell;
    vertical-align: middle;
    text-align: center
}
.vaptcha-init-loading>a {
    display: inline-block;
    // width: 18px;
    // height: 18px;
}
.vaptcha-init-loading>a img{
    vertical-align: middle
}
.vaptcha-init-loading .vaptcha-text {
    font-family: sans-serif;
    font-size: 12px;
    color: #CCCCCC;
    vertical-align: middle
}
</style>