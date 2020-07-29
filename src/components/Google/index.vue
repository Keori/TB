<template>
    <div v-if="showValue" class="dialog">
        <div class="dialogx">
            <div class="top">
                <p>{{$t('Google.Gooflevercode')}}</p>
            </div>
            <div class="down">
                <input type="text" :placeholder="$t('public.GAVer')" autofocus="autofocus" v-model="num">
                <p><span v-if="leftText" class="button" @click="cencel">{{leftText}}</span><span style="border:none;color:#fff;background:linear-gradient(90deg,rgba(3,194,252,1),rgba(0,106,225,1));" class="button" @click="next">{{$t('public.submit')}}</span></p>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.dialog{
		width: 100vw;
		height: 100vh;
		background:rgba(0,0,0,.6);
		position: fixed;
		top: 0rem;
		left: 0rem;
		z-index: 1;
		.dialogx{
			z-index: 2;
			width: 5.85rem;
			height: 5.25rem;
			background-color: #fff;
			position: relative;
			left: 50%;
			top:50%;
			transform: translate(-50%,-50%);
			border-radius: 0.2rem;
			.top{
				height: 1.15rem;
				background-color: #0783f9;
				border-top-left-radius: 0.2rem;
				border-top-right-radius: 0.2rem;
				 .icon-apr-baiseyuanquanguanbi{
                    font-size: 0.56rem;
                    position: absolute;
                    right: 0rem;
                    top: -0.7rem;
                }
				p{
					width: 3.1rem;
					font-size: 0.33rem;
					color: #fff;
					margin: 0 auto;
					padding-top: 0.43rem;
					text-align: center;
				}
			}
			.down{
				padding: 0.48rem 0.45rem 0.42rem 0.59rem;
				p{
					color: #93A0AA;
					font-size: 0.28rem;
					line-height: 0.4rem;
					margin-top: 1rem;
					display: flex;
    				justify-content: space-between;
					.button{
						width: 2.26rem;
						height: 0.72rem;
						border-radius: 0.28rem;
						border:0.01rem solid #93A0AA;
						display: inline-block;
						text-align: center;
						line-height: 0.72rem;
						color: #506271;
						font-size: 0.31rem;
					}
					span:last-child{
						margin:0 auto;
					}
				}
				input{
					width: 4.4rem;
					height: 0.78rem;
					border:0.01rem solid #EDEDED;
					border-radius: 0.2rem;
					margin-top: 0.39rem;
					color: #1F3E58;
					padding-left: 0.27rem;
				}
				
			}
		}
	}
</style>
<script>
import { beforeEmailCdk,sendemail,userEmail } from '@/api/data'
export default {
    data(){
        return{
            showValue:false,
            num:''
        }
	},
	props:{
        google:String,
        value:{
			type:Boolean,
			default:false
		},
		leftText:String
	},
	methods: {
		cencel(){
            this.num = ''
            this.showValue = false
			this.$emit('on-cancel')
        },
        next(){
			this.$emit('on-next',this.num)
        }
    },
    watch: {
        value(val){
			this.showValue  = val
		},
    },
    created(){
		if (this.value) {
			this.showValue = this.value
		}
	}

}
</script>
