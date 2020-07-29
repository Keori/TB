<template>
	<div>
		<Header :title="$t('my.resetpaypwd')"></Header>
		<Form>
			<Label :title="$t('kyc.certificateID')">
				<Input :placeholder="$t('kyc.certificateIDhint')" v-model="userID"/>
			</Label>
			<Label :title="$t('my.orginpaypwd')">
				<Input :placeholder="$t('public.hint')" v-model="oldPass" type='password' :eyes="true" />
			</Label>
			<Label :title="$t('public.setnewpwd')">
				<Input :placeholder="$t('public.hint')" v-model="newPass1" type='password' :eyes="true" />
			</Label>
			<Label :title="$t('public.aimportnewpwd')">
				<Input :placeholder="$t('public.hint')" v-model="newPass2" type='password' :eyes="true" />
			</Label>
			<router-link :to='{name:"resetPayPwd"}' class='byEmail'>{{$t('public.passmailver')}}</router-link>
			<Button :submit='true' :fixed="true" @click.native="rePass">{{$t('public.submitreset')}}</Button>
			<Repassdone :value="show" :txt="$t('my.Resetpaysuccess')"></Repassdone>
		</Form>
	</div>
</template>

<script>
import {rePayPass} from '@/api/data'
	export default{
		data(){
			return{
				oldPass:'',
				newPass1:'',
				newPass2:'',
				userID:'',
				show:false
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
				if(!this.oldPass&&!this.newPass1&&!this.newPass2){
					this.$vux.toast.show({
						text: this.$t('public.passempty'),
						type: 'cancel',
						width: '3.8rem'
					})
					return
				}
				if(!reg.test(this.oldPass)||!reg.test(this.newPass1)||!reg.test(this.newPass2)){
					this.$vux.toast.show({
						text: this.$t('public.pwdlayoutmis'),
						type: 'cancel',
						width: '2.5rem'
					})
					return
				}
				if(this.newPass1!==this.newPass2){
					this.$vux.toast.show({
						text: this.$t('public.dbpwddifferent'),
						type: 'cancel',
						width: '3.8rem'
					})
					return
				}
				 let data = {
				  'type':1,
				  'certificate_number':this.userID,
				  'pay_password':this.$md5(this.oldPass),
			       'new_pay_password':this.$md5(this.newPass1)
				 }
				rePayPass(data)
				.then((res)=>{
				
					switch (res.data.errcode) {
						case 0:
							this.show = true;
							setTimeout(() => {
								this.$router.push({name:'myInfo'})
							}, 2000);
						break;
						case 11011:
							this.$vux.toast.show({
								text: this.$t('my.cerNcorrect'),
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
						case 11001:
							this.$vux.toast.show({
								text: this.$t('public.originnoaffirm'),
								type: 'cancel',
								width: '2.5rem'
							})
						default:
							break;
					}
					if(res.data.errcode==0){}
				})
			}
		}
	}
</script>

<style lang='less' scoped='scoped'>
.g_form{
	padding-top: 0.6rem;
	.byEmail{
		display: block;
		text-align: right;
		color: #006AE1;
	}
}
</style>