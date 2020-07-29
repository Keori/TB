<template>
	<div class="g_alert" v-if="showValue">
		<div class="con">
			 <div class="m-box">
				<div class="m-duigou"></div>
			</div>
			<div class="text" v-if='txt'>{{txt}}</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'alert',
		data(){
			return{
				showValue :false
			}
		},
		props:{
			value:{
				type:Boolean,
				default:false
			},
			txt:String,
		},
		watch:{
			value(val){
				this.showValue  = val
			},
		},
		created(){
		},
		mounted() {
		},
	}
</script>

<style scoped="scoped" lang="less">
.g_alert{
	display:flex;
  	align-items:center;
  	justify-content: center;
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.8);
	.con{
		width:6.25rem;
		background:#fff;
		border-radius: 0.08rem;
		color: #506271;
		box-sizing: border-box;
	}
	.text{
		padding-bottom: 0.87rem;
		line-height: 0.49rem;
		text-align: center;
	}
}
.m-box{
	width:1.56rem;
	height:1.56rem;
	position:relative;
	margin:1rem auto;
	background:linear-gradient(90deg,rgba(18,176,243,1),rgba(4,120,251,1));
	border-radius:50%;
	}
	.m-duigou{
		width:1rem;
		height:0.5rem;
		position:absolute;
		left:50%;
		top:50%;
		margin:-0.42rem 0 0 -0.41rem;
		-webkit-transform:rotate(-45deg);
		transform:rotate(-45deg);
		overflow:hidden
		}
	.m-duigou:before,.m-duigou:after{
			content:"";
			position:absolute;
			background:#fff;
			border-radius:0.02rem;
			}
	.m-duigou:before{
			width:0.15rem;
			height:0.41rem;
			left:0;
			-webkit-animation:dgLeft 0.5s ease 0.1s 1 both;
			animation:dgLeft 0.5s ease 0.1s 1 both;
			}
	.m-duigou:after{
		width:0.73rem;
		height:0.15rem;
		bottom:0;
		-webkit-animation:dgRight 0.5s ease 0.5s 1 both;
		animation:dgRight 0.5s ease 0.5s 1 both;
		}
		@-webkit-keyframes dgLeft{
			0%{top:-100%}100%{top:0%}
			}
		@-webkit-keyframes dgLeft{
			0%{top:-100%}100%{top:0%}
			}
		@-webkit-keyframes dgRight{
			0%{left:-100%}100%{left:0%}
			}
		@-webkit-keyframes dgRight{
			0%{left:-100%}100%{left:0%}
			}

</style>