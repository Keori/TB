<template>
	<div>
		<Header title='帮助中心'></Header>
		<section class="Change_color">
            <div class="input_setion">
                <span>
                    <img src="../../../assets/imgs/ICON/091.png" alt="">
                    <input type="text" class="setion" placeholder="查找遇到的问题"/>
                </span>
            </div>
            <div class="list_section">
                <h1>热点问题</h1>
                <ul>
                    <li><a href="javascript:;">1.什么是HKP？</a></li>
                    <li><a href="javascript:;">2.如何使用付款码？</a></li>
                    <li><a href="javascript:;">3.怎么把BTC提现到其他钱包？</a></li>
                    <li><a href="javascript:;">4.忘记支付密码如何找回？</a></li>
                </ul>
            </div>
		</section>
	</div>

</template>

<script>
	export default{
		data(){
			return{
			}
		},
		methods:{
		},
		mounted(){
		}
	}
</script>

<style scoped="scoped" lang="less">
.Change_color{
    width: 100%;
    // height: 100vh;
    background: #EDEDED;
    .input_setion{
        position: relative;
        width: 100%;
        height: 1.93rem;
        span{
            position: absolute;
            display: block;
            width: 6.63rem;
            height: 0.78rem;
            top: 0.56rem;
            left: 0.44rem;
            background: #FFFFFF;
            border-radius: 0.1rem;
            img{
                position: absolute;
                width: 0.35rem;
                height: 0.35rem;
                left: 0.21rem;
                top: 0.23rem;
            }
            .setion{
                position: absolute;
                width: 5.96rem;
                height: 0.78rem;
                right: 0;
                font-size: 0.29rem;
                color: #000000;
            }
        }
    }
    .list_section{
        position: relative;
        width: 100%;
        height: 4.3rem;
        h1{
            position: absolute;
            left: 0.36rem;
            font-size: 0.29rem;
            color: #1F3E58;
        }
        ul{
            position: absolute;
            width: 6.68rem;
            height: 3.79rem;
            left: 0.41rem;
            top: 0.51rem;
            li{
                width: 6.68rem;
                height: 0.92rem;
                line-height: 0.9rem;
                margin-bottom: 0.03rem;
                background: #FFFFFF;
                a{
                    margin-left: 0.51rem;
                    color: #2188FB;
                }
            }
            li:nth-of-type(1){
                border-radius: 0.14rem 0.14rem 0 0;
            }
            li:nth-of-type(4){
                border-radius: 0 0 0.14rem 0.14rem;
            }
        }
    }
}
</style>