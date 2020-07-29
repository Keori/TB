<template>
    <div>
        <Header :title="$t('yun.ERecord')"></Header>
        <div class="bg">
        <div class="takebar">
            <span :class="{ active: choose==1 }" @click="check(1)">{{$t('yun.DaysEar')}}</span>
            <span :class="{ active: choose==2 }" @click="check(2)">{{$t('yun.MonthsEar')}}</span>
            <span :class="{ active: choose==3 }" @click="check(3)">{{$t('funds.AddEar')}}</span>
        </div>
        <div v-show="choose==1" class="main">
            <p>{{$t('yun.DaysEar')}} (BTC)</p>
            <p>+ {{dayIncome.BTC|cutZreo}}</p>
            <p><i class="iconfont icon-apr-shijian">&nbsp;</i>{{dayIncome.day}}</p>
            <div class="charts">
            <p>{{$t('yun.Unit')}}：BTC</p>
            <div class="chart-wrapper">
                <canvas id="mountNodeDay"></canvas>
            </div>
            <!-- <v-chart :data="dataday">
             <v-bar />
            <v-scale x :tick-count="2"/>
            <v-scale y :min="0" :tick-count="5" />
            <v-guide type="tag" :options="tag" />
            <v-tooltip :show-item-marker="false" />
            </v-chart> -->
            </div>
        </div>
        <div v-show="choose==2" class="main">
            <p>{{$t('yun.MonthsEar')}} (BTC)</p>
            <p>+ {{monthIncome.BTC|cutZreo}}</p>
            <p><i class="iconfont icon-apr-shijian">&nbsp;</i>{{monthIncome.day}}</p>
            <div class="charts">
            <p>{{$t('yun.Unit')}}：BTC</p>
            <div class="chart-wrapper">
                <canvas id="mountNodeMonth"></canvas>
            </div>
            <!-- <v-chart :data="datamonth">
             <v-bar />
            <v-scale x :tick-count="2"/>
            <v-scale y :min="0" :tick-count="5" />
            <v-guide type="tag" :options="tag" />
            <v-tooltip :show-item-marker="false" />
            </v-chart> -->
            </div>
        </div>
        <div v-show="choose==3" class="main">
            <p>{{$t('funds.AddEar')}} (BTC)</p>
            <p>+ {{totalIncome.tem|cutZreo}}</p>
            <p><i class="iconfont icon-apr-shijian">&nbsp;</i>{{totalIncome.time}}</p>
            <div class="charts">
            <p>{{$t('yun.Unit')}}：BTC</p>
            <div class="chart-wrapper">
                <canvas id="mountNodeTotal"></canvas>
            </div>
            <!-- <v-chart :data="datatotal">
            <v-scale x :tick-count="2" />
                <v-scale y :min="0" alias="BTC" :tick-count="5" />
                <v-point
                :style="{
                stroke: '#fff',
                lineWidth: 1
                }"
                shape="smooth" />
            <v-line shape="smooth" />
            </v-chart> -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {summeryDay,summeryMonth,summeryTotal} from '@/api/data'
const F2 = require('@antv/f2');
export default {
  data () {
    return {
        dataday:[],
        datamonth: [],
        datatotal: [],
        tag: {
            position: [ 9, 0.00000400 ],
            content: '2018-12-10',
            direct: 'tl',
            offsetY: -5,
        },
            choose:1,
        dayIncome:{
            BTC:'',
            day:new Date().YMD(0)
        },
        monthIncome:{
            BTC:'',
            day:new Date().YMD(0)
        },
        totalIncome:{
            BTC:0.00000400,
            time:'2018-12-25-2019-01-18'
        },
    }
  },
 methods:{
      SDay(){
          summeryDay().then(res=>{
            this.dataday = []
          let a = res.data.data;
          let pass;
          a.forEach((val,index) => {
            //   if(val.total_count==1){
            if(this.dayIncome.day == val.order_day){
                this.dayIncome.BTC = val.total_price
            }
              pass={}
              pass.day = val.order_day;
              pass.BTC = val.total_price||0.00000000;
              this.dataday.push(pass);
            //   }
          });
          this.dataday = this.dataday.reverse();
          this.mountNodeDay();
      })
      },
      check(num){
          this.choose = num;
          switch (num) {
              case 1:
                  this.SDay();
                  break;
              case 2:
                  summeryMonth().then(res=>{
                  this.datamonth = []
                  let a = res.data.data;
                  this.monthIncome.day = this.monthIncome.day.substring(0,7);
                  let pass;
                  a.forEach((val,index)=>{
                      if(this.monthIncome.day == val.order_month){
                            this.monthIncome.BTC = val.total_price
                      }
                      pass={};
                      pass.day = val.order_month;
                      pass.BTC = val.total_price||0;
                      this.datamonth.push(pass);
                  })
                  this.datamonth = this.datamonth.reverse();
                  
                    setTimeout(() => {
                        this.mountNodeMonth();
                    }, 10);
                })
                  break;
              case 3:
                    summeryTotal().then(res=>{
                    this.datatotal = []
                    this.totalIncome.time = res.data.data.start_day + '~' + res.data.data.start_day;
                    let a = res.data.data.data;
                    let pass;
                      a.forEach((val,index)=>{
                      pass={};
                      pass.time = val.profit_day;
                      pass.tem = val.price||0;
                      this.datatotal.push(pass);
                  })
                    setTimeout(() => {
                        this.mountNodeTotal();
                    }, 10);
                })
                  break;
          }
      },
      mountNodeDay(){
        // 1.创建chart对象 这里可以指定ID名称 来区分每一张图表
        var chart = new F2.Chart({
        id: mountNodeDay,
        pixelRatio: window.devicePixelRatio
        // 指定分辨率
        });
        // 2.载入数据源 数据来自data tickCount刻度轴显示量
        chart.source(this.dataday, {
        BTC: {
            tickCount: 4
        },
        day:{
             tickCount: 2,
        }
        });
        var that =this;
        // tooltip提示信息
        chart.tooltip({
        showItemMarker: false,
        onShow: function onShow(ev) {
            var items = ev.items;
            that.dayIncome = ev.items[0].origin;
        }
        });
        // 3.创建图形语法,绘制柱状图 由year和sales两个属性决定图形的位置
        chart.interval().position('day*BTC');
        // 4.渲染图表
        chart.render();
      },
      mountNodeMonth(){
        // 1.创建chart对象 这里可以指定ID名称 来区分每一张图表
        var chart = new F2.Chart({
        id: 'mountNodeMonth',
        pixelRatio: window.devicePixelRatio
        // 指定分辨率
        });
        // 2.载入数据源 数据来自data tickCount刻度轴显示量
        chart.source(this.datamonth, {
        BTC: {
            tickCount: 4
        },
        day:{
             tickCount: 2,
        }
        });
        // tooltip提示信息
        var that =this;
        chart.tooltip({
        showItemMarker: false,
        // onShow: function onShow(ev) {
        //     var items = ev.items;
        //     that.monthIncome = ev.items[0].origin;
        // }
        });
        // 3.创建图形语法,绘制柱状图 由year和sales两个属性决定图形的位置
        chart.interval().position('day*BTC');
        // 4.渲染图表
        chart.render();
      },
      mountNodeTotal(){
        var chart = new F2.Chart({
        id: 'mountNodeTotal',
        pixelRatio: window.devicePixelRatio
        });

        chart.source(this.datatotal, {
        tem: {
            tickCount: 4,
            min: 0
        },
        time: {
            range: [0, 1],
            tickCount: 2,
        }
        });
        var that =this;
        chart.tooltip({
        showCrosshairs: true,
        showItemMarker: false,
        onShow: function onShow(ev) {
            var items = ev.items;
            items[0].name = null;
            items[0].value = 'BTC:' + items[0].value;
            that.totalIncome = ev.items[0].origin;
        }
        });
        chart.axis('time', {
        label: {
            textAlign: 'right',
        }
        });
        chart.line().position('time*tem');
        chart.point().position('time*tem').style({
        stroke: '#fff',
        lineWidth: 1
        });
        chart.render();
      },
  },
  mounted() {
  },
  created() {
      //先拿到日收益、月收益、累计收益的总数据
    // 日月收益把匹配到的当前日月放在日月收益数据里
    //累计收益把获取数
    this.SDay();
  },
}
</script>

<style lang="less" scoped>
#mountNodeDay,#mountNodeMonth,#mountNodeTotal{
    height: 30vh;
    width: 90vw;
}
.bg{
    height: 100vh;
    background-color: #fff;
    padding-top: 0.41rem;
}

div{
    box-sizing: border-box;
}
.takebar{
    width: 6.81rem;
    height: 0.78rem;
    background: #EDEDED;
    line-height: 0.78rem;
    margin:0 auto;
    color: #93A0AA;
    text-align: center;
    border-radius: 0.2rem;
    font-size: 0.29rem;
    span{
        width: 32.4%;
        display: inline-block;
    }
    span:first-child{
        border-top-left-radius: 0.2rem;
        border-bottom-left-radius: 0.2rem;
    }
    span:last-child{
        border-top-right-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
    }
    .active{
        color: #fff;
        background: #00a0e9;
    }
}
.main{
    color: #93A0AA;
    text-align: center;
    .icon-apr-shijian{
        width: 0.26rem;
    }
    p:first-child{
        margin-top: 0.81rem;
        color: #506271;
    }
    p:nth-child(2){
        margin-top: 0.55rem;
        margin-bottom: 0.45rem;
        color: #F54531;
        font-size: 0.5rem;
        font-weight: 700;
    }
    .charts{
        height: auto;
        width: 100%;
        margin:2.5rem auto;
        p{
            text-align: left;
            margin-left: 0.3rem;
        }
    }
}
</style>
