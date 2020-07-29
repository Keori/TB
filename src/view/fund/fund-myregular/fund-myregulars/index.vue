<template>
    <div>
        <Header :title="$t('yun.myregular')"></Header>
       <div class="header">
				<div class="left">
                    {{$t('yun.AddEarbouns')}}
				</div>
				<div class="right">
                    <p>{{resData.ZIP | cutZreoFour}} ZIP</p>
                    <p>{{resData.HKP | cutZreoFour}} HKP</p>
                    <p>{{resData.USDT | cutZreoFour}} USDT</p>
                    <p>{{resData.BTC | cutZreo}} BTC</p>
				</div>
		</div>
        <div class="main">
            <div class="top">
                <span :class="{active:choose==0}" @click="check(0)">{{$t('public.proceed')}}</span>
                <span :class="{active:choose==1}" @click="check(1)">{{$t('public.finish')}}</span>
            </div>
            <div ref="down" class="down">
                <div v-if="yan" class="yan">
                    <span class="iconfont icon-apr-wunaibiaoqing"></span>
                    <p>{{$t('yun.detailview')}}</p>
                </div>
                 <Vscroll v-if="!yan" :on-refresh="onRefresh" :on-infinite="onInfinite" :noData="noData">
                <ul class="list">
                    <li v-for="(item, index) in chooseList" :key="index" @click="jump(item.id)">
                        <div class="up">
                            <p class="text-overflow">{{item.name |checklang}}</p>
                        </div>
                        <div class="bottom">
                            <span>
                                <p>{{$t('yun.investmentMoney')}}({{item.fund_currency}})</p>
                                <p v-if="item.fund_currency=='BTC'">{{item.product_investment_amount|cutZreo}}</p>
                                <p v-else>{{item.product_investment_amount|cutZreoFour}}</p>
                            </span>
                             <span>
                                <p>{{$t('funds.YesEar')}}({{item.profit_currency}})</p>
                                 <p v-if="item.profit_currency=='BTC'">{{item.amount_of_income|cutZreo}}</p>
                                 <p v-else>{{item.amount_of_income|cutZreoFour}}</p>
                            </span>
                             <span>
                                <p>{{$t('funds.AddEar')}}({{item.profit_currency}})</p>
                                <p v-if="item.profit_currency=='BTC'">{{item.investment_accumulated_income|cutZreo}}</p>
                                <p v-else>{{item.investment_accumulated_income|cutZreoFour}}</p>
                            </span>
                        </div>
                    </li>
                </ul>
                </Vscroll>
            </div>
        </div>
    </div>
</template>

<script>


import { totalIncome,phoneList } from '@/api/data'
export default {
  data(){
      return{
          choose:0,
          chooseList:[],
          resData:'',
          yan:false,
          pageid:0,
          pagesize:10,
          totalpage:'',
          count:'',
          noData:false
      }
  },
  methods: {
    check(num){
        if(this.choose != num){
            this.chooseList=[]
            this.pageid = 0;
            this.choose = num;
            let params={
                finish:this.choose
            }
            this.getApi(params);
        }
    },
    onRefresh(done){
        this.noData = false
        this.chooseList = [];
        this.pageid = 0;
        let params={
            finish:this.choose
        }
        this.getApi(params)
        done()
    },
    onInfinite(done){
        if(this.pageid < this.totalPage){
            this.pageid++;
            let params ={
                pageid:this.pageid,
                num:this.pagesize,
                finish:this.choose
            }
            this.getApi(params)
        }else{
            this.noData = true;
        }
        done()
    },
    jump(id){
        this.$router.push({name:'fund-myregular-detail',
        query:{
            id:id
        }
        })
    },
    getApi(params){
        //订单列表
        phoneList(params).then(res=>{
            this.count = res.data.data.count;
            this.totalPage = Math.ceil(this.count/this.pagesize);
            this.chooseList.push(...res.data.data.data)
            if(this.chooseList.length==0){
                this.yan = true;
            }else{
                 this.yan = false;
                let a = document.querySelector('.g_head').offsetHeight;
                let b = document.querySelector('.header').offsetHeight;
                let c = document.querySelector('.top').offsetHeight;
                let srcenHight = document.documentElement.clientHeight;
                setTimeout(() => {
                    document.querySelector('.yo-scroll').style.height = srcenHight-a-b-c+'px';
                }, 5);
            }
        })
    },
  },
  created() {
      //累计收益分红
      totalIncome().then(res=>{
          this.resData = res.data.data;
      })
        let params={
            finish:this.choose
        }
      this.getApi(params);
  },
  mounted() {
      this.$nextTick( () =>{
        let a = document.querySelector('.g_head').offsetHeight;
        let b = document.querySelector('.header').offsetHeight;
        let c = document.querySelector('.top').offsetHeight;
        let srcenHight = document.documentElement.clientHeight;
        document.querySelector('.yo-scroll').style.height = srcenHight-a-b-c+'px';
      })
  },
}

</script>

<style lang="less" scoped>
    div{
        box-sizing: border-box;
    }
    .header{
        height: 2.32rem;
        background: url('../../../../assets/imgs/666.png') left center;
        padding:0.26rem 0.45rem 0.53rem 0.43rem;
        .left{
            font-size: 0.25rem;
        }
        .right{
            font-size: 0.32rem;
            p{
                line-height: 0.44rem;
                text-align: right;
            }
        }
    }
    .main{
        .top{
            height: 0.86rem;
            background-color: #fff;
            padding: 0 2.13rem;
            line-height: 0.86rem;
            font-size: 0.29rem;
            color: #93A0AA;
            span{
                position: relative;
                display: inline-block;
                width: 1.57rem;
                height: 0.81rem;
                text-align: center;
                transition: all 1s;
                &::after{
                    position: absolute;
                    content: '';
                    width: 0;
                    height: 0.06rem;
                    left: 0;
                    right: 0;
                    bottom: -0.055rem;
                    margin: auto;
                    transition: all 1s;
                }
                &.active{
				    color: rgb(33,136,251);
                    &::after{
                        width: 1.57rem;
                        height: 0.06rem;
                        transition: all 1s;
                        background: rgb(33,136,251);
                    }
                }
                // .active{
                //     border-bottom: 0.05rem solid #0A92F7;
                //     color: #0A92F7;
                // }
            }
        }
        .down{
            position: relative;
            li{
                box-sizing: border-box;
                height: 2.02rem;
                background-color: #fff;  
                padding: 0.33rem 0.1rem 0.33rem 0.21rem;
                border-top: 0.22rem solid #ededed;
                height: 2.4rem;
                .up{
                    border-bottom: 0.01rem solid #f1f1f1;
                    p{
                        margin-bottom: 0.22rem;
                        font-size: 0.28rem;
                        color: #1F3E58;
                        width: 5rem;
                    }
                }
                .bottom{
                    margin-top: 0.26rem;
                    display: flex;
                    justify-content: space-between;
                    p:first-child{
                        font-size: 0.21rem;
                        color: #93A0AA;
                    }
                    p:last-child{
                        margin-top: 0.17rem;
                        font-size: 0.29rem;
                        color: #506271;
                    }
                    span:first-child{
                        margin-left: 0;
                    }
                }
            }
            li:last-child{
                border-bottom: 0.22rem solid #ededed;
            }
        }
    }
.yan{
    width: 4rem;
    height: 4rem;
    margin:2rem auto;
    text-align: center;
    .icon-apr-wunaibiaoqing{
        font-size: 2.5rem;
        color: #555;
    }
    p{
        color: #555;
    }
}
</style>
