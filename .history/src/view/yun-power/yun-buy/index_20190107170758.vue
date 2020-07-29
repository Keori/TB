<template>
    <div class="bg">
        <i class="iconfont icon-apr-left" @click="goBack()"></i>
        <div class="slideshow">
			<swiper loop auto height=4.72rem :list="urlList" dots-position="right" ></swiper>
		</div>
        <div class="title">
            <p>{{contents.mining_name}}</p>
            <p><span>{{(contents.price-0) | cutZreoFour}}</span><span> HKP / T</span></p>
        </div>
        <div class="price">
            <ul class="list">
				<li><span>交割日期</span><span>{{contents.trade_date}}</span></li>
				<li><span>剩余算力</span><span>{{contents.stock}} T</span></li>
				<li>
                    <span>购买</span><span>T</span>
                    <div class="plus">
                        <span class="minNum" :class="!plus?'active':''" @click="minNum"><i class="iconfont icon-apr-iconjian"></i></span>
                        <input class="num" type="number" v-model="num" @change="checkNum">
                        <span class="plusNum" :class="plus?'active':''" @click="plusNum"><i class="iconfont icon-apr-hao"></i></span>
                    </div>
                </li>
                <li><span>应支付</span><span>{{totalPrice.toFixed(2)}} HKP</span></li>
			</ul>
        </div>
        <div class="btc">
            <div class="sbtc">
            <p><img src="../../../assets/imgs/ICON/057.png" alt=""></p>
            <p>预估产出</p>
            <p>{{(contents.expect_income-0)|cutZreo}} <span class="btcc">BTC / T</span></p>
            </div>
            <ul class="list">
                <li>
                    <p><img src="../../../assets/imgs/dengpao.png" alt=""></p>
                    <p>功率</p>
                    <p>{{(contents.power-0)|cutZreoFour}} W/h</p>
                </li>
                <li>
                    <p><img style="width:0.59rem;margin-bottom:0.08rem" src="../../../assets/imgs/money.png" alt=""></p>
                    <p>管理费</p>
                    <p>每日产出的{{(contents.mining_manage_fee-0).toFixed(2)}}%</p>
                </li>
                <li>
                    <p><img style="width:0.37rem" src="../../../assets/imgs/thrunder.png" alt=""></p>
                    <p>电费</p>
                    <p>{{(contents.electricity_fee-0).toFixed(2)}}元/kw·h</p>
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
                    <a><li :class="[{active:choose==1},'']" @click="check(1)">算力介绍</li></a>
                    <a><li :class="[{active:choose==2},'']" @click="check(2)">矿机参数</li></a>
                    <a><li :class="[{active:choose==3},'']" @click="check(3)">常见问题</li></a>
                    <a><li :class="[{active:choose==4},'']" @click="check(4)">购买记录</li></a>
                </ul>
            </div>
            
            <div class="buycontent" :style="{'margin-top':(searchBarFixed?'0.9rem':'')}">
                <div id="cont1" v-show='contMessage1'>
                    <img v-for="(item,index) in imgDetail" :key="index" :src="item" alt="">
                </div>
                <div id="cont2" v-show='contMessage2'>
                    <div class="topTips"><span>矿机参数</span></div>
                        <table border="1" bgcolor="#19223b" width="100%" align="center" class="cont2Sheet">
                            <tr height="30" align="center">
                                <td width="35%">产品名称</td>
                                <td>{{contents.mining_name}}</td>
                            </tr>
                            <tr height="30" align="center">
                                <td width="35%">额定算力</td>
                                <td>{{contents.rated_ability}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">额定功耗</td>
                                <td>{{contents.reted_power}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">能耗比</td>
                                <td>{{contents.ect}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">芯片数量</td>
                                <td>{{contents.asic_sum}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">电源接口</td>
                                <td>{{contents.power_interface}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">风扇</td>
                                <td>{{contents.fan}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">运行环境</td>
                                <td>{{contents.env}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">室内噪音</td>
                                <td>{{contents.noise}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">几何尺寸</td>
                                <td>{{contents.volume}}</td>
                            </tr>
                             <tr height="30" align="center">
                                <td width="35%">净重</td>
                                <td>{{contents.weight}}</td>
                            </tr>
                        </table>
                </div>
                <div id="cont3" v-show='contMessage3'>
                    <div class="topTips"><span>常见问题</span></div>
                        <ul class="qa">
                            <li v-for="(item,index) in question" :key="index" @click="show(index)">
                                <p>{{item.question}}</p>
                                <i class="iconfont icon-apr-arrow-right" :class="chooseNum==index?'activeI':''"></i>
                                <div class="downTips" :class="chooseNum==index?'active':''">{{item.answer}}</div>
                            </li>
                        </ul>
                    </div>
                <div id="cont4" v-show='contMessage4'>
                    <div class="topTips"><span>购买记录</span></div>
                    <table border="1" width="100%" align="center" class="cont4Sheet">
                        <tr height="45" align="center" bgcolor="#2188fb">
                            <th width="33%">用户</th>
                            <th width="15%">数量（T）</th>
                            <th width="24%">金额（HKP）</th>
                            <th width="28%">购买时间</th>
                        </tr>
                        <tr v-for="(item, index) in buyRecords" :key="index" align="center">
                            <td>{{item.user_name}}</td>
                            <td>{{item.mining_sum}}</td>
                            <td>{{item.price_sum}}</td>
                            <td>{{item.created_at}}</td>
                        </tr>
                    </table>
                    </div>
            </div>
            <div class="buynow">
                <div class="left">
                    <p><span @click="checkecube" class="cube" :class="{cubes:cudecheck}"><i  class="iconfont icon-apr-duihao"></i></span><span>同意</span><span>《云算力合约》</span></p>
                </div>
                <div class="right" @click='buyNow'>立即购买</div>
            </div>
        </div>
        <PayPassword v-model="model" :amount='totalPrice.toFixed(2)' @goPay="log" :ga.sync="gaNum" :pwd.sync="payNum" ></PayPassword>
    </div>
</template>
<script>
import { Swiper } from 'vux'
import { proDetail,yunPayOrder,yunMining } from '@/api/data'

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
	urlList:[
	    {
	        url: 'javascript:;',
	        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544022197108&di=66db633ebcb9867c58ff7f9be9d49ab0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201508%2F17%2F20150817184103_cXkLz.jpeg',
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
    imgDetail:[],
    question:[],
    buyRecords:[],
    chooseNum:'',
    plus:true,
    num:'1',
    model:false,
    gaNum:'',
    payNum:'',
    contents:[]
	  }
  },
  methods:{
	  jump(){
		  this.$router.push({name:'fund-product/fund-product-detail'})
      },
      checkecube(){
          this.cudecheck = !this.cudecheck;
          console.log(this.cudecheck);
      },
      check(num){
          this.choose = num;
          if(this.choose===1){
            this.contMessage1 = true;
            this.contMessage2 = false;
            this.contMessage3 = false;
            this.contMessage4 = false;
          }else if(this.choose===2){
            this.contMessage1 = false;
            this.contMessage2 = true;
            this.contMessage3 = false;
            this.contMessage4 = false;
          }else if(this.choose===3){
            this.contMessage1 = false;
            this.contMessage2 = false;
            this.contMessage3 = true;
            this.contMessage4 = false;
          }else if(this.choose===4){
            this.contMessage1 = false;
            this.contMessage2 = false;
            this.contMessage3 = false;
            this.contMessage4 = true;
          }
      },
    //   changeHash(idName) {
    //     document.querySelector(idName).scrollIntoView(true);
    //   },
      handleScroll(){
        // //   获取当前window滚动的距离
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
       show(index){
           this.chooseNum = index;
       },
       minNum(){
           this.plus = false;
           this.num--;
           if(this.num<=0){
               this.num=1;
           }
           if(this.num<=1){
               this.plus = true
           }
       },
       plusNum(){
           this.plus = true;
           this.num++;
           if(this.num>=999){
               this.num=999;
           }
       },
       checkNum(){
           if(this.num<=0){
               this.num = 1;
           }
           if(this.num>=999){
               this.num=999;
           }
       },
       buyNow(){
           if(this.$store.state.userInfo.status_kyc_verify!=2){
               this.$router.push({name:'kycCheck'});
               return false
           }
            if(this.$store.state.userInfo.is_go_verify==0){
               this.$router.push({name:'googleCheck'});
               return false
           }
           if(!this.cudecheck){
            // this.$vux.toast.text('请先阅读并同意云算力商品合约')
            this.$vux.toast.show(
                {
                    text:'请先阅读并同意云算力商品合约',
                    type:'cancel',
                    width: '5rem'   
                }
            )
               return false
           }
           this.model = true;
       },
       log(){
           console.log(this.gaNum);
           console.log(this.payNum);
           console.log(this.num);
           console.log(this.id);
           if(!this.gaNum||!this.payNum){
               alert('支付密码和Google验证码不能为空!')
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
               switch (res.data.errcode) {
                   case 25110:
                        alert('支付密码不正确')
                       break;
                    case 0:
                                this.$vux.toast.show(
                            {
                                text:'购买成功',
                                type:'success'  
                            }
                        )
                        this.$router.push({name:'yun-Income'});
                       break;
               
                   default:
                       break;
               }
           })
       }
  },
  created() {
      this.chooseNum=null;
      this.id = this.$route.query.id
    //   console.log(this.id);
      let params = {
          'id':this.id
      }
      	yunMining(params).then((res)=>{
                this.contents = res.data.data.data[0]
                console.log(this.contents);
                this.imgDetail = this.contents.desc_image.split('|');
                let imgs = this.contents.mining_image.split('|');
                let imgg =[]
                imgs.forEach((val,index) => {
                    let img = {}
                    img.img = val;
                    img.url = 'javascript:;';
                    imgg.push(img);
                });
                this.urlList = imgg;
			})	
  },
    computed: {
        totalPrice :function(){
            return this.num*this.contents.price;
        }
    },
   mounted() {
        // console.log(this.cudecheck);
        // 为window对象scroll滚动事件添加方法
        this.offsetTop = document.querySelector('.buytitle').offsetTop;
        window.addEventListener('scroll', this.handleScroll);
        this.clheight = document.body.clientHeight/2;
        console.log(this.urlList);
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
        height: 3.25rem;
        background-color: #fff;
        margin: 0.2rem 0;
        padding: 0.48rem 0.39rem 0.39rem 0.38rem;
        .list{
			li{
				height: 0.7rem;
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
            li:nth-child(3){
                position: relative;
                .plus{
                    width: 1.87rem;
                    height: 0.63rem;
                    border:0.01rem solid #D9D9D9;
                    position: absolute;
                    right: 0.3rem;
                    top: -0.2rem;
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
                        width: 0.6rem;
                    }
                    .plusNum{
                        width: 0.6rem;
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
                    float: left;
                    height: 0.915rem;
                    width: 25%;
                    color: #93A0AA;
                     
                }
                .active{
                        border-bottom: 0.05rem solid #2188FB;
                        color: #2188FB;
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
                padding-top: 0.87rem;
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
                padding-top: 0.76rem;
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
                padding:0 0.4rem 0.3rem;
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
                 top: 0.5rem;
                 left: 0.4rem;
                .cube{
                width: 0.26rem;
                height: 0.26rem;
                line-height: 0.26rem;
                border: 0.01rem solid #CAC7CB;
                display: inline-flex;
                margin-right: 0.05rem;
                text-align: center;
                
                }
                .cubes{
                    border: 0.01rem solid #F54531;
                    background: #F54531; 
                }
                span:nth-child(2){
                    color: #6F7482;
                    font-size: 0.25rem;
                }
                span:last-child{
                    color: #00A0E9;
                    font-size: 0.25rem;
                }
                p{
                    margin-bottom: 0.15rem;
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
