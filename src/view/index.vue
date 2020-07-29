<template>

	<div>
	<!--头部-->
		<div v-if="login" class="index">
			<div class="head">
			<!--卡片-->
			<div class="cardBox">
				<div class="card">
					<div class="text">
						<p class="all">{{$t('index.total_assets')}}</p>
						<div class="num" v-show="star">{{TotalAssets|cutZreoFour}} <span>HKP</span></div>
						<div class="num" v-show="!star"> ****** <span>HKP</span></div>
						<div class="hkp" v-show="star">≈ {{TotalAssets|cutZreoTwo}} HKD</div>
						<div class="hkp" v-show="!star">≈ ****** HKD</div>
					</div>
					<div class="eyes" @click="star=!star">
						<img src="../assets/imgs/eyes_white.png" v-show="star"/>
						<img src="../assets/imgs/eyes_white_close.png" v-show="!star"/>
					</div>
				</div>
				<div class='imgMsite'>
					<img src='../assets/imgs/ICON/010.png'/>
				</div>
			</div>
			<!--目录-->
			<ul class="tab flexbox">
				<li class="p2">
					<router-link :to="{name:'myCode'}">
					<div class="pic"><img src="../assets/imgs/account_tab_02.png" align="absmiddle"/></div>
					<p>{{$t('index.qrcode')}}</p>
					</router-link>
				</li>
				<li class="p3" @click="BuyHKP">
					<div class="pic"><img src="../assets/imgs/account_tab_03.png"/></div>
					<p>{{$t('index.buyhkp')}}</p>
				</li>
			</ul>
		</div>
		<!--货币列表-->
		<ul class="cur_list">
			<li v-for="(item, index) in coinData" :key="index" @click="goToCoin(item)">
				<div class="con">
					<div class="top">
						<!--货币名称和图标-->
						<div class="cur_name">
							<div class="pic"><img :src="item.icon"/></div>
							<p>{{item.currency_name}}</p>
						</div>
						<!--数量-->
						<div v-if="item.currency_name=='BTC'" class="num">
							{{item.total_amount |cutZreo}}
							<div class="hkd">≈ {{ApprBTC|cutZreoTwo}} HKD</div>
						</div>
						<div v-else class="num">
							{{item.total_amount |cutZreoFour}}
							<div v-if="item.currency_name=='HKP'" class="hkd">≈ {{ApprHKP|cutZreoTwo}} HKD</div>
							<div v-else-if="item.currency_name=='ZIP'" class="hkd">≈ {{ApprZIP|cutZreoTwo}} HKD</div>
							<div v-else-if="item.currency_name=='USDT'" class="hkd">≈ {{ApprUSDT|cutZreoTwo}} HKD</div>
						</div>
					</div>
					<!--详细-->
					<div class="able">
						{{$t('index.usable')}}/{{$t('index.freeze')}}
						<div v-if="item.currency_name=='BTC'" class="right">{{item.available_amount |cutZreo}}/{{item.frozen_amount|cutZreo}}</div>
						<div v-else class="right">{{item.available_amount |cutZreoFour}}/{{item.frozen_amount|cutZreoFour}}</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<div v-if="!login" class="login">
		<div class="logo">
			<img src="../assets/imgs/login_logo.png"/>
		</div>
		<Form>
			<div class="btn">
				<Button :submit="true" @click.native="goLogin">{{$t('public.login')}}</Button>
				<Button type="border" @click.native="register">{{$t('login.register')}}</Button>
			</div>
		</Form>
	</div>
	<Tab></Tab>
	<alert v-model='show' title="标题">这里是内容</alert>
	</div>

</template>

<script>
	import myMath from '../assets/js/math.js'
	import alert from '../components/Alert'
	import {login,account,exchange} from '../api/data.js'
	export default {
		data(){
			return{
				show:false,
				star:false,
				login:false,
				coinData:[],
				ApprBTC: '',
				ApprUSDT: '',
				ApprHKP: '',
				ApprZIP: '',
				TotalAssets: ''
			}
		},
		components:{alert},
		created(){
			if(window.localStorage.getItem('token')){
				this.login = true;
				account().then(res=>{
					this.coinData = res.data.data.accounts;
					this.ExChange()
				})
			}
		},
		methods:{
			goLogin(){
				this.$router.push({name:'login'})
			},
			register(){
				this.$router.push({name:'register'})
			},
			goToCoin(item){
				if(item.currency_name == 'HKP'){
					let pass = JSON.stringify(this.coinData)
					this.$router.push({name:'HKP',query:{pass:pass}})
					return false
				}
				let pass = item.currency_name
				this.$router.push({name:'BTC',
				query:{pass:pass}
				})
			},
			BuyHKP(){
				let pass = JSON.stringify(this.coinData)
				this.$router.push({name:'HKP',query:{pass:pass}})
			},
			ExChange(){
				exchange().then(res => { //hkp_price HKP //cny_price 人民币
					let CurAll = res.data.data.currency
					let ExBTC = CurAll[0].hkp_price-0
					let ExUSDT = CurAll[1].hkp_price-0
					let ExZIP = CurAll[2].hkp_price-0
					let ExHKP = CurAll[3].hkp_price-0
					this.ApprHKP = myMath.mul(this.coinData[0].total_amount-0,ExHKP)
					this.ApprZIP = myMath.mul(this.coinData[1].total_amount-0,ExZIP)
					this.ApprBTC = myMath.mul(this.coinData[2].total_amount-0,ExBTC)
					this.ApprUSDT = myMath.mul(this.coinData[3].total_amount-0,ExUSDT)
					this.TotalAssets = (this.ApprHKP+this.ApprZIP+this.ApprBTC+this.ApprUSDT)
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
.cur_list{
	padding-top: 0.36rem;
	padding-bottom: 1.12rem;
	.top{
		height: 0.99rem;
		border-bottom: 1px #eee solid;
		display: flex;
		justify-content: space-between;
	    align-items:Center;
	    color: #1F3E58;
	    .cur_name{
	    	.pic{
	    		float: left;
	    		width:0.6rem;
				height:0.6rem;
				border-radius:50%;
				img{
					width: 100%;
					height: 100%;
				}
	    	}
	    	p{
	    		float: left;
	    		padding-left: 0.17rem;
	    		line-height: 0.6rem;
	    	}
	    }
	    .num{
			text-align: right;
	    	.hkd{
	    		padding-top: 0.12rem;
	    		color: #93A0AA;
	    		font-size: 0.25rem;
	    	}
	    }
	}
	.able{
		padding-top: 0.18rem;
		font-size: 0.21rem;
		color: #93A0AA;
	}
	li{
		width:6.81rem;
		height:1.66rem;
		padding:0 0.79rem 0 0.3rem;
		margin: 0 auto 0.24rem;
		box-sizing: border-box;
		background:rgba(255,255,255,1) url(../assets/imgs/right_arrow.png) no-repeat right 0.29rem center;
		background-size: 0.17rem;
		border-radius:0.14rem;
	}
}
.head{
	background: #fff;
	.tab{
		padding:0.32rem 0;
		text-align: center;
		justify-content:space-around;
		p{
			color:#506271;
		}
		.pic{
			display: flex;
		    justify-content:center;
		    align-items:Center;
		    height: 1.1rem;
		}
		li{
			&.p2{
				img{
					width: 0.816rem;
				}
			}
			&.p3{
				img{
					width: 0.816rem;
				}
			}
			flex: none;
			width: 1.5rem;
			height: 1.5rem;
		}
	}
}
.cardBox{
	position: relative;
	height: 3.62rem;
	padding-top: 0.24rem;
	box-sizing: border-box;
	.card{
		position: relative;
		width:6.81rem;
		height:3.38rem;
		margin: 0 auto;
		// background:linear-gradient(90deg,rgba(18,176,243,1),rgba(4,120,251,1));
		// box-shadow:0rem 0rem 0rem 0rem rgba(3,86,177,0.4);
		border-radius:0.15rem 0.15rem 0 0;
		z-index: 1;
		.eyes{
			position: absolute;
			top:0.45rem;
			right: 0.39rem;
			width: 0.45rem;
			img{
				width: 100%;
			}
		}
		.text{
			padding: 0.86rem 0 0 0.86rem;
			.num{
				padding: 0.41rem 0 0.23rem;
				font-size:0.35rem;
				font-weight:700;
				span{
					font-size: 0.29rem;
					font-weight: 400;
				}
			}
		}
	}
	.imgMsite{
		position: absolute;
		width:100%;
		height: 100%;
		top: 0;
		img{
			width: 100%;
			height: 100%;
		}
	}
}
.login{
	background-color: #fff;
	height: 100vh;
	.logo{
		padding: 2rem 0 1.6rem;
		text-align: center;
		img{
			width: 4.12rem;
		}
	}
		.btn{
			padding: 2rem 0.67rem;
			button:first-child{
				margin-bottom: 0.5rem;
			}
		}
}
</style>