<template>
	<div>
		<Header :title="$t('headerfont.bindnewphone')"></Header>
		<Form>
			<Label :title="$t('my.nationalOareacode')">
				<Input placeholder="" :arrowDown='true'/>
			</Label>
			<Label :title="$t('my.newphone')">
				<Input placeholder=""/>
			</Label>
			<Label :title="$t('my.noteverify')">
				<Input placeholder="" getCodeUrl='/userCode'/>
			</Label>
			<Button :submit='true' :fixed="true">{{$t('public.submitreset')}}</Button>
		</Form>		
	</div>

</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang='less' scoped='scoped'>
.g_form{
	padding-top: 0.6rem;
}
</style>