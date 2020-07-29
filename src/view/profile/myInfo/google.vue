<template>
	<div>
		<Header :title="$t('Google.Googlever')"></Header>
		<!--未绑定-->
		<div v-if="!verify">
			<div class="code">
				<div class="note">{{$t('Google.scanQRcode')}}</div>
				<QRCode :text="googleQR"></QRCode>
			</div>
			<Form>
				<Label :title="$t('Google.key')">
					<Input :readonly="true" v-model='google' :rightCopy="this.$t('public.copy')" />
				</Label>
				<Label :title="$t('Google.Gooflevercode')">
					<Input v-model='googleCode' />
				</Label>
				<Button :fixed='true' @click.native="confirm">{{$t('public.confirm')}}</button>
			</Form>
		</div>
		<!--已绑定-->
		<div v-if="verify">
			<div class="ok">
				<img src="../../../assets/imgs/054.png"/>
				<p>{{$t('Google.alreadybindGa')}}</p>
			</div>
			<Button :fixed='true'  @click.native="unGoogle">{{$t('Google.relievebind')}}</button>
		</div>
		<Google :value="checkGo" :leftText="$t('public.close')" @on-cancel="cancel" @on-next="checkGoogle"></Google>
	</div>
</template>

<script>
import { getGoogle,googleGa,unGoogle,userInfo } from '@/api/data'
	export default{
		data(){
			return{
				verify:this.$store.state.userInfo.is_go_verify,
				googleQR:'',
				google:'',
				googleCode:'',
				googleNum:'',
				checkGo:false
			}
		},
		methods:{
			//複製
			cancel(){
				this.checkGo = false;
			},
			checkGoogle(num){
				if(!num){
					this.$vux.toast.show({
							text: this.$t('Google.GoogleverfailRe'),
							type: 'cancel',
							width: '6.5rem'
						})
					return false
				}
				this.googleNum = num;
				let data = {
					'onecode':this.googleNum
				}
				unGoogle(data).then(res=>{
					if(res.data.errcode==0){
						this.google = ''
						this.verify = false;
						this.checkGo = false;
						this.$store.commit('getUserInfo',res.data.data.user)
						this.getga();
						this.$vux.toast.show({
							text: this.$t('Google.relievebindsuccess'),
							type: 'success'
						})
					}else{
						this.$vux.toast.show({
							text: this.$t('Google.GoogleverfailRe'),
							type: 'cancel',
							width: '6.5rem'
						})
					}
				})
			},
			confirm(){
				if(!this.googleCode){
					this.$vux.toast.show({
							text: this.$t('Google.Googleverfail'),
							type: 'cancel',
							width: '6.5rem'
						})
						return false
				}
				let data = {
					'onecode':this.googleCode
				}
				//谷歌綁定
				googleGa(data).then(res=>{
					if(res.data.errcode==11006){
						this.$vux.toast.show({
							text: this.$t('Google.Googleverfail'),
							type: 'cancel',
							width: '6.5rem'
						})
						return false
					}
					if(res.data.errcode==11003){
						this.$vux.toast.show({
							text: this.$t('Google.GoogleverfailRe'),
							type: 'cancel',
							width: '6.5rem'
						})
					}
					if(res.data.errcode==0){
						this.$vux.toast.show({
							text: this.$t('Google.Googleverbindsuc'),
							type: 'success',
							width: '3.5rem'
						})
						this.$store.commit('getUserInfo',res.data.data.user)
						this.verify = true;
						this.googleCode = ''
					}
				})
			},
			unGoogle(){ //解绑谷歌验证
				this.checkGo = true;
			},
			getga(){ // 获取谷歌秘钥和二维码
				getGoogle().then(res=>{
				this.google = res.data.data.secret;
				this.googleQR = res.data.data.codeurl;
			})
			}
		},
		computed:{
			user(){
				//计算属性把值返回
				return this.$store.state.userInfo.is_go_verify;
			}
		},
		watch:{
			user(val){
				//watch属性形参接收到计算属性返回的值 实时
				this.verify = val
			}
		},
		mounted(){
		},
		created(){
			if(!this.verify){
				this.getga();
			}
		},
	}
</script>

<style lang='less' scoped='scoped'>
.ok{
	padding-top: 0.99rem;
	text-align: center;
	color:#1F3E58;
	font-size: 0.42rem;
	img{
		width: 1.56rem;
		margin-bottom: 0.51rem;
	}
}
.g_form{
	padding-top: 0.61rem;
	 .title{
			padding-bottom: 0.21rem;
	}
}
.code{
	height: 5.79rem;
	background:rgba(238,238,238,1);
	text-align: center;
	.note{
		padding:0.79rem 0 0.29rem;
		color: #506271;
		font-size: 0.25rem;
	}
	.img{
		img{
			display: block;
			width:3.71rem;
			height:3.72rem;
			margin: 0 auto;
		}
	}
}
</style>