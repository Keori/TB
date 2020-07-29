<template>
  <div >
      <Header :title="resData.name |checklang"></Header>
    <div class="header">
      <div class="up">
        <p @click="jumpyesterday">{{$t('funds.YesEar')}}
          <span></span>
        </p>
        <!-- <p>{{resData.amount_of_income?resData.amount_of_income:'0.0000'}}<span>{{resData.profit_currency}}</span></p> -->
        <p v-if="resData.profit_currency=='BTC'">{{resData.amount_of_income|cutZreo}}<span>{{resData.profit_currency}}</span></p>
        <p v-else>{{resData.amount_of_income|cutZreoFour}}<span>{{resData.profit_currency}}</span></p>
      </div>
      <div class="down">
          <ul class="list">
              <li>
                 <div>
                  <p v-if="resData.profit_currency=='BTC'">{{resData.investment_accumulated_income|cutZreo}} {{resData.profit_currency}}</p>
                  <p v-else>{{resData.investment_accumulated_income|cutZreoFour}} {{resData.profit_currency}}</p>
                  <p>{{$t('funds.AddEar')}}</p>
                 </div>
              </li>
              <li>
                 <div>
                  <p>{{(resData.annualized_return-0).toFixed(2)}} %</p>
                  <p>{{$t('funds.expectEar')}}</p>
                 </div>
              </li>
              <li>
                 <div>
                  <p>{{type}}</p>
                  <p>{{$t('yun.NowState')}}</p>
                 </div>
              </li>
          </ul>
      </div>
    </div>
    <div class="down-b">
		<div v-if="resData.date_of_commencement_of_purchase<=new Date().YMD(0)" class="buyStart"><span class="downOne actColor">{{$t('yun.Explainbuy')}}</span><span class="downDot active"></span><span class="downDate">{{resData.date_of_commencement_of_purchase}}</span></div>
		<div v-else class="buyStart"><span class="downOne">{{$t('yun.Explainbuy')}}</span><span class="downDot"></span><span class="downDate">{{resData.date_of_commencement_of_purchase}}</span></div>

        <div v-if="resData.closing_of_purchase_date<=new Date().YMD(0)" class="buyEnd"><span class="downOne actColor">{{$t('yun.Explained')}}</span><span class="downDot active"><span class="sActive"></span></span><span class="downDate">{{resData.closing_of_purchase_date}}</span></div>
		<div v-else class="buyEnd"><span class="downOne">{{$t('yun.Explained')}}</span><span class="downDot"><span></span></span><span class="downDate">{{resData.closing_of_purchase_date}}</span></div>

        <div v-if="resData.interest_date<=new Date().YMD(0)" class="intStart"><span class="downOne actColor">{{$t('yun.beginbearing')}}</span><span class="downDot active"><span class="sActive"></span></span><span class="downDate">{{resData.interest_date}}</span></div>
		<div v-else class="intStart"><span class="downOne">{{$t('yun.beginbearing')}}</span><span class="downDot"><span></span></span><span class="downDate">{{resData.interest_date}}</span></div>

        <div v-if="this.exDate<=new Date().YMD(0)" class="intEnd"><span class="downOne actColor">{{$t('yun.expiredays')}}</span><span class="downDot active"><span class="sActive"></span></span><span class="downDate">{{resData.interest_date | addDate(resData.project_duration)}}</span></div>
		<div v-else class="intEnd"><span class="downOne">{{$t('yun.expiredays')}}</span><span class="downDot"><span></span></span><span class="downDate">{{resData.interest_date | addDate(resData.project_duration)}}</span></div>
	</div>
    <div class="main">
			<ul class="list">
				<li>
                    <span>{{$t('yun.investmentMoney')}}</span>
                    <span v-if="resData.fund_currency=='BTC'">{{resData.product_investment_amount|cutZreo}} {{resData.fund_currency}}</span>
                    <span v-else>{{resData.product_investment_amount|cutZreoFour}} {{resData.fund_currency}}</span>
                </li>
				<li><span>{{$t('yun.productlimit')}}</span><span>{{resData.project_duration}}{{$t('yun.days')}}</span></li>
				<li><span>{{$t('yun.repaymenWay')}}</span><span>{{resData.repayment_method}}</span></li>
			</ul>
		</div>
        <div class="button" @click="toEarly">
            {{$t('yun.toEarly')}}
        </div>
        <Alert :value="show" :title="$t('public.inportNote')" :txt="$t('public.Note')" :cancel_text="$t('public.close')" :ok_text="$t('public.confirm')" @on-cancel="show=false" @on-confirm="toJump"></Alert>
  </div>

</template>

<script>
import '../../../../assets/css/common.css'
import {userOrderDetail} from '@/api/data'
export default {
    data(){
        return{
            resData:'',
            type:'',
            jump:false,
            show:false,
            exDate: '',
            id:''
        }
    },
  methods:{
      toEarly(){
          if(this.jump){
              this.show = true;
          }else{
              this.$vux.toast.text(this.$t('public.NowState')+this.type+this.$t('public.NowState1'));
          }
      },
      toJump(){
        let pass = JSON.stringify(this.resData)
        this.$router.push({name:'fund-myregular-detail-early',
        query:{
            pass:pass
        }
        })
      },
      jumpyesterday(){
          this.$router.push({name:'fund-myregular-datail-yesterday',query:{id:this.resData.id}})
      },
  },
  created() {
      this.id = this.$route.query.id;
      let params={
          order_id:this.id
      }
      userOrderDetail(params).then(res=>{
        //   console.log(res);
          this.resData = res.data.data.data[0]
          if(this.resData.can_redemption!='false'){
              this.jump = true
          }
            setTimeout(() => {
                this.exDate = document.querySelectorAll('.downDate')[3].innerHTML
            }, 5);

            
            switch (this.resData.current_status) {
                case 1:
                    this.type='待确认'
                break;
                case 2:
                    this.type='计息中'
                    break;
                case 3:
                    this.type='已完结'
                    break;
                case 4:
                    this.type='待审核'
                    break;
                //  current_status:1、待确认2、计息中3、已完结4、待审核
                // can_redemption:true代表能赎回，false是不能赎回
        }
        // this.jump=true; //为true时可赎回
      })
  },
}
</script>

<style lang="less" scoped>
div,li{
  box-sizing: border-box;
}
.header {
  height: 3.71rem;
  background: url("../../../../assets/imgs/666.png") left center;
  .up {
    height: 2.7rem;
    text-align: center;
    // width:3.06rem;
    margin:0 auto;
    padding-top: 0.68rem;
    p:first-child{
        font-size: 0.25rem;
        span{
            background: url('../../../../assets/imgs/sanjiao.png') no-repeat;
            width: 0.16rem;
            height: 0.18rem;
            display: inline-block;
            background-size: 0.16rem 0.18rem;
            vertical-align: initial;
            margin-left: 0.14rem;
        }
    }
    p:last-child{
        margin-top: 0.5rem;
        font-size: 0.51rem;
        span{
            font-size: 0.29rem;
        }
    }
  }
  .down{
    height: 1.03rem;
    background: rgba(0, 0, 0, .06);
    .list{
        li{
            float: left;
            width: 2.2rem;
            padding-top: 0.26rem;
            padding-left: 0.2rem;
            padding-bottom: 0.22rem;
            text-align: center;
            div{
                border-right: 0.02rem solid #3899ed;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-right: 0.3rem;
                p:first-child{
                    color: #fff;
                    font-size: 0.25rem;
                }
                p:last-child{
                    color: #4DB1F9;
                    font-size: 0.21rem;
                    // margin-left: 0.42rem;
                    margin-top: 0.14rem;
                }
            }
        }
        li:first-child{
            width: 3rem;
        }
        li:last-child{
            div{
               border:none;
            }
        }
    }
  }
}
 .down-b{
            height: 1.85rem;
            background: #fff;
            color: #506271;
            padding-top: 0.28rem;
			padding-left: 0.62rem;
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
        .main{
		height: 2.93rem;
		background: #fff;
		margin-top: 0.2rem;
		// padding-top: 0.38rem;
		padding-left: 0.38rem;
		padding-bottom: 0.33rem;
		.list{
			font-size: 0.28rem;
			color: #1F3E58;
			li{
				height: 0.97rem;
				line-height: 0.97rem;
				display: flex;
				justify-content: space-between;
				border-bottom: 0.02rem solid #e9e9e9;
				span:last-child{
				margin-right: 0.38rem;
					p{
						line-height: 0.2rem;
						text-align: right;
						font-size: 0.25rem;
						margin-top: 0.3rem;
					}
				}
            }
            li:last-child{
                border-bottom: none;
            }
		}
    }
    .button{
        background: none;
        border: 0.02rem solid #2188FB;
        color: #2188FB;
        font-size: 0.31rem;
        position: absolute;
        width: 6.67rem;
        height: 0.84rem;
        line-height: 0.84rem;
        text-align: center;
        left: 50%;
        border-radius: 0.1rem;
        bottom: 2%;
        margin-left: -3.335rem;
    }
</style>