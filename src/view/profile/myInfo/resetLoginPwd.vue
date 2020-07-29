<template>
	<div>
		<Header :title="$t('headerfont.ResetLoginpwd')"></Header>
		<Form @submit="emailRePass">
			<Label :title="$t('public.mailaccount')">
				<Input placeholder="" :disabled="true" :value="userInfo.email" />
			</Label>
			<Label :title="$t('public.mailVercode')">
				<Input :placeholder="$t('public.writemailVercode')" :getCode='true' @on-need="isNeed" :isSend="send" :email='userInfo.email' v-model="code" />
			</Label>
			<Label :title="$t('public.setnewpwd')">
				<Input :placeholder="$t('public.hint')" type='password' v-model="pass1" :eyes="true" />
			</Label>
			<Label :title="$t('public.aimportnewpwd')">
				<Input :placeholder="$t('public.hint')" type='password' v-model="pass2" :eyes="true" />
			</Label>
			<router-link :to='{name:"loginPwd"}' class='byEmail'>{{$t('public.passoriginat')}}</router-link>
			<Button :submit='true' :fixed="true">{{$t('public.submitreset')}}</Button>
			<Repassdone :value="show" :txt="$t('my.Resetpwdsuccess')"></Repassdone>
		</Form>
		<emailDialog :value="checkCd" @on-cancel="checkCd=false" :email='userInfo.email' @on-next="next"></emailDialog>
	</div>
</template>

<script>
import { reLoginPass } from '../../../api/data'
	export default{
		data(){
			return{
				userInfo:this.$store.state.userInfo,
				code:'',
				pass1:'',
				pass2:'',
				show:false,
				checkCd:false,
				send:false
			}
		},
		computed:{
			user(){
				return this.$store.state.userInfo
			}
		},
		methods:{
			emailRePass(){
				if(!this.code){
					this.$vux.toast.show({
						text: this.$t('public.writemailVerify'),
						type: 'cancel',
						width: '3.2rem'
					})
					return false
				}
				if(!this.pass1&&!this.pass2){
					this.$vux.toast.show({
						text: this.$t('public.passempty'),
						type: 'cancel',
						width: '3.8rem'
					})
					return false
				}
				let reg  =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
				if(!reg.test(this.pass1)){
					this.$vux.toast.show({
						text: this.$t('public.pwdlayoutmis'),
						type: 'cancel',
						width: '2.5rem'
					})
					return false
				}
				if(this.pass1!==this.pass2){
					this.$vux.toast.show({
						text: this.$t('public.dbpwddifferent'),
						type: 'cancel',
						width: '3.8rem'
					})
					return false
				}
				let data = {
					'email':this.userInfo.email,
					'code':this.code,
					'new_password':this.$md5(this.pass1)
				}
				reLoginPass(data).then(res=>{
					
					switch (res.data.errcode) {
						case 11002:
							this.$vux.toast.show({
								text: this.$t('public.mailVerfail'),
								type: 'cancel',
								width: '7.2rem'
							})
							break;
						case 0:
							// alert('密码修改成功,请重新登录账号')
							window.localStorage.removeItem('token');
							this.show = true;
							setTimeout(() => {
								this.$router.push({name:'login'})
							}, 2000);
							break;
						default:
							break;
					}
					
				})
			},
			next(pass){
				if(pass){
					this.send = true;
					this.checkCd = false;
				}
			},
			isNeed(data){
				this.send = false;
				this.checkCd = data;
			},
		},
		watch:{
			user(val){
				this.userInfo = val
			}
		}
	}
</script>

<style lang='less' scoped='scoped'>
.g_form{
	padding-top: 0.6rem;
	padding-bottom: 1.2rem;
	.byEmail{
		display: block;
		text-align: right;
		color: #006AE1;
	}
}
</style>