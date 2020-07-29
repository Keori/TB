<template>
	<Form @submit="emailCheck">
		<Title>{{$t('register.verifymail')}}</Title>
		<Label :note="$t('register.sendmailtomail')">
			<Input :placeholder="$t('register.emailverhint')" v-model="code" :isSend="send" :email='this.email' @on-need="isNeed" :emailText="$t('public.sendagain')" :getCode='true'/>
			<!-- <p class='noSend'>没有收到？点击<span>再次发送</span></p> -->
		</Label>
		<emailDialog :value="checkCd" @on-cancel="checkCd=false" :email='this.email' @on-next="next"></emailDialog>
		<Button :submit='true' :fixed="true">{{$t('public.next')}}</Button>
	</Form>
</template>

<script>
import { sendemail,checkemail } from "../../../api/data"
	export default{
		data(){
			return{
				email: "",
				code: "",
				checkCd:false,
				needCode:true,
				num:'',
				key:'',
				send:false
			}
		},
		methods:{
			// emailCode(){
			// 	// this.email = this.$store.state.email
			// 	this.email = this.$route.query.email
			// 	let data = {
			// 		'email': this.email
			// 	}
			// 	sendemail(data)
			// 		.then(res => {
			// 		})
			// },
			emailCheck(){
				let data = {
					'email': this.email,
					'code': this.code
				}
				if(this.code){
				checkemail(data)
					.then(res => {
						if(res.data.errcode == 0){
							this.$router.push({name:'setName',query:{email:this.email,code:this.code}})
						}else{
							this.$vux.toast.show({
							text: this.$t('public.verifyfail'),
							type: 'cancel',
							width: '3.8rem'
						})
						}
					})
				}else{
					this.$vux.toast.show({
						text: this.$t('public.writeverify'),
						type: 'cancel',
						width: '2.5rem'
					})
				}
			},
			isNeed(data){
				this.send = false;
				this.checkCd = data;
			},
			next(pass){
				if(pass){
					this.send = true;
					this.checkCd = false;
				}
			},
		},
		created(){
			this.email = this.$route.query.email;
		}
	}
</script>

<style lang='less' scoped='scoped'>
.noSend{
	padding-top: 0.27rem;
	text-align: right;
	font-size: 0.17rem;
	color: #93A0AA;
	span{
		color: #2188FB;
	}
}
</style>