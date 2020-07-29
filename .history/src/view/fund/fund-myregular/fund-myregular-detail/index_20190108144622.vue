<template>
  <div >
      <Header :title="resData.name"></Header>
    <div class="header">
      <div class="up">
        <p @click="jumpyesterday">昨日收益
          <span></span>
        </p>
        <p>{{resData.amount_of_income?resData.amount_of_income:'0.0000'}}
          <span>{{resData.profit_currency}}</span>
        </p>
      </div>
      <div class="down">
          <ul class="list">
              <li>
                 <div>
                  <p v-if="resData.profit_currency=='BTC'">{{resData.investment_accumulated_income|cutZreo}} {{resData.profit_currency}}</p>
                  <p v-else>{{resData.investment_accumulated_income|cutZreoFour}} {{resData.profit_currency}}</p>
                  <p>累计收益</p>
                 </div>
              </li>
              <li>
                 <div>
                  <p>{{(resData.annualized_return-0).toFixed(2)}} %</p>
                  <p>预期年化收益</p>
                 </div>
              </li>
              <li>
                 <div>
                  <p>{{type}}</p>
                  <p>当前状态</p>
                 </div>
              </li>
          </ul>
      </div>
    </div>
    <div class="down-b">
		<div class="flow">
					<div class="title-top">
						<span class="one">申购日<span></span><span></span><span>{{resData.date_of_commencement_of_purchase}}</span></span>
						<span class="two">开始计息<span></span><span></span><span>{{resData.interest_date}}</span></span>
						<span class="three">到期日<span></span><span>{{resData.closing_of_purchase_date}}</span></span>
					</div>
		</div>
	</div>
    <div class="main">
			<ul class="list">
				<li><span>投资金额</span><span v-if="resData.profit_currency=='BTC'">{{resData.product_investment_amount|cutZreo}} {{resData.profit_currency}}</span><span v-else>{{resData.product_investment_amount|cutZreoFour}} {{resData.profit_currency}}</span></li>
				<li><span>项目期限</span><span>30日</span></li>
				<li><span>还款方式</span><span>{{resData.repayment_method}}</span></li>
			</ul>
		</div>
        <div class="button" @click="toEarly">
            申请提前赎回
        </div>
        <Alert :value="show" title='重要提示' txt="提前赎回理财产品会产生额外的手续费用，请谨慎操作！" cancel_text="取消" @on-cancel="show=false" @on-confirm="toJump"></Alert>
  </div>

</template>

<script>
import '../../../../assets/css/common.css'
export default {
    data(){
        return{
            resData:'',
            type:'',
            jump:false,
            show:false
        }
    },
  methods:{
      toEarly(){
          if(this.jump){
              this.show = true;
          }else{
              this.$vux.toast.text('当前状态为订单'+this.type+'暂无法赎回!');
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
      this.resData = JSON.parse(this.$route.query.pass);
      console.log(this.resData);
      switch (this.resData.redemption) {
          case 0:
             this.type="待确认"
             this.jump=true;
          break;
          case 4:
              this.type="待支付"
              break;
          case 1:
              this.type="审核中"
              break;
          case 2:
              this.type="未通过"
              this.jump=true;
              break;
          case 5:
              this.type="支付失败"
              break;
          case 8:
              this.type="计息中"
              this.jump=true;
              break;
          default:
              this.type="已完成"
              break;
            //   0、4、5待确认 1审核中 2不通过 3、6、7已完成  8、计息中
            // 0、2、8都可以赎回
      }
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
    width:3.06rem;
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
            position: relative;
			.title-top{
				width: 6.5rem;
				height: 0.24rem;
				position: absolute;
				left: 47%;
				top:0.3rem;
				margin-left: -2.97rem;
				display: flex;
				justify-content: space-between;
				span{
					color: #506271;
                    font-size: 0.25rem;
                    width: 20%;
				}
				.one{
					position: relative;
					color: #2188FB;
					span:first-child{
						position: absolute;
						left: 0.3rem;
						top: 0.56rem;
						width: 0.14rem;
						height: 0.14rem;
						background-color: #2188FB;
						border-radius: 50%;
						// z-index: 1;
					}
					span:nth-child(2){
						width: 2.75rem;
						height: 0.03rem;
						background-color: #2188FB;
						position: absolute;
						left: 0.3rem;
						top: 0.62rem;
					}
					span:last-child{
						width: 1.5rem;
                        position: absolute;
                        left: -0.2rem;
                        top: 0.9rem;
					}
				}
				.two{
					position: relative;
					color: #2188FB;
					span:first-child{
						position: absolute;
						left: 0.3rem;
						top: 0.56rem;
						width: 0.14rem;
						height: 0.14rem;
						background-color: #2188FB;
						border-radius: 50%;
						// z-index: 1;
					}
					span:nth-child(2){
						width:2.7rem;
						height: 0.03rem;
						background-color: #EEEEEE;
						position: absolute;
						left: 0.45rem;
						top: 0.62rem;
					}
					span:last-child{
						position: absolute;
						left: -0.35rem;
						top: 0.9rem;
						width: 2rem;
					}
				}
				.three{
					position: relative;
					span:first-child{
						position: absolute;
						left: 0.5rem;
						top: 0.56rem;
						width: 0.14rem;
						height: 0.14rem;
						background-color: #EEEEEE;
						border-radius: 50%;
						// z-index: 1;
					}
					span:last-child{
						position: absolute;
						left: -0.25rem;
						top: 0.9rem;
						width: 2rem;
					}
				}
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