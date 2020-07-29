<template>
	<div>
		<Header :title=resData.name|checklang></Header>
		<div class="header">
			<div class="up">
				<div class="left">
                    <!-- <span class="gone">定期</span>  角标暂定无-->
					<p class="yesterday">{{$t('funds.expectEar')}}</p>
					<p><span class="num">{{resData.annualized_return?(resData.annualized_return-0).toFixed(2):'0.0'}}%</span></p>
				</div>
				<div class="right">
					<p style="text-align:center" class="yesterday">{{$t('yun.productlimit')}}</p>
					<p style="text-align:center"><span class="num">{{resData.project_duration}}</span><span class="nums">{{$t('yun.days')}}</span></p>
				</div>
			</div>
			<div class="down">
                <div class="left">
                    <p>{{$t('yun.walletAccount')}}</p>
                    <p v-if="resData.fund_currency=='BTC'">{{(coins.available_amount-0).toFixed(8)}} {{resData.fund_currency}}</p>
					<p v-else>{{(coins.available_amount-0).toFixed(4)}} {{resData.fund_currency}}</p>
                </div>
                <div class="right" @click="payUp">{{$t('index.recharge')}}</div>
			</div>
		</div>
		<div class="main">
            <p>{{$t('yun.importmoney')}}</p>
            <p>
                <input v-if="resData.fund_currency=='BTC'" type="text" v-model="money" :placeholder="$t('yun.MiminvestmentMoney')+(resData.minimum_investment_amount-0).toFixed(8)+' '+resData.fund_currency" @input='onlyNum'>
				<input v-else type="text" v-model="money" :placeholder="$t('yun.MiminvestmentMoney')+(resData.minimum_investment_amount-0).toFixed(4)+' '+resData.fund_currency" @input='onlyNum'>
                <span>{{resData.fund_currency}}</span>
            </p>
		</div>
		<div class="bottom">
			<div class="font">
				<h4>{{$t('yun.productbrief')}}</h4>
				<p>{{resData.description|checklang}}</p>
			</div>
			<div class='prevleft'>
				<div class='otherLeft'>
					<p>
						<span @click='checkOhterCube' class='otherCube' :class='{otherCubes:otherCubecheck}'><i v-show='icon' class='iconfont icon-apr-duihao'></i></span>
						<span>{{$t('yun.alreadyAgree')}}</span>
						<span class='alert' @click='opens'>{{$t('yun.RiskStatement')}}</span>
					</p>
				</div>
			</div>
			<Button class="button g_button" @click="buyNow" :disabled='!money||!ErrorMoney||!otherCubecheck' :class='disabled="money"'>{{$t('yun.investmentRnow')}}</Button>
		</div>
		<PayPassword v-model="model" :ga.sync="gaNum" @goPay="log" :pwd.sync="payNum"></PayPassword>
		<Alert :value="tips" :txt="$t('public.NOYU')" :cancel_text="$t('public.shut')" :ok_text="$t('public.wechatPay')" @on-confirm="goWeChat"></Alert>
	</div>
</template>



<script>
import { Flow, FlowState, FlowLine } from 'vux'
import '../../../../assets/css/common.css'
import { buyFunds,fundsDetail } from '@/api/data'
export default {
  components: {
    Flow,
    FlowState,
    FlowLine
  },
  data(){
	  return{
		model:false,
		payNum:'',
		gaNum:'',
		money:'',
		accounts:[],
		resData:'',
		coins:{},
		otherCubecheck: false,
		icon: false,
		ErrorMoney: true,
		tips: false,
	  }
  },
  watch:{
	  money(){
		  if(this.money < (this.resData.minimum_investment_amount-0)|| this.money >= (this.resData.single_purchase_limit-0)+0.00000001){
				this.ErrorMoney = false
		  }else{
			  this.ErrorMoney = true
		  }
	  },
  },
  methods:{
	//   onchange(){
	// 	if(!this.money){
	// 		this.$vux.toast.show(
	// 			{
	// 				text:'投资金额不能为空',
	// 				type:'cancel',
	// 				width: '3rem'
	// 			}
	// 		)
	// 		return false;
	// 	}
	// 	if(this.money <= this.resData.minimum_investment_amount-0.0001){
	// 		this.$vux.toast.show({
	// 			text: '输入金额不能小于最小起投金额',
	// 			type: 'cancel',
	// 			width: '5rem'
	// 			}
	// 		)
	// 		return false;
	// 	}
	// 	event.preventDefault()
	//   },
	  onlyNum(e){
		if(this.resData.fund_currency=='BTC'){
			this.money = e.target.value.replace(/^\D*([1-9]\d*\.?\d{0,8})?.*$/,'$1')
		}else if(this.resData.fund_currency=='USDT'||this.resData.fund_currency=='ZIP'||this.resData.fund_currency=='KKK'){
			this.money = e.target.value.replace(/^\D*([1-9]\d*\.?\d{0,4})?.*$/,'$1')
		}
	  },
	  buyNow(){
		// if(!this.money){
		// this.$vux.toast.show(
		// 	{
		// 		text:'投资金额不能为空',
		// 		type:'cancel',
		// 		width: '3rem'
		// 	}
		// )
		// return false;
		// }
		//如果购买金额大于余额则提示
		let Maxmoney = this.coins.available_amount
		let Minmoney = this.resData.minimum_investment_amount
		if(Minmoney-0.00000001>Maxmoney){
			this.tips = true;
			return false
		}
		if(!this.otherCubecheck){
			this.$vux.toast.show(
				{
					text: this.$t('public.Statement1'),
					type:'cancel',
					width: '6.5rem'
				}
			)
			return false;
		}
		this.model=true;
		//   this.$router.push({name:'fund-myregular'})
	  },
	  goWeChat(){
           this.$router.push({name:'PaymentCode'})
       },
	  log(){
          if(!this.gaNum&&!this.payNum){
               this.$vux.toast.show({
                   text: this.$t('public.payGanosame'),
                   type: 'cancel',
                   width: '5.5rem'
               })
               return false;
           }else if(!this.payNum){
               this.$vux.toast.show({
                   text: this.$t('public.paypwdnospace'),
                   type: 'cancel',
                   width: '3.2rem'
               })
               return false;
           }else if(!this.gaNum){
               this.$vux.toast.show({
                   text: this.$t('public.GoogleNoempty'),
                   type: 'cancel',
                   width: '4rem'
               })
               return false;
           }
           let data = {
			   'fund_product_id':this.resData.id,
			   'product_investment_amount':this.money,
			   'payPassword':this.$md5(this.payNum),
			   'gaKey':this.gaNum
           }
           buyFunds(data).then(res=>{
			   switch (res.data.errcode) {
				   case 0:
					   this.$router.replace({name:'fund-myregulars'})
					   break;
					case 26031:
					    this.$vux.toast.show(
							{
								text: this.$t('public.PurchaseAtNoLG'),
								type:'cancel',
								width: '4rem'
							}
						)
					   this.model=false;
					   break;
					case 26030:
					    this.$vux.toast.show(
							{
								text: this.$t('public.productNotoff'),
								type:'cancel',
								width: '4.5rem'
							}
						)
						this.model=false;
					   break;
				   default:
					   break;
			   }
           })
	   },
	   payUp(){
		   switch (this.resData.fund_currency) {
			    case 'BTC':
				   this.$router.push({name:'BTC'});
				   break;
				case 'HKP':
				   this.$router.push({name:'HKP',query:{buy:true}});
				   break;
				case 'ZIP':
				   break;
				case 'USDT':
				   break;
			   default:
				   break;
		   }
	   },
	    getApi(){
		   this.resData = JSON.parse(this.$route.query.pass);
		//理财产品详情
			this.accounts = this.$store.state.accounts;
		    this.accounts.forEach((val,index,arr)=>{
			//  判断当前循环的这个下标对象的值是否有匹配 如果有则提取
			   if(val.currency_name == this.resData.fund_currency){
				   this.coins = val
			   }
		   })
	   },
	   checkOhterCube(){
		   this.otherCubecheck = !this.otherCubecheck
		   this.icon = !this.icon
	   },
	   opens(){
		   this.statement = true
		   this.$router.push({name: 'fund-product-detail-buy-agreement'})
	   }
  },
  created() {
	  //由于query是在浏览器地址上面传值 所以一般只传ID等简短的数据
	//   这里接收到FID再调用响应接口即可
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
		.down{
			height: 1.42rem;
			background: #fff;
            display: flex;
            justify-content: space-between;
            .left{
                margin-top: 0.29rem;
                p:first-child{
                    color: #506271;
                    font-size: 0.28rem;
                    margin-bottom: 0.29rem;
                    margin-left: 0.3rem;
                }
                p:last-child{
                    color: #1F3E58;
                    font-size: 0.29rem;
                    margin-left: 0.34rem;
                }
            }
            .right{
                margin-top: 0.62rem;
                margin-right: 0.48rem;
                color: #2188FB;
                font-size: 0.29rem;
            }
		}
		// .gone{
		// 		text-align: center;
		// 		line-height: 0.28rem;
		// 		width: 0.62rem;
		// 		height: 0.29rem;
		// 		display:inline-block;
		// 		font-size: 0.17rem;
		// 		margin-left: 0.09rem;
		// 		color: #000;
		// 		vertical-align: top;
		// 		background: url('../../../../assets/imgs/yellowploy.png') no-repeat;
		// 		background-position:0px 0px;
		// 		background-size: 0.62rem 0.29rem;
		// }
	}
	.main{
		height: 2.07rem;
		background: #fff;
        margin-top: 1.7rem;
        padding: 0.3rem 0.37rem 0.33rem 0.3rem;
        p:first-child{
            color: #506271;
            font-size: 0.28rem;
        }
        p:last-child{
            position: relative;
            input{
                width: 6.76rem;
                height: 0.99rem;
                background-color: #EEEEEE;
                border-radius: 0.2rem;
                margin-top: 0.19rem;
                font-size: 0.5rem;
                color: #1F3E58;
				padding-left: 0.27rem;
				font-size: 0.28rem;
            }
            span{
                color: #506271;
                font-size: 0.29rem;
                position: absolute;
                top: 0.56rem;
                right: 0.26rem;
            }
        }
	}
	.prevleft{
		position: fixed;
		width: 100%;
		height: 1rem;
		.otherLeft{
		position: absolute;
		bottom: 0;
		.otherCube{
			width: 0.26rem;
			height: 0.26rem;
			line-height: 0.26rem;
			border: 0.01rem solid #CAC7CB;
			display: inline-flex;
			margin-right: 0.05rem;
			text-align: center;
		}
		.otherCubes{
			border: 0.01rem solid #F54531;
			background: #F54531;
		}
		span{
			height: 0.26rem;
			font-size: 0.22rem;
		}
		span:nth-of-type(2){
			color: #000000
		}
		span:last-child{
			color: #03C2FC
		}
	}
	}
	.bottom{
		position: relative;
		height: 5rem;
		padding: 0.51rem 0.35rem 0.49rem 0.42rem;
		.font{
			h4{
				color: #506271;
			}
			p{
				color: #93A0AA;
				font-size: 0.24rem;
				line-height: 0.35rem;
				margin-top: 0.5rem;
				height: 1.5rem;
			}
		}
		.g_button{
			position: relative;
			bottom: -1.2rem;
		}
	}
	.otherPage{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		bottom: 0;
		margin: auto;
		.header{
			width: 100%;
			height: 0.95rem;
			background: #FFFFFF;
			border-bottom: 1px #ededed solid;
			span{
				display: block;
			}
			span:first-child{
				position: absolute;
				width: 0.5rem;
				height: 0.5rem;
				left: 0.3rem;
				top: 0.2rem;
				img{
					width: 100%;
					height: 100%;
				}
			}
			span:last-child{
				width: 100%;
				height: 0.95rem;
				text-align: center;
				line-height: 0.95rem;
				color: #000000;
			}
		}
	}
</style>
