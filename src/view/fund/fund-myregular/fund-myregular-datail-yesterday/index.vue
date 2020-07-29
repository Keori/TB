<template>
    <div>
		<Header :title="$t('yun.Earsub')"></Header>
        <div class="main">
			<div v-if="yan" class="yan">
				<span class="iconfont icon-apr-wunaibiaoqing"></span>
				<p>{{$t('public.billnodata')}}~</p>
			</div>
			<Vscroll v-if="!yan" :on-refresh="onRefresh" :noData="noData" :on-infinite="onInfinite">
				<ul class="list">
					<li v-for="(item, index) in showData" :key="index">
						<span>{{item.income_date}}</span>
						<span v-if="item.product_profit_currency=='BTC'">{{item.amount_of_income |isProNum|cutZreo}}{{item.product_profit_currency}}</span>
						<span v-else>{{item.amount_of_income |isProNum|cutZreoFour}}{{item.product_profit_currency}}</span>
					</li>
				</ul>
			</Vscroll>
		</div>
    </div>
</template>

<script>
import { incomeDetail } from '@/api/data'
export default{
	  data(){
        return{
			list:[{
				date:'2018-12-06',
				type:'+10.0000HKP'
			}],
			pageSize:15,
			pageid:0,
			showData:[],
			noData:false,
			id:'',
			yan:false
        }
	},
	methods: {
		//上拉刷新 完成要执行的
		onRefresh(done) {
			this.getApi()
            done() // call done
		},
		//下拉加载要执行的
		onInfinite(done) {
			if(this.pageSize<this.list.length){
				this.pageSize += 15;
			}
			this.showData = this.list.slice(0,this.pageSize);
			if(this.list.length < this.pageSize){
				this.yan = true
			}
			done()
		},
		getApi(){
          let params={
              order_id:this.id
          }
          //产品收益明细
          incomeDetail(params).then(res=>{
			//   console.log(res);
			 this.showData = res.data.data;
			 console.log(this.showData)
			 if(this.showData.length==0){
				 this.yan = true
			 }
          })
      }
	},
	created() {
		this.id = this.$route.query.id;
		this.getApi()
		// let listData ={
		// 	date:'2018-12-06',
		// 	type:'+10.0000HKP'
		// }
		// for(let i=0;i<99;i++){
		// 	this.list.push(listData);
		// }
		// this.showData = this.list.slice(0,this.pageSize);
	},
	mounted() {
	},
}
</script>

<style lang="less" scoped>
.main{
		height: 100vh;
		background: #fff;
		position: relative;
		margin-top: 0.2rem;
		position: relative;
		// padding-top: 0.38rem;
		// padding-left: 0.38rem;
		.list{
			height: auto;
			li{
                padding-left: 0.38rem;
				height: 0.97rem;
				line-height: 0.97rem;
				display: flex;
				justify-content: space-between;
                border-bottom: 0.02rem solid #e9e9e9;
                font-size: 0.28rem;
                color: #1F3E58;
				span:last-child{
				margin-right: 0.38rem;
					p{
						line-height: 0.2rem;
						text-align: right;
						margin-top: 0.3rem;
					}
				}
            }
            // li:last-child{
            //     border-bottom: none;
            // }
		}
		.yan{
    width: 4rem;
    height: 4rem;
    margin:0rem auto;
    text-align: center;
    .icon-apr-wunaibiaoqing{
        font-size: 2.5rem;
        color: #555;
    }
    p{
        color: #555;
    }
}
    }
</style>
