<template>
	<label class="g_checkbox">
		<span class="check" :class="{active:Value}"></span>
		<slot></slot>
		<input type="checkbox" name="" id="" v-model="Value" class="hide"/>
	</label>

</template>

<script>
	export default{
		data(){
			return{
				Value:this.value
			}
		},
		props:{
			value:{
				type:[String,Boolean],
				default:false
			}
		},
		watch:{
			value(val) {
		        this.Value = val;
		     },
			Value(val){
				this.$emit('input',val);
			}
		},
		mounted(){
		}
	}
</script>

<style scoped="scoped" lang="less">
	.g_checkbox{
		line-height: 0.26rem;
		color: #506271;
		font-size: 0.25rem;
		.check{
			display: block;
			float: left;
			width:0.26rem;
			height:0.26rem;
			margin-right: 0.19rem;
			background:rgba(33,136,251,0);
			border:1px solid rgba(147, 160, 170, 1);
			box-sizing: border-box;
			&.active{
				border:none;
				background:url(images/Checkbox.jpg) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
</style>