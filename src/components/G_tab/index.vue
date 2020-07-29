<template>
	<ul class="g_tab flexbox">
		<li class="R1">
			<router-link :to="{name:'index'}">
				<div class="pic"></div>
				<p>{{$t('public.index')}}</p>
			</router-link>
		</li>
		<li class="R2">
			<router-link :to="{name:'funds'}">
				<div class="pic"></div>
				<p>{{$t('public.fund')}}</p>
			</router-link>
		</li>
		<li class="R3">
			<router-link :to="{name:'profile-index'}">
				<div class="pic"></div>
				<p>{{$t('public.profile')}}</p>
			</router-link>
		</li>
	</ul>
</template>



<script>
	export default {
	  name: 'g-tab',
	  data(){
	  	return {
	  	}
	  },
	  props:{
	  },
	  methods:{

	  }
	}
</script>

<style lang="less" scoped="scoped">

</style>