<template>
    <div style="height:100vh">
        <i class="iconfont icon-apr-left" @click="goBack()"></i>
        <div class="header" >
                <p>昨日收益（BTC）</p>
                <p>{{result.price_yesterday}}</p>
        </div>
        <div class="headerdown">
            <div class="left">
                <p>累计收益（BTC）</p>
                <p>{{result.price_yesterday}}</p>
            </div>
            <div class="right">
                <p>持有收益（BTC)</p>
                <p>{{result.price}}</p>
            </div>
        </div>
        <div class="invite" @click="jumpinvite">
            <span>推广收益</span>
            <p><span>已邀请</span><span style="color:#F54531;">{{result.invite_count}}</span><span>人</span><i class="iconfont icon-apr-arrow-right"></i></p>
        </div>
         <div class="main">
            <p class="my"><span @click="myYunNow" :class="!myEnd?'active':''">我的云算力</span><span @click="myYunEnd" :class="myEnd?'active':''">合约结束</span></p>
			<ul class="list">
				<li><span>    </span><span>算力数量</span></li>
				<li v-for="(item, index) in myOrder" :key="index" @click="jumpdetail(item.oid)"><span>{{item.mining_name}}</span><span>{{item.begin_count}}T</span></li>
			</ul>
		</div>
        <div class="bottom">
            <div class="left" >BTC转出</div>
            <div class="right" @click="jumpmy">查看收益记录</div>
        </div>
    </div>
</template>

<script>
import { gains,yunOrder,endOrder } from '@/api/data'
  export default {
      data(){
          return{
              result:'',
              myOrder:[],
              myEnd:false
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
            this.myEnd = false;
            this.yunOrderNow();
          },
        myYunEnd(){
            this.myEnd = true;
            endOrder().then(res=>{
                console.log(res);
                this.myOrder = res.data.data.data
                
            })
        },
        yunOrderNow(){
            yunOrder().then(res=>{
            console.log(res);
            this.myOrder = res.data.data.data
            console.log(this.myOrder);
        })
        }  
    },
    created() {
        // gains().then(res=>{
        //     this.result = res.data.data;
        //     // console.log(this.result);
        // }),
        this.yunOrderNow();
     
    },
}
</script>

<style lang="less" scoped>
div{
    box-sizing: border-box;
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
        padding:1rem 2.31rem 0.92rem 2.3rem;
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
        .my{
            color: #93A0AA;
            font-size: 0.3rem;
            span:nth-child(2){
                margin-left: 0.5rem;
            }
            .active{
                color: #506271;
            }
        }
		.list{
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
                     width: 30%;
                    text-align: right;
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
                color: #93A0AA;
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
</style>
