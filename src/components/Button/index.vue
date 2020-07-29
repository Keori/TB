<template>
	<button class="g_button" :class="[{fixed:fixed},{border:type=='border'},{white:type=='white'},{disabled:disabled}]" ref='type' :disabled="disabled" @click="$emit('click')">
		<router-link :to="{name:to}" v-if='to'>
		<slot></slot>
		</router-link>
		<slot v-if='!to'></slot>
	</button>
</template>

<script>
	export default{
		data(){
			return{
			}
		},
		props:{
			fixed:{
				type:Boolean,
				default:false
			},
			submit:{
				type:Boolean,
				default:false
			},
			type:String,
			to:String,
			disabled:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			go(){
				this.$emit('click')
			}
		},
		mounted(){
			this.$refs.type.setAttribute('type',this.submit?'submit':'button')
		}
	}
</script>

<style scoped="scoped" lang="less">
	.disabled{
	background: #ccc;
}
</style>