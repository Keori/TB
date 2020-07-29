<template>
	<div>
		<Header title='个人信息'></Header>
		<section class="Change_color">
            <ul>
                <!-- <li @click='language'> -->
                <li>
                    <span>语言</span>
                    <span>中文</span>
                    <Input  class="right" :adress="true" @adrPicker='adr=true'/>
                </li>
                <li @click='currency'>
                    <span>货币</span>
                    <span>港元</span>
                    <div class='image_arrow'></div>
                </li>
            </ul>
		</section>
        <!-- <aside class='tire' v-if='show1'>
            <div class='tire-block'>
                <div class='tire-header'>
                    <a href="javascript:;" @click='close'>取消</a>
                    <p>选择语言</p>
                    <a href="javascript:;" @click='close'>确认</a>
                </div>
                <div class='select-block'>
                    <span :class="{active:changeGray===1}" @click='change(1)'>中文</span>
                </div>
                <div class='select-block'>
                    <span :class="{active:changeGray===2}" @click='change(2)'>English</span>
                </div>
            </div>
        </aside> -->
                        <!--选择地址-->
		<Transform v-model='adr' title='选择收款钱包地址'>
			<ul class="adr_list">
				<li v-for="(item,index) in adrData" :key="index" @click="chooseAdr(item.adr)">
					<div class="txt">
						<p>{{item.name}}</p>
						<div class="adr">{{item.adr}}</div>
					</div>					
				</li>
			</ul>
		</Transform>
        <aside class='tire' v-if='show2'>
            <div class='tire-block'>
                <div class='tire-header'>
                    <a href="javascript:;" @click='close'>取消</a>
                    <p>选择货币单位</p>
                    <a href="javascript:;" @click='close'>确认</a>
                </div>
                <div class='select-block'>
                    <span :class="{active:changeGray===1}" @click='change(1)'>港元（¥）</span>
                </div>
                <div class='select-block'>
                    <span :class="{active:changeGray===2}" @click='change(2)'>美元（$）</span>
                </div>
            </div>
        </aside>
        <Button :submit='true' :fixed="true" @click.native="loginOut">退出登录</Button>
	</div>

</template>

<script>
	export default{
		data(){
			return{
                show: false,
                show1: false,
                show2: false,
                changeGray: 1,
                address:'',//收款地址
                adr:false,
                    adrData:[{
					name:'地址1',
					adr:'83490583583578304989'
				},{
					name:'地址1',
					adr:'83490583583578304989'
				}],
			}
		},
		methods:{
            language(){
                this.show1 = true
            },
            currency(){
                this.show2 = true
            },
            close(){
                this.show1 = false
                this.show2 = false
            },
            change(num){
                this.changeGray = num
            },
            loginOut(){
                this.$router.replace({name:'login'})
            }
		},
		mounted(){
		}
	}
</script>

<style scoped="scoped" lang="less">
.Change_color{
    width: 100%;
    height: 100%;
    background: #EDEDED;
    ul{
        width: 100%;
        height: 100%;
        padding-top: 0.22rem;
        li{
            position: relative;
            width: 100%;
            height: 0.93rem;
            background: #FFFFFF;
            margin: 0.04rem 0;
            span{
                position: absolute;
                font-size: 0.2777rem;
                line-height: 0.93rem;
            }
            span:nth-of-type(1){
                color: #506271;
                left: 0.39rem;
            }
            span:nth-of-type(2){
                color: #1F3E58;
                right: 0.74rem;
            }
            .image_arrow{
                position: absolute;
                right: 0.38rem;
                top: 0;
                height: 100%;
                width: 0.35rem;
                background: url(../../../assets/imgs/ICON/019.png) no-repeat 0.05rem center;
                background-size: 0.2777rem;
            }
            .switch {
                position: absolute;
                display: inline-block;
                width: 0.96rem;
                height: 0.47rem;
                right: 0.43rem;
                top: 0.25rem;
                input {
                    display:none;
                    &:checked + .slider {
                    background-color: #00A0E9;
                    }
                    &:focus + .slider {
                        box-shadow: 0 0 0.01rem #00A0E9;
                    }
                    &:checked + .slider:before {
                        transform: translateX(0.48rem);
                    }
                }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #93A0AA;
                    -webkit-transition: .4s;
                        transition: .4s;
                    &:before {
                        position: absolute;
                        content: "";
                        height: 0.47rem;
                        width: 0.47rem;
                        background-color: white;
                        -webkit-transition: .4s;
                        transition: .4s;
                    }
                    &.round {
                        border-radius: 0.46rem;
                    }
                    &.round:before {
                        border-radius: 50%;
                    }
                }
            }
            .hideIMG{
                position: absolute;
                right: 0.38rem;
                top: 0;
                height: 100%;
                width: 0.35rem;
                background: url(../../../assets/imgs/ICON/019.png) no-repeat 0.05rem center;
                background-size: 0.2777rem;
            }
        }
    }
    .belowA{
            padding-bottom: 0.22rem;
        }
}
.tire{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    background: rgba(51,51,51,0.8);
    z-index: 2;
    .tire-block{
        position: fixed;
        width: 100%;
        height: 3.6rem;
        bottom: -0.01rem;
        background: #FFFFFF;
        .tire-header{
            width: 100%;
            height: 1.08rem;
            a{
                position: absolute;
                color: #2188FB;
                font-size: 0.2916rem;
                top: 0.44rem;
            }
            a:nth-of-type(1){
                left: 0.4rem;
            }
            p{
                position: absolute;
                width: 2.8rem;
                height: 1.08rem;
                color: #1F3E58;
                font-size: 0.36rem;
                line-height: 1.08rem;
                left: 2.4rem;
                text-align: center;
            }
            a:nth-of-type(2){
                left: 6.49rem;
            }
        }
        .select-block{
            width: 100%;
            height: 0.92rem;
            span{
                position: absolute;
                display: block;
                width: 100%;
                height: 0.92rem;
                font-size: 0.2619rem;
                text-align: center;
                color: #1F3E58;
                line-height: 0.92rem;
                &.active{
                    background: #EDEDED;
                }
            }
        }
    }
}
</style>