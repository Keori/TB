<template>
	<div class="g_input">
		<input v-if="rightCopy" type="text" ref="type" @click="select()" @keyup="kupp" :red="red" :placeholder="placeholder" v-model="Value" :disabled="disabled" :readonly="readonly||arrowDown||arrowRight" :class="{disabled:disabled||readonly}" :id="'copy'"/>

		<input v-else type="text" ref="type" @click="select()" @keyup="kupp" :red="red" :placeholder="placeholder" v-model="Value" :disabled="disabled" :readonly="readonly||arrowDown||arrowRight" :class="{disabled:disabled||readonly}"/>
		<div class="right">
			<!-- 地址图标 -->
			<img src="../../assets/imgs/adr_list.png" class="adr" v-if="adress" @click="$emit('adrPicker')"/>
			<!--发送验证码-->
			<div class="code" v-if="getCode&&sec==61" @click="getCodeEmail()">{{$t('public.sendVercode')}}</div>
			<!--验证码倒计时-->
			<div class="timeout" v-if="getCode&&sec<61">{{sec}}S{{$t('public.againsend')}}</div>
			<!--右侧文字-->
			<div class="text" v-if="rightText">{{rightText}}</div>
			<!--右侧文字点击复制-->
			<div class="text" style="color: #2188FB" v-if="rightCopy" data-clipboard-target="#copy" ref='copy' @click="copy()">{{rightCopy}}</div>
			<!--全部转出-->
			<div class="all" v-if="allOut" @click="allout">{{allOut}}</div>
			<!--清空-->
			<img :src="clear_input" class="close" @click="Value=''" v-if="clear"/>
			<!--向下箭头-->
			<img src="../../assets/imgs/input_down.png" v-if="arrowDown" class="arrowDown"/>
			<!-- 向右箭头 -->
			<img src="../../assets/imgs/ICON/019.png" v-if="arrowRight" class="arrowRight"/>
			<!--明密文-->
			<img :src="eyes_img" v-if="eyes" class="eyes" @click="changeEyes()"/>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import eyes_close from "./images/eyes_close.png"
	import eyes_open from "./images/eyes.png"
	import clearimg from "./images/clear_input.png"
	import { sendemail,userEmail,beforeEmailCdk } from "@/api/data"
	export default{
		data(){
			return{
				Value:this.value,
				eyes_img:eyes_close,
				eyes_status:false,
				copyBtn:'',
				clear_input:clearimg,
				sec:61,
				timeout:'',	
				isNeedCode:false,
			}
		},
		props:{
			placeholder:String,
			arrowDown:{
				type:Boolean,
				default:false
			},
			arrowRight:{
				type:Boolean,
				default:false
			},
			value:[String,Number],
			disabled:Boolean,
			readonly:Boolean,
			eyes:{
				type:Boolean,
				default:false
			},
			red:{
				type:Boolean,
				default:false
			},
			clear:{
				type:Boolean,
				default:false
			},
			type:{
				type:String,
				default:'text'
			},
			getCode:{
				type:Boolean,
				default:false
			},
			rightText:String,
			rightCopy:String,
			rightlang:String,
			allOut:String,
			email:String,
			code:String,
			cdk:String,
			isSend:{
				type:Boolean,
				default:false
			},
			// emailText:{
			// 	type:String,
			// 	default:'發送驗證碼'
			// },
			id:String,
			adress:{
				type:Boolean,
				default:false
			},
		},
		methods:{
			//显示隐藏密码
			changeEyes(){
				this.eyes_status=!this.eyes_status
			},
			//複製
			copy() {
			    let _this = this;
			    let clipboard = _this.copyBtn;
			    clipboard.on('success', function() {
					_this.$vux.toast.show({
						text: _this.$t('public.copysuccess'),
						type: 'success'
					})
			    });
			    clipboard.on('error', function() {
					_this.$vux.toast.show({
						text: _this.$t('public.copyfail'),
						type: 'cancel'
					})
			    });
			},
			//未登录用户发送邮件
			sendEmail(data){
				sendemail(data).then(res=>{
					switch (res.data.errcode) {
					case 11004:
						this.$vux.toast.show({
							text: this.$t('public.yetaccountregister'),
							type: 'cancel',
							width: '2.8rem'
						})
						break;
					case 11023:
						this.$vux.toast.show({
							text: this.$t('public.VercErr'),
							type: 'cancel',
							width: '3rem'
						})
						break;
					case 0:
						this.$vux.toast.show({
								text: this.$t('public.MailAlse'),
								type: 'success',
								width: '2.8rem'
							})
						let timeout = setInterval(()=>{
							if(this.sec==1){
								this.sec =61;
								clearInterval(timeout)
								return false;
							}
							this.sec--
						},1000)
						break;	
					default:
						break;
				}
				})
			},
			//开始倒计时
			timer(){
				let timeout = setInterval(()=>{
					if(this.sec==1){
						this.sec =61;
						clearInterval(timeout)
						return false;
					}
						this.sec--
					},1000)
			},
			//已登录用户发送邮件
			userEmail(data){
				userEmail(data).then(res=>{
					this.timer()
				})
			},
			//发送验证码
			getCodeEmail(){
					// 1.判断验证是否开启验证码 开启则传值给父组件
				beforeEmailCdk().then(res=>{
					if(res.data.is_verify_captcha){
						this.isNeedCode = true;
						this.$emit('on-need',this.isNeedCode);
						// 已开启认证
					}else{
						//未开启 
						if(this.$store.state.userInfo.email){
							this.userEmail();
						}else{
							let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
							if(!reg.test(this.email)){
								this.$vux.toast.show({
									text: this.$t('public.writecorrectmailadd'),
									type: 'cancel',
									width: '3.8rem'
								})
								return false
							}
							let data = {
								email:this.email,
								type:1
							}
							this.sendEmail(data)
						}
					}
				})
			},
			kupp(){
				this.$emit('onkeyup')
			},
			select(){
				if(this.arrowDown){
					this.$emit('on-select')
				}else if(this.arrowRight){
					this.$emit('on-select')
				}
			},
			allout(){
				this.$emit('allout')
			}
		},
		watch:{
			red(val){
				 //val就是当前red的值
				if(val){
					this.$refs.type.style.color = "red"
				}else{
					this.$refs.type.style.color = "#000"
				}
			},
			//监控Send的值
			isSend(val){
				//如果有Send的值 说明邮箱已经发送过了邮件
				if(val){
					this.timer();
				}
			},
			value(val) {
		        this.Value = val;
			 },
			Value(val){
				this.$emit('input',val);
			},
			eyes_status(val){
				if(val){
					this.eyes_img=eyes_open
					this.$refs.type.setAttribute('type','text')
				}else{
					this.eyes_img=eyes_close
					this.$refs.type.setAttribute('type','password')
				}
			}
		},
		mounted() {
			try{
				this.copyBtn = new this.clipboard(this.$refs.copy);
			}catch(e){
			}
			if(this.type){
				this.$refs.type.setAttribute('type',this.type)
			}
			if(this.id){
				this.$refs.type.setAttribute('id',this.id)
			}
			if(this.eyes){
				this.$refs.type.setAttribute('type','password')
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.all{
		color: #169bdd;
		margin-right: 0.27rem;
    	line-height: 0.78rem;
	}
</style>