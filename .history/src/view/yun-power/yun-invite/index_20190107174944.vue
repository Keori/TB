<template>
    <div class="bg">
            <span class="arrow" @click="goBack"><img src="../../../assets/imgs/arrow.png" alt=""></span>
            <span class="oval" @click="show"><img src="../../../assets/imgs/oval.png" alt=""></span>
        <div class="big">
            <p><span class="white">累计邀请</span><span class="red">{{result.invite_count}}</span><span class="white">人，累计奖励</span><span class="red">{{result.income_sum}}</span><span class="white">HKP</span></p>
            <p>您的专属邀请码</p>
            <p id="cdKey">{{result}}</p>
            <p ref="copy" data-clipboard-target="#cdKey" @click="copy">复制邀请码</p>
            <p>复制APP下载链接</p>
        </div>
        <div v-show="dialog" class="dialog">
			<div class="dialogx">
				<div class="top">
					<p>活动规则</p>
                    <i @click="showhide" class="iconfont icon-apr-baiseyuanquanguanbi"></i>
				</div>
				<div class="down">
					<p>1、活动日期：2019-01-01 至 2019-12-31</p>
                    <p>2、用户可以分享专属优惠码给好友,好友加</p>
                    <p>入平台并输入优惠码，则该好友邀请成功；</p>
                    <p>3、被邀请者在平台内购买算力进行挖矿时,<span class="red9"></span></p>
                    <p class="red9">邀请者可以获得订单金额的8%作为分红奖励,</p>
                    <p class="red9">分红长期有效；</p>
                    <p>4、获取的分红奖励为HKP，用户可以在平台</p> 
                    <p>内进行消费；</p>
                    <p>5、本活动最终解释权归XXX所有。</p> 
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import {InviteEvent,isFirstInvite} from '@/api/data'
export default {
	data(){
		return{
            dialog:false,
            result:'',
            rule:'',
            copyBtn:''
		}
	},
	methods:{
		show(){
			this.dialog = true;
		},
		showhide(){
			this.dialog = false;
        },
        goBack(){
	  		this.$router.go(-1)
        },
        copy(){
            let cdkey = this.result.invite_code;
            let clipboard =this.copyBtn;

            clipboard.on('success',function(){
                console.log('复制成功');
                alert('复制成功')
                clipboard.destroy();
            })
             clipboard.on('error',function(){
                alert('浏览器不支持复制,请手动') 
                clipboard.destroy()
            })
          }
    },
    created() {
        isFirstInvite().then(res=>{
            console.log(res);
            this.result = res.data.data.data[0].code;
            
        })
    },
    mounted() {
        this.copyBtn = new this.clipboard(this.$refs.copy);
    },
	
}
</script>

<style lang="less" scoped>
    div{
        box-sizing: border-box;
    }
    html,body{
        height: 100%;
        width: 100%;
        // overflow: hidden;
    }
    .bg{
        width: 100%;
        height: 110vh;
        background: url('../../../assets/imgs/ICON/75.jpg') no-repeat;
        background-size: 100%;
        background-color: #743bd8;
        .oval img,.arrow img{
            width: 0.81rem;
            height: 0.81rem;
            position: absolute;
        }
        .arrow img{
            top: 0.23rem;
            left: 0.33rem;
        }
        .oval img{
            right: 0.33rem;
            top: 0.23rem;
        }
    }
    .big{
        height: 4.6rem;
        width: 6.73rem; 
        position: absolute;
        left: 50%;
        margin-left: -3.365rem;
        top: 8.86rem;  
        text-align: center;
        p:first-child{
            width: 100%;
            height: 0.69rem;
            background: #4812CC;
            border-radius: 0.68rem;
            line-height: 0.69rem;
            .white,.red{
                font-size: 0.25rem;
            }
            .red{
                color: #FF11BE;

            }
        }
        p:nth-child(2){
            font-size: 0.25rem;
            margin-top: 0.49rem;
        }
        p:nth-child(3){
            font-size: 0.5rem;
            margin-top: 0.4rem;
        }
        p:nth-child(4),p:nth-child(5){
            width: 3.93rem;
            height: 0.76rem;
            line-height: 0.76rem;
            margin-left: 1.4rem;
            border-radius: 0.38rem;
        }
        p:nth-child(4){
            background:linear-gradient(90deg,rgba(18,176,243,1),rgba(4,120,251,1));
            margin-bottom: 0.39rem;
            margin-top: 0.53rem;
        }
        p:nth-child(5){
            border: 0.01rem solid #fff; 
        }
    }
    .dialog{
		width: 100%;
		height: 100%;
		background:rgba(0,0,0,.6);
		position: fixed;
		top: 0rem;
		z-index: 1;
		.dialogx{
			z-index: 2;
			width: 6.2rem;
			// height: 6.52rem;
			background-color: #fff;
			position: relative;
			left: 50%;
			top:5.64rem;
			transform: translate(-50%,-50%);
			border-radius: 0.1rem;
			.top{
				height: 1.06rem;
				background-color: #0783f9;
				border-top-left-radius: 0.1rem;
                border-top-right-radius: 0.1rem;
                line-height: 1.06rem;
                .icon-apr-baiseyuanquanguanbi{
                    font-size: 0.56rem;
                    position: absolute;
                    right: 0rem;
                    top: -0.9rem;
                }
				p{
                text-align: center;
				font-size: 0.35rem;
				color: #fff;
				}
			}
			.down{
                padding: 0.3rem 0.5rem 0.3rem 0.57rem;
                overflow-y: scroll;
				p{
					color: #1F3E58;
					font-size: 0.25rem;
                    line-height: 0.6rem;
                }
                .red9{
                    color: #F54531;
                }
			}
		}
    }
 
</style>
