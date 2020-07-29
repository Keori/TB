<template>
	<div>
		<Header :title="'我的账单'" :rightText="'筛选'" @rightClick="filterShow=true"></Header>
		<!--订单信息-->
		<div class='headerTile'>
			<ul>
				<li :class='{active:chanMon===0}' @click='chanMonGo(0)'>HKP</li>
				<li :class='{active:chanMon===1}' @click='chanMonGo(1)'>BTC</li>
				<li :class='{active:chanMon===2}' @click='chanMonGo(2)'>USBT</li>
				<li :class='{active:chanMon===3}' @click='chanMonGo(3)'>ZIP</li>
			</ul>
			<div class='filterSearch'>
				<!-- <span  @click=''>筛选</span> -->
			</div>
		</div>
		<div class="dateTime">2018-07-12  18:00</div>
		<ul class="list" v-if='HKD'>
			<router-link :to='{name:"bill-info"}' tag='li'>
					
				
				<div class="left">
					<img src="../../../assets/imgs/HKP.png" alt="" />
					<div class="text">
						<div class="name">购买HKP</div>
						<div class="date">2018-07-12  18:00</div>
					</div>
				</div>
				<div class="right">
					<div class="text">
						<div class="num">+1233</div>
						<div class="status">订单处理中</div>
					</div>					
				</div>
			</router-link>
		</ul>	
		<ul class="list" v-if='BTC'>
			<router-link :to='{name:"bill-info"}' tag='li'>
					
				
				<div class="left">
					<img src="../../../assets/imgs/HKP.png" alt="" />
					<div class="text">
						<div class="name">购买HKP</div>
						<div class="date">2018-07-12  18:00</div>
					</div>
				</div>
				<div class="right">
					<div class="text">
						<div class="num">+1233</div>
						<div class="status">订单处理中</div>
					</div>					
				</div>
					<div class="left">
					<img src="../../../assets/imgs/HKP.png" alt="" />
					<div class="text">
						<div class="name">购买HKP</div>
						<div class="date">2018-07-12  18:00</div>
					</div>
				</div>
				<div class="right">
					<div class="text">
						<div class="num">+1233</div>
						<div class="status">订单处理中</div>
					</div>					
				</div>
			</router-link>
		</ul>
		<ul class="list" v-if='USBT'>
			<router-link :to='{name:"bill-info"}' tag='li'>
					
				
				<div class="left">
					<img src="../../../assets/imgs/HKP.png" alt="" />
					<div class="text">
						<div class="name">购买HKP</div>
						<div class="date">2018-07-12  18:00</div>
					</div>
				</div>
				<div class="right">
					<div class="text">
						<div class="num">+1233</div>
						<div class="status">订单处理中</div>
					</div>					
				</div>
				<div class="left">
					<img src="../../../assets/imgs/HKP.png" alt="" />
					<div class="text">
						<div class="name">购买HKP</div>
						<div class="date">2018-07-12  18:00</div>
				</div>
				</div>
				<div class="right">
					<div class="text">
						<div class="num">+1233</div>
						<div class="status">订单处理中</div>
					</div>					
				</div>
								<div class="left">
					<img src="../../../assets/imgs/HKP.png" alt="" />
					<div class="text">
						<div class="name">购买HKP</div>
						<div class="date">2018-07-12  18:00</div>
				</div>
				</div>
				<div class="right">
					<div class="text">
						<div class="num">+1233</div>
						<div class="status">订单处理中</div>
					</div>					
				</div>
			</router-link>
		</ul>
		<ul class="list" v-if='ZIP'>
			<router-link :to='{name:"bill-info"}' tag='li'>
					
				
				<div class="left">
					<img src="../../../assets/imgs/HKP.png" alt="" />
					<div class="text">
						<div class="name">购买HKP</div>
						<div class="date">2018-07-12  18:00</div>
					</div>
				</div>
				<div class="right">
					<div class="text">
						<div class="num">+1233</div>
						<div class="status">订单处理中</div>
					</div>					
				</div>
				<div class="left">
					<img src="../../../assets/imgs/HKP.png" alt="" />
					<div class="text">
						<div class="name">购买HKP</div>
						<div class="date">2018-07-12  18:00</div>
				</div>
				</div>
				<div class="right">
					<div class="text">
						<div class="num">+1233</div>
						<div class="status">订单处理中</div>
					</div>					
				</div>
				<div class="left">
					<img src="../../../assets/imgs/HKP.png" alt="" />
					<div class="text">
						<div class="name">购买HKP</div>
						<div class="date">2018-07-12  18:00</div>
				</div>
				</div>
				<div class="right">
					<div class="text">
						<div class="num">+1233</div>
						<div class="status">订单处理中</div>
					</div>					
				</div>
								<div class="left">
					<img src="../../../assets/imgs/HKP.png" alt="" />
					<div class="text">
						<div class="name">购买HKP</div>
						<div class="date">2018-07-12  18:00</div>
				</div>
				</div>
				<div class="right">
					<div class="text">
						<div class="num">+1233</div>
						<div class="status">订单处理中</div>
					</div>					
				</div>
			</router-link>
		</ul>
		
		<!--筛选-->
		<div class="filter" :class="{open:filterShow}">
			<Header title='我的账单'></Header>
			<div class="filterBox">
				<!--交易日期-->
				<div class="item">
					<div class="title">交易日期</div>
					<ul class="flexbox">
						<li @click="date=0" :class="{active:date==0}">全部</li>
						<li @click="date=1" :class="{active:date==1}">今天</li>
						<li @click="date=7" :class="{active:date==7}">最近七天</li>
					</ul>
					<ul class="date flexbox">
						<li><input type="text" name="" id="" value="" placeholder="开始时间" readonly="readonly" @click="sdateShow = true" v-model="sdate"/></li>
						<li><input type="text" name="" id="" value="" placeholder="结束时间" readonly="readonly" @click="edateShow = true" v-model="edate"/></li>
					</ul>
				</div>
				<!--交易类型-->
				<div class="item">
					<div class="title">交易日期</div>
					<ul class="flexbox">
						<li @click="type=0" :class="{active:type==0}">全部</li>
						<li @click="type=1" :class="{active:type==1}">购买HKP</li>
						<li @click="type=2" :class="{active:type==2}">充币</li>
						<li @click="type=3" :class="{active:type==3}">提币</li>
					</ul>
					<ul class="flexbox">
						<li @click="type=4" :class="{active:type==4}">云算力</li>
						<li @click="type=5" :class="{active:type==5}">消费</li>
						<li @click="type=6" :class="{active:type==6}">OTC交易</li>
						<li style="opacity: 0;"></li>
					</ul>
				</div>
				<!--交易状态-->
				<div class="item">
					<div class="title">交易状态</div>
					<ul class="flexbox">
						<li @click="status=0" :class="{active:status==0}">全部</li>
						<li @click="status=1" :class="{active:status==1}">交易成功</li>
						<li @click="status=2" :class="{active:status==2}">处理中</li>
						<li @click="status=3" :class="{active:status==3}">交易关闭</li>
					</ul>
				</div>
			</div>
			<ul class="btn flexbox">
				<li @click="filterShow=false">取消</li>
				<li class="sure" @click="filter(),filterShow=false">确定</li>
			</ul>
		</div>
		<!--筛选的背景-->
		<div class="filterBg" v-if="filterShow"></div>
		<datePicker :pickerShow.sync='sdateShow' v-model='sdate'></datePicker>
		<datePicker :pickerShow.sync='edateShow' v-model='edate'></datePicker>
	</div>

</template>

<script>
	import datePicker from '../../../components/datePicker'
	export default{
		data(){
			return{
				HKD: true,
				BTC: false,
				USBT: false,
				ZIP: false,
				chanMon:0,
				date:0,
				type:0,
				status:0,
				filterShow:false,
				sdateShow:false,
				edateShow:false,
				sdate:'',
				edate:''
			}
		},
		components:{datePicker},
		methods:{
			tab(data){//tab切
				console.log(data)
			},
			filter(){//筛选
				console.log(1111);
				
			},
			chanMonGo(num){
				this.chanMon = num
				if(this.chanMon===0){
					this.HKD = true
					this.BTC = false
					this.USBT = false
					this.ZIP = false
				}else if(this.chanMon===1){
					this.HKD = false
					this.BTC = true
					this.USBT = false
					this.ZIP = false
				}else if(this.chanMon===2){
					this.HKD = false
					this.BTC = false
					this.USBT = true
					this.ZIP = false
				}else if(this.chanMon===3){
					this.HKD = false
					this.BTC = false
					this.USBT = false
					this.ZIP = true
				}
			}
		},
		mounted(){
			
		}
	}
</script>

<style scoped="scoped" lang="less">
.filter{
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	z-index: 100;
	transform: translate3d(0,-100%,0);
	transition: transform .3s ease;
	&.open{
		transform: translate3d(0,0,0);
	}
	.btn{
		background:#fff;
		li{
			height: 0.97rem;
			color: #506271;
			font-size: 0.3rem;
			text-align: center;
			line-height: 0.97rem;
			border-top: 1px #e9e9e9 solid;
		}
		.sure{
			border-color:linear-gradient(90deg,rgba(18,176,243,1),rgba(4,120,251,1));
			background: linear-gradient(90deg,rgba(18,176,243,1),rgba(4,120,251,1));
			color: #fff;
		}
	}
	.filterBox{
		padding-bottom: 0.9rem;
		background: #fff;
	}
	.item{		
		.title{
			padding: 0.45rem 0.42rem 0;
			margin-bottom: 0.28rem;
			font-size: 0.28rem;
			color: #1F3E58;
		}
		.flexbox{
			padding: 0 0.32rem 0.21rem;
		}
		.date{
			justify-content: space-between;
			padding: 0 0.42rem;
			li{
				flex: none;
				width: 3rem;
				margin: 0;
			}
			input{
				display: block;
				width: 100%;
				height: 100%;
				text-align: center;
				color:#1F3E58;
			}
		}
		li{
			height:0.55rem;
			background:rgba(245,69,49,0);
			border:1px solid rgba(214, 214, 214, 1);
			border-radius:0rem;
			text-align: center;
			line-height: 0.55rem;
			font-size: 0.24rem;
			color: #93A0AA;
			border-radius: 0.09rem;
			margin:0 0.1rem;
			&.active{
				background: #506271;
				color: #fff;
				border-color:#506271;
			}
		}
	}
}
.headerTile{
	display: flex;
	width: 100%;
	height: 0.88rem;
	background: rgb(233,233,233);
	&>ul{
		display: flex;
		width: 5.29rem;
		height: 0.86rem;
		justify-content: space-around;
		background: #FFFFFF;
		li{
			position: relative;
			width: 0.74rem;
			height: 0.86rem;
			color: rgb(205, 214, 221);
			text-align: center;
			line-height: 0.86rem;
			&::after{
				position: absolute;
				content: '';
				width: 0;
				height: 0.06rem;
				transition: all 1s;
			}
			&.active{
				color: rgb(33,136,251);
				&::after{
				width: 0.74rem;
				height: 0.06rem;
				transition: all 1s;
				background: rgb(33,136,251);
			}
			}
		}
	}
	.filterSearch{
		width: 2.21rem;
		background: #FFFFFF;
		span{
			display: block;
			width: 1.16rem;
			float: right;
			text-align: center;
			line-height: 0.86rem;
			color: rgb(33,136,251)
		}
	}
}
.filterBg{
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.8);
}
.dateTime{
	height: 0.76rem;
	background: #eee;
	line-height: 0.76rem;
	color: #506271;
	text-indent: 0.34rem;
}
.list{
	li{
		height: 1.15rem;
		border-bottom: 1px #eee solid;
	}
	.left,.right{
		display: flex;
		align-items: Center;
		height: 100%;
		font-size: 0.25rem;
		img{
			width: 0.63rem;		
			height: 0.63rem;
			margin: 0 0.26rem 0 0.35rem;
		}
		.name{
			
			color: #1F3E58;
		}
		.date{
			margin-top: 0.14rem;
			color: #93A0AA;
		}
	}	
	.right{
		padding-right: 0.37rem;
		text-align: right;
		.num{
			font-size: 0.29rem;
			color: #F54531;
		}
		.status{
			margin-top: 0.14rem;
			font-size: 0.25rem;
			color: #93A0AA;
		}
	}
}

</style>