<template>
	<!-- 根据showValue的值 判断该组件是否显示 -->
	<div class="g_alert" v-if="showValue">
		<div class="con">
			<div class="title" v-if='title'>{{title}}</div>
			<div class="bigTitle" v-if='bigTitle'>{{bigTitle}}</div>
			<div class="google" v-if="google">
				<input v-model="googleNum">
			</div>
			<ul class="waySay" v-if="waySay">
				<li><span></span><span>{{$t('public.waySay1')}}</span></li>
				<li><span></span><span>{{$t('public.waySay2')}}</span></li>
				<li><span></span><span>{{$t('public.waySay3')}}</span></li>
				<li><span></span><span>{{$t('public.waySay4')}}</span></li>
				<li><span></span><span>{{$t('public.waySay5')}}</span></li>
				<li><span></span><span>{{$t('public.waySay6')}}</span></li>
				<li><span></span><span>{{$t('public.waySay7')}}</span></li>
				<li><span></span><span>{{$t('public.waySay8')}}</span></li>
				<li><span></span><span>{{$t('public.waySay9')}}</span></li>
			</ul>
			<div class="text" v-if='txt'>{{txt}}</div>
			<div class="btn">
				<!-- $emit 会监听父组件的@on-confirm事件 -->
				<span class="sure" @click="$emit('on-confirm')">{{ok_text}}</span>
				<span @click="cancel()">{{cancel_text}}</span>
				<span class="OK" v-if="OK" @click="$emit('on-yes')">{{$t('public.confirm')}}</span>
				<div class="googleBtn">
					<span v-if="googleCan" @click="cancel()">{{$t('public.close')}}</span>
					<span class="googleOK" v-if="googleOK" @click="takeGoogle">{{$t('public.confirm')}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'alert',
		data(){
			return{
				showValue :false,
				googleNum:''
			}
		},
		props:{
			value:{
				type:Boolean,
				default:false
			},
			waySay:{
				type:Boolean,
				default:false
			},
			calcIncome:{
				type:Boolean,
				default:false
			},
			title:String,
			bigTitle:String,
			txt:String,
			OK:{
				type:Boolean,
				default:false
			},
			ok_text:{
				type:String,
				default:'确定'
			},
			cancel_text:{
				type:String,
				default:'关闭'
			},
			google:{
				type:Boolean,
				default:false
			},
			googleOK:{
				type:Boolean,
				default:false
			},
			googleCan:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			value(val){
				this.showValue  = val
			},
			showValue (val){
				this.$emit('input',val)
			}
		},
		methods:{
			show(){
				this.showValue  = true
			},
			cancel(){
				this.showValue = false
				this.$emit('on-cancel')
			},
			takeGoogle(){
				this.$emit('on-google',this.googleNum)
			}
		},
		created(){
			if (this.value) {
		      this.showValue = this.value
		    }
		}
	}
</script>

<style scoped="scoped" lang="less">
.g_alert{
	display:flex;
  	align-items:center;
  	justify-content: center;
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.8);
	.con{
		width:6.25rem;
		padding: 0.77rem 0.4rem 0.52rem 0.45rem;
		background:#fff;
		border-radius: 0.08rem;
		color: #506271;
		box-sizing: border-box;
		z-index:2;
		.google{
			width: 4rem;
			margin:0.1rem auto;
			padding-left: 0.4rem;
			margin-bottom: 0.2rem;
			input{
				border:0.01rem solid #ccc;
				height: 0.6rem;
				padding-left: 0.1rem;
				color: #1F3E58;
				border-radius: 0.1rem;
			}
		}
	}
	.title{
		margin-bottom: 0.39rem;
		font-size: 0.35rem;
	}
	.bigTitle{
		text-align: center;
		color:#1F3E58;
		font-size: 0.35rem;
		margin-bottom: 0.32rem;
	}
	.waySay{
		width: 100%;
		padding-top:0.2rem;
		border-top: 0.01rem solid #efefef;
		margin-bottom: 0.4rem;
		li{
			position: relative;
			color: #1F3E58;
			font-size: 0.25rem;
			line-height: 0.5rem;
			span:first-child{
				height: 0.07rem;
				width: 0.07rem;
				background: #F54531;
				border-radius: 50%;
				display: inline-block;
				position: absolute;
				top: 50%;
			}
			span:last-child{
				margin-left: 0.16rem;
			}
		}
	}
	.calcIncome{
		border-top: 0.01rem solid #e9e9e9;
		border-bottom: 0.01rem solid #e9e9e9;
		margin-bottom: 0.3rem;
		li{
			height: 0.74rem;
			line-height: 0.74rem;
			border-bottom: 0.01rem solid #e9e9e9;
			font-size: 0.26rem;
			text-align: left;
			padding-left: 0.3rem;
			display: flex;
			justify-content: space-between;
			span:last-child{
				color: #1F3E58;
				display: inline-block;
				
			}
			.totalIncome{
				p{
					color: #F54531;
					line-height: 0.5rem;
				}
				}		
		}
		li:last-child{
			border-bottom:none;
			height: 0.94rem;
			line-height: 0.94rem;
		}
	}
	.text{
		padding-bottom: 0.87rem;
		line-height: 0.49rem;
	}
	.btn{
		.sure{
			color: #2188FB;
			margin-left: 0.67rem;
		}
		span{
			float: right;
		}
		.OK{
			width: 100%;
			height: 0.84rem;
			color: #fff;
			background: linear-gradient(90deg,rgba(18,176,243,1),rgba(4,120,251,1));
			border-radius: 0.1rem;
			text-align: center;
			line-height: 0.84rem;
			font-size: 0.33rem;
		}
		.googleBtn{
			width: 3rem;
			margin:0 auto;
			height: 0.6rem;
			line-height: 0.6rem;
			display: flex;
			justify-content:space-between;
			span:last-child{
				color: #2188FB;
			}
		}
	}
}

</style>