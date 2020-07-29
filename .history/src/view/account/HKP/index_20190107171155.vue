<template>
	<div>
		<Header :tab1Text="buy?'购买':'充值'" tab2Text="转出" @tabClick="changeTab"></Header>
		<!--头部余额状态-->
		<ul class="curr_num flexbox">
			<li>
				<div class="num">10000.22</div>
				<div class="title">总量(HKP)</div>
			</li>
			<li>
				<div class="num">10000.22</div>
				<div class="title">总量(HKP)</div>
			</li>
			<li>
				<div class="num">10000.22</div>
				<div class="title">总量(HKP)</div>
			</li>
		</ul>
<!--购买-->
		<div class="buy_con" v-show="buy&&tab==1">
			<div class="card">
				<div class="text">购买GICA</div>
				<div class="text2">固定兑换汇率：1 HKD = 1HKP</div>
				<Input placeholder="请输入购买金额" rightText='HKP'/>
			</div>
			<!--选择支付方式-->
			<div class="payType">
				<div class="title">请选择支付方式</div>
				<ul class="list">
					<li>
						<div class="name">
							<div class="pic"><img src="../../../assets/imgs/wepay.png" /></div>Wechat
						</div>
						<div class="check">
							<p style='width:0.2rem;height:0.2rem;background:#FF0000'></p>
						</div>
					</li>
				</ul>
			</div>
			<!--支付按钮和支付金额-->
			<div class="payBnt">
				<div class="Amount">
					<p>应支付金额 (HKP)</p>
					<p class="num">123.22</p>
					<Button to='PaymentCode'>支付</Button>
				</div>
			</div>
			<Tips>
				<p>使用第三方支付，会自动将港币价格换算成当地货币</p>
			</Tips>
		</div>
		
<!--充值-->
		<div class="recharge_con" v-show="!buy&&tab==1">
			<div class="code" id="qrcode" ref='qrcode'>
				<QRCode text='324234234234'></QRCode>
			</div>
			<div class="adr">
				充值地址
				<p>0xasdhkjs123n12jf3h12v3hfy434h3v5</p>
				<!--复制隐藏的input上的值-->
				<input type="text" class="hide" id="copy" value="0xasdhkjs123n12jf3h12v3hfy434h3v5"/>
			</div>
			<button class="g_button" style="width: 2.33rem;height: 0.88rem;" ref='copy' data-clipboard-target="#copy" @click="copy()" v-show="copyBtn">复制</button>
			<Tips>
				<p>请仔细核对充值地址；</p>
				<p>BTC地址只能充值 BTC资产，任何充入 BTC地址的非BTC资产将不可找回。</p>
			</Tips>
		</div>
<!--转出-->
		<div class="Out_con" v-show="tab==2">
			<Form>
				<Label title="收款钱包地址：">
					<Input placeholder="选择/输入收款钱包地址" :adress="true" @adrPicker='adr=true' v-model="address"/>					
				</Label>
				<Label title="转出数量：">
					<Input placeholder="可用100.0000HKP"/>	
				</Label>
				<div class="fee">
					<p>手续费：收取1%手續費</p>
					<p>实际支付：自动计算</p>
				</div>
				<Tips style="padding: 0.64rem 0 1rem;">
					<p>1、请注意检查钱包地址：只支持GICA钱包地址转账，不支持
					其他资产的钱包地址，错误转入可能导致资产损失</p>
					<p>2、每笔交易收取1%的手续费用</p>
					<p>3、提交转账申请后，GICA实际到账时间与当前网络状况有关，
					请耐心等待。</p>
				</Tips>
				<Button @click.native="payPicker = true">下一步</Button>
			</Form>
			
		</div>
		<!--选择地址-->
		<Transform v-model='adr' title='选择收款钱包地址'>
			<ul class="adr_list">
				<li v-for="(item,index) in adrData" :key="index" @click="chooseAdr(item.adr)">
					<div class="txt">
						<p>{{item.name}}</p>
						<div class="adr">{{item.adr}}</div>
					</div>					
				</li>
			</ul>
		</Transform>
		<!--支付-->
		<PayPassword v-model='payPicker' amount='100' unit='HKP' :ga.sync="ga" :pwd.sync="payPassword" @goPay=''></PayPassword>
			
	</div>
</template>
<script>
	import QRCode from '../../../components/QRCode'
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
				buy:false,
				tab:1,
				picker:false,
				payPassword:'',
				ga:'',
				copyBtn:''//复制
			}
		},
		components:{QRCode},
		methods: {
			changeTab(data){
				this.tab =data
			},
			//複製
			copy() {
			    let _this = this;
			    let clipboard = _this.copyBtn;
			    clipboard.on('success', function() {
//			        _this.$vux.toast.text(_this.$t('google.success'))
					alert('复制成功')
			    });
			    clipboard.on('error', function() {
			        // _this.$vux.toast.text(_this.$t('google.fail'))
			    });
			},
			chooseAdr(adr){
				this.address = adr;
				this.adr = false
			}
		},
		created(){
			this.buy = this.$route.query.buy

		},
		mounted(){
			try{
				this.copyBtn = new this.clipboard(this.$refs.copy);
			}catch(e){
				
			}
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
			margin-top: 0.42rem;
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
		.g_input{
			.adr{
				
			}
		}
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
					&.checked {
						border-color: rgba(245, 69, 49, 1);
						&:after {
							display: block;
							content: '';
							width: 0.25rem;
							height: 0.25rem;
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