<template>
	<Form @submit="email">
		<Title>填写注册邮箱</Title>
		<Label note="请正确填写您的邮箱帐号，用于注册T-Bancor">
			<Input v-model="value"/>
		</Label>
		<Button :submit='true' :fixed="true">下一步</Button>
	</Form>
</template>

<script>

export default{
	data(){
		return{
			value:''
		}
	},
	methods:{
		email(){
			let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
			if(reg.test(this.value)){
				// this.$store.state.email = this.value
				this.$router.push({name:'emailCode',query:{email:this.value}})
			}else{
				alert('错误了!')
			}
		}
	}
}
</script>

<style>
</style>