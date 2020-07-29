<template>
    <div v-if="showValue" class="dialog">
        <div class="dialogx">
            <div class="top">
                <p>{{$t('public.PicVercode')}}</p>
            </div>
            <div class="down">
                <div v-if="loading" class="spinner" ></div>
				<div v-if="!loading" class="checkImg">
				<img :src="url" alt="">
				<span @click="refresh">{{$t('public.CheRef')}}</span>
				</div>
                <input type="text" :placeholder="$t('public.PicVercode')" v-model="cdk">
                <p><span class="button" @click="cencel">{{$t('public.close')}}</span><span style="float:right;border:none;color:#fff;background:linear-gradient(90deg,rgba(3,194,252,1),rgba(0,106,225,1));" class="button" @click="next">{{$t('public.submit')}}</span></p>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.dialog{
		width: 100vw;
		height: 100vh;
		background:rgba(0,0,0,.6);
		position: fixed;
		top: 0rem;
		left: 0rem;
		z-index: 1;
		.dialogx{
			z-index: 2;
			width: 5.85rem;
			height: 5.25rem;
			background-color: #fff;
			position: relative;
			left: 50%;
			top:50%;
			transform: translate(-50%,-50%);
			border-radius: 0.2rem;
			.top{
				height: 1.15rem;
				background-color: #0783f9;
				border-top-left-radius: 0.2rem;
				border-top-right-radius: 0.2rem;
				 .icon-apr-baiseyuanquanguanbi{
                    font-size: 0.56rem;
                    position: absolute;
                    right: 0rem;
                    top: -0.7rem;
                }
				p{
					width: 3.1rem;
					font-size: 0.33rem;
					color: #fff;
					margin: 0 auto;
					padding-top: 0.43rem;
					text-align: center;
				}
			}
			.down{
				padding: 0.48rem 0.45rem 0.42rem 0.59rem;
				.spinner {
					width: 0.5rem;
					height: 0.5rem;
					margin: 0.2rem auto;
					background-color: #0783f9;
					
					border-radius: 100%; 
					-webkit-animation: scaleout 1.0s infinite ease-in-out;
					animation: scaleout 1.0s infinite ease-in-out;
					}
					
					@-webkit-keyframes scaleout {
					0% { -webkit-transform: scale(0.0) }
					100% {
						-webkit-transform: scale(1.0);
						opacity: 0;
					}
					}
					
					@keyframes scaleout {
					0% {
						transform: scale(0.0);
						-webkit-transform: scale(0.0);
					} 100% {
						transform: scale(1.0);
						-webkit-transform: scale(1.0);
						opacity: 0;
					}
				}
				p{
					color: #93A0AA;
					font-size: 0.28rem;
					line-height: 0.4rem;
				}
						input{
							width: 4.7rem;
							height: 0.78rem;
							border:0.01rem solid #EDEDED;
							border-radius: 0.2rem;
							margin-top: 0.19rem;
							color: #1F3E58;
							padding-left: 0.27rem;
						}
				p:last-child{
					width: 4.7rem;
					margin-top: 0.49rem;
					.button{
					width: 2.26rem;
					height: 0.72rem;
					border-radius: 0.28rem;
					border:0.02rem solid #93A0AA;
					display: inline-block;
					text-align: center;
					line-height: 0.72rem;
					color: #506271;
					font-size: 0.31rem;
				 }
				}
				.checkImg{
					img{
						width: 3.2rem;
						height: 1rem;
						display: inline-block;
						margin:0 0.1rem;
					}
					span{
						color: #007dfe;
					}
				}
			}
		}
	}
</style>
<script>
import i18n from '@/i18n'
import { beforeEmailCdk,sendemail,userEmail } from '@/api/data'
export default {
    data(){
        return{
			showValue:false,
			cdk:'',
			key:'',
			url:'',
			loading:true,
			passed:false
        }
	},
	props:{
		value:{
			type:Boolean,
			default:false
		},
		email:String
	},
	methods: {
		cencel(){
			this.showValue = false
			this.cdk = ''
			this.$emit('on-cancel')
		},
		refresh(){
			this.loading=true;
			this.cdk = '';
			this.takeEmailCdk()
		},
		takeEmailCdk(){
			beforeEmailCdk().then(res=>{
				this.url = 'http://user.tbond.test/users/captcha/'+res.data.captcha_key;
				this.key = res.data.captcha_key;
				this.loading = false;
			})
		},
		checkCode(res){
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
					this.loading=true;
					this.cdk = '';
					this.takeEmailCdk()
					break;
				case 0:
					this.$vux.toast.show({
							text: this.$t('public.MailAlse'),
							type: 'success',
							width: '2.8rem'
						})
					this.$emit('on-next',true)
					break;
				default:
					break;
			}
		},
		next(){
			if(!this.cdk || this.cdk.length!=4){
				this.$vux.toast.show({
					text: this.$t('public.writecorrectmaillayout'),
					type: 'cancel',
					width: '4rem'
				})
				return false
			}
			//登錄後發送郵件
			if(this.$store.state.userInfo.email){
				let data ={
					captcha_value:this.cdk,
					captcha_key:this.key
				}
				userEmail(data).then(res=>{
					this.checkCode(res);
				})
				//未登錄狀態發送郵件
			}else{
				let data={
					email:this.email,
					type:1,
					captcha_value:this.cdk,
					captcha_key:this.key
				}
				sendemail(data).then(res=>{
					this.checkCode(res)
				})
			}
		}
	},
	watch:{
		value(val){
			this.showValue  = val
		},
		showValue (val){
			//每次唤醒刷新验证码
			this.refresh()
			this.$emit('input',val)
		}
	},
	created(){
		this.takeEmailCdk();
		if (this.value) {
			this.showValue = this.value
		}
	}
}
</script>
