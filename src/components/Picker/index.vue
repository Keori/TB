<template>
	<awesome-picker
		  ref="picker"
		  :anchor='value'
		  :data="data"
		  :textCancel='textCancel'
		  :textConfirm='textConfirm'
		  :textTitle='textTitle'
		  :swipeTime='2500'
		  @on-show='onshow'
		  @on-hide='onhide'
		  @confirm='choose'>
	</awesome-picker>
</template>

<script>
	
	export default{
		data(){
			return{
				
			}
		},
		props:{
			data:{
				type:Array
			},
			value:{//anchor 是 picker 展开时每一列默认滚动的锚点位置或值的数组, 兼容两种数据结构, 未匹配到默认选中第0项
				type:Array
			},
			textCancel:String,
			textConfirm:String,
			textTitle:String,
			pickerShow:{//是否显示
				type:Boolean,
				default:false
			}
		},
		watch:{
			pickerShow(val){
				if(val){
					this.$refs.picker.show()
				}
			}
		},
		methods:{
			//确认以后的方法
			choose(data){
				this.$emit('input',[data[0]['index']])
				this.$emit('on-change',data)
			},
			onshow(){
				this.$emit("update:pickerShow",true)
			},
			onhide(){
				this.$emit("update:pickerShow",false)
			}
		},
		mounted(){
			if(this.pickerShow){
				this.$refs.picker.show()
			}
		}
	}
</script>

<style scoped="scoped" lang="less">

</style>