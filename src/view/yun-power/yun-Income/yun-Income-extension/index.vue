<template>
    <div>
        <Header :title="$t('yun.ExpandEar')"></Header>
        <i class="iconfont icon-apr-tianjiayonghu" @click="jumpyuninvite"></i>
        <div class="header">
                <span>{{$t('yun.AddEarbouns')}}</span>
                <span style="float:right">{{topValue|cutZreoFour}}<span style="font-size:0.24rem;margin-left:0.1rem">HKP</span></span>
        </div>
        <div class="time">
            <i class="iconfont icon-apr-right"></i>
            <i class="iconfont icon-apr-left"></i>
             <group :title="$t('')">
                <datetime
                    v-model="value1"
                    format="YYYY年-MM月"
                    @on-change="change"
                    :title="$t('')"
                    @on-confirm="onConfirm"
                    :cancel-text="$t('public.close')"
                    :confirm-text="$t('public.confirm')"
                    >
                    </datetime>
                    <img class="Dtime" src="../../../../assets/imgs/time.png" alt="">
              </group>
        </div>
        <div class="main">
            <div class="title">
                <span>{{$t('public.data')}}</span>
                <span>{{$t('public.Earbouns')}}(HKP)</span>
            </div>
           <div v-if="yan" class="yan">
               <span class="iconfont icon-apr-wunaibiaoqing"></span>
               <p>{{$t('yun.detailview')}}</p>
            </div>
            <div ref="cont" v-if="!yan" class="content">
                 <Vscroll :on-refresh="onRefresh" :noData="noData" :on-infinite="onInfinite">
                    <ul ref="contList" class="list">
                        <li v-for="(item, index) in downData" :key="index"><span>{{item.income_day}}</span><span>{{item.income_fee | cutZreoFour}}</span></li>
                    </ul>
                </Vscroll>
            </div>
        </div>
    </div>
</template>

<script>
import { Datetime, Group, XButton } from 'vux'
import { inviteGains,inviteIncome,yunInviteIncomes } from '@/api/data'

export default {
  components: {
    Datetime,
    Group,
    XButton
  },
  data () {
    return {
      value1: '',
      topValue:'',
      downData:[],
      noData:false,
      contListHeight:'',
      pagesize:10,
      pageid:0,
      totalPage:'',
      count:'',
      isdate:'',
      yan:false
    }
  },
  methods: {
    jumpyuninvite(){
        this.$router.push({name:'yun-invite'})
    },
    log (str1, str2 = '') {
   
    },
    formatDate(val){
        var reg =  /[\u4e00-\u9fa5]/g;
        var a = val.replace(reg,'')
        return a
    },
    change (value) {
        this.downData = []
        this.isdate = this.formatDate(value);
        let params={
            income_month:this.isdate
        }
        this.getApi(params);
    },
    onConfirm (val) {
        //格式化拿到的日期 然后传给后台调用接口回传数据
      let a = this.formatDate(this.value1)
    },
    //下拉刷新 完成要执行的
		onRefresh(done) {
            this.noData = false
            this.downData = []
            this.pageid = 0
            this.getApi()   
            done() // call done
		},
		//上拉加载要执行的
		onInfinite(done) {
             if(this.pageid < this.totalPage){
                   this.pageid++;
                let params={
                    income_month:this.isdate?this.isdate:'',
                    pageid:this.pageid,
                    pagesize:this.pagesize
                }
                this.getApi(params)
             }else{
                 this.noData = true
             }
			done()
        },
        getApi(params){
            yunInviteIncomes(params).then(res=>{
                // console.log(res);
                this.topValue = res.data.data.total
                this.count = res.data.data.count;
                this.totalPage = Math.ceil(this.count/this.pagesize);
                this.downData.push(...res.data.data.data)
                // setTimeout(() => {
                //     this.contListHeight = this.$refs.contList.offsetHeight;
                //     this.$refs.cont.style.height = this.contListHeight + 'px';
                // },5);
                 if(this.downData.length==0){
                        this.yan = true
                    }else{
                        this.yan = false
          }
            })
        }
    // min(){ //点击左箭头减少月份 遇1年份-1 月份置12
    //     let a = this.formatDate(this.value1)
    //     var b = a.split('-')
   
    //     let year = b[0];
    //     let month = b[1]-1;
    //     if(month<1){
    //         year = b[0]-1;
    //         month = 12;
    //     }
    //     if(month<10){
    //         month = '0'+month;
    //     }
    //     //把格式化后的年月给予当前值
    //     this.value1 = year+'年'+'-'+month+'月'
    //     //把可以传接口查值的数据拿到 以便后续调用
    //     let Mdate = year+'-'+month;
    
    // },
    // add(){ //点击右箭头增加月份 遇12年份+1 月份置1
    //     let a = this.formatDate(this.value1)
    //     var b = a.split('-')
   
    //     let year = (b[0]-0);
    //     let month = (b[1]-0)+1;
    //     if(month>12){
    //         year =(b[0]-0)+1;
    //         month = 1;
    //     }
    //     if(month<10){
    //         month = '0'+month;
    //     }
    //     this.value1 = year+'年'+'-'+month+'月';

    //     let Mdate = year+'-'+month;

   
    // }
  },
  mounted() {
      this.$nextTick( () =>{
        let a = document.querySelector('.g_head').offsetHeight;
		let b = document.querySelector('.header').offsetHeight;
		let c = document.querySelector('.time').offsetHeight +document.querySelector('.title').offsetHeight ;
        let srcenHight = document.documentElement.clientHeight;
        document.querySelector('.content').style.height = srcenHight-a-b-c+'px';
    })
  },
  created() {
      var myDate = new Date();
      //获取当前年月当做默认值
      this.value1 = myDate.getFullYear()+'年'+'-'+myDate.getMonth()+1+'月'
     
      this.getApi()
    //   inviteGains().then(res=>{
  
    //       this.topValue = res.data.data.income_sum;
    //   })
    //   inviteIncome().then(res=>{
    //   })
  },
}
</script>

<style lang="less" scoped>
    div{
        box-sizing: border-box;
    }
    .icon-apr-tianjiayonghu{
		position: absolute;
		right: 0.26rem;
		top: 0.2rem;
		color: #506271;
		font-size: 0.5rem;
	}
    .header{
        height: 1.19rem;
        background-color: #2188fb;
        padding:0.49rem 0.41rem 0.46rem 0.4rem;
        color: #fff;
        span:first{
            font-size: 0.28rem;
        }
    }
    .time{
        height: 0.85rem;
        background: #fff;
        margin-top: -0.26rem;
        position: relative;
        .icon-apr-right{
            position: absolute;
            width: 0.4rem;
            color: #93A0AA;
            top: 36%;
            left: 64%;
            z-index: 1;
        }
        .icon-apr-left{
            position: absolute;
            width: 0.4rem;
            color: #93A0AA;
            top: 36%;
            left: 27%;
            z-index: 1;
        }
        img{
            width: 0.37rem;
            position: absolute;
            top: 33%;
            left: 72%;
        }
        .icon-apr-right,.icon-apr-left,img{
            pointer-events:none;
        }
    }
    .main{
        height: auto;
        .title{
            height: 0.82rem;
            line-height: 0.82rem;
            color: #93A0AA;
            padding-left: 1.46rem;
            padding-right: 0.89rem;
            display: flex;
            justify-content: space-between;
            font-size: 0.28rem;
        }
        .content{
        background-color: #fff;
        position: relative;
        .list{
			li{
                padding-left: 0.98rem;
                padding-right: 0.89rem;
				height: 0.97rem;
				line-height: 0.97rem;
				display: flex;
				justify-content: space-between;
                border-bottom: 0.02rem solid #e9e9e9;
                font-size: 0.25rem;
                color: #1F3E58;
				span:last-child{
					p{
						line-height: 0.2rem;
						text-align: right;
						margin-top: 0.3rem;
					}
				}
            }
            li:last-child{
                border-bottom: none;
            }
		}
    }
    }
    .center {
  padding-top: 10px;
  padding-left: 15px;
  color: green;
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
<style scoped>
.weui-cell_access /deep/ .weui-cell__ft{
    text-align: center;
}
.weui-cell_access /deep/ .weui-cell__ft .vux-cell-value{
    color: #1F3E58;
}
.dp-item /deep/ .dp-right .vux-datetime-confirm{
    color: #0a92f7;
}
.time /deep/ .dp-item{
    color: #0a92f7;
}
.time /deep/ .dp-item.dp-right{
    color: #0a92f7;
}
.weui-cell_access /deep/ .weui-cell__ft:after{
    display: none;
}
</style>

