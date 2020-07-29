<template>
    <div>
		<Header :title="$t('yun.toEarly')"></Header>
        <div class="main">
			<ul class="list">
				<li><span>{{$t('yun.miningName')}}</span><span>{{resData.name |checklang}}</span></li>
				<li><span>{{$t('yun.PrInvestmentAmount1')}}</span><span>{{resData.product_investment_amount | cutZreoFour}} {{resData.fund_currency}}</span></li>
				<!-- <li><span>赎回收益</span><span>{{resData.fund_currency | cutZreoFour}}</span></li> -->
                <li><span>{{$t('yun.PrRedemptionCharge')}}</span><span>{{(resData.pre_redemption_charges-0).toFixed(2)}} %</span></li>
				<li><span>{{$t('yun.PrInvestmentAmount2')}}</span><span>{{(resData.product_investment_amount*resData.pre_redemption_charges*0.01) | cutZreoFour}} {{resData.fund_currency}}</span></li>
			</ul>
		</div>
        <div class="middle">
            <p>{{$t('yun.PrInvestmentAmount3')}}</p>
            <p>{{(resData.product_investment_amount-(resData.product_investment_amount*resData.pre_redemption_charges*0.01)) | cutZreoFour}}{{resData.fund_currency}}</p>
        </div>
        <div class="bottom">
			<div class="font">
				<h4>{{$t('public.TIPS')}}：</h4>
				<p>• {{$t('public.TIPS01')}}</p>
                <p>• {{$t('public.TIPS02')}}</p>
			</div>
			<p class="button g_button" @click="confirm">{{$t('public.importconfirm')}}</p>
		</div>
		<PayPassword v-model="model" :ga.sync="gaNum" @goPay="log" :pwd.sync="payNum"></PayPassword>
    </div>
</template>

<script>
import { redemptions,checkDetail } from '@/api/data'
export default {
	data(){
		return{
			resData:'',
			model:false,
			payNum:'',
			gaNum:'',
		}
	},
	methods: {
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
			   	order_id :this.resData.id,
			   payPassword:this.$md5(this.payNum),
			   gaKey:this.gaNum,
		   }
		   //确认提交赎回申请
           redemptions(data).then(res=>{
				switch (res.data.errcode) {
					case 0:
						this.$vux.toast.show({
							text: this.$t('public.redeem'),
							type: 'success',
							width: '4rem'
						})
						this.$router.go(-1)
						break;
					case 1:
						this.payNum="";
						this.gaNum="";
						this.model = false;
						this.$vux.toast.text(this.$t('public.importErr'));
						break;
					default:
						break;
				}
			})
	   },
		confirm(){
			this.model = true;
		}
	},
	created() {
	  this.resData = JSON.parse(this.$route.query.pass);
	},
}
</script>

<style lang="less" scoped>
    div{
        box-sizing: border-box;
    }
     .main{
		height: auto;
		background: #fff;
		margin-top: 0.2rem;
		// padding-top: 0.38rem;
		padding-left: 0.38rem;
		.list{
			li{
				height: 0.97rem;
				line-height: 0.97rem;
				display: flex;
				justify-content: space-between;
                border-bottom: 0.02rem solid #e9e9e9;
                span:first-child{
                    font-size: 0.25rem;
                    color: #506271;
                 }
				span:last-child{
                    font-size: 0.25rem;
                    color: #1F3E58;
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
    .middle{
        height: 2.05rem;
        background-color: #fff;
        margin-top: 0.23rem;
        padding: 0.56rem 2.45rem 0.57rem 2.45rem;
        text-align: center;
        p:first-child{
            font-size: 0.2rem;
            color: #506271;
            margin-bottom: 0.36rem;
        }
        p:last-child{
            font-size: 0.42rem;
            color: #F54531;
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
				line-height: -0rem;
				margin-top: 0.5rem;
			}
		}
		.g_button{
			position: absolute;
			left: 50%;
			width: 6.67rem;
			margin-left: -3.335rem;
			margin-top: 1rem;
		}
	}
</style>
