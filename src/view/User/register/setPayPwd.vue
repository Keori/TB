<template>
	<Form @submit="tologin">
		<Title>{{$t('register.setpaypwd')}}</Title>
		<Label :title="$t('register.paypwd')">
			<Input :placeholder="$t('public.hint')" type="password" :eyes='true' v-model="pass.pass1 "/>
		</Label>
		<Label :title="$t('register.affirmloginpwd')">
			<Input :placeholder="$t('public.hint')" type="password" :eyes='true' v-model="pass.pass2"/>
		</Label>
		<!-- <Checkbox v-model="rule">{{$t('register.agreeabide')}}<router-link to='/' class='link' @click='opens'>《{{$t('register.Serviceclause')}}》</router-link></Checkbox> -->
		<Checkbox v-model="rule">{{$t('register.agreeabide')}}<router-link to='setPayPwd-agreement' class='link'>《{{$t('register.Serviceclause')}}》</router-link></Checkbox>
		<Button :submit='true' :disabled="!rule" :fixed="true">{{$t('login.register')}}</Button>
	</Form>
</template>

<script>
import { register,login } from '../../../api/data'
	export default{
		data(){
			return{
				rule:false,
				kycContent: this.$t('public.kyc'),
				email:'',
				nickname:'',
				password:'',
				code:'',
				pass:{
					pass1:'',
					pass2:''
				},
				code: ''
			}
		},
		methods:{
			tologin(){
				let reg  =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
				if(!this.pass.pass1){
					this.$vux.toast.show({
					text: this.$t('public.pwdnospace'),
					type: 'cancel',
					width: '2.5rem'
					})
					return false
				}
				if(!reg.test(this.pass.pass1)){
					this.$vux.toast.show({
					text: this.$t('public.pwdlayoutmis'),
					type: 'cancel',
					width: '2.5rem'
					})
					return false
				}
				if(this.pass.pass1 !== this.pass.pass2){
					this.$vux.toast.show({
					text: this.$t('public.dbpwddifferent'),
					type: 'cancel',
					width: '3.8rem'
					})
					return false
				}
					let data = {
						'email': this.email,
						'nickname': this.nickname,
						'password': this.password,
						'pay_password': this.$md5(this.pass.pass1),
						'code': this.code
						}
					register(data)
						.then((res)=>{
							switch (res.data.errcode) {
								case 0:
									this.$router.replace({name:'login'})
									this.$vux.toast.show({
										text: this.$t('login.ReSuccess'),
										type: 'success',
										width: '2.5rem'
									})
								break;
								case 11007:
								this.$vux.toast.show({
									text: this.$t('public.payloginnosame'),
									type: 'cancel',
									width: '4.8rem'
								})
								break;
								default:
									break;
							}
						})
			},
		},
		created() {
			this.email = this.$route.query.email;
			this.nickname = this.$route.query.nickname;
			this.password = this.$route.query.password;
			this.code = this.$route.query.code;	
		},
	}
</script>

<style lang="less" scoped="scoped">
.link{
	color: #2188FB;
}
.otherPage{
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
	margin: auto;
	.header{
		width: 100%;
		height: 0.95rem;
		background: #FFFFFF;
		border-bottom: 1px #ededed solid;
		span{
			display: block;
		}
		span:first-child{
			position: absolute;
			width: 0.5rem;
			height: 0.5rem;
			left: 0.3rem;
			top: 0.2rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
		span:last-child{
			width: 100%;
			height: 0.95rem;
			text-align: center;
			line-height: 0.95rem;
			color: #000000;
		}
	}
}
</style>