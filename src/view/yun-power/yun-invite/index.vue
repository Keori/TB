<template>
    <div class="bg">
        <span class="arrow" @click="goBack"><img src="../../../assets/imgs/arrow.png" alt=""></span>
        <span class="oval" @click="show"><img src="../../../assets/imgs/oval.png" alt=""></span>
        <div class="big">
            <p><span class="white">{{$t('public.AddInvitation')}}</span><span class="red">{{inData.buy_count}}</span><span class="white">{{$t('public.person')}}{{$t('public.addaward')}}</span>
            <span v-if="inData.income_fee" class="red">{{inData.income_fee|cutZreoFour}}</span>
            <span v-else class="red">{{fee|cutZreoFour}}</span>
            <span class="white">HKP</span></p>
            <p>{{$t('public.EXInvitationcode')}}</p>
            <p>{{inData}}</p>
            <p ref="copy" class="btn"  data-clipboard-action="copy" data-clipboard-target="#cdKey" @click="copy">{{$t('public.CPInvitationcode')}}</p>
            <p class="btn1" data-clipboard-action="copy" data-clipboard-text='www.product.com' @click='copy1'>{{$t('public.CPAPPDonloadLink')}}</p>
        </div>
        <div v-show="dialog" class="dialog">
			<div class="dialogx">
				<div class="top">
					<p>{{$t('public.activityRule')}}</p>
                    <i @click="showhide" class="iconfont icon-apr-baiseyuanquanguanbi"></i>
				</div>
				<div class="down">
					<p>1、{{$t('public.Explain1')}}：2019-01-01 {{$t('public.Explain001')}} 2019-12-31</p>
                    <p>2、{{$t('public.Explain2')}}</p>
                    <p>{{$t('public.Explain3')}}；</p>
                    <p>3、{{$t('public.Explain4')}}</p>
                    <p class="red9">{{$t('public.Explain5')}}8%{{$t('public.Explain005')}}，</p>
                    <p class="red9">{{$t('public.Explain6')}}；</p>
                    <p>4、{{$t('public.Explain7')}}HKP，{{$t('public.Explain007')}}</p>
                    <p>{{$t('public.Explain8')}}；</p>
                    <p>5、{{$t('public.Explain9')}}</p>
				</div>
			</div>
		</div>
        <!-- 复制源 -->
        <input id='cdKey' type="text" v-model='result'/>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import {InviteEvent,isFirstInvite} from '@/api/data'
import  { ToastPlugin , AlertPlugin , LoadingPlugin } from 'vux'//ui组件
export default {
	data(){
		return{
            dialog:false,
            result:'',
            inData:'',
            copyBtn:'',
            copyBtn1:'',
            fee: ''
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
            let clipboard = new Clipboard(".btn");
            clipboard.on("success", e => {
                this.$vux.toast.show({
                    text: this.$t('public.copysuccess'),
                    type: 'success'
                })
                //释放内存
                clipboard.destroy();
            clipboard.on('error', e => {
                this.$vux.toast.show({
                    text: this.$t('public.browsernonsupport'),
                    type: 'cancel',
                    width: '3.8rem',
                })
                //释放内存
                clipboard.destroy()
            })
        });
        },
        copy1(){
            let clipboard = new Clipboard(".btn1");
            clipboard.on('success', e => {
                this.$vux.toast.show({
                    text: this.$t('public.copysuccess'),
                    type: 'sccess'
                })
                //释放内存
                clipboard.destroy()
            })
            clipboard.on('error', e=> {
               this.$vux.toast.show({
                    text: this.$t('public.browsernonsupport'),
                    type: 'cancel',
                    width: '3.8rem'
                })
                //释放内存
                clipboard.destroy()
            })
        }
    },
    created() {
        // 是否展示弹框邀请码（是否点击过忽略按钮）
        isFirstInvite().then(res=>{
            this.result = res.data.data.code
        })
        //云算力邀请首页
        InviteEvent().then(res=>{
            // console.log(res);
            
            this.inData = res.data.data.code
            this.fee = res.data.data.income_fee
        })
    },
    mounted() {
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
        input{
            position: absolute;
            width: 0.1rem;
            height: 0.1rem;
            opacity: 0;
            top: 0.58rem;
            left: 0.65rem;
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
