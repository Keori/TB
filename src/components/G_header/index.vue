<template>
	<div class="g_head" :class="{border:noBorder}">
		<!--左侧返回按钮-->
		<div class="leftBox" v-if="!hideBack" :tips="tips" @click="backOff(),goBack()"></div>
		<!--中间标题-->
		<div class="title text-overflow" v-if='title'>{{title}}</div>
		<!--中间tab-->
		<div class="tab flexbox" v-if="tab1Text&&tab2Text">
			<li :class="{active:active==1}" @click="tabClick(1)">{{tab1Text}}</li>
			<li :class="{active:active==2}" @click="tabClick(2)">{{tab2Text}}</li>
		</div>
		<!--右侧文字-->
		<div class="rightBox" v-if='rightText' @click="rightClick()">{{rightText}}</div>
	</div>
</template>
<!--tab1监听事件：t1Click-->
<!--tab2监听事件：t2Click-->
<!--右边文案监听事件：rightClick-->

<script>
	export default {
	  name: 'g_head',
	  data(){
	  	return {
			  active:this.activeTab,
	  	}
	  },
	  props:{
	  	title:String,//中间标题文案
	  	rightText:String,//右侧文案
	  	tab1Text:{//tab1标题文案
	  		type:String
	  	},
	  	tab2Text:{//tab2标题文案
	  		type:String
	  	},
	  	activeTab:{//默认显示第几个tab
	  		type:Number,
	  		default:1
	  	},
	  	hideBack:{//返回按钮是否隐藏，true为隐藏，false为显示
	  		type:Boolean,
	  		default:false
	  	},
	  	to:{
	  		type:String
	  	},
	  	noBorder:{
	  		type:Boolean,
	  		default:false
		  },
		tips:{
			  type:Number,
			  default:0
	  	},
	  },
	  methods:{
		backOff(){
			this.$emit('backoff');
		  },
	  	goBack(){
			  if(this.$route.query.isLogin){
				  this.$router.replace({name:'profile-index'})
				  return false
			  }

			  if(this.$route.query.isKycing){
					this.$router.replace({name:'profile-index'})
					return false
			  }
			  switch (this.tips) {
				  case 0:
					this.$router.go(-1)
					  break;
				  default:
					  break;
			  }
	  	},
	  	tabClick(num){
			this.active=num
	  		this.$emit('tabClick',num)
	  	},
	  	rightClick(){
		  	if(this.to){
		  		this.$router.push({
		  			name:this.to
		  		})
		  	}else{
		  		this.$emit('rightClick')
		  	}
		  },
	  },
	  created() {},
	}
</script>

<style lang="less" scoped="scoped">
	.border{
		border: none !important;
	}
</style>