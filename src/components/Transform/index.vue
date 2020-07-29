<template>
	<div>
		<div class="g_transform" :class="{open:pickerShow}">
			<div class="head">
				{{title}}
				<div class="close" @click="pickerShow=false"></div>
			</div>
			<slot></slot>
		</div>
		<div class="bg" v-show='pickerShow'></div>	
	</div>
</template>

<script>
	export default{
		data(){
			return{
				pickerShow:false
			}
		},
		props:{
			title:[String,Number],
			value:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			value(val){
				this.pickerShow = val
			},
			pickerShow(val){
				this.$emit('input',val)
			}
		},
		methods:{
		}
	}
</script>

<style scoped="scoped" lang="less">
.g_transform{
	transform: translate3d(0, 100%, 0);
	position: fixed;
	left:0;
	bottom: 0;
	z-index: 100;
	width: 100%;
	background: #fff;
    transition: transform .3s ease;
	&.open{
		display: block;
		transform: translate3d(0, 0, 0);
	}
	.head{
		position: relative;
		height: 1.07rem;
		text-align: center;
		border-bottom:1px #e9e9e9 solid;
		line-height:1.07rem;
		color:#1F3E58;
		font-size:.33rem;
		.close{
			position: absolute;
			top:0;
			right: 0.28rem;			
			width: 0.41rem;
			height: 100%;			
			background: url(../Input/images/clear_input.png) no-repeat right 0 center;
			background-size: 0.41rem 0.41rem;
		}
	}
}
/*picker*/
.bg{
	position: fixed;
	top:0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,0.8);
}
</style>