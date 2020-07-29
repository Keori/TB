<template>
	<awesome-picker
		  ref="picker"
		  type='date'
		  :textTitle='textTitle'
		  :swipeTime='2500'
		  @on-show='onshow'
		  @on-hide='onhide'
		  @confirm='choose'>
	</awesome-picker>
</template>

<script>
	export default{
		name:'datePicker',
		data(){
			return{
			}
		},
		props:{
			textTitle:{
				type:String,
				default:'选择日期'
			},
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
				var date=''
				data.map((item,index)=>{
					if(index==0){
						date+=item.index==200?"2100":item.index>100?'20'+(item.index-100):19+''+item.index
						return false
					}
					date+=(item.index+1)>9?'-'+(item.index+1):'-0'+(item.index+1)
				})
				this.$emit('input',date)
			},
			onshow(){
				this.$emit("update:pickerShow",true)
			},
			onhide(){
				this.$emit("update:pickerShow",false)
			}
		},
		mounted(){
		}
	}
</script>

<style scoped="scoped" lang="less">

</style>