<template>
	<div>
		<Header :title="$t('index.buyHKP')"></Header>
		<!--头部余额状态-->
		<ul class="curr_num flexbox">
			<li>
				<div class="num">{{HKPData.total_amount |cutZreoFour}}</div>
				<div class="title">{{$t('index.gross')}}(HKP)</div>
			</li>
			<li>
				<div class="num">{{HKPData.available_amount |cutZreoFour}}</div>
				<div class="title">{{$t('index.usable')}}(HKP)</div>
			</li>
			<li>
				<div class="num">{{HKPData.frozen_amount |cutZreoFour}}</div>
				<div class="title">{{$t('index.freeze')}}(HKP)</div>
			</li>
		</ul>
<!--购买-->
		<div class="buy_con">
			<div class="card">
				<div class="text">{{$t('index.buy')}}HKP</div>
				<div class="text2">{{$t('index.FixedExchangeRate')}}：1 HKD = 1HKP</div>
				<Input :placeholder="$t('index.buymoneyimport')" rightText='HKP' :red='red' v-model="HKPNum" @onkeyup="kup"/>
				<p v-if="red">{{$t('index.Buyoy')}}{{maxIn}}HKP</p>
			</div>
			<!--选择支付方式-->
			<div class="payType">
				<div class="title">{{$t('index.choosepayaway')}}</div>
				<ul class="list">
					<li @click=checkout(0)>
						<div class="name">
							<div class="pic"><img src="../../../assets/imgs/wepay.png" /></div>Wechat
						</div>
						<div class="check" :class='{active:checked==0}'>
						</div>
					</li>
					<li @click=checkout(1)>
						<div class="name">
							<div class="pic"><img src="../../../assets/imgs/Aplipay.png" /></div>Aplipay
						</div>
						<div class="check" :class='{active:checked==1}'>
						</div>
					</li>
				</ul>
			</div>
			<!--支付按钮和支付金额-->
			<div class="payBnt">
				<div class="Amount">
					<p>{{$t('index.needpaymoney')}} (HK$)</p>
					<p class="num">{{HKPNum|cutZreoTwo}}</p>
					<Button @click="pays">{{$t('public.pay')}}</Button>
				</div>
			</div>
			<Tips>
				<p>{{$t('index.TIPS6')}}</p>
			</Tips>
		</div>
<!--充值-->
		<!-- <div class="recharge_con" v-show="!buy&&tab==1">
			<div class="code" id="qrcode" ref='qrcode'>
				<QRCode text='324234234234'></QRCode>
			</div>
			<div class="adr">
				{{$t('index.rechargeadd')}}
				<p>0xasdhkjs123n12jf3h12v3hfy434h3v5</p> -->
				<!--复制隐藏的input上的值-->
				<!-- <input type="text" class="hide" id="copy" value="0xasdhkjs123n12jf3h12v3hfy434h3v5"/>
			</div>
			<button class="g_button" style="width: 2.33rem;height: 0.88rem;" ref='copy' data-clipboard-target="#copy" @click="copy()" v-show="copyBtn">{{$t('public.copy')}}</button>
			<Tips>
				<p>{{$t('index.TIPS1')}}</p>
				<p>
					{{pass.currency_name}}
					{{$t('index.TIPS2')}}
					{{pass.currency_name}}
					{{$t('index.TIPS3')}}
					{{pass.currency_name}}
					{{$t('index.TIPS4')}}
					{{pass.currency_name}}
					{{$t('index.TIPS5')}}
				</p>
			</Tips>
		</div> -->
<!--转出-->
		<!-- <div class="Out_con" v-show="tab==2">
			<Form>
				<Label :title="$t('index.purseadd')">
					<Input :placeholder="$t('index.pursehint')" :adress="true" @adrPicker='adr=true' v-model="address"/>
				</Label>
				<Label :title="$t('index.rolloutamount')">
					<Input :placeholder = holder :allOut="$t('index.allout')" @allout="outAll" v-model="outNum" />
				</Label>
				<div class="fee">
					<p>{{$t('index.commission')}}：{{$t('index.gather')}}{{fee}}HKP{{$t('index.commission')}}</p>
					<p v-if="serCharge">{{$t('index.realitypay')}}：{{serCharge | cutZreoFour}}</p>
					<p v-else>{{$t('index.realitypay')}}：{{$t('index.autocount')}}</p>
				</div>
				<Tips style="padding: 0.64rem 0 1rem;">
					<p>1、{{$t('index.TIPS03')}}
						<span>{{pass.currency_name}}</span>
						{{$t('index.TIPS04')}}
					</p>
					<p>2、{{$t('index.TIPS05')}}
						<span>{{fee}}{{pass.currency_name}}</span>
						{{$t('index.TIPS06')}}
					</p>
					<p>3、{{$t('index.TIPS07')}}
						<span>{{pass.currency_name}}</span>
						{{$t('index.TIPS08')}}
					</p>
				</Tips>
				<Button @click.native="next">{{$t('public.next')}}</Button>
			</Form>
		</div> -->
		<!--选择地址-->
		<!-- <Transform v-model='adr' :title="$t('index.choosepurseadd')">
			<ul class="adr_list">
				<li v-for="(item,index) in adrData" :key="index" @click="chooseAdr(item.adr)">
					<div class="txt">
						<p>{{item.name}}</p>
						<div class="adr">{{item.adr}}</div>
					</div>
				</li>
			</ul>
		</Transform> -->
		<!--支付-->
		<PayPassword v-model='payPicker' :amount='outNum|cutZreoFour' unit='HKP' :ga.sync="ga" :pwd.sync="payPassword" @goPay='payOut'></PayPassword>
	</div>
</template>
<script>
	import QRCode from '../../../components/QRCode'
	import { takeCoin,takeCoinRate,searchScope } from '@/api/data'
	export default {
		data() {
			return {
				address:'',//收款地址
				adr:false,
				adrData:[{
					name:'地址1',
					adr:'83490583583578304989'
				},{
					name:'地址1',
					adr:'83490583583578304989'
				}],
				payPicker:false,
				tab:1,
				picker:false,
				payPassword:'',
				ga:'',
				HKPNum:'',
				copyBtn:'',//复制
				checked: 0, //支付按钮,0是微信,1是支付宝.默认是微信
				red:false,
				HKPData:'',
				holder:'',
				outNum:'',
				fee:'',
				pass:'',
				maxIn:'',
				minIn:''
			}
		},
		components:{QRCode},
		methods: {
			changeTab(data){
				this.tab =data
				if(data == 2){
					this.getfee()
				}
			},
			//微信与支付宝的支付
			checkout(num){
				this.checked = num
			},
			//複製
			copy() {
			    let _this = this;
			    let clipboard = _this.copyBtn;
			    clipboard.on('success', function() {
			        _this.$vux.toast.show({
						text: _this.$t('public.copysuccess'),
						type: 'success',
					})
			    });
			    clipboard.on('error', function() {
			        // _this.$vux.toast.text(_this.$t('google.fail'))
			    });
			},
			chooseAdr(adr){
				this.address = adr;
				this.adr = false
			},
			kup(){
				let Reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;
				if(!Reg.test(this.HKPNum)){
					this.HKPNum = this.HKPNum.substr(0, this.HKPNum.length - 1);
					return
				}
				if(this.HKPNum>this.maxIn){
						this.red = true;
						this.HKPNum = this.HKPNum.substr(0, this.HKPNum.length - 1);
					}else{
						this.red = false;
				}
			},
			pays(){
				let Reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;
				if(!Reg.test(this.HKPNum)||this.HKPNum==0){
					this.$vux.toast.show({
						text: this.$t('index.EMoney'),
						type: 'cancel',
						width:'4rem'
					})
					return false
				}
				if((this.HKPNum-0)>this.maxIn||(this.HKPNum-0)<this.minIn){
					this.$vux.toast.show({
						text: this.$t('index.EMoney'),
						type: 'cancel',
						width:'4rem'
					})
					return false
				}
				switch (this.checked) {
					case 0:
						this.$router.push({name:'PaymentCode',
						query:
							{price:this.HKPNum,payType:this.checked}
						})
						break;
					case 1:
						break;
				}
			},
			outAll(){
				this.outNum = String(this.HKPData.available_amount).replace(/^(.*\..{4}).*$/,"$1");
			},
			next(){
				if(!this.address||!this.outNum){
					this.$vux.toast.show({
						text: this.$t('index.Turnwallet'),
						type: 'cancel',
						width:'5.5rem'
					})
					return false
				}
				this.payPicker = true;
			},
			getfee(){
				takeCoinRate().then(res=>{
				res.data.data.withdraw_currecy.forEach(val=>{
						if(val.currency=="HKP"){
							this.fee = val.fee;
						}
					})
					this.fee = String(this.fee).replace(/^(.*\..{4}).*$/,"$1");
				})
			},
			payOut(){
				let data = {
					//币种名称如BTC
					currency:'HKP',
					//提现数量
					amount:this.outNum,
					//提现地址
					address:this.address,
					//地址名字
					address_name:'',
					pay_password:this.$md5(this.payPassword),
					ga_key:this.ga
				}
				//支付密码不正确
				takeCoin(data).then(res=>{
					switch (res.data.errcode) {
						case 0:
							let oid = res.data.data.oid;
							this.$router.push({name:'bill-info',query:{oid:oid}})
							break;
						case 11012:
							this.$vux.toast.show({
							text: this.$t('public.payNcorrect'),
							type: 'cancel',
							width:'4rem'
						})
							break;
						default:
							break;
					}
				})
			}
		},
		//手续费 转币支出的1%
		computed: {
			serCharge(){
				if(this.outNum){
					return (this.outNum-0)+(this.fee-0);
				}else{
					return ''
				}
			}
		},
		created(){
			this.pass = JSON.parse(this.$route.query.pass);
			this.pass.forEach(val => {
				if(val.currency_name=="HKP"){
					this.HKPData = val 
				}
			});
			searchScope().then(res=>{
				// console.log(res);
				this.maxIn = (res.data.data.range.max_hkp-0);
				this.minIn = (res.data.data.range.min_hkp-0);
			})
		},
		mounted(){
			try{
				this.copyBtn = new this.clipboard(this.$refs.copy);
			}catch(e){
			}
			//保留小数点后4位
			this.holder ='可用 ' + String(this.HKPData.available_amount).replace(/^(.*\..{4}).*$/,"$1")+' HKP';
		}
	}
</script>

<style scoped="scoped" lang="less">


	.adr_list{
		max-height: 3.29rem;
		overflow-y: auto;
		color: #1F3E58;
		li{
			height: 1.08rem;
			border-bottom:1px #e9e9e9 solid;
			display: flex;
			align-items: Center;
		}
		.txt{
			margin-left: 0.29rem;
			.adr{
				margin-top: 0.1rem;
				font-size:0.25rem;
				color: #93A0AA;
			}
		}
	}

/*头部货币信息*/
	.curr_num {
		height: 1.4rem;
		margin-bottom: 0.22rem;
		background: #fff;
		text-align: center;
		color: #1F3E58;
		li {
			height: 0.69rem;
			margin-top: 0.52rem;
			border-right: 1px #e9e9e9 solid;
			&:last-child {
				border: none;
			}
		}
		.title {
			padding-top: 0.16rem;
			font-size: 0.24rem;
			color: #93A0AA;
		}
	}
	/*转出*/
	.Out_con{
		position: absolute;
		top:2.56rem;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0.46rem 0 0;
		background: #fff;
		// .g_input{
		// 	.adr{}
		// }
		.fee{
			p{
				padding-bottom: 0.2rem;
			}
			line-height:0.37rem;
			color: #506271;
		}
	}
	/*充值*/
	.recharge_con{
		padding: 0.67rem 0.55rem 0.75rem;
		background: #fff;
		.code{
			width: 3.71rem;
			height: 3.71rem;
			margin: 0 auto;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.adr{
			padding-top: 0.64rem;
			text-align: center;
			color: #506271;
			p{
				margin: 0.21rem 0 0.5rem;
			}
		}
	}
	/*购买*/
	.buy_con {
		padding: 0.34rem 0.55rem 0;
		background: #fff;
		.card {
			position: relative;
			height: 3.65rem;
			margin: 0 auto 0.59rem;
			padding: 0.88rem 0.55rem 0;
			box-sizing: border-box;
			background: url(../../../assets/imgs/buy_hkp.png) no-repeat;
			background-size: 100%;
			.text {
				padding-bottom: 0.26rem;
				font-size: 0.42rem;
			}
			.g_input {
				position: absolute;
				left: 0.55rem;
				bottom: 0.74rem;
				width: 5.28rem;
				border: none;
			}
			p{
				color: red;
				margin-top: 1.8rem;
			}
		}
		.payBnt{
			padding-top: 0.73rem;
			font-size: 0.25rem;
			color: #506271;
			text-align: center;
			.num{
				padding: 0.4rem 0 0.56rem;
				color: #F54531;
				font-size: 0.5rem;
			}
		}
		/*支付方式*/
		.payType {
			.title {
				padding-bottom: 0.3rem;
				color: #506271;
			}
			.list {
				border: 1px solid rgba(222, 222, 222, 1);
				border-radius: 0.15rem;
				.name {
					margin-left: 0.29rem;
					line-height: 0.7rem;
					color: #1F3E58;
				}
				.pic {
					float: left;
					width: 0.7rem;
					height: 0.7rem;
					margin-right: 0.2rem;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.check {
					margin-right: 0.3rem;
					width: 0.4rem;
					height: 0.4rem;
					border: 0.03rem solid rgba(222, 222, 222, 1);
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: Center;
					&.active{
						margin-right: 0.3rem;
						width: 0.4rem;
						height: 0.4rem;
						border: 0.03rem solid rgba(245, 69, 49, 1);
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: Center;
						&::after{
							display: block;
							content: '';
							width: 0.3rem;
							height: 0.3rem;
							background: rgba(245, 69, 49, 1);
							border-radius: 50%;
						}
					}
				}
				li {
					display: flex;
					justify-content: space-between;
					align-items: Center;
					height: 1.17rem;
					border-bottom: 1px solid rgba(222, 222, 222, 1);
					&:last-child {
						border: none;
					}
				}
			}
		}
	}
</style>