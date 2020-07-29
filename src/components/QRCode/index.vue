<template>
	<div id="qrcode">
		
	</div>
</template>

<script>
	import QRCode from '../../assets/js/qrcode.js';
	export default {
		name:'QRCode',
		data() {
			return{
				
			}
				
		},
		props:{
			text:{
				type:String,
				default:'什么都没有'
			},
			width:{
				type:[Number,String],
				default:371
			},
			height:{
				type:[Number,String],
				default:371
			}
		},
		watch:{
			text(val){
			  new QRCode('qrcode', {
			  text: val,
			  width: Number(this.width)*(document.documentElement.clientWidth/750),
			  height: Number(this.height)*(document.documentElement.clientWidth/750),
			  colorDark : '#000000',
			  colorLight : '#ffffff',
			  correctLevel : QRCode.CorrectLevel.H
			});
			}
		},
		mounted(){
		}
			
	}
</script>

<style scoped>
	#qrcode{
		display: inline-block;
	}
</style>

