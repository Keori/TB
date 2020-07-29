<template>
	<Form @submit="setPass">
		<Title>设置登录密码</Title>
		<Label title="登录密码">
			<Input placeholder="6-15位，字母，数字组合" v-model="pass1"/>
		</Label>
		<Label title="再次确认密码">
			<Input placeholder="6-15位，字母，数字组合" v-model="pass2"/>
		</Label>
		<Button :submit='true' :fixed="true">下一步</Button>
	</Form>
</template>

<script>
	export default{
		data(){
			return{
				pass1:'',
				pass2:''
			}
		},
		methods:{
			setPass(){
				let reg  =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
				if(!reg.test(this.pass1)){
					alert('密码格式错误,请输入6-15位，字母，数字组合')
				}else if(this.pass1 !== this.pass2){
					alert('密码不一致重新输入')
				}else{
					this.$router.push({name:'setPayPwd',query:{
						email: this.email,
						nickname: this.nickname,
						password: this.pass1
						}})
				}
			}
		},
		created(){
			this.email = this.$route.query.email,
			this.nickname = this.$route.query.nickname
		}
	}
</script>

<style>
</style>