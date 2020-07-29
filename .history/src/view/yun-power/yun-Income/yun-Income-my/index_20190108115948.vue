<template>
    <div>
        <Header title="收益记录"></Header>
        <div class="bg">
        <div class="takebar">
            <span :class="{ active: choose==1 }" @click="check(1)">日收益</span>
            <span :class="{ active: choose==2 }" @click="check(2)">月收益</span>
            <span :class="{ active: choose==3 }" @click="check(3)">累计收益</span>
        </div>
        <div v-show="choose==1" class="main">
            <p>日收益 (BTC)</p>
            <p>+ {{dayIncome.BTC}}</p>
            <p><i class="iconfont icon-apr-shijian">&nbsp;</i>{{dayIncome.day}}</p>
            <div class="charts">
            <p>单位：BTC</p>
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
            <p>月收益 (BTC)</p>
            <p>+ {{monthIncome.BTC}}</p>
            <p><i class="iconfont icon-apr-shijian">&nbsp;</i>{{monthIncome.day}}</p>
            <div class="charts">
            <p>单位：BTC</p>
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
            <p>累计收益 (BTC)</p>
            <p>+ {{totalIncome.tem}}</p>
            <p><i class="iconfont icon-apr-shijian">&nbsp;</i>2018-09-11~2018-12-10</p>
            <div class="charts">
            <p>单位：BTC</p>
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
// import {VChart,VScale,VLine,VGuide,VArea,VTooltip,VLegend,VBar,VPoint } from 'vux'
const F2 = require('@antv/f2');
export default {
//   components: {
//     VChart,
//     VLine,
//     VArea,
//     VPoint,
//     VGuide,
//     VTooltip,
//     VLegend,
//     VBar,
//     VScale
//   },
  data () {
    return {
      dataday: [
        {day:  '2018-12-01', BTC:0.00000400 },
        { day: '2018-12-02', BTC:0.00000400 },
        { day: '2018-12-03', BTC:0.00000400 },
        { day: '2018-12-04', BTC:0.00000400 },
        { day: '2018-12-05', BTC:0.00000400 },
        { day: '2018-12-06', BTC:0.00000400 },
        { day: '2018-12-07', BTC:0.00000400 },
        { day: '2018-12-09', BTC:0.00000400 },
        { day: '2018-12-10', BTC:0.00000400 },
        { day: '2018-12-11', BTC:0.00000400 },
        { day: '2018-12-12', BTC:0.00000400 },
        { day: '2018-12-13', BTC:0.00000400 },
        { day: '2018-12-14', BTC:0.00000400 },
        { day: '2018-12-15', BTC:0.00000400 },
        { day: '2018-12-16', BTC:0.00000400 },
        { day: '2018-12-17',BTC:0.00000400 },
        { day: '2018-12-18', BTC:0.00000400 },
        { day: '2018-12-19', BTC:0.00000400 },
        { day: '2018-12-20', BTC:0.00000400 },
        { day: '2018-12-21', BTC:0.00000400 },
        { day: '2018-12-22', BTC:0.00000400 },
        { day: '2018-12-23', BTC:0.00000400 },
        { day: '2018-12-24', BTC:0.00000400 },
        { day: '2018-12-25', BTC:0.00000400 },
        { day: '2018-12-26', BTC:0.00000400 },
        { day: '2018-12-27', BTC:0.00000400 },
        { day: '2018-12-28', BTC:0.00000400 },
        { day: '2018-12-29', BTC:0.00001400 },
        { day: '2018-12-30', BTC:0.00000111 },
        { day: '2018-12-31', BTC:0.00000400 },
      ],
      datamonth: [
        {day: '01', BTC:0.00000400 },
        { day: '02', BTC:0.00000400 },
        { day: '03', BTC:0.00000400 },
        { day: '04', BTC:0.00000400 },
        { day: '05', BTC:0.00000400 },
        { day: '06', BTC:0.00000400 },
        { day: '07', BTC:0.00000400 },
        { day: '08', BTC:0.00000400 },
        { day: '09', BTC:0.00000400 },
        { day: '10', BTC:0.00000400 },
        { day: '11', BTC:0.00000400 },
        { day: '12', BTC:0.00000400 },
      ],
      datatotal: [
        { time: '08-08', tem: 0.00000400 },
        { time: '08-09', tem: 0.00000500 },
        { time: '08-10', tem: 0.00000600 },
        { time: '08-11', tem: 0.00000700 },
        { time: '08-12', tem: 0.00000800 },
        { time: '08-13', tem: 0.00000900 },
        { time: '08-14', tem: 0.000001000 },
        { time: '08-15', tem: 0.00000110 },
        { time: '08-16', tem: 0.000001200 }
      ],
      tag: {
        position: [ 9, 0.00000400 ],
        content: '2018-12-10',
        direct: 'tl',
        offsetY: -5,
      },
    choose:1,
    dayIncome:{
        BTC:0.0004,
        day:'2018-12-25'
    },
    monthIncome:{
        BTC:0.0004,
        day:'2018-12-25'
    },
    totalIncome:''
    }
  },
 methods:{
      check(num){
          this.choose = num;
          if(num==1){
              this.mountNodeDay();
          }else if(num==2){
              summeryMonth().then(res=>{
                  console.log(res);
              })
              setTimeout(() => {
                  this.mountNodeMonth();
              }, 10);
          }else if(num==3){
              summeryTotal().then(res=>{
                  console.log(res);
              })
              setTimeout(() => {
                 this.mountNodeTotal();
              }, 10);
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
        'BTC': {
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
        // chart.guide().tag({
        //     position: [27, 0.00001400],
        //     content: '2018-12-11',
        //     withPoint:false,
        //     offsetY: -2,
        // });
        
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
        onShow: function onShow(ev) {
            var items = ev.items;
            that.monthIncome = ev.items[0].origin;
        }
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
            items[0].value = '$ ' + items[0].value;
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
      this.mountNodeDay();
      
  },
  created() {
      
      summeryDay().then(res=>{
      })
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
