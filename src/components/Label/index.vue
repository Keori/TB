<template>
	<div class="g_label">
		<div class="title" v-if="title">{{title}}</div>
		<div class="note" v-if="note">{{note}}</div>
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
			title:[String,Number],
			note:[String,Number],
		}
	}
</script>

<style scoped="scoped" lang="less">

</style>