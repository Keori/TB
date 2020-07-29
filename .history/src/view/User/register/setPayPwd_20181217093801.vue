<template>
	<Form @submit="tologin">
		<Title>设置T-Bancor支付密码</Title>
		<Label title="T-Bancor支付密码">
			<Input placeholder="6-15位，字母，数字组合" type="password" v-model="pass.pass1"/>
		</Label>
		<Label title="再次确认密码">
			<Input placeholder="6-15位，字母，数字组合" type="password" v-model="pass.pass2"/>
		</Label>
		<Checkbox :value='rule'>我同意遵守<router-link to='/' class='link'>《交易服务条款》</router-link></Checkbox>
		<Button :submit='true' :fixed="true">注册</Button>
	</Form>
</template>

<script>
import { register } from '../../../api/data'
	export default{
		data(){
			return{
				rule:false,
				email:'',
				nickname:'',
				password:'',
				pass:{
					pass1:'',
					pass2:''
				}
			}
		},
		methods:{
			tologin(){
				let reg  =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
				if(!reg.test(this.pass.pass1)){
					alert('您输入的密码格式错误')
				}else if(this.pass.pass1 !== this.pass.pass2){
					alert('两次输入的密码不一致')
				}else if(this.password === this.pass.pass1){
					alert('登录密码与支付密码不得一致')
				}else{
					let data = {
						'email':this.email,
						'nickname':this.nickname,
						'password':this.password,
						'pay_password':this.pass.pass1
						}
					register(data)
						.then((res)=>{
							this.$router.push({name:'login',query:{
								email: this.email,
								nickname: this.nickname,
								password: this.password,
								pay_password: this.pass
							}})
						})
				}
			}
		},
		created() {
			this.email = this.$route.query.email;
			this.nickname = this.$route.query.nickname;
			this.password = this.$route.query.password;
		},
	}
</script>

<style lang="less" scoped="scoped">
.link{
	color: #2188FB;
}
</style>