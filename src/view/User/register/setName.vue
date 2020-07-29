<template>
	<Form @submit="setkName">
		<Title>{{$t('register.setnickname')}}</Title>
		<Label :note="$t('register.nicknameinpose')">
			<Input :placeholder="$t('register.nicknamehint')" v-model="UserName"/>
		</Label>
		<Button :submit='true' :fixed="true">{{$t('public.next')}}</Button>
	</Form>
</template>

<script>
import { Nickname } from '../../../api/data'
export default{
	data(){
		return{
			email: "",
			UserName:'',
			code: ''
		}
	},
	methods:{
		setkName(){
			if(!this.UserName){
				this.$vux.toast.show({
					text: this.$t('public.nicknamespace'),
					type: 'cancel',
					width: '2.5rem'
				})
				return false
			}
			if(this.UserName.length>10||!this.UserName){
				this.$vux.toast.show({
					text: this.$t('public.nicknamelayoutnon'),
					type: 'cancel',
					width: '5.5rem'
				})
				return false
			}
				this.$router.push({name:'setLoginPwd',query:{
					email:this.email,
					nickname:this.UserName,
					code: this.code
					}})
		}
	},
	created(){
		this.email = this.$route.query.email
		this.code = this.$route.query.code
	}
}
</script>

<style>
</style>