<template>
	<div class="g_tips">
		<div class="caption">{{$t('public.TIPS')}}</div>
		<slot></slot>
	</div>
</template>

<script>
	export default{
		data(){
			return{
			}
		},
		props:{
			// title:{
			// 	type:String,
			// 	default:'温馨提示'
			// }
		}
	}
</script>

<style scoped="scoped" lang="less">

</style>