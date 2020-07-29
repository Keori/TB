<template>
	<div>
		<Alert :value="true" :txt="$t('public.Gacationhint')" :cancel_text="$t('public.Nobind')" :ok_text="$t('public.Tobind')" @on-confirm="goGoogle" @on-cancel="goRe"></Alert>
	</div>
</template>

<script>
export default{
	data(){
		return{
			value:''
		}
	},
	methods:{
		goGoogle(){
			this.$router.replace({name:'Google'})
		},
		goRe(){
			this.$router.go(-1)
		}
	},
	
}
</script>

<style>
</style>