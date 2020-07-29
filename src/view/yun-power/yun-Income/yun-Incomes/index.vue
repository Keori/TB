<template>
    <div style="height:100vh">
        <i class="iconfont icon-apr-left" @click="goBack()"></i>
        <div ref='header' class="header" >
                <p>{{$t('funds.YesEar')}}（BTC）</p>
                <p>{{topPrice.margin_price|cutZreo}}</p>
        </div>
        <div ref='headerdown' class="headerdown">
            <div class="left">
                <p>{{$t('funds.AddEar')}}（BTC）</p>
                <p>{{topPrice.total_price|cutZreo}}</p>
            </div>
            <div class="right">
                <p>{{$t('yun.AccountYu')}}（BTC)</p>
                <p>{{coin|cutZreo}}</p>
            </div>
        </div>
        <div ref='invite' class="invite" @click="jumpinvite">
            <span>{{$t('yun.ExpandEar')}}</span>
            <p><span>{{$t('yun.alreadyInvitation')}}</span><span style="color:#F54531;"> {{inviteNum}} </span><span>{{$t('public.person')}}</span><i class="iconfont icon-apr-arrow-right"></i></p>
        </div>
         <div ref='main' class="main">
            <p class="my">
                <span @click="myYunNow" :class="!myEnd?'active':''">{{$t('funds.myCloudCal')}}</span>
                <span @click="myYunEnd" :class="myEnd?'active':''">{{$t('yun.contractover')}}</span>
                <span v-if="!myEnd">{{$t('yun.CloudCalamount')}}</span>
                <span v-else>{{$t('public.rollout')}}</span>
                </p>
            <div>
                <Vscroll v-if="!yan" :on-refresh="onRefresh" :on-infinite="onInfinite" :noData="noData">
                    <ul class="list">
                        <li v-for="(item, index) in myOrder" :key="index" @click="jumpdetail(item.oid)">
                            <span>{{item.mining_name|checklang}}</span>
                            <span v-if="!myEnd">{{item.quantity}} T</span>
                            <span v-else>{{item.margin_price|cutZreo}} BTC</span>
                        </li>
                    </ul>
                </Vscroll>
            </div>
            <div v-if="yan" class="yan">
                <span class="iconfont icon-apr-wunaibiaoqing"></span>
                <p>{{$t('yun.Nodata')}}~</p>
            </div>
		</div>
        <div class="bottom">
            <div class="left" @click="toBTC" >BTC{{$t('index.rollout')}}</div>
            <div class="right" @click="jumpmy">{{$t('yun.LookERecord')}}</div>
        </div>
    </div>
</template>

<script>
import { yunOrder,endOrder,InviteEvent,summery,account } from '@/api/data'
  export default {
      data(){
          return{
              result:'',
              myOrder:[],
              myEnd:false,
              inviteNum:'',
              topPrice:'',
              coin:'',
              yan:false,
              pass:'',
              topHight:'',
              srcenHight:'',
              noData:false,
              pagesize:10,
              pageid:0,
              totalPage:'',
              count:''
          }
      },
	methods:{
		jumpmy(){
			this.$router.push({name:'yun-Income-my'})
		},
        jumpinvite(){
            this.$router.push({name:'yun-Income-extension'})
        },
        jumpdetail(id){
            this.$router.push({name:'yun-Income-detail',query:{id:id}})
        },
        goBack(){
	  		this.$router.go(-1)
        },
        myYunNow(){
            this.pageid = 0
            this.myEnd = false;
            this.myOrder = []
            this.yunOrderNow();
          },
        myYunEnd(){
            this.pageid = 0
            this.myOrder =[]
            this.myEnd = true;
            this.yunOrderEnd();
        },
        toBTC(){
            this.$router.push({name:'BTC',query:{isOut:true}})
        },
        onRefresh(done) { //下拉刷新
            this.myOrder = []
            this.pageid = 0
            if(!this.myEnd){
                    this.yunOrderNow()
                }else{
                    this.yunOrderEnd();
                }
            done() // call done
		},
        onInfinite(done){//下拉加载
            if(this.pageid < this.totalPage){
                this.pageid++;
                let params={
                    pageid:this.pageid,
                    pagesize:this.pagesize
                }
                if(!this.myEnd){
                    this.yunOrderNow(params)
                }else{
                    this.yunOrderEnd(params);
                }
            }else{
                this.noData = true
            }
            //done无论如何都要执行才可以确保下拉事件的完整结束和下次启动
             done()
        },
        yunOrderNow(params){
            yunOrder(params).then(res=>{
                // console.log(res);
                this.count = res.data.data.count;
                this.totalPage = Math.ceil(this.count/this.pagesize);
                res.data.data.data.forEach(ele => {
                    this.myOrder.push(ele)
                });
                if(this.myOrder.length==0){
                        this.yan = true
                    }else{
                        this.yan = false
                }
            })
        },
        yunOrderEnd(params){
             endOrder(params).then(res=>{
                // console.log(res)
                this.myOrder = res.data.data.data
                if(this.myOrder.length==0){
                    this.yan = true
                }else{
                    this.yan = false
                }
            })
        },
        setHight(){
            this.topHight = this.$refs.invite.offsetHeight+this.$refs.headerdown.offsetHeight+this.$refs.header.offsetHeight;
            this.srcenHight = document.documentElement.clientHeight;
            this.$refs.main.style.height = this.srcenHight - this.topHight + 'px'
        }
    },
    created() {
        this.topPrice = JSON.parse(this.$route.query.topPrice);
        // this.coin = this.$route.query.coin;
         account().then(res=>{
                let amount = res.data.data.accounts;
				amount.forEach(val => {
					if(val.currency_name == 'BTC'){
						this.coin = val.available_amount;
					}
                });
		})
        // summery().then(res=>{
		// 		this.topPrice = res.data.data;
		// 	})
        this.yunOrderNow();
        InviteEvent().then(res=>{
            // console.log(res);
            this.inviteNum = res.data.data.buy_count;
        });
    },
    mounted() {
          this.$nextTick( () =>{
              this.setHight()
          })
    },
}
</script>

<style lang="less" scoped>
div{
    box-sizing: border-box;
}
.yan{
    width: 4rem;
    height: 4rem;
    margin:1rem auto;
    text-align: center;
    .icon-apr-wunaibiaoqing{
        font-size: 2.5rem;
        color: #555;
    }
    p{
        color: #555;
    }
}
.icon-apr-left{
    position: absolute;
    top: 0.3rem;
    left: 0.35rem;
    font-size: 0.45rem;
}
.header{
        height: 2.96rem;
        background-color: #2188fb;
        padding:1rem 2rem 0.92rem 2rem;
        text-align: center;
        p{
            color: #fff;
        }
        p:first-child{
            font-size: 0.25rem;
        }
        p:last-child{
            font-size: 0.5rem;
            margin-top: 0.41rem;
        }
    }
.headerdown{
    height: 1.49rem;
    background-color: #fff;
    padding: 0.35rem 0.91rem 0.31rem 0.37rem;
    .left{
        width: 60%;
    }
    .right{
        width: 40%;
    }
    .left,.right{
        p:first-child{
            font-size: 0.21rem;
            color: #93A0AA;
        }
        p:last-child{
            font-size: 0.33rem;
            color: #1F3E58;
            margin-top: 0.32rem;
        }
    }
}
.invite{
    height: 0.99rem;
    background-color: #fff;
    margin: 0.2rem 0;
    line-height: 0.99rem;
    padding-left: 0.34rem;
    padding-right: 0.31rem;
    color: #506271;
    display: flex;
    justify-content: space-between;
    p{
        display: inline-block;
    }
}
.main{
        overflow: scroll;
		background: #fff;
		margin-top: 0.2rem;
        padding-left: 0.38rem;
        padding-top: 0.45rem;
        padding-right: 0.29rem;
        margin-bottom: 1.02rem;
        position: relative;
        height: 5rem;
        .my{
            color: #93A0AA;
            font-size: 0.3rem;
            span:nth-child(2){
                margin-left: 0.5rem;
            }
            .active{
                color: #506271;
            }
            span:last-child{
                width: 32%;
                text-align: center;
                font-size: 0.25rem;
                margin-right: 0.38rem;
                display: inline-block;
                // float: right;
                margin-left: 0.8rem;
            }
        }
		.list{
            padding:0 0.36rem 0.26rem;
			li{
				height: 0.74rem;
                line-height: 0.74rem;
				display: flex;
				justify-content: space-between;
                border-bottom: 0.02rem solid #e9e9e9;
                font-size: 0.25rem;
                color: #1F3E58;
                span{
                    display: inline-block;
                }
                span:first-child{
                    width: 60%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                 }
                span:nth-child(2){
                    width: 25%;
                    text-align: right;
                    // position: absolute;
                }
				span:last-child{
                     width: 32%;
                    text-align: center;
                    font-size: 0.25rem;
				    margin-right: 0.38rem;
					p{
						line-height: 0.2rem;
						text-align: right;
						font-size: 0.25rem;
						margin-top: 0.3rem;
					}
				}
            }
            li:first-child{
                border-top: 0.02rem solid #e9e9e9;
                // color: #93A0AA;
            }
		}
    }
    .bottom{
        height: 1.03rem;
        width: 100%;
        background-color: #fff;
        position: fixed;
        bottom:0rem;
        z-index: 1;
        text-align: center;
        line-height: 1.03rem;
        .left,.right{
            width: 50%;
        }
        .left{
            border-top: 0.01rem solid #ccc;
            color: #506271;
        }
        .right{
            background: linear-gradient(90deg,rgba(18,176,243,1),rgba(4,120,251,1));
        }
    }
.yo-scroll{
    top: 1rem;
}
</style>
