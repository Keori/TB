<template>
	<div>
		<Header :title="$t('my.mybill')" :rightText="$t('public.filtrate')" @rightClick="filterShow=true"></Header>
		<!--订单信息-->
		<div class='headerTile'>
			<ul>
				<li :class='{active:chanMon===0}' @click='chanMonGo(0)'>HKP</li>
				<li :class='{active:chanMon===1}' @click='chanMonGo(1)'>BTC</li>
				<li :class='{active:chanMon===2}' @click='chanMonGo(2)'>USDT</li>
				<li :class='{active:chanMon===3}' @click='chanMonGo(3)'>ZIP</li>
			</ul>
			<div class='filterSearch'>
				<!-- <span  @click=''>筛选</span> -->
			</div>
		</div>
		<!-- 账单列表页面  -->
		<div class="main">
			<div v-if="yan" class="yan">
				<span class="iconfont icon-apr-wunaibiaoqing"></span>
				<p>{{$t('public.billnodata')}}~</p>
			</div>
			 <Vscroll v-if="!yan" :on-refresh="onRefresh" :on-infinite="onInfinite" :noData="noData">
				<ul class="list">
					<li @click="info(item.oid)" v-for="(item, index) in coinList" :key="index">
						<span class="dateTime" v-if="item.month">{{item.month}}</span>
						<div class='content'>
							<div class="left">
								<img :src="item.currency_icon" alt="" />
								<div class="text">
									<div class="name">{{item.remark}}</div>
									<div class="date">{{item.created_at}}</div>
								</div>
							</div>
							<div class="right">
								<div class="text">
									<div class="num">{{item.amount | isProNum | cutZreoFour}}</div>
									<div class="status">{{item.status}}</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			 </Vscroll>
		</div>
		<!--筛选-->
		<div class="filter" :class="{open:filterShow}">
			<Header :title="$t('my.mybill')"></Header>
			<div class="filterBox">
				<!--交易日期-->
				<div class="item">
					<div class="title">{{$t('public.dealdate')}}</div>
					<ul class="flexbox">
						<li @click="date=0,clear()" :class="{active:date==0}">{{$t('public.all')}}</li>
						<li @click="date=1,clear(date)" :class="{active:date==1}">{{$t('public.today')}}</li>
						<li @click="date=7,clear(date)" :class="{active:date==7}">{{$t('public.SevenDaysRecently')}}</li>
					</ul>
					<ul class="date flexbox">
						<li><input type="text" name="" id="" value="" :placeholder="$t('public.sdate')" readonly="readonly" @click="sdateShow = true" v-model="sdate"/></li>
						<li><input type="text" name="" id="" value="" :placeholder="$t('public.edate')" readonly="readonly" @click="edateShow = true" v-model="edate"/></li>
					</ul>
				</div>
				<!--交易类型-->
				<div class="item">
					<div class="title">{{$t('public.dealtype')}}</div>
					<ul class="flexbox">
						<li @click="type=0" :class="{active:type==0}">{{$t('public.all')}}</li>
						<li @click="type=1" :class="{active:type==1}">{{$t('index.buy')}}HKP</li>
						<li @click="type=2" :class="{active:type==2}">{{$t('public.recahrgemoney')}}</li>
						<li @click="type=3" :class="{active:type==3}">{{$t('public.Mentionmoney')}}</li>
					</ul>
					<ul class="flexbox">
						<li @click="type=4" :class="{active:type==4}">{{$t('public.CloudCalculateForce')}}</li>
						<li @click="type=5" :class="{active:type==5}">{{$t('public.MoneyMatters')}}</li>
						<!-- <li @click="type=5" :class="{active:type==5}">消费</li>
						<li @click="type=6" :class="{active:type==6}">OTC交易</li> -->
						<li style="opacity: 0;"></li>
					</ul>
				</div>
				<!--交易状态-->
				<div class="item">
					<div class="title">{{$t('public.dealstate')}}</div>
					<ul class="flexbox">
						<li @click="status=0" :class="{active:status==0}">{{$t('public.all')}}</li>
						<li @click="status=1" :class="{active:status==1}">{{$t('public.dealsuccess')}}</li>
						<li @click="status=2" :class="{active:status==2}">{{$t('public.disposing')}}</li>
						<li @click="status=3" :class="{active:status==3}">{{$t('public.closedeal')}}</li>
					</ul>
				</div>
			</div>
			<ul class="btn flexbox">
				<li @click="filterShow=false">{{$t('public.close')}}</li>
				<li class="sure" @click="filter()">{{$t('public.confirm')}}</li>
			</ul>
		</div>
		<!--筛选的背景-->
		<div class="filterBg" v-if="filterShow"></div>
		<datePicker :pickerShow.sync='sdateShow' v-model='sdate' @input="check"></datePicker>
		<datePicker :pickerShow.sync='edateShow' v-model='edate'></datePicker>
	</div>

</template>
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
		height: 0.88rem;
		justify-content: space-around;
		background: #FFFFFF;
		li{
			position: relative;
			width: 0.74rem;
			height: 0.88rem;
			color: rgb(205, 214, 221);
			text-align: center;
			line-height: 0.88rem;
			transition: all 1s;
			&::after{
				position: absolute;
				content: '';
				width: 0;
				height: 0.06rem;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
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
	display: block;
}
.main{
	position: relative;
}
.list{
	li{
		height: auto;
		border-bottom: 1px #eee solid;
		background-color: #fff;
	}
	.content{
		height: 1.14rem;
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
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			color: #1F3E58;
			width: 2.2rem;
			height: 0.3rem;
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
.yan{
    width: 4rem;
    height: 4rem;
    margin:3rem auto;
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
<script>
	import datePicker from '../../../components/datePicker'
	import { myFlows } from '@/api/data'
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
				edate:'',
				sendType:'',
				coinList:[],
				yan:false,
				dealType:'', //交易类型
				dealStatus:'',
				// oStatus:'',
				Re:'',
				params:{},
				noData:false,
				pageid:0,
				pagesize:15,
				count:'',
				totalPage:'',
				arr:[]
			}
		},
		computed: {
			coin(){
				return this.$store.state.accounts;
			}
		},
		components:{datePicker},
		methods:{
			onRefresh(done){
				this.noData = false
				this.coinList = [];
				this.pageid = 0
				let params = {
					//交易类型
					oid_pre:this.dealType?this.dealType:'',
					//开始时间
					search_begin_date:this.sdate?this.sdate:'',
					//结束时间
					search_end_date:this.edate?this.edate:'',
					//交易状态
					status:this.dealStatus?this.dealStatus:'',
					pageid:this.pageid,
					pagesize:this.pagesize,
					currency:this.sendType
				}
				this.myFlow(params);
				done()
			},
			onInfinite(done){
				if(this.pageid < this.totalPage){
					this.pageid++;
					let params = {
						//交易类型
						oid_pre:this.dealType?this.dealType:'',
						//开始时间
						search_begin_date:this.sdate?this.sdate:'',
						//结束时间
						search_end_date:this.edate?this.edate:'',
						//交易状态
						status:this.dealStatus?this.dealStatus:'',
						pageid:this.pageid,
						pagesize:this.pagesize,
						currency:this.sendType
					}
					this.myFlow(params,2);
				}else{
					this.noData = true
				}
				done()
			},
			filter(){//筛选三要素
			// date 交易日期
			// 0 全部 默认
			// 1 今天
			// 7 七天

			//如果有开始时间或者结束时间 则两个日期都要齐全才可以提交
			if(this.sdate||this.edate){
				if(!this.sdate||!this.edate){
					this.$vux.toast.show({
						text: this.$t('public.alertnodata'),
						type: 'cancel',
						width: '5rem'
					})
					return false
				}
			}
				//如果两个值都不为空
			// 	if(this.sdate&&this.edate){
			// 		if(this.sdate == this.edate){
			// 		this.edate = this.getNextDay(this.edate);
			// 		}
			// }
			// type 交易类型
			// 0 全部 默认
			// 1 购买HKP
			// 2 充币
			// 3 提币
			// 4 云算力
			// 5 理财
				
			// 6 消费
			// 7 OTC交易
			switch (this.type) {
				case 0:
					this.dealType = ''
					break;
				case 4:
					this.dealType = 25
					break;
				case 5:
					this.dealType = 26
					break;
				default:
					this.dealType = ''
					break;
			}
			// status 交易状态
			// 0 全部 默认
			// 1 交易成功
			// 2 处理中
			// 3 交易关闭
			if(this.status==0){  //
				this.dealStatus = ''
			}else{
				this.dealStatus = this.status;
			}
				this.coinList = [];
				this.pageid = 0
				let params={
					//
					oid_pre:this.dealType,
					search_begin_date:this.sdate,
					search_end_date:this.edate,
					status:this.dealStatus,
					currency:this.sendType,
					pageid:this.pageid,
					pagesize:this.pagesize,

				}
				this.myFlow(params,1);
			},
			clear(date){
				if(!date){
					this.sdate = '',
					this.edate = ''
					return false
				}
				if(date==1){
					this.sdate = new Date().YMD(0);
					this.edate = this.sdate;
					return false
				}
				if(date==7){
					this.sdate = new Date().YMD(-7); 
					this.edate = new Date().YMD(0);
					return false
				}	
			},
			//当前时间+1天并格式化
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
			check(){
				if(this.sdate>new Date().YMD(0)){
					this.sdate = ''
					this.$vux.toast.show({
						text: this.$t('public.cantsearchdata'),
						type: 'cancel',
						width: '4rem'
					})
				}
			},
			chanMonGo(num){
				this.noData = false
				this.coinList = [];
				this.chanMon = num;
				switch (num) {
					case 0:
						this.sendType = 'HKP';
						this.params={
							currency:'HKP'
						}
						this.myFlow(this.params);
						break;
					case 1:
						this.sendType = 'BTC';
						this.params.currency = 'BTC'
						this.myFlow(this.params);
						break;
					case 2:
						this.sendType = 'USDT';
						this.params.currency = 'USDT'
						this.myFlow(this.params);
						break;
					case 3:
						this.sendType = 'ZIP';
						this.params.currency = 'ZIP'
						this.myFlow(this.params);
						break;
				}
			},
			myFlow(params,check){
				myFlows(params).then(res=>{
						// console.log(res);
						
						this.count = res.data.data.count;
						this.totalPage = Math.ceil(this.count/this.pagesize);
						let a  = res.data.data.flows;
						let reg = /({[^{]*})/g;
						let n;
						if(check!=2){
							this.arr = []
						}
						a.forEach((val,index,item) => {
						if(val.remark.indexOf!=-1){
							while((n=reg.exec(val.remark))!=null) {
								//在JS中使用过滤器
								n = this.$options.filters.checklang(n[0])
								this.Re = n;
							}
								val.remark = val.remark.replace(reg,this.Re)
						}
						//截取年月
						let c = val.created_at.substring(0,7);
						// 判断是否为相同的时间
						if(this.arr.indexOf(c) == -1 ){ //这个位置有多少个不同的月循环多少遍
							// 第一次进来数据添加了月份
							this.arr.push(c)
							val.month = c;
						}
						switch (val.status) {
							case 0:
								val.status = this.$t('my.billdisposing')
								break;
							case 1:
								val.status = this.$t('public.dealsuccess')
								break;
							case 2:
								val.status = this.$t('public.closedeal')
								break;
							default:
								break;
						}
						this.coinList.push(val)
					})
					if(this.coinList.length==0){
						this.yan = true;
					}else{
						this.yan = false;
					}
					// if(check==1){
					// 	// this.chanMon = 0;
					// 	//把筛选条件回归原位
					// 	this.date = 0;
					// 	this.sdate="";
					// 	this.edate="";
					// 	this.status=0;
					// 	this.type=0;
					// 	//成功才隐藏筛选框
					// }
					this.filterShow=false;
				})
			},
			info(oid){
				this.$router.push({name:'bill-info',query:{oid:oid}})
			}
		},
		mounted() {
			let a = document.querySelector('.g_head').offsetHeight;
			let b = document.querySelector('.headerTile').offsetHeight;
			let srcenHight = document.documentElement.clientHeight;
			document.querySelector('.main').style.height = srcenHight-a-b+'px';
		},
		created() {
			let params = {
					currency:'HKP'
				}
			this.myFlow(params);
		}
	}
</script>