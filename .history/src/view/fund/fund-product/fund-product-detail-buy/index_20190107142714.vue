<template>
	<div>
		<Header :title=resData.name></Header>
		<div class="header">
			<div class="up">
				<div class="left">
                    <!-- <span class="gone">定期</span>  角标暂定无-->
					<p class="yesterday">预期年化收益</p>
					<p><span class="num">{{resData.annualized_return?(resData.annualized_return-0).toFixed(1):'0.0'}}%</span></p>
				</div>
				<div class="right">
					<p style="text-align:center" class="yesterday">项目期限</p>
					<p style="text-align:center"><span class="num">{{resData.project_duration}}</span><span class="nums">日</span></p>
				</div>
			</div>
			<div class="down">
                <div class="left">
                    <p>钱包账户可用</p>
                    <p v-if="resData.fund_currency=='BTC'">{{(coins.available_amount-0).toFixed(8)}} {{resData.fund_currency}}</p>
					<p v-else>{{(coins.available_amount-0).toFixed(4)}} {{resData.fund_currency}}</p>
                </div>
                <div class="right" @click="payUp">充值</div>
			</div>
		</div> 
		<div class="main">
            <p>输入金额</p>
            <p>
                <input v-if="resData.fund_currency=='BTC'" type="text" v-model="money" :placeholder="'最小起投金额 '+(resData.minimum_investment_amount-0).toFixed(8)+' '+resData.fund_currency">
				<input v-else type="text" v-model="money" :placeholder="'最小起投金额 '+(resData.minimum_investment_amount-0).toFixed(4)+' '+resData.fund_currency">
                <span>{{resData.fund_currency}}</span>
            </p>
		</div>
		<div class="bottom">
			<div class="font">
				<h4>产品简介</h4>
				<p>{{resData.description}}</p>
			</div>
			<div class='otherLeft' @click='checkOhterCube'>
				<p>
					<span class='otherCube' :class='{otherCubes:otherCubecheck}'><i class='iconfont icon-apr-duihao'></i></span>
					<span>我已阅读并同意</span>
					<span>《T-Bond投资理财风险声明》</span>
				</p>
			</div>
			<p class="button g_button" @click="buyNow">立即投资</p>
		</div>
		<PayPassword v-model="model" :ga.sync="gaNum" @goPay="log" :pwd.sync="payNum"></PayPassword>
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
		otherCubecheck: false
	  }
  },
  methods:{
	  buyNow(){
		     if(!this.money){
			   alert('投资金额不能为空')
			   return false;
		   }
		  this.model=true;
		//   this.$router.push({name:'fund-myregular'})
	  }, 
	  log(){
           if(!this.gaNum||!this.payNum){
               alert('支付密码和Google验证码不能为空!')
               return false;
           }   
           let data = {
			   'fid':this.resData.fid,
			   'product_investment_amount':this.money,
			   'payPassword':this.$md5(this.payNum),
			   'gaKey':this.gaNum
           }
           buyFunds(data).then(res=>{
			   console.log(res);
			   switch (res.data.errcode) {
				   case 0:
					   this.$router.replace({name:'fund-myregulars'})
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
			console.log(this.resData);
			
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
	.otherLeft{
		position: absolute;
		top: 2.1rem;
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
			font-size: 0.22rem;
		}
		span:nth-of-type(2){
			color: #000000
		}
		span:last-child{
			color: #03C2FC
		}
	}
	.bottom{
		position: relative;
		height: 5rem;
		padding: 0.6rem 0.35rem 0.49rem 0.42rem;
		.font{
			h4{
				color: #506271;
			}
			p{
				color: #93A0AA;
				font-size: 0.24rem;
				line-height: -0rem;
				margin-top: 0.5rem;
			}
		}
		.g_button{
			position: relative;
			bottom: -1.2rem;
		}
	}
</style>
