<template>
	<div>
		<div class="head">
			<!--未登录-->
			<div v-if="noLogin" class="nologin">
				<div class="pic"><img src="../../../assets/imgs/noLogin.png"/></div>
				<Button type='border' class="goLogin" to='login'>{{$t('login.register')}}/{{$t('public.login')}}</Button>
			</div>
			<!--已登录-->
			<div v-if="!noLogin" class="userInfo">
				<div class="text">
					<div class="name">{{userInfo.nickname}}</div>
					<div class="email">{{userInfo.email?userInfo.email:'载入中...'| emailStar}}</div>
					<Button v-if="userInfo.status_kyc_verify==2" type="white">{{$t('my.alreadyapprove')}}</Button>
				</div>
				<div class="headImg">
					<img src="../../../assets/imgs/heart.png"/>
				</div>
			</div>
		</div>
		<!--操作列表-->
		<div class="list">
			<Cell to="bill">{{$t('my.mybill')}}</Cell>
		</div>
		<div class="list">
			<Cell v-if="userInfo.status_kyc_verify==0" next="fill-kyc">{{$t('my.kyc')}}</Cell>
			<Cell v-else to="kyc-info">{{$t('my.kyc')}}</Cell>
			<Cell to="myInfo">{{$t('my.safety')}}</Cell>
			<Cell to="myAddress">{{$t('my.commonpurseadd')}}</Cell>
		</div>
		<div class="list">
			<Cell to="help-center">{{$t('my.helpmiddle')}}</Cell>
			<Cell to="about-us">{{$t('my.aboutus')}}</Cell>
			<Cell to="system-set">{{$t('my.systemset')}}</Cell>
		</div>
		<div v-if='userInfo.id' class='userID'>
			<span>{{$t('public.AccountID')}}ID：</span>
			<span>{{userInfo.id}}</span>
		</div>
		<div v-else></div>
		<Tab></Tab>
	</div>
</template>
<script>
export default{
	data(){
		return{
			noLogin:true,
			email:''
		}
	},
	computed:{
		userInfo(){
			return this.$store.state.userInfo;
		},
	},
	methods:{
	},
	// watch:{
	// 	userInfo(val){
	// 		this.userInfo = val;
	// 		// this.email = val.email
	// 	},
	// },
	created() {
		if(window.localStorage.getItem('token')){
			this.noLogin = false;
		}
	},
	mounted() {
		// console.log(this.userInfo);
	},
}
</script>

<style scoped="scoped" lang="less">
.list{
	padding-bottom: 0.23rem;
	background: #eee;
}
.head{
	height: 3.53rem;
	background: url(../../../assets/imgs/my_bg.jpg) no-repeat;
	background-size: 100%;
	.nologin{
		.pic{
			padding: 0.66rem 0 0.43rem;
			text-align: center;
			img{
				width: 1.4rem;
				height: 1.4rem;
			}
			
			
		}
		.goLogin{
			width: 1.68rem;
			height: 0.57rem;
			border-color: #fff;
			color: #fff;
			font-size: 0.25rem;
			line-height: 0.57rem;
			a{
				color: #fff;
			}
		}
	}
	.userInfo{
		padding: 1rem 0.79rem 0 0.82rem;
		.text{
			float: left;
			.name{
				font-size: 0.42rem;
				margin-bottom: 0.24rem;
			}
			.email{
				margin-bottom: 0.22rem;
				font-size: 0.25rem;
			}
			.g_button{
				width: 1rem;
				height: 0.42rem;
				margin-left: 0;
				color: #2188FB;
				font-size: 0.21rem;
				line-height: 0.42rem;
			}
		}
		.headImg{
			float: right;
			width:1.29rem;
			height:1.29rem;
			border-radius:50%;
			overflow: hidden;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
}
.userID{
		width:100%;
		text-align:center;
		padding-top: 0.2rem;
		&>span{
			color:#B0B0B0;
			font-size:0.25rem
		}
	}
</style>