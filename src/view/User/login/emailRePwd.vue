<template>
	<div>
		<Header :title="$t('headerfont.emailRePwd')"></Header>
		<Form @submit="emailRePass">
			<Label :title="$t('public.mailaccount')">
				<Input :placeholder="$t('public.writemailaccount')" v-model="email" />
			</Label>
			<Label :title="$t('public.mailVercode')">
				<Input :placeholder="$t('public.writemailVercode')" :getCode='true' @on-need="isNeed" :isSend="send" :email='email' v-model="code" />
			</Label>
			<Label :title="$t('public.setnewpwd')">
				<Input :placeholder="$t('public.hint')" type='password' v-model="pass1" :eyes="true" />
			</Label>
			<Label :title="$t('public.aimportnewpwd')">
				<Input :placeholder="$t('public.hint')" type='password' v-model="pass2" :eyes="true" />
			</Label>
			<Button :submit='true' :fixed="true">{{$t('public.confirm')}}</Button>
		</Form>
		<emailDialog :value="checkCd" @on-cancel="checkCd=false" :email='email' @on-next="next"></emailDialog>
	</div>
</template>

<script>
import { forgetLoginPass } from '../../../api/data'
	export default{
		data(){
			return{
				email:'',
				code:'',
				pass1:'',
				pass2:'',
				getCode:false,
				checkCd:false,
				send:false
			}
		},
		methods:{
			// RegEmail(){
			emailRePass(){
				let rege = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
				if(!rege.test(this.email)){
					this.$vux.toast.show({
						text: this.$t('public.registerlayoutmis'),
						type: 'cancel',
						width: '3.8rem'
					})
					return false
				}
				if(!this.code){
					this.$vux.toast.show({
						text: this.$t('public.writemailVerify'),
						type: 'cancel',
						width: '3.2rem'
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
					'email':this.email,
					'code':this.code,
					'new_password':this.$md5(this.pass1)
				}
				forgetLoginPass(data).then(res=>{
					switch (res.data.errcode) {
						case 0:
							this.$vux.toast.show({
								text: this.$t('public.pwdResuccess'),
								type: 'success',
								width: '4.5rem'
							})
							this.$router.push({name:'login'})
							break;
						case 11002:
							this.$vux.toast.show({
								text: this.$t('public.mailVerfail'),
								type: 'cancel',
								width: '7rem'
							})
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
				let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
				if(!reg.test(this.email)){
					this.$vux.toast.show({
						text: this.$t('public.writecorrectmailadd'),
						type: 'cancel',
						width: '3.8rem'
					})
					return false
				}
				this.send = false;
				this.checkCd = data;
			},
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