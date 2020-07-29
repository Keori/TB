<template>
	<Form @submit="setkName">
		<Title>设置用户昵称</Title>
		<Label note="用户昵称限制10字以内，一旦设定不可以变更。">
			<Input placeholder="请输入用户昵称" v-model="UserName"/>
		</Label>
		<Button :submit='true' :fixed="true">下一步</Button>
	</Form>
</template>

<script>
import { Nickname } from '../../../api/data'
export default{
	data(){
		return{
			email: "",
			UserName:'',
		}
	},
	methods:{
		setkName(){
				this.$router.push({name:'setLoginPwd',query:{
					email:this.email,
					nickname:this.UserName
					}})
		}
	},
	created(){
		this.email = this.$route.query.email
	}
}
</script>

<style>
</style>