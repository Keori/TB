<template>
<div class="mycode">
	<Header :title="$t('index.qrcode')"></Header>
	<div class="codeBox">
		<div class="title">
			<div class="pic"><img src="../../../assets/imgs/mycard.png"/></div>
			{{$t('index.tomerchantpay')}}
		</div>
		<div class="code1">
			<img src="234" alt="" />
			<div class="text">{{$t('index.TIPS8')}}</div>
		</div>
		<div class="code">
			<QRCode text='324234234234' width='371' height='371'></QRCode>
		</div>
	</div>
	<div class="reCode"><img src="../../../assets/imgs/refresh.png"/>{{$t('index.everyupdated')}}</div>
</div>
</template>

<script>
	import QRCode from '../../../components/QRCode'
	export default{
		data(){
			return{
				
			}
		},
		components:{QRCode},
		methods:{
			
		}
	}
</script>

<style scoped="scoped" lang="less">
.mycode{
	.g_head{
		margin-bottom: 0.4rem;
	}
	.reCode{
		padding-top: 0.48rem;
		display:flex;
		align-items: center;
		justify-content: center;
		font-size:.25rem;
		color:#93A0AA;
		img{
			width: 0.32rem;
			margin-right: 0.11rem;
		}
	}
}
	.codeBox{
		width:6.68rem;
		height:9.37rem;
		margin: 0 auto;
		background:rgba(255,255,255,1);
		border:1px solid rgba(222, 222, 222, 1);
		border-radius:0.1rem;
		/*overflow: hidden;*/
		.code{
			height: 5.43rem;
			display:flex;
			align-items: center;
			justify-content: center;
		}
		.code1{
			position: relative;
			height: 2.77rem;
			padding-top: 0.54rem;
			border-bottom: 1px #eee dashed;
			color:#2188FB;
			text-align:center;
			box-sizing: border-box;
			img{
				display: block;
				width:5.71rem;
				height:1.34rem;
				margin: 0 auto 0.31rem;
			}
			&:after,&:before{
				content: '';
				display: block;
				position: absolute;
				left: -1px;
				bottom: -.24rem;
				width: 0.24rem;
				height: 0.47rem;
				background: #eeeeee;
				border-radius: 0 0.25rem 0.25rem 0;
				border: rgba(222, 222, 222, 1) solid;
				border-width: 1px 1px 1px 0;
			}
			&:before{
				left: auto;
				right: -1px;
				border-radius: 0.25rem 0 0 0.25rem;
				border-width:1px 0 1px 1px ;
			}
		}
		.title{
			height: 1.11rem;
			display:flex;
			align-items: center;
			color:#1F3E58;
			border-bottom:1px #eee solid;
			.pic{
				width: 0.64rem;
				height: 0.64rem;
				margin: 0 0.18rem 0 0.38rem;
				img{
					width: 100%;
				}
			}
			
		}
	}
</style>