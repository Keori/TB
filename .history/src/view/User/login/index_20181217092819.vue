<template>
	<div class="login">
		<Header :noBorder="true" rightText="注册" to='register'></Header>
		<div class="logo">
			<img src="../../../assets/imgs/login_logo.png"/>
		</div>
		<Form>
			<div class="con">
				<Input placeholder="请输入邮箱账号" v-model="email" :clear="true" :inputEamil="email"/>
				<Input placeholder="请输入登录密码" v-model="password" :eyes='true'/>
				<div class="btn">
					<Button :submit="true" @click.native="next">下一步</Button>
					<Button type="border">忘记密码</Button>
				</div>
			</div>
		</Form>
	</div>
</template>

<script>
import { login } from '../../../api/data'
	export default{
		data(){
			return{
				email: "",
				password: ""
			}
		},
		methods:{
			con(){
				console.log(234)
			},
			next(){
				console.log(this.email);
				let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
				let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
				if(!emailReg.test(this.email)){
					alert('请输入正确的邮箱格式')
					return
				}
				if(!passwordReg.test(this.password)){
					alert('密码格式错误')
					return
				}
				let data = {
					'email':this.email,
					'password':this.password
				}
				login(data)
				.then((res)=>{
					console.log(res);
					if(res.data.errorcode == 0){
						let token = res.data.data.token;
						localStorage.setItem('token',token);
						this.$router.push({name:'profile-index'})
					}
				})
			}
		},
		created(){
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
		}
		.btn{
			padding-top: 0.81rem;
			button:first-child{
				margin-bottom: 0.33rem;
			}
		}
	}
}
</style>