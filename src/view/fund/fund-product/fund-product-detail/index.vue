<template>
	<div>
		<Header :title=pass.name|checklang></Header>
		<div class="header">
			<div class="up">
				<div class="left">
					<!-- 使用字体图标 -->
					<p class="yesterday">{{$t('funds.expectEar')}}<span v-if="pass.fund_type==1" class="gone">{{$t('yun.regular')}}</span></p>
					<p><span class="num">{{pass.annualized_return?(pass.annualized_return-0).toFixed(2):'0.0'}}%</span></p>
					<!-- <p><span class="num">{{pass.annualized_return?(pass.annualized_return-0).toFixed(2):'0.0'}}%</span></p> -->
				</div>
				<div class="right">
					<!-- 使用字体图标 -->
					<p style="text-align:center" class="yesterday">{{$t('yun.productlimit')}}</p>
					<p style="text-align:center"><span class="num">{{pass.project_duration}}</span><span class="nums">{{$t('yun.days')}}</span></p>
				</div>
			</div>
			<div class="down">
				<div v-if="pass.date_of_commencement_of_purchase<=new Date().YMD(0)" class="buyStart"><span class="downOne actColor">{{$t('yun.Explainbuy')}}</span><span class="downDot active"></span><span class="downDate">{{pass.date_of_commencement_of_purchase}}</span></div>
				<div v-else class="buyStart"><span class="downOne">{{$t('yun.Explainbuy')}}</span><span class="downDot"></span><span class="downDate">{{pass.date_of_commencement_of_purchase}}</span></div>

				<div v-if="pass.closing_of_purchase_date<=new Date().YMD(0)" class="buyEnd"><span class="downOne actColor">{{$t('yun.Explained')}}</span><span class="downDot active"><span class="sActive"></span></span><span class="downDate">{{pass.closing_of_purchase_date}}</span></div>
				<div v-else class="buyEnd"><span class="downOne">{{$t('yun.Explained')}}</span><span class="downDot"><span></span></span><span class="downDate">{{pass.closing_of_purchase_date}}</span></div>

				<div v-if="pass.interest_date<=new Date().YMD(0)" class="intStart"><span class="downOne actColor">{{$t('yun.beginbearing')}}</span><span class="downDot active"><span span class="sActive"></span></span><span class="downDate">{{pass.interest_date}}</span></div>
				<div v-else class="intStart"><span class="downOne">{{$t('yun.beginbearing')}}</span><span class="downDot"><span></span></span><span class="downDate">{{pass.interest_date}}</span></div>

				<div v-if="exDate<=new Date().YMD(0)" class="intEnd"><span class="downOne actColor">{{$t('yun.expiredays')}}</span><span class="downDot active"><span span class="sActive"></span></span><span class="downDate">{{pass.interest_date | addDate(pass.project_duration)}}</span></div>
				<div v-else class="intEnd"><span class="downOne">{{$t('yun.expiredays')}}</span><span class="downDot"><span></span></span><span class="downDate">{{pass.interest_date | addDate(pass.project_duration)}}</span></div>
			</div>
		</div>
		<div class="main">
			<ul class="list">
				<li><span>{{$t('yun.productType')}}：</span><span>{{pass.fund_type==1?$t('yun.regularfunds'):$t('yun.dueondemandF')}}</span></li>
				<li><span>{{$t('yun.fundscurrency')}}：</span><span>{{pass.fund_currency}}</span></li>
				<li>
					<span>{{$t('yun.investmentRule')}}：</span>
					<span v-if="pass.fund_currency=='BTC'">
						<p>1、{{$t('yun.TotalinvestmentMoney')}} {{pass.total_project_quota|cutZreo}} {{pass.fund_currency}}；</p>
						<p>2、{{$t('yun.MiminvestmentMoney')}} {{pass.minimum_investment_amount|cutZreo}} {{pass.fund_currency}}；</p>
					</span>
					<span v-else>
						<p>1、{{$t('yun.TotalinvestmentMoney')}}{{pass.total_project_quota|cutZreoFour}} {{pass.fund_currency}}；</p>
						<p>2、{{$t('yun.MiminvestmentMoney')}}{{pass.minimum_investment_amount|cutZreoFour}} {{pass.fund_currency}}；</p>
					</span>
				</li>
				<li><span>{{$t('funds.leftMount')}}：</span>
				<span v-if="pass.fund_currency=='BTC'" style="color:#0066ff">{{pass.surplus_amount|cutZreo}} {{pass.fund_currency}}</span>
				<span v-else style="color:#0066ff">{{pass.surplus_amount|cutZreoFour}} {{pass.fund_currency}}</span>
				</li>
				<li><span>{{$t('yun.bearingDate')}}：</span><span>{{pass.interest_date}}</span></li>
				<li><span>{{$t('yun.repaymenWay')}}：</span><span v-if="pass.repayment_method==1">{{$t('yun.Way1')}}</span><span v-if="pass.repayment_method==2">{{$t('yun.Way2')}}</span></li>
				<li v-if="pass.is_guaranteed"><span>{{$t('yun.MoneyUse')}}：</span><span>{{$t('yun.MineralConstruction')}}</span></li>
				<li v-if="pass.is_guaranteed"><span>{{$t('yun.Guarantors')}}：</span><span>{{pass.guarantee_institution|checklang}}</span></li>
				<li class="last" v-if="pass.is_mortgage"><span>{{$t('yun.guarantee')}}：</span>
					<div class="imgs">
						<!-- <span  > -->
						<img class="previewer-demo-img" v-for="(item, index) in list" :key="index" :src="item.src" @click="show(index)">
						<div v-transfer-dom>
						<previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
						</div>
						<!-- </span> -->
					</div>
				</li>
			</ul>
		</div>
		<div class="bottom">
			<div class="font">
				<h4>{{$t('yun.productbrief')}}</h4>
				<p>{{pass.description|checklang}}</p>
			</div>
			<p v-if="pass.fund_currency=='BTC'&&pass.surplus_amount>=1" class="button g_button" @click="jump">{{pass.minimum_investment_amount|cutZreo}} {{pass.fund_currency}}{{$t('yun.investment')}}</p>
			<p v-else-if='pass.surplus_amount>=1' class="button g_button" @click="jump">{{pass.minimum_investment_amount|cutZreoFour}} {{pass.fund_currency}}{{$t('yun.investment')}}</p>
			<p v-if="pass.surplus_amount==0" class="button g_button" style='background:#93A0AA'>{{$t('funds.sellouts')}}</p>
		</div>
	</div>
</template>

<script>
import '../../../../assets/css/common.css'
import { fundsDetail } from '@/api/data'
import { Previewer,TransferDom } from 'vux'
export default {
	directives: {
    TransferDom
  },
	components: {
    	Previewer
    },
  data(){
	  return{
		  id:'',
		  options: {
			getThumbBoundsFn (index) {
			let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
			let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
			let rect = thumbnail.getBoundingClientRect()
			return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
			}
      	},
		 list:[
			 {
				src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
			},
		 ],
		 lists:{},
		 pass:'',
		 selectDate: '',
		 exDate:'',
	  }
  },
  methods:{
	  logIndexChange (arg) {
		},
	  show (index) {
      	this.$refs.previewer.show(index)
      },
	  jump(){
		let pass = JSON.stringify(this.pass)
		this.$router.push({name:'fund-product-detail-buy',
		query:{
				fid:this.id,
				pass:pass
			}
		}
		)
	  },
	  getApi(){
		this.id = this.$route.query.id;
		let params={
			fund_product_id:this.id
		}
		fundsDetail(params).then(res=>{
			// console.log(res);
			this.pass = res.data.data
			setTimeout(() => {
                this.exDate = document.querySelectorAll('.downDate')[3].innerHTML
            }, 5);
		})
	  },
	// //当前时间+1天并格式化
	// getNextDay(d){
	// 	d = new Date(d);
	// 	d = + d + 1000*60*60*24;
	// 	d = new Date(d);
	// 	let month = d.getMonth()+1
	// 	let day = d.getDate();
	// 	month = (month>=10?month:'0'+month);
	// 	day = (day>=10?day:'0'+day);
	// 	//return d;
	// 	//格式化
	// 	return d.getFullYear()+"-"+month+"-"+day;
	// },
  },
  created() {
	this.getApi();
  },
}
</script>

<style lang="less" scoped>
	div{
		box-sizing: border-box;
	}
	.header{
		height: 2.7rem;
		color: #fff;
		.up{
		height: 2.7rem;
		background: url('../../../../assets/imgs/666.png') top center;
		padding: 0.71rem 1.43rem 0.8rem 0.9rem;
			.left,.right{
				p:first-child{
					font-size: 0.25rem;
					margin-bottom: 0.4rem;
				}
				.num{
					font-size: 0.6rem;
				}
				.nums{
					font-size: 0.29rem;
				}
			}
			.left{
				width: 2.8rem;
				border-right: 0.01rem solid #4DB1F9;
			}
			.right{
				width: 1.587rem;
				text-align: right;

			}
		}
		// .down{
		// 	height: 2.3rem;
		// 	background: #fff;
		// 	position: relative;
		// 	.title-top{
		// 		width: 6.5rem;
		// 		height: 0.24rem;
		// 		position: absolute;
		// 		left: 47%;
		// 		top:0.5rem;
		// 		margin-left: -2.97rem;
		// 		display: flex;
		// 		justify-content: space-between;
		// 		span{
		// 			color: #506271;
		// 			font-size: 0.25rem;
		// 			width: 20%;
		// 		}
		// 		.one{
		// 			position: relative;
		// 			color: #2188FB;
		// 			span:first-child{
		// 				position: absolute;
		// 				left: 0.3rem;
		// 				top: 0.56rem;
		// 				width: 0.14rem;
		// 				height: 0.14rem;
		// 				background-color: #2188FB;
		// 				border-radius: 50%;
		// 				z-index: 1;
		// 			}
		// 			span:nth-child(2){
		// 				width: 2.75rem;
		// 				height: 0.03rem;
		// 				background-color: #2188FB;
		// 				position: absolute;
		// 				left: 0.3rem;
		// 				top: 0.62rem;
		// 			}
		// 			span:last-child{
		// 				width: 2rem;
		// 				position: absolute;
		// 				left: -0.3rem;
		// 				top: 0.9rem;
		// 			}
		// 		}
		// 		.two{
		// 			position: relative;
		// 			color: #2188FB;
		// 			span:first-child{
		// 				position: absolute;
		// 				left: 0.3rem;
		// 				top: 0.56rem;
		// 				width: 0.14rem;
		// 				height: 0.14rem;
		// 				background-color: #2188FB;
		// 				border-radius: 50%;
		// 				z-index: 1;
		// 			}
		// 			span:nth-child(2){
		// 				width:2.8rem;
		// 				height: 0.03rem;
		// 				background-color: #EEEEEE;
		// 				position: absolute;
		// 				left: 0.3rem;
		// 				top: 0.62rem;
		// 			}
		// 			span:last-child{
		// 				position: absolute;
		// 				left: -0.35rem;
		// 				top: 0.9rem;
		// 				width: 2rem;
		// 			}
		// 		}
		// 		.three{
		// 			position: relative;
		// 			span:first-child{
		// 				position: absolute;
		// 				left: 0.5rem;
		// 				top: 0.56rem;
		// 				width: 0.14rem;
		// 				height: 0.14rem;
		// 				background-color: #EEEEEE;
		// 				border-radius: 50%;
		// 				z-index: 1;
		// 			}
		// 			span:last-child{
		// 				position: absolute;
		// 				left: -0.25rem;
		// 				top: 0.9rem;
		// 				width: 2rem;
		// 			}
		// 		}
		// 	}
		// 	.title-donw{
		// 		position: absolute;
		// 		font-size: 0.22rem;
		// 		color: #93A0AA;
		// 		left: 50%;
		// 		bottom: 2%;
    	// 		transform: translate(-50%,-50%);
		// 	}
		// }
			.down{
				height: 2.3rem;
				background: #fff;
				padding-top: 0.39rem;
				padding-left: 0.62rem;
				color: #506271;
				font-size: 0.25rem;
				position: relative;
				.actColor{
					color: #2188FB;
				}
			.buyStart,.buyEnd,.intStart,.intEnd{
				position: absolute;
				.downDot{
					width: 0.14rem;
					height: 0.14rem;
					background-color: #EEEEEE;
					border-radius: 50%;
					display: inline-block;
					position: absolute;
					top: 0.58rem;
					left: 0.32rem;
					span{
						position: absolute;
						width: 1.67rem;
						height: 0.03rem;
						display: inline-block;
						background-color: #EEEEEE;
						top: 0.05rem;
						left: -1.67rem;
					}
					.sActive{
						background: #2188FB;
					}
				}
				.active{
					background: #2188FB;
				}
				.downDate{
					position: absolute;
					top: 1.08rem;
					left: -0.28rem;
					width: 1.39rem;
				}
			}
			.buyEnd{
				left: 2.35rem;
				.downDot{
					left: 0.4rem;
				}
				.downDate{
					left: -0.18rem;
				}
			}
			.intStart{
				left: 4.16rem;
				.downDot{
					left: 0.4rem;
				}
				.downDate{
					left: -0.2rem;
				}
			}
			.intEnd{
				left: 6.05rem;
			}
		}
		.gone{
				text-align: center;
				line-height: 0.28rem;
				width: 0.62rem;
				height: 0.29rem;
				display:inline-block;
				font-size: 0.17rem;
				margin-left: 0.09rem;
				color: #000;
				vertical-align: top;
				background: url('../../../../assets/imgs/yellowploy.png') no-repeat;
				background-position:0px 0px;
				background-size: 0.62rem 0.29rem;
		}
	}
	.main{
		height: auto;
		background: #fff;
		margin-top: 2.53rem;
		// padding-top: 0.38rem;
		padding-left: 0.38rem;
		// padding-bottom: 0.33rem;
		.list{
			font-size: 0.28rem;
			color: #1F3E58;
			li{
				height: 0.97rem;
				line-height: 0.97rem;
				display: flex;
				// justify-content: space-between;
				border-bottom: 0.02rem solid #e9e9e9;
				span:last-child{
				// margin-right: 0.38rem;
				color: #92A0AA;
					p{
						line-height: 0.2rem;
						// text-align: right;
						font-size: 0.25rem;
						margin-top: 0.3rem;
					}
				}
			}
			li:nth-child(3){
				height: 1.24rem;
			}
			li:nth-child(8){
				span:last-child{
					color: #2188fb;
				}
			}
			.last{
				border-bottom: none;
				height: 1.46rem;
				justify-content: flex-start;
				.imgs{
					margin-left: 0.3rem;
					.previewer-demo-img{
							width: 0.83rem;
							height: 0.83rem;
							display: inline-block;
							margin-right: 0.21rem;
							margin-top: 0.3rem;
						}
				}
			}
		}
	}
	.bottom{
		height: 3.91rem;
		padding: 0.51rem 0.35rem 0.49rem 0.42rem;
		.font{
			h4{
				color: #506271;
			}
			p{
				color: #93A0AA;
				font-size: 0.24rem;
				line-height: 0.35rem;
				margin-top: 0.3rem;
				height: 1.5rem;
			}
		}
		.g_button{
			position: relative;
			top: 0.3rem;
		}
	}
</style>
<style scoped>
/* .weui-wepay-flow__li_done /deep/ .weui-wepay-flow__state{
	     background-color: #2188FB;
}
.weui-wepay-flow__line_done /deep/ .weui-wepay-flow__process {
	background-color: #2188FB !important;
}
.weui-wepay-flow /deep/ .weui-wepay-flow__title-bottom{
	color: #93A0AA;
	font-size: 0.22rem !important;
}
.weui-wepay-flow__li /deep/ .weui-wepay-flow__title-bottom{
	top: 0.5rem;
} */
</style>