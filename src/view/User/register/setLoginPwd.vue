<template>
	<Form @submit="setPass">
		<Title>{{$t('register.setloginpwd')}}</Title>
		<Label :title="$t('register.loginpwd')">
			<Input :placeholder="$t('public.hint')" :eyes='true' v-model="pass1"/>
		</Label>
		<Label :title="$t('register.affirmloginpwd')">
			<Input :placeholder="$t('public.hint')" :eyes='true' v-model="pass2"/>
		</Label>
		<Button :submit='true' :fixed="true">{{$t('public.next')}}</Button>
	</Form>
</template>

<script>
export default{
	data(){
		return{
			email: '',
			nickname: '',
			pass1:'',
			pass2:'',
			code: ''
		}
	},
	methods:{
		setPass(){
			let reg  =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
			if(!this.pass1){
				this.$vux.toast.show({
					text: this.$t('public.pwdnospace'),
					type: 'cancel',
					width: '2.5rem'
				})
				return false
			}
			if(!reg.test(this.pass1)){
				this.$vux.toast.show({
					text: this.$t('public.pwdlayoutmis'),
					type: 'cancel',
					width: '2.5rem'
				})
				return false
			}else if(this.pass1 !== this.pass2){
				this.$vux.toast.show({
					text: this.$t('public.dbpwddifferent'),
					type: 'cancel',
					width: '3.8rem'
				})
			}else{
				this.$router.push({name:'setPayPwd',query:{
					email: this.email,
					nickname: this.nickname,
					password: this.$md5(this.pass1),
					code: this.code
					}})
			}
		}
	},
	created(){
		this.email = this.$route.query.email,
		this.nickname = this.$route.query.nickname,
		this.code = this.$route.query.code
	}
}
</script>

<style>
</style>