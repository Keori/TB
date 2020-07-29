<template>
	<Form @submit="email">
		<Title>{{$t('register.writeregimail')}}</Title>
		<Label :note="$t('register.writecorrectmailaccount')">
			<Input v-model="value"/>
		</Label>
		
		<Button :submit='true' :fixed="true">{{$t('public.next')}}</Button>
		<emailDialog :value="checkCd" @on-cancel="checkCd=false" :email='this.value' @on-next="next"></emailDialog>
	</Form>
</template>

<script>
import { sendemail,beforeEmailCdk } from '@/api/data'
export default{
	data(){
		return{
			value:'',
			checkCd:false,
		}
	},
	methods:{
		email(){
			//1.先使用正则验证邮箱格式
			let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
				if(!reg.test(this.value)){
					this.$vux.toast.show({
						text: this.$t('public.writevalidmailaccount'),
						type: 'cancel',
						width: '4rem'
					})
					return false;
				}
			// 2.判断验证是否开启了 开启则调用验证码弹框组件
			beforeEmailCdk().then(res=>{
				if(res.data.is_verify_captcha){
					this.checkCd = true;
					// 已开启认证
				}else{
					//未开启
					let data = {
						'email':this.value,
						'type':1
					}
					this.sendEmail(data);
				}
			})
		},
		next(pass){
			if(pass){
				this.$router.push({name:'emailCode',query:{email:this.value}});
			}
		},
	}
}
</script>

<style>
</style>