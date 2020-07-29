<template>
	<div>
		<Header :title="$t('headerfont.ResetPaypwd')"></Header>
		<Form @submit="rePass">
			<Label :title="$t('public.mailaccount')">
				<Input placeholder="" :disabled="true" :value="userInfo.email"/>
			</Label>
			<Label :title="$t('kyc.certificateID')">
				<Input :placeholder="$t('kyc.certificateIDhint')" v-model="userID"/>
			</Label>
			<Label :title="$t('public.mailVercode')">
				<Input :placeholder="$t('public.writemailVercode')" :getCode='true' @on-need="isNeed" :isSend="send"  :email='userInfo.email' v-model="code"/>
			</Label>
			<Label :title="$t('public.setnewpwd')">
				<Input :placeholder="$t('public.hint')" type='password' :eyes="true" v-model="pass1"/>
			</Label>
			<Label :title="$t('public.aimportnewpwd')">
				<Input :placeholder="$t('public.hint')" type='password' :eyes="true" v-model="pass2"/>
			</Label>
			<router-link :to='{name:"payPwd"}' class='byEmail'>{{$t('public.passoriginat')}}</router-link>
			<Button :submit='true' :fixed="true">{{$t('public.submitreset')}}</Button>
			<Repassdone :value="show" :txt="$t('my.Resetpaysuccess')"></Repassdone>
		</Form>
		<emailDialog :value="checkCd" @on-cancel="checkCd=false" :email='userInfo.email' @on-next="next"></emailDialog>
	</div>
</template>

<script>
import { rePayPass } from '../../../api/data'
	export default{
		data(){
			return{
				userInfo:this.$store.state.userInfo,
				code:'',
				pass1:'',
				pass2:'',
				userID:'',
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
			rePass(){
				let reg  =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
				let idReg = /^([a-zA-Z0-9]{18})+$/;
				if(!idReg.test(this.userID)){
					this.$vux.toast.show({
						text: this.$t('my.writeaffirmcer'),
						type: 'cancel',
						width: '3.5rem'
					})
					return false
				}
				if(!this.code){
					this.$vux.toast.show({
						text: this.$t('public.writeverify'),
						type: 'cancel',
						width: '2.5rem'
					})
					return false
				}
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
					'type':2,
					'certificate_number':this.userID,
					'code':this.code,
					'new_pay_password':this.$md5(this.pass1)
				}
				rePayPass(data).then(res=>{
					switch (res.data.errcode) {
						case 11011:
							this.$vux.toast.show({
								text: this.$t('my.cerNcorrect'),
								type: 'cancel',
								width: '2.5rem'
							})
							break;
						case 11009:
							this.$vux.toast.show({
								text: this.$t('public.mailVerifyfail'),
								type: 'cancel',
								width: '2.5rem'
							})
							break;
						case 11007:
							this.$vux.toast.show({
								text: this.$t('public.payloginnosame'),
								type: 'cancel',
								width: '5rem'
							})
							break;
							case 0:
							this.show = true;
							setTimeout(() => {
								this.$router.push({name:'myInfo'})
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