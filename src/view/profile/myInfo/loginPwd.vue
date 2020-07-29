<template>
	<div>
		<Header :title="$t('my.resetloginpwd')"></Header>
		<Form @submit="rePassWord">
			<Label :title="$t('my.originloginpwd')">
				<Input :placeholder="$t('public.hint')" v-model="oldPass" type='password' :eyes="true" />
			</Label>
			<Label :title="$t('public.setnewpwd')">
				<Input :placeholder="$t('public.hint')" v-model="newPass1" type='password' :eyes="true" />
			</Label>
			<Label :title="$t('public.aimportnewpwd')">
				<Input :placeholder="$t('public.hint')" v-model="newPass2" type='password' :eyes="true" />
			</Label>
			<router-link :to='{name:"resetLoginPwd"}' class='byEmail'>{{$t('public.passmailver')}}</router-link>
			<Button :submit='true' :fixed="true">{{$t('public.submitreset')}}</Button>
		</Form>
		<Repassdone :value="show" :txt="$t('my.Resetpwdsuccess')"></Repassdone>
	</div>
</template>

<script>
import { reLoginPass } from '../../../api/data'
	export default{
		data(){
			return{
				oldPass:'',
				newPass1:'',
				newPass2:'',
				show:false
			}
			
		},
		methods:{
			rePassWord(){
				let reg  =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
				if(!reg.test(this.oldPass)||!reg.test(this.newPass1)||!reg.test(this.newPass2)){
					this.$vux.toast.show({
						text: this.$t('public.pwdlayoutmis'),
						type: 'cancel',
						width: '2.5rem'
					})
					return
				}
				if(this.newPass1!==this.newPass2){
					this.$vux.toast.show({
						text: this.$t('public.dbnewpwddifferent'),
						type: 'cancel',
						width: '4.2rem'
					})
					return
				}
				 let data = {
				  'password':this.$md5(this.oldPass),
			       'new_password':this.$md5(this.newPass1)
				 }
				reLoginPass(data)
				.then((res)=>{
				
					switch (res.data.errcode) {
						case 11001:
							this.$vux.toast.show({
								text: this.$t('public.originnoaffirm'),
								type: 'cancel',
								width: '2.5rem'
							})
							break;
						case 0:
							// alert('密码修改成功,请重新登录账号')
							window.localStorage.removeItem('token');
							this.show = true;
							setTimeout(() => {
								this.$router.push({name:'login'})
							}, 2000);
							break;
						default:
							break;
					}
					
				})
			}
		}
	}
</script>

<style lang='less' scoped='scoped'>
.g_form{
	padding-top: 0.6rem;
	.byEmail{
		display: block;
		text-align: right;
		color: #006AE1;
	}
}
</style>