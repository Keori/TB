<template>
    <div class='clientH'>
		<Header :title="$t('public.CloudCalculateForce')"></Header>
		<i class="iconfont icon-apr-tianjiayonghu" @click="jumpyuninvite"></i>
			<div class="header" @click="jumpIncomes">
				<div class="left">
					<p>{{$t('funds.YesEar')}}（BTC）</p>
					<p>{{topPrice.margin_price | cutZreo}}</p>
				</div>
				<div class="right">
					<p>{{$t('funds.AddEar')}}（BTC）</p>
					<p>{{coin|cutZreo}}</p>
				</div>
				<i class="iconfont icon-apr-arrow-right"></i>
			</div>
        	<div class="main">
            <h4 class="main-title">{{$t('my.buyCalculateForce')}}<span @click="yunCalc">{{$t('yun.EarnComputed')}}></span></h4>
			<div class="roll">
				 <Vscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :noData="noData">
					<div class="content" v-for='(item,index) in content' :key="index">
						<p v-if="item.stock!==0" class="cont_title text-overflow">{{item.mining_name |checklang}}</p>
						<p v-else class="cont_title text-overflow acolor">{{item.mining_name |checklang}}</p>
							<div class="cont_detail">
								<p v-if="item.hashrate_type=='BTC'">{{$t('funds.Yieldrollout')}}  {{item.expect_income |cutZreo}}  {{item.hashrate_type}} / T</p>
								<p v-else>{{$t('funds.Yieldrollout')}}  {{item.expect_income |cutZreoFour}}  {{item.hashrate_type}} / T</p>
								<p>{{$t('funds.surplus')}} {{item.stock}}.00 T</p>
							</div>
							<p v-if="item.stock!=0&&item.currency=='BTC'" class="price">{{item.price | cutZreo}} <span>{{item.currency}} / T</span>
							<span v-if="item.stock!=0" class="buy_button" @click="jumpbuy(item.id)">{{$t('funds.buyRnow')}}</span>
							<p v-else-if="item.stock!=0" class="price">{{item.price | cutZreoFour}} <span>{{item.currency}} / T</span>
							<span v-if="item.stock!=0" class="buy_button" @click="jumpbuy(item.id)">{{$t('funds.buyRnow')}}</span>
							<p v-if="item.stock==0"  class="price"><span class='acolor'>一 一 一 一 一 一</span><span></span>
							<span v-if="item.stock==0" class="buy_button" style="background:#93A0AA">{{$t('funds.sellouts')}}</span>
						</p>
					</div>
				  </Vscroll>
				</div>
        	</div>
    </div>
</template>

<script>
import { summery,yunMining,account } from '@/api/data'
   export default {
	   data(){
		   return{
				topPrice:'',
				content:[],
				proId:'',
				coin:'',
				// pageSize: 4,
				pageNum: 0,
				noData:false,
				pageid:0,
				pagesize:10,
				count:'',
				totalPage:''
				
		   }
	   },
	methods:{
		jumpbuy(id){
			this.$router.push({name:'yun-buy',query:{id:id}})
		},
		jumpIncomes(){
			this.$router.push({name:'yun-Incomes',query:{topPrice:JSON.stringify(this.topPrice)}})
		},
		jumpyuninvite(){
			this.$router.push({name:'yun-invite'})
		},
		yunCalc(){
			this.$router.push({name:'yun-calc'})
		},
		//上拉刷新 完成要执行的
		onRefresh(done) {
			this.noData = false
			this.content = []
			this.pageid = 0;
			this.getApi();
            done() // call done
		},
		//下拉加载要执行的
		onInfinite(done) {
			if(this.pageid<this.totalPage){
				this.pageid++
				let params ={
					pageid:this.pageid,
					pagesize:this.pagesize
				}
				this.getApi(params)
			}else{
				this.noData = true;
			}
			done()
		},
		getApi(params){
			yunMining(params).then((res)=>{
				// console.log(res);
				this.count = res.data.data.count;
				this.totalPage = Math.ceil(this.count/this.pagesize);
				//解构数组每一项push进数组
				this.content.push(...res.data.data.data)
				console.log(this.content);
				
			})
		}
	},
	created() {
			if(this.$route.query.topPrice){
				this.topPrice = JSON.parse(this.$route.query.topPrice);
			}else{
				summery().then(res=>{
					this.topPrice = res.data.data;
				})
			}
			this.getApi()
	},
	mounted() {
		let a = document.querySelector('.g_head').offsetHeight;
		let b = document.querySelector('.header').offsetHeight;
		let c = document.querySelector('.main-title').offsetHeight;
		let srcenHight = document.documentElement.clientHeight;
		document.querySelector('.roll').style.height = srcenHight-a-b-c+'px';
	},
}
</script>
<style lang="less" scoped>
    div{
        box-sizing: border-box;
	}
	.yo-scroll{
		background-color: rgba(255,255,255,0);
	}
	.icon-apr-tianjiayonghu{
		position: absolute;
		right: 0.26rem;
		top: 0.2rem;
		color: #506271;
		font-size: 0.5rem;
	}
    .header{
        height: 1.65rem;
        background-color: #2188fb;
        padding:0.42rem 1.32rem 0.46rem 0.37rem;
		position: relative;
		color: #fff;
        .left,.right{
            width: 2.26rem;
            p:first-child{
                font-size: 0.21rem;
            }
            p:last-child{
                margin-top: 0.26rem;
                font-size: 0.33rem;
            }
        }
        .icon-apr-arrow-right{
            position: absolute;
            right: 0.29rem;
            top: 0.66rem;
            font-size: 0.38rem;
        }
    }
    .main{
      .main-title{
          color: #506271;
          margin-top: 0.28rem;
		  margin-left: 0.41rem;
		  margin-bottom: 0.2rem;
		  span{
			  font-weight: 500;
			  float: right;
			  margin-right: 0.4rem;
			  color: #2188FB;
			  font-size: 0.25rem;
		  }
	  }
	  .roll{
		  position: relative;
		  .content{
			height: 100%;
			padding-left: 0.4rem;
            padding-top: 0.36rem;
            background-color: #fff;
            width: 6.67rem;
            margin:0.23rem auto;
            border-radius: 0.14rem;
            height: 2.37rem;
            position: relative;
			.cont_title{
				font-size: 0.25rem;
                color: #1F3E58;
                font-weight: 700;
				margin-bottom: 0.27rem;
				width: 5rem;
				height: 0.25rem;
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
				color: #1F3E58;
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
					background:linear-gradient(90deg,rgba(3,194,252,1),rgba(0,106,225,1));
                    border-radius:6px;
                    position: absolute;
                    right: 0.29rem;
                    bottom: 0.3rem;
				}
			}
		}
	  }
		
    }
</style>
