<template>
    <div>
        <Header :tab1Text="$t('yun.CalculatePr')" :tab2Text="$t('yun.TheOutputsub')" @tabClick="tab"></Header>
        <!-- 算力概览TAB页面内容 -->
       <div v-if="detailview==1" class="overview">
            <div class="maintop">
                <h4 class="main-title">{{$t('yun.mainTitle')}}</h4>
                <div class="content">
                    <!-- <p><span>{{$t('yun.hashrateId')}}</span><span>{{this.oid}}</span></p> -->
                    <p><span>{{$t('yun.hashrateId')}}</span><span>{{order.oid}}</span></p>
                    <p><span>{{$t('yun.hashrateType')}}</span><span>{{order.hashrate_name|checklang}}</span></p>
                    <p><span>{{$t('yun.quantity')}}</span><span>{{order.quantity}} T</span></p>
                    <p><span>{{$t('yun.price')}}</span><span>{{order.price |cutZreoFour}} HKP</span></p>
                </div>
            </div>
            <div class="mainmiddle">
                <h4 class="main-title">{{$t('yun.mainTitle1')}}</h4>
                <div class="content content1">
                    <p><span>{{$t('yun.deliveryTime')}}</span><span>{{order.delivery_time}}</span></p>
                    <p><span>{{$t('yun.delivery1Time')}}</span><span>{{order.delivery_time}}</span></p>
                    <p><span>{{$t('yun.runTime')}}</span><span>{{order.run_time}}</span></p>
                </div>
            </div>
            <div class="mainbottom">
                <h4 class="main-title">{{$t('yun.mainTitle2')}}</h4>
                <div class="content">
                    <p><span>{{$t('public.rollout')}}(BTC)</span><span>{{order.earnings_price |cutZreo}}</span></p>
                    <p><span>{{$t('yun.ManageCost')}}(BTC)</span><span>{{order.manage_price |cutZreo}}</span></p>
                    <p><span>{{$t('yun.powerPrice')}}(BTC)</span><span>{{order.power_price |cutZreo}}</span></p>
                    <p><span>{{$t('yun.marginPrice')}}(BTC)</span><span>{{order.margin_price |cutZreo}}</span></p>
                </div>
            </div>
            <div class="down">
                <!-- <p>实际收益占矿机总收益 <span style="color:#F54531;">0.01</span>%</p> -->
                <p @click="proList">{{$t('yun.proList')}}</p>
            </div>
       </div>
       <div v-if="detailview==2" class="detailview">
           <div v-if="yan" class="yan">
               <span class="iconfont icon-apr-wunaibiaoqing"></span>
               <p>{{$t('yun.detailview')}}</p>
            </div>
           <div class="overview">
            <div class="maintop" v-for="(item, index) in bill" :key="index">
                <h4 class="main-title">{{item.profit_day}}</h4>
                <div class="content">
                    <p><span>{{$t('public.rollout')}}(BTC)</span><span>{{item.earnings_price|cutZreo}}</span></p>
                    <p><span>{{$t('yun.ManageCost')}}(BTC)</span><span>{{item.manage_price|cutZreo}}</span></p>
                    <p><span>{{$t('yun.powerPrice')}}(BTC)</span><span>{{item.power_price|cutZreo}}</span></p>
                    <p><span>{{$t('yun.marginPrice')}}(BTC)</span><span>{{item.margin_price|cutZreo}}</span></p>
                </div>
            </div>
       </div>
       </div>
    </div>
</template>
<style lang="less" scoped>
div{
    box-sizing: border-box;
}
.maintop,.mainmiddle,.mainbottom{
      .main-title{
          color: #506271;
          margin-left: 0.35rem;
          height: 0.72rem;
          line-height: 0.72rem;
      }
		.content{
            background-color: #fff;
            width: 100%;
            height: 2.58rem;
            padding: 0.45rem 0.29rem 0.39rem 0.35rem;
            font-size: 0.25rem;
            p{
                display:flex;
                justify-content: space-between;
                margin-bottom: 0.25rem;
                span:first-child{
                    color: #506271;
                }
                span:last-child{
                    color: #1F3E58;
                }
            }
        }
        .content1{
            height: 2.1rem;
        }
    }
.down{
    position: absolute;
    width: 100%;
    height: 2.58rem;
    text-align: center;
    color: #1F3E58;
    font-size: 0.29rem;
    background: #FFFFFF;
    bottom: 0;
    p{
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
    }
    p:first-child{
        top: 0.48rem;
    }
    p:last-child{
        background:linear-gradient(90deg,rgba(18,176,243,1),rgba(4,120,251,1));
        height: 0.84rem;
        width: 6.67rem;
        border-radius: 0.1rem;
        line-height: 0.84rem;
        color: #fff;
        font-size: 0.33rem;
        bottom: 0.44rem;
    }
}
.yan{
    width: 4rem;
    height: 4rem;
    margin:3rem auto;
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
<script>
import { orderDetail,yunBill } from '@/api/data'
export default{
    data(){
        return{
            detailview:1,
            oid:'',
            order:'',
            bill:[],
            yan:false
        }
    },
    methods:{
        tab(num){
            this.detailview = num;
            //如果是2就调产出明细的数据
            if(num==2){
                let params={
                    oid:this.oid
                }
                yunBill(params).then(res=>{
                    // console.log(res);
                    this.bill = res.data.data.data;
                    if(this.bill.length==0){
                        this.yan = true;
                    }
                })
            }
        },
        proList(){
            this.$router.push({name:'yuns-power'})
        }
    },
    created() {
       this.oid =  this.$route.query.id
       let params = {
           'oid':this.oid
       }
       orderDetail(params).then(res=>{
        //    console.log(res);
           this.order = res.data.data;
       })
},
}
</script>
