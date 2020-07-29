<template>
	<div>
		<!-- @reback='reback' -->
		<Header :title="$t('my.billpart')"></Header>
		<div class="head">
			<div class="title">{{$t('my.dealmount')}}</div>
			<div v-if="choose==2101">
				<div class="num">+{{result.amount}}<span>HKP</span></div>
			</div>
			<div v-if="choose==2401">
				<div v-if="result.currency=='BTC'" class="num">-{{this.result.amountAdd | cutZreo}}<span>{{result.currency}}</span></div>
				<div v-else class="num">-{{this.result.amountAdd | cutZreoFour}}<span>{{result.currency}}</span></div>
			</div>
			<div v-if="choose==2501">
				<div v-if="result.currency=='BTC'" class="num">-{{result.price | cutZreo}}<span>{{result.currency}}</span></div>
				<div v-else class="num">-{{result.price | cutZreoFour}}<span>{{result.currency}}</span></div>
			</div>
			<div v-if="choose==2502">
				<div v-if="result.hashrate_type=='BTC'" class="num">+{{result.margin_price | cutZreo}}<span>{{result.hashrate_type}}</span></div>
				<div v-else class="num">+{{result.margin_price | cutZreoFour}}<span>{{result.hashrate_type}}</span></div>
			</div>
			<div v-if="choose==2503">
				<div class="num">+{{result.income_fee | cutZreoFour}}<span>HKP</span></div>
			</div>
			<div v-if="choose==2601">
				<div class="num">-{{result.product_investment_amount | cutZreoFour}}<span>{{result.product_currency_of_management}}</span></div>
			</div>
			<div v-if="choose==2602">
				<div class="num">+{{result.amount_of_income | cutZreoFour}}<span>{{result.product_profit_currency}}</span></div>
			</div>
			<div v-if="choose==2603">
				<div class="num">+{{result.amount | cutZreoFour}}<span>{{result.currency}}</span></div>
			</div>
			<div v-if="choose==2604">
				<div class="num">-{{result.redeem_service_charge | cutZreoFour}}<span>{{result.currency}}</span></div>
			</div>
			<!-- 云算力接口的状态 -->
			<div v-if="choose==2101" class="status">
			<div v-if="result.status == 99" class="pic"><img src="../../../assets/imgs/success.png"/></div>
				<span>{{status}}</span>
			</div>
			<div v-if="choose==2401" class="status">
			<div v-if="result.status == 1" class="pic"><img src="../../../assets/imgs/success.png"/></div>
				<span>{{status}}</span>
			</div>
			<div v-if="choose==2501||choose==2502||choose==2503" class="status">
			<div v-if="result.status == 10" class="pic"><img src="../../../assets/imgs/success.png"/></div>
			<div v-if="result.status == 20" class="pic"><img src="../../../assets/imgs/going.png"/></div>
			<div v-if="result.status == 30" class="pic"><img src="../../../assets/imgs/Lose.png"/></div>
				<span>{{status}}</span>
			</div>
			<div v-if="choose==2601||choose==2602||choose==2603||choose==2604" class="status">
			<div v-if="result.status == 10" class="pic"><img src="../../../assets/imgs/success.png"/></div>
			<div v-if="result.status == 20" class="pic"><img src="../../../assets/imgs/going.png"/></div>
			<div v-if="result.status == 30" class="pic"><img src="../../../assets/imgs/Lose.png"/></div>
				<span>{{status}}</span>
			</div>
		</div>
		<div v-if="display" class="adr">
			<!-- <div class="item">
				<div class="text">
					<p>发款方</p>
					<p class="dizhi">0x3DB5dbBaA11D9CC0a2257596B4170C4175DE</p>
				</div>
			</div> -->
			<div class="item">
				<div class="text">
					<p>{{$t('my.payee')}}</p>
					<p class="dizhi">{{result.address}}</p>
				</div>
			</div>
		</div>
		<div v-if="choose==2101" class="list">
			<Cell :rightText='oid'>{{$t('index.orderNum')}}</Cell>
			<Cell :rightText="$t('index.buyhkp')">{{$t('public.dealtype')}}</Cell>
			<Cell :rightText="result.channel=='wechatpay'?this.$t('public.wechatPay'):this.$t('public.Alipaypay')">{{$t('my.payaway')}}</Cell>
			<Cell :rightText="result.amount+' HKD'">{{$t('public.odNum')}}</Cell>
			<Cell :rightText='result.finished_at'>{{$t('my.dealtime')}}</Cell>
		</div>
		<div v-if="choose==2401" class="list">
			<Cell :rightText='oid'>{{$t('index.orderNum')}}</Cell>
			<Cell :rightText="result.currency+this.$t('public.Mentionmoney')">{{$t('public.dealtype')}}</Cell>
			<Cell v-if="result.currency=='BTC'" :rightText='result.amount|cutZreo |typeAdd(result.currency)'>{{$t('my.dealNum')}}</Cell>
			<Cell v-else :rightText='result.amount|cutZreoFour |typeAdd(result.currency)'>{{$t('my.dealNum')}}</Cell>
			<Cell v-if="result.currency=='BTC'" :rightText='result.fee|cutZreo |typeAdd(result.currency) '>{{$t('index.commission')}}/{{$t('my.CovCharge')}}</Cell>
			<Cell v-else :rightText='result.fee|cutZreoFour |typeAdd(result.currency) '>{{$t('index.commission')}}/{{$t('my.CovCharge')}}</Cell>
			<Cell :rightText='result.created_at'>{{$t('my.dealtime')}}</Cell>
		</div>
		<div v-if="choose==2501" class="list">
			<Cell :rightText='oid'>{{$t('index.orderNum')}}</Cell>
			<Cell :rightText='typeC'>{{$t('public.dealtype')}}</Cell>
			<Cell :rightText="$t('my.Yuaccount')">{{$t('my.payaway')}}</Cell>
			<Cell :rightText='result.mining_name |checklang'>{{$t('my.Gdname')}}</Cell>
			<Cell :rightText='result.created_at'>{{$t('my.dealtime')}}</Cell>
		</div>
		<div v-if="choose==2502" class="list">
			<Cell :rightText='oid'>{{$t('index.orderNum')}}</Cell>
			<Cell :rightText='typeC'>{{$t('public.dealtype')}}</Cell>
			<Cell :rightText="$t('my.Yuaccount')">{{$t('my.payaway')}}</Cell>
			<Cell :rightText='result.hashrate_name|checklang'>{{$t('my.Gdname')}}</Cell>
			<Cell :rightText='result.created_at'>{{$t('my.dealtime')}}</Cell>
		</div>
		<div v-if="choose==2503" class="list">
			<Cell :rightText='oid'>{{$t('index.orderNum')}}</Cell>
			<Cell :rightText='typeC'>{{$t('public.dealtype')}}</Cell>
			<Cell :rightText='result.created_at'>{{$t('my.dealtime')}}</Cell>
		</div>
		<div v-if="choose==2601" class="list">
			<Cell :rightText='oid'>{{$t('index.orderNum')}}</Cell>
			<Cell :rightText='typeC'>{{$t('public.dealtype')}}</Cell>
			<Cell :rightText="result.product_currency_of_management+$t('my.Yuaccount')">{{$t('my.payaway')}}</Cell>
			<Cell :rightText='result.product_name|checklang'>{{$t('my.Gdname')}}</Cell>
			<Cell :rightText='result.created_at'>{{$t('my.dealtime')}}</Cell>
		</div>
		<div v-if="choose==2602" class="list">
			<Cell :rightText='oid'>{{$t('index.orderNum')}}</Cell>
			<Cell :rightText='typeC'>{{$t('public.dealtype')}}</Cell>
			<!-- <Cell :rightText="$t('my.Yuaccount')">{{$t('my.payaway')}}</Cell>
			<Cell :rightText='result.product_name|checklang'>{{$t('my.Gdname')}}</Cell> -->
			<Cell :rightText='result.created_at'>{{$t('my.dealtime')}}</Cell>
		</div>
		<div v-if="choose==2603" class="list">
			<Cell :rightText='oid'>{{$t('index.orderNum')}}</Cell>
			<Cell :rightText='typeC'>{{$t('public.dealtype')}}</Cell>
			<Cell :rightText='result.created_at'>{{$t('my.dealtime')}}</Cell>
		</div>
		<div v-if="choose==2604" class="list">
			<Cell :rightText='oid'>{{$t('index.orderNum')}}</Cell>
			<Cell :rightText='typeC'>{{$t('public.dealtype')}}</Cell>
			<Cell :rightText='result.created_at'>{{$t('my.dealtime')}}</Cell>
			<Cell :rightText='"+"+result.redeem_amount|cutZreoFour'>贖回金額</Cell>
		</div>
	</div>
</template>
<script>
import { yunOrder,yunOrderIncomes,yunInviteIncomes,fundOrderDetail,investOrder,rewardOrder,redeemOrder,takeCoinSearch,checkPayMent } from '@/api/data'
export default{
	data(){
		return{
			result:'',
			oid:'',
			typeC:'',
			params:'',
			choose:'',
			display:false
		}
	},
	methods: {
		//充值HKP訂單查詢接口 2101
		checkPay(params){
			checkPayMent(params).then(res=>{
				console.log(res);
				this.result = res.data.data.charge_order[0];
				this.result.amount =this.$options.filters.cutZreoTwo(this.result.amount)
			})
		},
		//提币查询接口 2401
		takeCoinSe(params){
			takeCoinSearch(params).then(res=>{
				this.result = res.data.data.withdraw_order[0];
				this.result.amountAdd = (this.result.amount-0)+(this.result.fee-0);
			})
		},
		// 算力购买订单 2501
		yunOrderSearch(params){
			yunOrder(params).then(res=>{
				// console.log(res);
				this.result = res.data.data.data[0];
			})
		},
		// 收益订单查询 2502
		yunOrderIncomesSearch(params){
			yunOrderIncomes(params).then(res=>{
				this.result = res.data.data.data[0];
			})
		},
		// 邀请收益订单查询 2503
		yunInviteIncomesSearch(params){
			yunInviteIncomes(params).then(res=>{
				// console.log(res);
				
				this.result = res.data.data.data[0];
			})
		},
		//理财购买订单详情 2601
		fundOrderDetailSearch(params){
			fundOrderDetail(params).then(res=>{
				// console.log(res);
				this.result = res.data.data;
			})
		},
		//理财分红收入 2602
		investOrderSearch(params){
			investOrder(params).then(res=>{
				// console.log(res);
				this.result = res.data.data;
			})
		},
		//奖励订单详情 2603
		rewardOrderSearch(params){
			rewardOrder(params).then(res=>{
				this.result = res.data.data;
				// console.log(this.result);
			})
		},
		//赎回订单详情 2604
		redeemOrderSearch(params){
			redeemOrder(params).then(res=>{
				this.result = res.data.data;
			})
		},

	},
	//根据返回状态码来动态的计算status的显示状态
	computed: {
		status(){
			if(this.result.status){
					switch (this.result.status) {
					case 10:
						return this.$t('public.dealsuccess')
						break;
					case 20:
						return this.$t('public.dealsuccess')
						break;
					case 30:
						return this.$t('public.closedeal')
						break;
					case 99:
						return this.$t('public.dealsuccess')
						break;
					case 0:
						return this.$t('public.dealdispose')
						break;
					case 1:
						return this.$t('public.dealsuccess')
						break;
					case 2:
						return this.$t('my.dealdispose')
						break;
				}
			}
		}
	},
	created() {
		this.oid = this.$route.query.oid;
		this.params = {oid:this.oid}
			this.choose = this.oid.slice(0,4);
				switch (this.choose) {
					case '1301' :
						this.typeC = this.$t('my.order')
						break;
					case '2101' :
						this.checkPay(this.params);
						break;
					case '2201' :
						this.display =true;
						break;
					case '2301' :
						this.display =true;
						break;
					case '2401' :
						this.takeCoinSe(this.params);
						this.display =true;
						break;
					case '2501' :
						this.typeC = this.$t('my.buyCalculateForce')
						this.yunOrderSearch(this.params);
						break;
					case '2502' :
						this.typeC = this.$t('my.DisCalEarnings')
						this.yunOrderIncomesSearch(this.params);
						break;
					case '2503' :
						this.typeC = this.$t('my.recommendEarn')
						this.yunInviteIncomesSearch(this.params);
						break;
					case '2601' :
						this.typeC = this.$t('my.buyfund')
						this.fundOrderDetailSearch(this.params);
						break;
					case '2602' :
						this.typeC = this.$t('my.DisfundEarnings')
						this.investOrderSearch(this.params);
						break;
					case '2603' :
						this.typeC = this.$t('my.awardorder')
						this.rewardOrderSearch(this.params);
						break;
					case '2604' :
						this.typeC = this.$t('my.redeemorder')
						this.redeemOrderSearch(this.params);
						break;
				}
	},
	mounted() {
	},
	destroyed() {
		this.oid = ''
	},
}
</script>

<style scoped="scoped" lang="less">
.list{
	padding-top: 0.22rem;
	background: #e9e9e9;
}
.head{
	height: 3.3rem;
	border-bottom: 1px #e9e9e9 solid;
	text-align: center;
	.title{
		padding: 0.72rem 0 0.41rem;
		font-size: 0.25rem;
		color: #93A0AA;
	}
	.num{
		font-size: 0.5rem;
		color: #1F3E58;
		span{
			margin-left: 0.15rem;
			font-size: 0.29rem;
		}
	}
	.status{
		display: flex;
		align-items: Center;
		justify-content: center;
		padding-top: 0.59rem;
		color: #1F3E58;
		.pic{
			img{
				width: 0.38rem;
				margin-right:0.15rem;
			}
		}
	}
}
.adr{
	.item{
		display: flex;
		align-items: Center;
		height: 1.35rem;
		border-bottom: 1px #e9e9e9 solid;
		color: #1F3E58;
		padding-left: 0.41rem;
		.dizhi{
			padding-top: 0.27rem;
			color: #93A0AA;
			font-size: 0.25rem;
		}
	}
}
</style>