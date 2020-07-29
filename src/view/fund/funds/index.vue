<template>
	 <div class="app">
		<Header :hideBack=true :title="$t('public.MoneyMatters')"></Header>
		<div class="header">
			<div class="up">
				<div class="left">
					<!-- 使用字体图标 -->
					<p class="yesterday">{{$t('funds.YesEar')}}<i class="iconfont icon-apr-yuedengyu"></i></p>
					<p v-if="isLogin"><span class="num">{{topPrice.margin_price|cutZreoFour}}</span><span class="nums">HKP</span></p>
					<p v-else><span class="login">{{$t('funds.Aflogin')}}</span></p>
				</div>
				<div class="right">
					<!-- 使用字体图标 -->
					<p class="yesterday">{{$t('funds.AddEar')}}<i class="iconfont icon-apr-yuedengyu"></i></p>
					<p v-if="isLogin"><span class="num">{{TotalPrice|cutZreoFour}}</span><span class="nums">HKP</span></p>
					<p v-else><span class="login">{{$t('funds.Aflogin')}}</span></p>
				</div>
			</div>
			<div class="down" >
				<div class="left" @click="show">
					<img class="fl" src="../../../assets/imgs/yun.png">
						<div class="downr">
							<span>{{$t('funds.myCloudCal')}}</span>
							<p>{{$t('funds.Mses1')}}</p>
						</div>
				</div>
				<div class="right">
					<img class="fl" src="../../../assets/imgs/Calendar.png">
					<div class="downr" @click="myRegular">
						<span>{{$t('funds.myregularfund')}}</span>
						<p>{{$t('funds.Mses2')}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="middle">
			<div class="top">
				<div class="tips">
					<span></span>
					<span class="tipss">{{$t('funds.RecommentFD')}}</span>
				</div>
				<span class="fr more" @click="jump">{{$t('funds.More')}}</span>
			</div>
			<div v-for="(item, index) in Mmoney" :key="index" class="content" @click="jumpfunddetail(item.id)">
				<div class="left">
					<p>{{(item.annualized_return-0).toFixed(2)}}%</p>
					<p>{{$t('funds.expectEar')}}</p>
				</div>
				<div class="right">
					<div class="rightcontent">
						<p>
							<span>{{item.name | checklang}}</span>
							<span v-if='item.surplus_amount>=1' class="color">{{$t('funds.comment')}}</span>
							<span v-else class="black">{{$t('funds.sellout')}}</span>
						</p>
						<p class="text-overflow">{{item.description | checklang}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="below">
			<div class="top">
				<div class="tips">
					<span></span>
					<span class="tipss">{{$t('funds.CloudCalsift')}}</span>
				</div>
				<span class="fr more" @click="yunPower">{{$t('funds.More')}}</span>
			</div>
			<div class="content" v-for='(item,index) in yunInList' :key='index'>
				<p v-if='item.stock!==0' class="cont_title text-overflow">{{item.mining_name |checklang}}</p>
				<p v-if='item.stock==0' class="cont_title text-overflow acolor">{{item.mining_name |checklang}}</p>
				<div class="cont_detail">
					<p v-if="item.currency=='BTC'">{{$t('funds.Yieldrollout')}} {{item.expect_income |cutZreo}}  {{item.currency}} / T</p>
					<p v-else>{{$t('funds.Yieldrollout')}} {{item.expect_income |cutZreoFour}}  {{item.currency}} / T</p>
					<p>{{$t('funds.surplus')}} {{item.stock}}.00 T</p>
				</div>
				<p v-if="item.stock!=0&&item.currency=='BTC'" class="price">{{item.price|cutZreo}} 
					<span>{{item.currency}} / T</span>
					<span class="buy_button fr" @click="jumpyunbuy(item.id)">{{$t('funds.buyRnow')}}</span>
				</p>
				<p v-else-if="item.stock!=0" class="price">{{item.price|cutZreoFour}}
					<span>{{item.currency}} / T</span>
					<span class="buy_button fr" @click="jumpyunbuy(item.id)">{{$t('funds.buyRnow')}}</span>
				</p>
				<p v-if="item.stock==0" class="price">
					<span class='acolor'>一 一 一 一 一 一</span>
					<span></span>
					<span class="buy_button fr" style='background:#93A0AA'>{{$t('funds.sellouts')}}</span>
				</p>
			</div>
			<div class='block'></div>
		</div>
		<div v-show="dialog" class="dialog">
			<div class="dialogx">
				<div class="top">
					<i @click="showhide" class="iconfont icon-apr-baiseyuanquanguanbi"></i>
					<p>{{$t('funds.wel')}}</p>
				</div>
				<div class="down">
					<p>{{$t('funds.writeInvitationCode1')}}</p>
					<p>{{$t('funds.writeInvitationCode2')}}</p>
					<input type="text" v-model="cdKey">
					<p><span class="button" @click="next">{{$t('funds.neglect')}}</span><span style="float:right;border:none;color:#fff;background:linear-gradient(90deg,rgba(3,194,252,1),rgba(0,106,225,1));" class="button" @click="jumpyun">{{$t('public.submit')}}</span></p>
				</div>
			</div>
		</div>
		<Tab></Tab>
	 </div>
</template>

<script>
import myMath from '../../../assets/js/math.js'
import { firstInvite,isFirstInvite,recommends,yunProList,summery,totalIncome,exchange } from '@/api/data'
export default {
	data(){
		return{
			dialog:false,
			cdKey:'',
			isInvite:false,
			Mmoney:[],
			yunInList:'',
			topPrice:'',
			totalRegular: '',
			//币种
			ExBTC: '',
			ExUSDT: '',
			ExZIP: '',
			ExHKP: '',
			TotalPrice: '',
		}
	},
	computed: {
		isLogin(){
			if(this.$store.state.userInfo){
				return true
			}else{
				return false
			}
		}
	},
	methods:{
		jump(){
			this.$router.push({name:'fund-products'})
		},
		myRegular(){
			this.$router.push({name:'fund-myregulars'})
		},
		show(){
			if(this.isLogin){
				isFirstInvite().then(res=>{
					// console.log(res);
				// 访问过为1
				if(res.data.data.is_first==1){
					this.isInvite = true;
					let topPrice = JSON.stringify(this.topPrice)
					this.$router.push({name:'yun-Incomes',query:{topPrice:topPrice}})
				}else{
					this.dialog = true;
				}
			})
			}else{
				this.$router.push({name:'yun-Incomes'})
			}
		},
		yunPower(){
			let topPrice = JSON.stringify(this.topPrice)
			this.$router.push({name:'yuns-power',query:{topPrice:topPrice}})
		},
		showhide(){
			this.dialog = false;
		},
		next(){
			firstInvite().then(res=>{
			})
			this.$router.push({name:'yuns-power'})
		},
		jumpyun(){
			let cdReg = /^[0-9]{5}$/
			if(!cdReg.test(this.cdKey)){
				this.$vux.toast.show({
						text: this.$t('funds.InvitationCode1'),
						type: 'cancel',
						width: '3.8rem'
					})
				if(this.cdKey.length>6){
					this.cdKey = ''
				}
				return false
			}
			let params = {
				'invite_code':this.cdKey
			}
			firstInvite(params).then((res)=>{
				if(res.data.errcode!=0){
					this.$vux.toast.show({
						text: this.$t('funds.InvitationCode2'),
						type: 'cancel',
						width: '3.8rem'
					})
					return false
				}
				this.$router.push({name:'yuns-power'})
			})
		},
		jumpyunbuy(id){
			this.$router.push({name:'yun-buy',query:{id:id}})
		},
		jumpfunddetail(id){
			let pass = {}
			 this.Mmoney.forEach((val,index)=>{
			  if(id==val.id){
				  pass = val;
			  }
		  	})
			pass = JSON.stringify(pass)
			this.$router.push({name:'fund-product-detail',
			query:
			{
				id:id,
				pass:pass
			}
			})
		},
		//获取理财推荐列表
		recommend(){
			let params={
				pageid:0,
				pagesize:2
			}
			recommends(params).then(res=>{
				this.Mmoney = res.data.data.data;
				console.log(this.Mmoney[0]);
				
			})
		},
		ExChange(){
			exchange().then(res => { //hkp_price HKP //cny_price 人民币
				let CurAll = res.data.data.currency
				this.ExBTC = CurAll[0].hkp_price-0
				this.ExUSDT = CurAll[1].hkp_price-0
				this.ExZIP = CurAll[2].hkp_price-0
				this.ExHKP = CurAll[3].hkp_price-0
				totalIncome().then(res => {
					let CurCum = res.data.data
					let CurBTC = myMath.add(CurCum.BTC,this.topPrice.total_price-0)*this.ExBTC
					let CurUSDT = myMath.mul(CurCum.USDT,this.ExUSDT)
					let CurZIP = myMath.mul(CurCum.ZIP,this.ExZIP)
					let CurHKP = myMath.mul(CurCum.HKP,this.ExHKP)
					this.TotalPrice = (CurBTC+CurUSDT+CurZIP+CurHKP)
				})
			})
		}
	},
	created() {
		let lang = window.localStorage.getItem('lang')
		if(!lang){
			window.localStorage.setItem('lang','zh_tw');
		}
		this.recommend();
		yunProList().then(res=>{
			this.yunInList=res.data.data.data;
		});
		if(this.isLogin){
			summery().then(res=>{
				this.topPrice = res.data.data;
				this.ExChange();
			})
		}
	},
}
</script>

<style lang="less" scoped>
	html{
		height: 100%;
	}
	.dialog{
		width: 100%;
		height: 100%;
		background:rgba(0,0,0,.6);
		position: fixed;
		top: 0rem;
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
				}
			}
			.down{
				padding: 0.48rem 0.45rem 0.42rem 0.59rem;
				p{
					color: #93A0AA;
					font-size: 0.28rem;
					line-height: 0.4rem;
				}
						input{
							width: 4.7rem;
							height: 0.78rem;
							background-color: #EDEDED;
							border-radius: 0.2rem;
							margin-top: 0.19rem;
							font-size: 0.5rem;
							color: #1F3E58;
							padding-left: 0.27rem;
						}
				p:last-child{
					width: 4.7rem;
					margin-top: 0.59rem;
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
			}
		}
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	div,input,span{
		box-sizing: border-box;
	}
	.icon-apr-yuedengyu{
		font-size: 0.13rem;
	}
	.header{
		height: 3.65rem;
		color: #fff;
		.up{
		height: 2.26rem;
		background: url('../../../assets/imgs/666.png') left center;
		padding: 0.73rem 0.37rem 0.54rem 0.42rem;
			.left,.right{
				p:first-child{
					font-size: 0.25rem;
					margin-bottom: 0.35rem;
				}
				.num{
					font-size: 0.36rem;
					margin-right:0.1rem;
				}
				.nums{
					font-size: 0.2rem;
				}
				.login{
					font-size: 0.22rem;
					color: #ccc;
				}
			}
			.left{
				width: 3.3rem;
				border-right: 0.01rem solid #4DB1F9;
			}
			.right{
				width: 3rem;
				margin-left: 0.3rem;
			}
		}
		.down{
			height: 1.39rem;
			background: #fff;
			.left,.right{
				height: 100%;
				width: 3.74rem;
				img{
				width: 0.67rem;
				height: 0.67rem;
				display: inline-block;
				margin-top: 0.36rem;
				margin-left: 0.36rem;
			  }
			  .downr{
				  margin-left: 1.25rem;
				  margin-top: 0.38rem;
				  span{
					  font-size: 0.28rem;
					  color: #27455E;
					  font-weight: 700;
				  }
				  p{
					  margin-top: 0.17rem;
					  font-size: 0.21rem;
					  color: #93A0AA;
				  }
			  }
			}
			.left{
				border-right: 0.01rem solid #EEEEEE;
			}
			.right{
				img{
					margin-left:0.28rem;
				}
				.downr{
					margin-left: 1.12rem;
				}
			}
		}
	}
	.middle{
		height: 100%;
		background: #fff;
		margin-top: 0.29rem;
		margin-bottom: 0.24rem;
		.top{
			height: 0.89rem;
			border-bottom: 0.02rem solid #e9e9e9;
			.tips{
				width: 2rem;
				display: inline-block;
				margin-top: 0.29rem;
				margin-left: 0.33rem;
				color: #506271;
				position: relative;
				span:nth-child(1){
					display: inline-block;
					width:0.22rem;
					height:0.33rem;
					background:linear-gradient(90deg,#03C2FC,#006AE1);
					border-radius:0.06rem;
				}
				.tipss{
					font-size: 0.28rem;
					color: #506271;
					position:absolute;
					left: 0.4rem;
					top: 0.02rem;
					width: 1.2rem;
				}
			}
			.more{
				color: #2188FB;
				margin-right: 0.31rem;
				margin-top: 0.31rem;
				font-family: '微软雅黑';
				font-size: 0.25rem;
			}
		}
		.content{
			height: 1.55rem;
			border-bottom: 0.03rem solid #eee;
			.left{
				height: 100%;
				width: 2.19rem;
				padding:0.46rem 0.3rem 0.35rem 0.52rem;
				p:nth-child(1){
					font-size: 0.42rem;
					color: #F54531;
					padding-bottom: 0.12rem;
				}
				p:nth-child(2){
					font-size: 0.21rem;
					color: #93A0AA;
				}
			}
			.right{
				width: 5.3rem;
				padding-top: 0.51rem;
				.rightcontent{
					border-left: 0.02rem solid #eee;
					padding-left:0.47rem;
					p:nth-child(1){
						font-size: 0.28rem;
						color: #1F3E58;
						padding-bottom: 0.15rem;
						span:nth-child(1){
						text-overflow:ellipsis;
						white-space:nowrap;
						overflow: hidden;
						display: inline-block;
						width: 3.5rem;
						}
						span:nth-child(2){
							background-position:0px 0px;
							background-size: 0.58rem 0.29rem;
							text-align: center;
							line-height: 0.29rem;
							width: 0.6rem;
							height: 0.3rem;
							display:inline-block;
							font-size: 0.17rem;
							margin-left: 0.09rem;
							color: #fff;
							vertical-align: top;
						}
					}
					p:nth-child(2){
						width: 4.38rem;
						font-size: 0.21rem;
						color: #93A0AA;
					}
					.color{
						background: url('../../../assets/imgs/color.png') no-repeat;
					}
					.black{
						background: url('../../../assets/imgs/black.png') no-repeat;
					}
				}
			}
		}
	}
	.below{
		height: 3.37rem;
		background: #fff;
		margin-bottom: 1.35rem;
		.top{
			height: 0.89rem;
			border-bottom: 0.02rem solid #e9e9e9;
			.tips{
				width: 2rem;
				display: inline-block;
				margin-top: 0.29rem;
				margin-left: 0.33rem;
				color: #506271;
				position: relative;
				span:nth-child(1){
					display: inline-block;
					width:0.22rem;
					height:0.34rem;
					background:linear-gradient(90deg,#03C2FC,#006AE1);
					border-radius:0.06rem;
				}
				.tipss{
					font-size: 0.28rem;
					color: #506271;
					position:absolute;
					left: 0.4rem;
					top: 0.02rem;
					width: 1.4rem;
				}
			}
			.more{
				color: #2188FB;
				margin-right: 0.31rem;
				margin-top: 0.31rem;
				font-family: '微软雅黑';
				font-size: 0.25rem;
			}
		}
		.content{
			height: 80%;
			padding-left: 0.4rem;
			padding-top: 0.36rem;
			background: #FFFFFF;
			border-bottom: 0.001rem solid #E9E9E9;
			.cont_title{
				font-size: 0.28rem;
				color: #1F3E58;
				font-weight: 700;
				margin-bottom: 0.27rem;
				width: 5rem;
			}
			.acolor{
				color: #93A0AA;
			}
			.cont_detail{
				font-size: 0.21rem;
				color: #93A0AA;
				p:nth-child(1){
					margin-bottom: 0.1rem;
				}
			}
			.price{
				margin-top: 0.31rem;
				font-size: 0.3rem;
				color: #000000;
				font-weight: 700;
				span:nth-child(1){
					font-size: 0.23rem;
					font-weight: 500;
				}
				.buy_button{
					font-size: 0.25rem;
					font-weight: 500;
					color: #fff;
					display: inline-block;
					width:1.37rem;
					height:0.54rem;
					line-height: 0.54rem;
					text-align: center;
					margin-right: 0.34rem;
					background:linear-gradient(90deg,rgba(3,194,252,1),rgba(0,106,225,1));
					border-radius:6px;
				}
			}
		}
		.block{
			width :100%;
			height:1.02rem
		}
	}
</style>
