<template>
	<div class="g_cell" @click="go()">
		<slot></slot>
		<div class="arrow" v-if="to">
			<img src="../../assets/imgs/right_arrow.png"/>
		</div>
		<div class="exc" v-if="next">
			<i class="iconfont icon-apr-gantanhao"></i>
		</div>
		<div class="right text-overflow">{{rightText}}</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
			}
		},
		props:{
			to:String,
			next:String,
			rightText:[String,Number]
		},
		methods:{
			go(){
				if(this.to){
					this.$router.push({
						name:this.to
					})
				}
				if(this.next){
					this.$router.push({
						name:this.next
					})
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
.g_cell{
	height: 0.84rem;
	padding-right: 0.4rem;
	background: #fff;
	border-bottom: 1px #eee solid;
	line-height: 0.84rem;
	color: #1F3E58;
	text-indent: 0.42rem;
	.arrow{
		display: flex;
		align-items: Center;
		float: right;
		height:100%;
		margin:0 0 0 0.12rem;
		img{
			width: 0.2rem;
		}
	}
	.exc{
		float: right;
		height:100%;
		width: 0.72rem;
		.icon-apr-gantanhao{
			font-size: 0.4rem;
			color: red;
		}
	}
	.right{
		width: 4.6rem;
		text-align: right;
	}
}
</style>