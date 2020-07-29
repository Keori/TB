<template>
	<div>
		<Header :title="$t('headerfont.commonadd')"></Header>
		<div v-if="yan" class="yan">
				<span class="iconfont icon-apr-wunaibiaoqing"></span>
				<p>{{$t('public.nosaveAaa')}}~</p>
			</div>
		<div v-if="!yan" class="adr">
			<div  class="item" v-for="(item,index) in adrData" @touchstart='start($event,item)' @touchmove='move($event,item)' @touchend='Tend(item)' :key='index'>
				<div class="tbox" v-bind:style="{transform:'translateX('+item.left+'px)'}" v-bind:class="{transition:transition}">
					<div class="text">
						<p class="beizhu">{{item.name}}
							<img v-if="item.currency=='BTC'" src="../../../assets/imgs/coinImg/BTC.png" alt="">
							<img v-if="item.currency=='HKP'" src="../../../assets/imgs/coinImg/HKP.png" alt="">
							<img v-if="item.currency=='USDT'" src="../../../assets/imgs/coinImg/USDT.png" alt="">
							<img v-if="item.currency=='ZIP'" src="../../../assets/imgs/coinImg/ZIP.png" alt="">
						</p>
						<span>{{item.currency}}</span><p class="dizhi">{{item.address}}</p>
					</div>
					<div class="del" @click="del(item.id)">{{$t('public.del')}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { takeCoinAdd,delCoinAdd } from '@/api/data'
	export default{
		data(){
			return{
				adrData:[],
				transition:false,
				yan:false,
				clientWidth:-document.documentElement.clientWidth/750
			}
		},
		methods:{
			start: function(event, item) {
				this.transition = false
				var touch = event.targetTouches[0];
				this.pageX = touch.pageX - item.left;
				this.pageY = touch.pageY;
			},
			move: function(event, item) {
				var touch = event.targetTouches[0];
				var moveX = touch.pageX - this.pageX
				var moveY = touch.pageY - this.pageY
				if(Math.abs(moveX) > 2 * Math.abs(moveY) && moveX < 0) {
					if(moveX < this.clientWidth*163) {
						item.left = this.clientWidth*163
					} else {
						item.left = moveX
					}
	
				}
			},
			Tend: function(item) {
				this.transition = true
				if(item.left <= this.clientWidth*100) {
					item.left = this.clientWidth*163
				} else if(this.clientWidth*100 < item.left && item.left < 0) {
					item.left = 0
				}
				setTimeout(() => {
					this.transition = false
				}, 1000)
	
			},
			getCoinAdd(){
				takeCoinAdd().then(res=>{
				res.data.data.withdraw_address.forEach(val => {
					val.left = 0;
					this.adrData.push(val)
				});
				if(this.adrData.length ==0){
					this.yan = true
				}else{
					this.yan = false
				}
				
			})
			},
			del(id){
				// console.log(id);
				let params ={
					id:id
				}
				delCoinAdd(params.id).then(res=>{
					// console.log(res);
					this.adrData=[]
					this.getCoinAdd()
				})
			
			}
		},
		created() {
			this.getCoinAdd()	
		},
	}
</script>

<style scoped="scoped" lang="less">
.adr{
	overflow: hidden;
	.item{
		height: 1.35rem;
		border-bottom: 1px #e9e9e9 solid;
		color: #1F3E58;
		.tbox{
			width: 9.13rem;
			height: 100%;
			display: flex;
			align-items: Center;
			transform: translateX();
			&.transition{
				transition:all .3s;
			}
		}
		.text{
			width: 7.5rem;
			box-sizing: border-box;
			padding: 0 0.2rem 0 0.41rem;
			.beizhu{
				width: 100%;
				height: 0.5rem;
				display: flex;
				justify-content: space-between;
				padding-right: 0.2rem;
			}
			img{
				width: 0.5rem;
			}
		}
		.dizhi{
			padding-left: 0.2rem;
			color: #93A0AA;
			font-size: 0.25rem;
			display: inline-block;
		}
		.del{
			width:1.63rem;
			height:100%;
			background:rgba(245,69,49,1);
			line-height: 1.35rem;
			text-align: center;
			color: #fff;
		}
	}
}
.yan{
	width: 4rem;
	height: 1.5rem;
	margin: 2rem auto;
	text-align: center;
	.icon-apr-wunaibiaoqing{
		font-size: 2.5rem;
		color: #555;
	}
	p{
		color: #555;
	}
}
</style>