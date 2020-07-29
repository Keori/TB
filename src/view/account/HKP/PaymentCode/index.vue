<template>
	<div>
		<Header :title="$t('index.Paymentcode')" :tips="1" @backoff="bOff"></Header>
		<div class="orderInfo">
			<div class="orderNo">{{$t('index.orderNum')}}：12345678900</div>
			<p class="p1">{{$t('index.needpaymoney')}} (HKP)</p>
			<div class="num">{{price|cutZreoTwo}}</div>
		</div>
		<!--二维码-->
		<div class="codeBox">
			<div class="title">{{$t('index.in')}}<span>00:{{minute}}:{{second}}</span>{{$t('index.finishpay')}}</div>
			<div class="code">
				<QRCode :text='weChatCode' width='417' height='417'></QRCode>
			</div>
		</div>
		<Tips style="padding: 0.71rem 0.9rem 0;">
			<p>{{$t('index.TIPS7')}}{{payType=='wechatpay'?'微信':'支付寶'}}{{$t('index.TIPSChild7')}}；</p>
		</Tips>
		<Alert :value="stay" :txt="$t('index.TIPS09')" :cancel_text="$t('index.closePay')" :ok_text="$t('index.lastPay')" @on-cancel="lastPage" @on-confirm="hide"></Alert>
	</div>
</template>

<script>
	import QRCode from '../../../../components/QRCode'
	import { payMent,checkPayMent,yunPayOrder } from '@/api/data'
	export default{
		components:{QRCode},
		data(){
			return{
				price:'',
				payType:'',
				tip:true,
				stay:false,
				minutes:10,
				seconds:0,
				weChatCode:'',
				oid:'',
				timer:'',
				time:'',
				yunBuy:false
			}
		},
		computed: {
			second() {
				return this.num(this.seconds)
			},
			minute() {
				return this.num(this.minutes)
			}
		},
		methods:{
			bOff(){
				this.stay = true;
			},
			hide(){
				this.stay = false;
			},
			lastPage(){
				this.$router.go(-1)
			},
			num(n) {
				return n < 10 ? '0' + n : '' + n
			},
			add() {
				this.time = window.setInterval(() =>{
					if (this.seconds === 0 && this.minutes !== 0) {
						this.seconds = 59
						this.minutes -= 1
					} else if (this.minutes === 0 && this.seconds === 0) {
						this.seconds = 0
						window.clearInterval(this.time)
						window.location.reload();
					} else {
						this.seconds -= 1
					}
				},1000)
			},
			startPayMent(){
						let data = {
						amount:this.price,
						channel:this.payType
					}
					payMent(data).then(res=>{
					// console.log(res);
					this.oid = res.data.data.oid;
					this.weChatCode = res.data.data.qrcode;
					//获取到二维码并渲染到页面以后再开始倒计时的执行
					this.add();
					this.checkPayStatus();
				})
			},
			checkPayStatus(){
				window.clearInterval(this.timer);
				let params={
					oid:this.oid
				}
				this.timer = window.setInterval(()=>{
					checkPayMent(params).then(res=>{
						// console.log(res);
						switch (res.data.data.charge_order[0].status) {
							case 99:
								window.clearInterval(this.time)
								window.clearInterval(this.timer);
								this.$router.replace({name:'bill-info',query:{oid:this.oid}})
								// window.clearInterval(timer);
								break;
							default:
								break;
						}
					})
				},3000)
			}
		},
		watch: {
			second:{
				handler (newVal) {
				this.num(newVal)
				}
			},
			minute:{
				handler (newVal) {
				this.num(newVal)
				}
			}
		},
		created(){
			this.price = this.$route.query.price;
			this.payType = this.$route.query.payType;
			switch (this.payType) {
				case 0:
					this.payType = 'wechatpay';
					break;
				default:
					break;
			}
			this.startPayMent();
		},
		destroyed() {
			if(this.time){
				window.clearInterval(this.time)
			}
			if(this.timer){
				window.clearInterval(this.timer);
			}
		},
	}
</script>

<style scoped="scoped" lang="less">
.codeBox{
	width: 5.81rem;
	height: 6.3rem;
	margin: 0 auto;
	background: #fff;
	.title{
		padding: 0.65rem 0 0.44rem;
		text-align: center;
		color: #506271;
		span{
			color: #ff9952;
		}
	}
	.code{
		width: 4.18rem;
		height: 4.18rem;
		margin: 0 auto;
		#qrcode{
			//二维码比加载图层高一级 轮询的时候不显示菊花转
			z-index: 10000;
		}
		img{
				width: 100%;
				height: 100%;
			}
	}
}
	.orderInfo{
		padding: 0.73rem 0 0.57rem;
		text-align: center;
		color: #506271;
		// .orderNo{}
		.p1{
			margin: 0.52rem 0 0.3rem;
			color: #93A0AA;
			font-size: 0.25rem;
		}
		.num{
			font-size: 0.5rem;
		}
	}
</style>