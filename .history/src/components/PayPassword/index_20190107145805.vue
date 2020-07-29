<template>
	<Transform title="确认支付" v-model='picker'>
		<div class="num" v-if="amount">{{amount}}<span></span></div>
		<Form @submit.native='$emit("goPay")'>
			<Label title='T-Bancor支付密码'>
				<Input placeholder="请输入您的T-Bancor支付密码" v-model="pay" type="password"/>
			</Label>
			<Label title='Google验证码' style="margin-bottom: 0.59rem;">
				<Input placeholder="请输入您的Google验证码" v-model="google"/>
			</Label>
			<Button :submit="true">确定</Button>
		</Form>
	</Transform>
</template>

<script>
	export default{
		data(){
			return{
				picker:false,
				pay:this.pwd,
				google:this.ga
			}
		},
		props:{
			amount:[String,Number],
			unit:{
				type:String,
				default:'HKP'
			},
			ga:[String,Number],//父组件的ga
			pwd:[String,Number],//父组件的密码
			value:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			ga(val){//父组件得ga
				this.google = val
			},
			pwd(val){//父组件的密码
				this.pay =val
			},
			pay(val){
				this.$emit('update:pwd',val)
			},
			google(val){
				this.$emit('update:ga',val)
			},
			value(val){
				this.picker = val
			},
			picker(val){
				this.$emit('input',val)
			}
		},
		methods:{
			goPay(){
				this.$emit('goPay')
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.num{
		padding: 0.62rem 0 0;
		text-align: center;
		color: #F54531;
		font-size: 0.42rem;
		span{
			margin-left: 0.1rem;
			font-size: 0.29rem;
		}
	}
	.g_form{
		padding-top: 0.8rem;
	}
	.g_button{
		margin: 0 0 0.23rem;
	}
</style>