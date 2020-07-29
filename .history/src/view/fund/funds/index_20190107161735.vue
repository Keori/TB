<template>
	 <div class="app">
		<Header title="理财"></Header>
		<div class="header">
			<div class="up">
				<div class="left">
					<!-- 使用字体图标 -->
					<p class="yesterday">昨日收益<i class="iconfont icon-apr-yuedengyu"></i></p>
					<p><span class="num">1.00000000</span><span class="nums">HKP</span></p>
				</div>
				<div class="right">
					<!-- 使用字体图标 -->
					<p class="yesterday">累计收益<i class="iconfont icon-apr-yuedengyu"></i></p>
					<p><span class="num">1.00000000</span><span class="nums">HKP</span></p>
				</div>
			</div>
			<div class="down" >
				<div class="left" @click="show">
					<img class="fl" src="../../../assets/imgs/yun.png">
						<div class="downr">
							<span>我的云算力</span>
							<p>买算力，享有稳健收益</p>
						</div>
				</div>
				<div class="right">
					<img class="fl" src="../../../assets/imgs/Calendar.png">
						<div class="downr" @click="jump">
							<span>定期理财</span>
							<p>给账户里的币找点"生路"</p>
						</div>
				</div>
			</div>
		</div> 
		<div class="middle">
			<div class="top"> 
				<div class="tips">
					<span></span>
					<span class="tipss">理财推荐</span>
				</div>
				<span class="fr more" @click="jump">更多</span>
			</div>
			<div v-for="(item, index) in Mmoney" :key="index" class="content" @click="jumpfunddetail(item.fid)">
				<div class="left">
					<p>{{(item.annualized_return-0).toFixed(1)}}%</p>
					<p>预期年化收益</p>
				</div>
				<div class="right">
					<div class="rightcontent">
						<p>{{item.name}}<span class="color">推荐</span></p>
						<p class="text-overflow">{{item.description}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="below">
			<div class="top"> 
				<div class="tips">
					<span></span>
					<span class="tipss">云算力精选</span>
				</div>
				<span class="fr more" @click="yunPower">更多</span>
			</div>
			<div class="content">
				<p class="cont_title">阿瓦隆7nm超强矿机A9  BTC云算力合约</p>
				<div class="cont_detail">
					<p>预估产出  0.00003350  BTC / T</p>
					<p>剩余 13,213.00 T</p>
				</div>
				<p class="price">499.00 <span>HK$ / T</span><span class="buy_button fr" @click="jumpyunbuy">立即购买</span></p>
			</div>
		</div>
		<div v-show="dialog" class="dialog">
			<div class="dialogx">
				<div class="top">
					<i @click="showhide" class="iconfont icon-apr-baiseyuanquanguanbi"></i>
					<p>欢迎加入云算力挖矿</p>
				</div>
				<div class="down">
					<p>请填写您的邀请码，邀请您的用户才能</p>
					<p>获得奖励哦！</p>
						<input type="text" v-model="cdKey">
						<p><span class="button" @click="next">忽略</span><span style="float:right;border:none;color:#fff;background:linear-gradient(90deg,rgba(3,194,252,1),rgba(0,106,225,1));" class="button" @click="jumpyun">提交</span></p>
				</div>
			</div>
		</div>
		<Tab></Tab>
	 </div> 
</template>

<script>
import { firstInvite,isFirstInvite,recommends,yunProList } from '@/api/data'
export default {
	data(){
		return{
			dialog:false,
			cdKey:'',
			isInvite:false,
			Mmoney:[]
		}
	},
	methods:{
		jump(){
			this.$router.push({name:'fund-products'})
		},
		show(){
			if(this.isInvite){
				this.$router.push({name:'yuns-power'})
			}else{
				this.dialog = true;
			}
		},
		yunPower(){
			this.$router.push({name:'yuns-power'})
		},
		showhide(){
			this.dialog = false;
		},
		next(){
			firstInvite().then(res=>{
				// console.log(res);
			})
			this.$router.push({name:'yuns-power'})
		},
		jumpyun(){
			let cdReg = /^[0-9]{6}$/
			if(!cdReg.test(this.cdKey)){
				alert('请输入6位数字邀请码')
				if(this.cdKey.length>6){
					this.cdKey = ''
				}
				return false
			}
			let params = {
				'code':this.cdKey
			}
			firstInvite(params).then((res)=>{
				console.log(res);
				if(res.data.errcode!=0){
					alert('邀请码有误,请重新输入');
					return false
				}
				this.$router.push({name:'yuns-power'})
			})
		},
		jumpyunbuy(){
			this.$router.push({name:'yun-buy'})
		},
		jumpfunddetail(id){
			let pass = {}
			 this.Mmoney.forEach((val,index)=>{
			  if(id==val.fid){
				  pass = val;
			  }
		  	})
			pass = JSON.stringify(pass)
			this.$router.push({name:'fund-product-detail',
			query:
			{
				id:id,
				pass:pass
			}
			})
		},
		//获取理财推荐列表
		recommend(){
			let params={
				page:0,
				num:2
			}
			recommends(params).then(res=>{
				this.Mmoney = res.data.data.data;
			})
		}
	},
	created() {
		isFirstInvite().then(res=>{
			// 访问过为1
			if(res.data.data.data[0].is_first==1){
				this.isInvite = true;
				console.log(res.data)
			}
		})
		this.recommend();
		yunProList().then(res=>{
			// console.log(res);
			
		})
	},
}
</script>

<style lang="less" scoped>
	html{
		height: 100%;
	}
	.dialog{
		width: 100%;
		height: 100%;
		background:rgba(0,0,0,.6);
		position: fixed;
		top: 0rem;
		z-index: 1;
		.dialogx{
			z-index: 2;
			width: 5.85rem;
			height: 5.25rem;
			background-color: #fff;
			position: relative;
			left: 50%;
			top:50%;
			transform: translate(-50%,-50%);
			border-radius: 0.2rem;
			.top{
				height: 1.15rem;
				background-color: #0783f9;
				border-top-left-radius: 0.2rem;
				border-top-right-radius: 0.2rem;
				 .icon-apr-baiseyuanquanguanbi{
                    font-size: 0.56rem;
                    position: absolute;
                    right: 0rem;
                    top: -0.7rem;
                }
				p{
				width: 3.1rem;
				font-size: 0.33rem;
				color: #fff;
				margin: 0 auto;
				padding-top: 0.43rem;
				}
			}
			.down{
				padding: 0.48rem 0.45rem 0.42rem 0.59rem;
				p{
					color: #93A0AA;
					font-size: 0.28rem;
					line-height: 0.4rem;
				}
						input{
							width: 4.7rem;
							height: 0.78rem;
							background-color: #EDEDED;
							border-radius: 0.2rem;
							margin-top: 0.19rem;
							font-size: 0.5rem;
							color: #1F3E58;
							padding-left: 0.27rem;
						}
				p:last-child{
					width: 4.7rem;
					margin-top: 0.59rem;
					.button{
					width: 2.26rem;
					height: 0.72rem;
					border-radius: 0.28rem;
					border:0.02rem solid #93A0AA;
					display: inline-block;
					text-align: center;
					line-height: 0.72rem;
					color: #506271;
					font-size: 0.31rem;
				 }
				}
			
			}
		}
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	div,input,span{
		box-sizing: border-box;
	}
	.icon-apr-yuedengyu{
		font-size: 0.13rem;
	}
	.header{
		height: 3.65rem;
		color: #fff;
		.up{
		height: 2.26rem;
		background: url('../../../assets/imgs/666.png') left center;
		padding: 0.73rem 0.37rem 0.54rem 0.42rem;
			.left,.right{
				p:first-child{
					font-size: 0.25rem;
					margin-bottom: 0.35rem;
				}
				.num{
					font-size: 0.45rem;
					margin-right:0.14rem;
				}
				.nums{
					font-size: 0.2rem;
				}
			}
			.left{
				width: 3.3rem;
				border-right: 0.01rem solid #4DB1F9;
			}
			.right{
				width: 2.87rem;
				margin-left: 0.53rem;
			}
		}
		.down{
			height: 1.39rem;
			background: #fff;
			.left,.right{
				height: 100%;
				width: 3.74rem;
				img{
				width: 0.67rem;
				height: 0.67rem;
				display: inline-block;
				margin-top: 0.36rem;
				margin-left: 0.36rem;
			  }
			  .downr{
				  margin-left: 1.25rem;
				  margin-top: 0.38rem;
				  span{
					  font-size: 0.28rem;
					  color: #27455E;
					  font-weight: 700;
				  }
				  p{
					  margin-top: 0.17rem;
					  font-size: 0.21rem;
					  color: #93A0AA;
				  }
			  }
			}
			.left{
				border-right: 0.01rem solid #EEEEEE;
			}
			.right{
				img{
					margin-left:0.28rem;
				}
				.downr{
					margin-left: 1.12rem;
				}
			}
		}
	}
	.middle{
		height: 100%;
		background: #fff;
		margin-top: 0.29rem;
		margin-bottom: 0.24rem;
		.top{
			height: 0.89rem;
			border-bottom: 0.02rem solid #e9e9e9;
			.tips{
				width: 2rem;
				display: inline-block;
				margin-top: 0.29rem;
				margin-left: 0.33rem;
				color: #506271;
				position: relative;
				span:nth-child(1){
					display: inline-block;
					width:0.22rem;
					height:0.33rem;
					background:linear-gradient(90deg,#03C2FC,#006AE1);
					border-radius:0.06rem;
				}
				.tipss{
					font-size: 0.28rem;
					color: #506271;
					position:absolute;
					left: 0.4rem;
					top: 0.02rem;
					width: 1.2rem;
				}
			}
			.more{
				color: #2188FB;
				margin-right: 0.31rem;
				margin-top: 0.31rem;
				font-family: '微软雅黑';
				font-size: 0.25rem;
			}
		}
		.content{
			height: 1.55rem;
			border-bottom: 0.03rem solid #eee;
			.left{
				height: 100%;
				width: 2.19rem;
				padding:0.46rem 0.3rem 0.35rem 0.52rem;
				p:nth-child(1){
					font-size: 0.42rem;
					color: #F54531;
					padding-bottom: 0.12rem;
				}
				p:nth-child(2){
					font-size: 0.21rem;
					color: #93A0AA;
				}
			}
			.right{
				width: 5.3rem;
				padding-top: 0.51rem;
				.rightcontent{
					border-left: 0.02rem solid #eee;
					padding-left:0.47rem;
					p:nth-child(1){
						font-size: 0.28rem;
						color: #1F3E58;
						padding-bottom: 0.15rem;
						span{
							background-position:0px 0px;
							background-size: 0.58rem 0.29rem;
							text-align: center;
							line-height: 0.29rem;
							width: 0.58rem;
							height: 0.29rem;
							display:inline-block;
							font-size: 0.17rem;
							margin-left: 0.09rem;
							color: #fff;
							vertical-align: top;
						}
					}
					p:nth-child(2){
						width: 4.38rem;
						font-size: 0.21rem;
						color: #93A0AA;
					}
					.color{
						background: url('../../../assets/imgs/color.png');
					}
					.black{
						background: url('../../../assets/imgs/black.png');
					}
				}
			}
		}
	}
	.below{
		height: 3.37rem;
		background: #fff;
		margin-bottom: 1.35rem;
		.top{
			height: 0.89rem;
			border-bottom: 0.02rem solid #e9e9e9;
			.tips{
				width: 2rem;
				display: inline-block;
				margin-top: 0.29rem;
				margin-left: 0.33rem;
				color: #506271;
				position: relative;
				span:nth-child(1){
					display: inline-block;
					width:0.22rem;
					height:0.34rem;
					background:linear-gradient(90deg,#03C2FC,#006AE1);
					border-radius:0.06rem;
				}
				.tipss{
					font-size: 0.28rem;
					color: #506271;
					position:absolute;
					left: 0.4rem;
					top: 0.02rem;
					width: 1.4rem;
				}
			}
			.more{
				color: #2188FB;
				margin-right: 0.31rem;
				margin-top: 0.31rem;
				font-family: '微软雅黑';
				font-size: 0.25rem;
			}
		}
		.content{
			height: 100%;
			padding-left: 0.4rem;
			padding-top: 0.36rem;
			.cont_title{
				font-size: 0.28rem;
				color: #1F3E58;
				font-weight: 700;
				margin-bottom: 0.27rem;
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
					margin-right: 0.34rem;
					background:linear-gradient(90deg,rgba(3,194,252,1),rgba(0,106,225,1));
					border-radius:6px;
				}
			}
		}
	}
</style>
