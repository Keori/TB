<template>
	<form class="g_form" :autocomplete='autocomplete' @submit.prevent="submit">
		<slot></slot>
	</form>
</template>

<script>
	export default{
		data(){
			return{
			}
		},
		props:{
			autocomplete:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			submit(){
				this.$emit('submit')
			}
		}
	}
</script>

<style lang="less" scoped="scoped">

</style>