<template>
	<Form @submit="emailCheck">
		<Title>验证邮箱</Title>
		<Label note="系统已经给您的邮箱发送了注册码，请填写注册码以验证邮箱">
			<Input placeholder="邮箱验证码：例如12345" v-model="code" :email='this.email' emailText='再次发送' :getCode='true'/>
			<!-- <p class='noSend'>没有收到？点击<span>再次发送</span></p> -->
		</Label>
		<Button :submit='true' :fixed="true">下一步</Button>
	</Form>
</template>

<script>
import { sendemail } from "../../../api/data"
import { checkemail } from '../../../api/data'
	export default{
		data(){
			return{
				email: "",
				code: "",
			}
		},
		methods:{
			emailCode(){
				// this.$store.state.emailCode = this.code
				// this.email = this.$store.state.email
				this.email = this.$route.query.email
				let data = {
					'email': this.email
				}
				sendemail(data)
					.then(res => {
					})
			},
			emailCheck(){
				let data = {
					'email': this.email,
					'code': this.code
				}
				if(this.code){
				checkemail(data)
					.then(res => {
						if(res.data.errorcode === 0){
							this.$router.push({name:'setName',query:{email:this.email}})
						}else{
							alert('验证码错误')
						}
					})
					// .catch(err => {
					// 	alert('网络错误')
					// })
				}else{
					alert("请输入验证码")
				}
			}
		},
		created(){
			this.emailCode()
			// let data = {
			// 		'email': this.email,
			// 		'code':this.code,
			// 	}
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