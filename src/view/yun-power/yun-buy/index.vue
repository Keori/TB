<template>
    <div class="bg">
        <i class="iconfont icon-apr-left" @click="goBack()"></i>
        <div class="slideshow">
			<swiper loop auto height=4.72rem :list="urlList" dots-position="right" ></swiper>
		</div>
        <div class="title">
            <p>{{contents.mining_name | checklang }}</p>
            <p v-if="contents.currency=='BTC'"><span>{{contents.price | cutZreo}}</span><span> {{contents.currency}} / T</span></p>
            <p v-else><span>{{contents.price | cutZreoFour}}</span><span> {{contents.currency}} / T</span></p>
        </div>
        <div class="price">
            <ul class="list">
				<li><span>{{$t('yun.deliverydata')}}</span><span>{{$t('yun.buyafter')}}{{contents.trade_date}}{{$t('public.day')}}</span></li>
				<li><span>{{$t('yun.surplusCloudCal')}}</span><span>{{contents.stock}} T</span></li>
                <li><span>{{$t('yun.WeekEsend')}}</span><span>{{cyc}}</span></li>
				<li>
                    <span>{{$t('index.buy')}}</span><span>T</span>
                    <div class="plus">
                        <span class="minNum" :class="!plus?'active':''" @click="minNum"><i class="iconfont icon-apr-iconjian"></i></span>
                        <input class="num" type="number" v-model="num" @keyup="checkNum">
                        <span class="plusNum" :class="plus?'active':''" @click="plusNum"><i class="iconfont icon-apr-hao"></i></span>
                    </div>
                </li>
                <li v-if="contents.currency=='BTC'"><span>{{$t('yun.needpay')}}</span><span>{{totalPrice|cutZreo}} {{contents.currency}}</span></li>
                <li v-else><span>{{$t('yun.needpay')}}</span><span>{{totalPrice|cutZreoFour}} {{contents.currency}}</span></li>
			</ul>
        </div>
        <div class="btc">
            <div class="sbtc">
            <p><img src="../../../assets/imgs/ICON/057.png" alt=""></p>
            <p>{{$t('funds.Yieldrollout')}}</p>
            <p>{{contents.expect_income|cutZreo}} <span class="btcc">BTC / T</span></p>
            </div>
            <ul class="list">
                <li>
                    <p><img src="../../../assets/imgs/dengpao.png" alt=""></p>
                    <p>{{$t('yun.WT')}}</p>
                    <p>{{contents.power|cutZreoFour}} W/h</p>
                </li>
                <li>
                    <p><img style="width:0.59rem;margin-bottom:0.08rem" src="../../../assets/imgs/money.png" alt=""></p>
                    <p>{{$t('yun.ManageCost')}}</p>
                    <p>{{$t('yun.Everyrollout')}}{{(contents.mining_manage_fee-0)|cutZreoTwo}}%</p>
                </li>
                <li>
                    <p><img style="width:0.37rem" src="../../../assets/imgs/thrunder.png" alt=""></p>
                    <p>{{$t('yun.ECost')}}</p>
                    <p>{{(contents.electricity_fee-0)|cutZreoTwo}}{{$t('public.Yuan')}}/kw·h</p>
                </li>
            </ul>
        </div>
        <div class="buy">
            <div class="buytitle" :class="searchBarFixed == true ? 'isFixed' :''">
                <ul class="buylist">
                   <!-- <a @click="changeHash('#cont1')"><li :class="[{active:choose==1},'']" @click="check(1)">算力介绍</li></a>
                   <a @click="changeHash('#cont2')"><li :class="[{active:choose==2},'']" @click="check(2)">矿机参数</li></a>
                   <a @click="changeHash('#cont3')"><li :class="[{active:choose==3},'']" @click="check(3)">常见问题</li></a>
                   <a @click="changeHash('#cont4')"><li :class="[{active:choose==4},'']" @click="check(4)">购买记录</li></a> -->
                    <a><li :class="[{active:choose==1},'']" @click="check(1)">{{$t('yun.CloudCalbiref')}}</li></a>
                    <a><li :class="[{active:choose==2},'']" @click="check(2)">{{$t('yun.millparam')}}</li></a>
                    <a><li :class="[{active:choose==3},'']" @click="check(3)">{{$t('yun.Commonquestion')}}</li></a>
                    <a><li :class="[{active:choose==4},'']" @click="check(4)">{{$t('yun.buyRecord')}}</li></a>
                </ul>
            </div>
            <div class="buycontent" :style="{'margin-top':(searchBarFixed?'0.9rem':'')}">
                <div id="cont1" v-show='choose==1'>
                    <img v-for="(item,index) in imgDetail" :key="index" :src="item" alt="">
                </div>
                <div id="cont2" v-show='choose==2'>
                    <div class="topTips"><span>{{$t('yun.CloudCalbiref')}}</span></div>
                        <table border="1" bgcolor="#19223b" width="100%" align="center" class="cont2Sheet">
                            <tr height="30" align="center">
                                <td width="35%">{{$t('yun.miningName')}}</td>
                                <td>{{contents.product_name}}</td>
                            </tr>
                            <tr height="30" align="center">
                                <td width="35%">{{$t('yun.ratedAbility')}}</td>
                                <td>{{contents.rated_ability}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">{{$t('yun.retedPower')}}</td>
                                <td>{{contents.reted_power}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">{{$t('yun.ect')}}</td>
                                <td>{{contents.ect}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">{{$t('yun.asicSum')}}</td>
                                <td>{{contents.asic_sum}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">{{$t('yun.powerInterface')}}</td>
                                <td>{{contents.power_interface}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">{{$t('yun.fan')}}</td>
                                <td>{{contents.fan}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">{{$t('yun.env')}}</td>
                                <td>{{contents.env}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">{{$t('yun.noise')}}</td>
                                <td>{{contents.noise}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">{{$t('yun.volume')}}</td>
                                <td>{{contents.volume}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">{{$t('yun.weight')}}</td>
                                <td>{{contents.weight}}</td>
                            </tr>
                        </table>
                </div>
                <div id="cont3" v-show='choose==3'>
                    <div class="topTips"><span>{{$t('yun.Commonquestion')}}</span></div>
                        <ul class="qa">
                            <li v-for="(item,index) in question" :key="index" @click="show(index)">
                                <p>{{item.question}}</p>
                                <i class="iconfont icon-apr-arrow-right" :class="chooseNum==index?'activeI':''"></i>
                                <div class="downTips" :class="chooseNum==index?'active':''">{{item.answer}}</div>
                            </li>
                        </ul>
                    </div>
                <div id="cont4" v-show='choose==4'>
                    <div class="topTips"><span>{{$t('yun.buyRecord')}}</span></div>
                    <table border="1" width="100%" align="center" class="cont4Sheet">
                        <tr height="45" align="center" bgcolor="#2188fb">
                            <th width="33%">{{$t('yun.User')}}</th>
                            <th width="15%">{{$t('yun.amount')}}（T）</th>
                            <th width="24%">{{$t('yun.money')}}（HKP）</th>
                            <th width="28%">{{$t('yun.buyTime')}}</th>
                        </tr>
                        <tr v-for="(item, index) in buyRecords" :key="index" align="center">
                            <td>{{item.nickname|nameStar}}</td>
                            <td>{{item.quantity}}</td>
                            <td>{{item.price|cutZreoFour}}</td>
                            <td>{{item.created_at}}</td>
                        </tr>
                    </table>
                    </div>
            </div>
            <div class="buynow">
                <div class="left">
                    <p v-if="contents.currency=='BTC'">
                        <span>{{$t('yun.RealBuy')}}：</span>
                        <span class="text-overflow">{{totalPrice|cutZreo}}</span>
                        <span>{{contents.currency}}</span>
                    </p>
                    <p class="text-overflow" v-else>
                        <span>{{$t('yun.RealBuy')}}：</span>
                        <span >{{totalPrice|cutZreoFour}}</span>
                        <span>{{contents.currency}}</span>
                    </p>
                </div>
                <div class="right" @click='buyNow'>{{$t('funds.buyRnow')}}</div>
            </div>
        </div>
        <PayPassword v-if="contents.currency=='BTC'" v-model="model" :amount='totalPrice|cutZreo' :unit='contents.currency' @goPay="log" @goReg="regGo" @checkPass="passCheck" :ga.sync="gaNum" :pwd.sync="payNum"></PayPassword>
        <PayPassword v-else v-model="model" :amount='totalPrice|cutZreoFour' :unit='contents.currency' @goPay="log" @goReg="regGo" @checkPass="passCheck" :ga.sync="gaNum" :pwd.sync="payNum" ></PayPassword>
        <Alert :value="tips" :txt="$t('public.NOYU')" :cancel_text="$t('public.shut')" @on-cancel='buyCanle' :ok_text="$t('public.wechatPay')" @on-confirm="goWeChat"></Alert>
    </div>
</template>
<script>
import { Swiper } from 'vux'
import { proDetail,yunPayOrder,yunMining,currencylist,account,yunBuyRecord } from '@/api/data'

export default {
  components: {
    Swiper
  },
  data(){
	  return{
            cudecheck:false,
            contMessage1: true,
            contMessage2: false,
            contMessage3: false,
            contMessage4: false,
            tips:false,
            urlList:[
                {
                    url: 'javascript:;',
                    img: '',
                },
    ],
    choose:'1',
    searchBarFixed:false,
    cont1:'',
    cont2:'',
    cont3:'',
    cont4:'',
    clheight:'',
    offsetTop:'',
    id:'',
    quantity: '',
    mprice: '',
    created_at: '',
    imgDetail:[],
    question:[],
    buyRecords:[],
    chooseNum:'',
    plus:true,
    num:'1',
    model:false,
    gaNum:'',
    payNum:'',
    contents:[],
    tomoney: '',
    cyc:'',
    balance:''
	}
  },
  methods:{
	  jump(){
		  this.$router.push({name:'fund-product/fund-product-detail'})
      },
      checkecube(){
          this.cudecheck = !this.cudecheck;
      },
      check(num){
          this.choose = num;
      },
      passCheck(){
           let reg = new RegExp(/^[A-Za-z0-9]{1,15}$/);
           if(!reg.test(this.payNum)){
                this.payNum=""
                this.$vux.toast.show({
					text: this.$t('public.pwdlayoutmis'),
					type: 'cancel',
					width: '2.5rem'
                })
           }
      },
    //   changeHash(idName) {
    //     document.querySelector(idName).scrollIntoView(true);
    //   },
      handleScroll(){
        //获取当前window滚动的距离
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          if (scrollTop > 925) {
                this.searchBarFixed = true
            } else {
                this.searchBarFixed = false
            }
        },
        goBack(){
            this.$router.go(-1)
        },
        regGo(){
            if(this.gaNum){
                let reg = new RegExp(/^[0-9]{1,6}$/);
                if(!reg.test(this.gaNum)){
                    this.gaNum =''
                    this.$vux.toast.show({
                    text: this.$t('public.GaCode'),
                    type: 'cancel',
                    width: '6rem'
                })
                }
            }
        },
       show(index){
           this.chooseNum = index;
       },
       minNum(){
           this.plus = false;
           this.num--;
           if(this.num<=0){
               this.num=1;
               this.$vux.toast.show({
                   text: this.$t('public.buyacountNO'),
                   type: 'cancel',
                   width: '6rem'
               })
           }
       },
       plusNum(){
           this.plus = true;
           this.num++;
           if(this.num>=this.contents.stock){
               this.num=this.contents.stock;
               this.$vux.toast.show({
                   text: this.$t('public.buyacountNO1'),
                   type: 'cancel',
                   width: '6rem'
               })
           }
       },
       checkNum(){
           let reg = new RegExp(/^[1-9]\d*$/);
           if(!reg.test(this.num)){
               this.num=''
           }
           if(this.num > this.contents.stock){
               this.num=this.contents.stock;
               this.$vux.toast.show({
                   text: this.$t('public.buyacountNO1'),
                   type: 'cancel',
                   width: '6rem'
               })
           }
       },
       buyCanle(){
            this.tips = false;
       },
       buyNow(){
           account().then(res=>{
               res.data.data.accounts.forEach(val=>{
                   if(this.contents.currency == val.currency_name){
                      this.balance = val.available_amount;
                   };
               })
                //如果餘額小於購買金額则提示

               if((this.balance-0)<(this.totalPrice-0)){
                   console.log(this.totalPrice);
                   console.log(this.balance-0);
                   this.tips = true;
                   return false
               }
               if(this.contents.stock<=0){
               this.$vux.toast.show({
                   text: this.$t('public.buyacountNO2'),
                   type: 'cancel',
                   width: '6rem'
               })
               return false
                }
                if(this.$store.state.userInfo.status_kyc_verify!=2){
                    this.$router.push({name:'kycCheck'});
                    return false
                }
                    if(this.$store.state.userInfo.is_go_verify==0){
                    this.$router.push({name:'googleCheck'});
                    return false
                }
                if(!this.totalPrice){
                    this.$vux.toast.show({
                        text: this.$t('public.butacountNO3'),
                        type: 'cancel',
                        width: '6rem'
                    })
                    return false
                }
                this.model = true;
           })
       },
       goWeChat(){
           this.$router.push({name:'PaymentCode',
            query:{
                price:this.totalPrice,
                payType:0
            }
           })
       },
       log(){
            if(!this.gaNum&&!this.payNum){
               this.$vux.toast.show({
                   text: this.$t('public.payGanosame'),
                   type: 'cancel',
                   width: '5.5rem'
               })
               return false;
           }else if(!this.payNum){
               this.$vux.toast.show({
                   text: this.$t('public.paypwdnospace'),
                   type: 'cancel',
                   width: '3.2rem'
               })
               return false;
           }else if(!this.gaNum){
               this.$vux.toast.show({
                   text: this.$t('public.GoogleNoempty'),
                   type: 'cancel',
                   width: '4rem'
               })
               return false;
           }
           let data = {
               'password':this.$md5(this.payNum),
               'code':this.gaNum,
               //下单数量
               'quantity':(this.num-0),
               'mining_id':(this.id-0)
           }
            yunPayOrder(data).then(res=>{
                // console.log(res);
               switch (res.data.errcode) {
                    case 25110:
                        this.$vux.toast.show({
                            text: this.$t('public.payNcorrect'),
                            type: 'cancel',
                            width: '3rem'
                        })
                        break;
                    case 25003:
                        this.$vux.toast.show({
                            text: this.$t('public.GoogleVerErr'),
                            type: 'cancel',
                            width: '3rem'
                        })
                        break;
                    case 25006:
                        this.$vux.toast.show({
                            text: this.$t('public.GDNotoff'),
                            type: 'cancel',
                            width: '3.5rem'
                        })
                        break;
                    case 25001:
                        this.$vux.toast.show({
                            text: this.$t('public.payNcorrect'),
                            type: 'cancel',
                            width: '3.5rem'
                        })
                        break;
                    case 0:
                        this.$vux.toast.show(
                            {
                                text: this.$t('public.buysuccess'),
                                type:'success'
                            }
                        )
                        this.$router.push({name:'bill-info',query:{oid:res.data.data.oid}});
                       break;
                    default:
                         break;
               }
           })
       },
  },
  created() {
      this.chooseNum=null;
      this.id = this.$route.query.id
      let params = {
          'id':this.id
      }
        yunMining(params).then((res)=>{
                // console.log(res);
                this.contents = res.data.data.data[0]
                console.log(this.contents);
                
                switch (this.contents.income_type) {
                    case 1:
                        this.cyc=this.$t('public.daySend')
                        break;
                    case 2:
                        this.cyc=this.$t('public.monthSend')
                        break;
                    case 3:
                        this.cyc=this.$t('public.weekSend')
                        break;
                    default:
                        this.cyc=this.$t('yun.days')
                        break;
                }
                this.imgDetail = this.contents.desc_image.split('|');
                let imgs = this.contents.mining_image.split('|');
                // imgs = imgs.slice(0,imgs.length-1)
                let imgg =[]
                imgs.forEach((val,index) => {
                    let img = {}
                     if(val){
                       img.img = val;
                       img.url = 'javascript:;';
                       imgg.push(img);
                    }
                });
                this.urlList = imgg;
                console.log(this.urlList);
            })
            let param = {'mining_id':this.id}
            yunBuyRecord(param).then((res) => {
                this.buyRecords = res.data.data.data
            })
  },
    computed: {
        totalPrice(){
            return this.$options.filters.cutZreoFour(this.num * this.contents.price);
        }
    },
   mounted() {
        // 为window对象scroll滚动事件添加方法
        this.offsetTop = document.querySelector('.buytitle').offsetTop;
        window.addEventListener('scroll', this.handleScroll);
        this.clheight = document.body.clientHeight/2;
   },
   destroyed () {
    // 离开该页面需要移除此事件 不然会报错
    window.removeEventListener('scroll', this.handleScroll)
    },
}
</script>

<style lang="less" scoped>
    div,li{
        box-sizing: border-box;
    }
    .icon-apr-left{
        position: absolute;
        top: 0.3rem;
        left: 0.35rem;
        font-size: 0.45rem;
        color: #858585;
        z-index: 1;
    }
    .title{
        height: 1.84rem;
        background: #fff;
        padding-top: 0.4rem;
        p{
            margin-left: 0.38rem;
        }
        p:first-child{
            font-size: 0.33rem;
            color: #1F3E58;
        }
        p:last-child{
            margin-top: 0.32rem;
            color: #F54531;
            span:first-child{
                font-size: 0.35rem;
                font-weight: 700;
            }
            span:last-child{
                font-size: 0.25rem;
            }
        }
    }
    .price{
        height: auto;
        background-color: #fff;
        margin: 0.2rem 0;
        padding: 0.48rem 0.39rem 0.25rem 0.38rem;
        .list{
			li{
				height: 0.75rem;
				display: flex;
				justify-content: space-between;
                font-size: 0.29rem;
                color: #1F3E58;
				span:last-child{
					p{
						line-height: 0.2rem;
						text-align: right;
					}
				}
            }
            li:nth-child(4){
                position: relative;
                .plus{
                    width: 2.5rem;
                    height: 0.6rem;
                    border:0.01rem solid #D9D9D9;
                    position: absolute;
                    right: 0.3rem;
                    top: -0.17rem;
                    display: flex;
                    justify-content: space-between;
                     line-height: 0.63rem;
                     text-align: center;
                    span{
                        display: inline-block;
                        height: 100%;
                    }
                    .minNum{
                        width: 0.6rem;
                        border-right: 0.01rem solid #D9D9D9;
                        .icon-apr-iconjian{
                            font-size: 0.55rem;
                        }
                    }
                    .num{
                        color: #000;
                        text-align: center;
                        width: 1rem;
                    }
                    .plusNum{
                        width: 0.6rem;
                        border-left: 0.01rem solid #D9D9D9;
                        .icon-apr-hao{
                            font-size:0.3rem;
                        }
                    }
                    .active{
                        color: #fff;
                        background-color: #2188fb;
                    }
                }
            }
		}
    }
    .btc{
        height: 6.35rem;
        background-color: #fff;
        margin-bottom: 0.2rem;
        p{
            text-align: center;
        }
        .sbtc{
            p:first-child{
            img{
                width: 1.03rem;
                margin-top: 0.69rem;
            }
            }
            p:nth-child(2){
                color: #93A0AA;
                font-size: 0.25rem;
                margin:0.48rem 0;
            }
            p:nth-child(3){
            color: #1F3E58;
            font-size: 0.38rem;
            font-weight: 700;
            .btcc{
                font-size: 0.25rem;
                font-weight: 500;
            }
        }
        }
        .list{
            margin-top: 0.85rem;
            display: flex;
            li{
                border-right: 0.01rem solid #f6f6f6;
                width: 33.3333%;
                img{
                    width: 0.41rem;
                }
                p:nth-child(2){
                    color: #1F3E58;
                    font-size: 0.25rem;
                    margin-top: 0.28rem;
                    margin-bottom: 0.13rem;
                }
                p:last-child{
                    color: #93A0AA;
                    font-size: 0.18rem;
                }
            }
            li:last-child{
                border: none;
            }
        }
    }
    .buy{
        .buytitle{
            height: 0.92rem;
            width: 100%;
            background-color: #fff;
            line-height: 0.92rem;
            text-align: center;
            font-size: 0.29rem;
            z-index: 2;
            .buylist{
                li{
                    position: relative;
                    float: left;
                    height: 0.915rem;
                    width: 25%;
                    color: #93A0AA;
                    transition: all 1s;
                    &::after{
                        position: absolute;
                        content: '';
                        width: 0;
                        height: 0.05rem;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        transition: all 1s;
                    }
                    &.active{
                        color:#2188FB;
                        &::after{
                            position:absolute;
                            content: '';
                            width: 100%;
                            height: 0.05rem;
                            left: 0;
                            bottom: 0;
                            background:#2188FB;
                            transition: all 1s;
                        }
                    }
                }
            }
        }
        .buycontent{
            margin-bottom: 1.12rem;
            img{
                width: 100%;
                vertical-align: bottom;
            }
            #cont2,#cont3,#cont4{
                .topTips{
                    width: 1.79rem;
                    height: 0.58rem;
                    border-radius: 0.28rem;
                    background:linear-gradient(90deg,rgba(197,10,225,1),rgba(108,21,221,1));
                    margin:0 auto;
                    line-height: 0.58rem;
                    text-align: center;
                    font-weight: 700;
                }
            }
            #cont2{
                background: #fff;
                padding-top: 0.2rem;
                // padding-top: 0.87rem;
                .cont2Sheet{
                    width: 6.85rem;
                    margin: 0 auto;
                    margin-top: 0.49rem;
                    font-size: 0.24rem;
                    color: #CFE0F3;
                    td{
                        border:0.01rem solid #29385e;
                    }
                }
            }
            #cont3{
                // padding-top: 0.76rem;
                padding-top: 0.2rem;
                padding-bottom: 0.3rem;
                background-color: #fff;
                .qa{
                    color: #1F3E58;
                    padding: 0.74rem 0.3rem 0rem 0.38rem;
                    font-size: 0.25rem;
                    li{
                        margin-bottom: 0.2rem;
                        position: relative;
                        text-align: left;
                        p{
                            width: 6.2rem;
                            line-height: 0.4rem;
                        }
                        .icon-apr-arrow-right{
                            position: absolute;
                            right: 0rem;
                            top: 0rem;
                        }
                        .activeI{
                            transform: rotate(90deg);
                            transition: 0.4s;
                        }
                        .downTips{
                            display: none;
                            background: #ededed;
                            color: #93A0AA;
                            font-size: 0.25rem;
                            line-height: 0.35rem;
                            padding:0.36rem 0.37rem 0.39rem 0.38rem;
                            margin-top: 0.1rem;
                        }
                        .active{
                            display:block;
                        }
                    }
                }
            }
            #cont4{
                background-color: #fff;
                padding:0.2rem 0.4rem 0.3rem;
                margin-bottom: 1.12rem;
                .cont4Sheet{
                    margin-top: 0.43rem;
                    border:1px solid #eeeeee;
                    th{
                        text-align: center;
                    }
                    td{
                        color: #1F3E58;
                        height: 0.61rem;
                        font-size: 0.25rem;
                    }
                }
            }
        }
        .buynow{
            height: 1.12rem;
            background-color: #fff;
            position: fixed;
            bottom: 0px;
            width: 100%;

            .left{
                 position: absolute;
                 top: 0.45rem;
                 left: 0.4rem;
                p{
                    max-width: 4rem;
                    margin-bottom: 0.15rem;
                    span:nth-of-type(1){
                        color: #000000;
                    }
                    span:nth-of-type(2){
                        font-size: 0.38rem;
                        
                    }
                    span:nth-of-type(2),span:nth-of-type(3){
                        color: #F54531;
                    }
                }
            }
            .right{
                height: 1.12rem;
                width: 2.43rem;
                background: linear-gradient(90deg,rgba(3,194,252,1),rgba(0,106,225,1));
                text-align: center;
                line-height: 1.12rem;
                font-size: 0.33rem;
            }
        }
    }
    .isFixed{
        position: fixed;
        top: 0px;
    }
</style>
