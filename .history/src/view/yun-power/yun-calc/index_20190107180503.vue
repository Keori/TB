<template>
    <div>
		<Header title="BTC挖矿收益计算器"></Header>
		<span class="circle" @click="calcHelp">?</span>
        <div class="main">
			<div class="content">
				<div class="top">
					<ul class="topBar">
						<li>
							<span>法币单位</span>
								<Input class="sel" placeholder="" :arrowDown='true' v-model="coinType" @on-select="coinShow=true"  @input="numinput" :value='val'/>
						</li>
						<li>
							<span>矿机算力</span>
								<input class="inText" placeholder="请输入购买的算力数值"  v-model="buyCalcT" />
							<span>T</span>
						</li>
						<li>
							<span>算力价格</span>
								<input class="inText" placeholder="请输入购买的算力单价"  v-model="buyCalcPrice"/>
							<span>{{coinType}}/T</span>
						</li>
						<li>
							<span>合约天数</span>
								<input class="inText" v-model="buyCalcDays" />
							<span>天</span>
						</li>
					</ul>
				</div>
				<div class="bottom">
					<ul class="downBar">
						<li>
							<span>矿机功耗</span>
								<input class="inText" placeholder="请输入矿机的额定功耗"  v-model="powerDiss" />
							<span>W</span>
						</li>
						<li>
							<span>电价</span>
								<input class="inText" placeholder="请输入当前电价"  v-model="elePrice" />
							<span>{{coinType}}/T</span>
						</li>
						<li>
							<span>币产量</span>
								<input class="inText"  v-model="coinOut"/>
							<span class="threeCome">*数据来自第三方，仅供参考。</span>
							<span>BTC/T</span>
						</li>
						<li>
							<span>币价</span>
								<input class="inText" v-model="coinPirce" />
							<ul class="per">
								<li :class="choose==1?'active':''" @click="cho(1)">当前</li>
								<li :class="choose==2?'active':''" @click="cho(2)">10%</li>
								<li :class="choose==3?'active':''" @click="cho(3)">20%</li>
								<li :class="choose==4?'active':''" @click="cho(4)">50%</li>
							</ul>
							<span>{{coinType}}</span>
						</li>
					</ul>
				</div>
		    </div>
        </div>
		
		<Picker v-model='coinValue' :data="coinTypes" textTitle='选择币种' :pickerShow.sync='coinShow' @on-change='test(coinValue)'></Picker>
		<Alert :value="calcWay" :waySay="calcWay" :OK="calcWay" @on-yes="yes" :bigTitle="'计算方式'" :cancel_text="''" :ok_text="''"></Alert>
		<div class="down">
			<Button @click="prIncomes">计算</Button>
			<span>*工具结果仅供参考，不构成任何投资建议。</span>
		</div>
		<div v-show="dialog" class="dialog">
			<div class="dialogx">
				<div class="title">计算结果</div>
				<ul class="calcIncome">
					<li><span>每日收入</span><span>{{dayIncome?dayIncome.toFixed(2):''}}{{coinType}}</span></li>
					<li><span>每日电费</span><span>{{dayEle?dayEle.toFixed(2):''}}{{coinType}}</span></li>
					<li><span>每日利润</span><span>{{dayRe?dayRe.toFixed(4):''}}{{coinType}}</span></li>
					<li><span>预计总产量</span><span>{{totalOut?totalOut.toFixed(8):''}} BTC</span></li>
					<li><span>预计回本</span><span>{{AGu?AGu.toFixed(1):''}}天</span></li>
					<li><span>2年回报率</span><span>{{twoYearCome?twoYearCome.toFixed(2):''}}%</span></li>
					<li><span>预计总利润</span><div class="totalIncome"><p>{{totalReBTC?totalReBTC.toFixed(8):''}}  BTC</p><p>≈ {{totalReCoinType?totalReCoinType.toFixed(4):''}}  HKD</p></div></li>
				</ul>
				<div class="confim" @click="confim">确认</div>
			</div>
		</div>
    </div>
</template>

<script>
   export default {
	   data(){
		   return{
			   val:'',
			 calcWay:false,
			 prIncome:false,
			 dialog:false,
			//  法币单位
			 coinType:'HKD',
			 coinTypes:[
				 {value:'HKD',key:'1'},
				 {value:'CNY',key:'2'},
				 {value:'JPY',key:'3'},
				 {value:'USD',key:'4'},
				 ],
			coinShow:false,
			coinValue:[0], //默认选中币种
			// 矿机算力
			buyCalcT:'',
			// 算力价格
			buyCalcPrice:'',
			// 合约天数
			buyCalcDays:730,
			// 矿机功耗
			powerDiss:1700,
			// 电价
			elePrice:0.50,
			// 币产量
			coinOut:0.00003501,
			// 币价
			coinPirce:10000,
			//百分比
			per:1,
			//每日收入
			dayIncome:'',
			//每日电费
			dayEle:'',
			// 每日利润
			dayRe:'',
			// 预计总产量
			totalOut:'',
			// 预计回本
			AGu:'',
			// 2年回报率
			twoYearCome:'',
			// 预计总利润 BTC
			totalReBTC:'',
			// 预计总利润 根据单位来计算
			totalReCoinType:'',
			choose:1,

		   }
	   },
	methods:{
		numinput(e){
			this.val = e.target.value.replace(/[^\d]/g,'')
		},
		calcHelp(){
			this.calcWay = true;
		},
		yes(){
			this.calcWay = false;
		},
		prIncomes(){
			if(!this.buyCalcT||!this.buyCalcPrice){
				alert('请输入满参数再点击计算按钮')
				return false;
			}
			this.dialog = true;
			//每日收入 = 币产量 * 币价
			this.dayIncome = this.coinOut*this.coinPirce*this.buyCalcT;
			//每日电费 = 矿机功耗 * 电价
			this.dayEle = this.powerDiss*this.elePrice;
			// 每日利润 = 每日收入 - 每日电费
			this.dayRe = this.dayIncome-this.dayEle;
			// 预计总产量 = 币产量 * 矿机算力
			this.totalOut = this.coinOut*this.buyCalcT*this.buyCalcDays;
			// 预计回本  挖矿成本 = 矿机算力*算力价格 / 每日利润
			this.AGu = (this.buyCalcT*this.buyCalcPrice)/this.dayRe;
			// 2年回报率  = 2年*每日收入 / 算力价格 + 2年*每日电费
			this.twoYearCome = (730*this.dayRe)/(this.buyCalcT*this.buyCalcPrice+730*this.dayEle);
			// 预计总利润 BTC = 预计总产量 - 总电费 - (矿机算力*算力价格)
			this.totalReBTC = (this.totalOut - this.dayEle - (this.buyCalcT*this.buyCalcPrice));
			// 预计总利润 根据单位来计算
			this.totalReCoinType = this.totalReBTC * this.coinPirce;
		},
		confim(){
			this.dialog = false;
		},
		test(data){
			switch (data[0]) {
				case 0:
					this.coinType = 'HKD'
					break;
				case 1:
					this.coinType = 'CNY'
					break;
				case 2:
					this.coinType = 'JPY'
					break;
				case 3:
					this.coinType = 'USD'
					break;
				default:
					break;
			}
		},
		cho(num){
			switch (num) {
				case 1:
					this.choose = 1;
					this.per = 1;
					break;
				case 2:
					this.choose = 2;
					this.per = 0.1;
					break;
				case 3:
					this.choose = 3;
					this.per = 0.2;
					break;
				case 4:
					this.choose = 4;
					this.per = 0.5;
					break;
				default:
					break;
			}
		}
		
	},
	mounted() {
	},
}
</script>

<style lang="less" scoped>
    div{
        box-sizing: border-box;
	}
	.circle{
		position: absolute;
		right: 0.26rem;
		top: 0.34rem;
		color: #fff;
		font-size: 0.3rem;
		text-align: center;
		line-height: 0.4rem;
		height: 0.4rem;
		width: 0.4rem;
		border-radius: 50%;
		background:linear-gradient(90deg,rgba(3,194,252,1),rgba(0,106,225,1));
	}
    .main{
		color: #506271;
		.top,.bottom{
			height: 100%;
			padding:0.37rem 0.4rem 0.3rem 0.4rem;
            background-color: #fff;
            width: 6.67rem;
            margin:0.41rem auto;
            border-radius: 0.14rem;
            height: 3.87rem;
		}
		.bottom{
			height: 5.48rem;
		}
		#coinType{
			width: 4.41rem;
			height: 0.67rem;
			border: 0.01rem solid #E9E9E9;
		}
		.topBar,.downBar{
			li{
				height: 0.67rem;
				line-height: 0.67rem;
				display: flex;
				justify-content: space-between;
				margin-bottom: 0.17rem;
				position: relative;
				span{
					font-size: 0.26rem;
				}
				.sel{
					width: 4.43rem;
					height: 0.67rem;
				}
				.inText{
					box-sizing: border-box;
					width: 4.43rem;
					height: 0.67rem;
					border: 0.01rem solid #E9E9E9;
					border-radius: 0.1rem;
					line-height: 0.67rem;
					font-size: 0.24rem;
					padding-left: 0.24rem;
					color: #1F3E58;
				}
				span:last-child{
					position: absolute;
					right: 0.19rem;
				}
			}
		}
		.downBar{
			li:nth-child(3){
				margin-bottom: 0.62rem;
			}
			.threeCome{
			position: absolute;
			font-size: 0.21rem;
			color: #93A0AA;
			top:0.64rem;
			left: 1.5rem;
		}
		.per{
			position: absolute;
			width: 4.43rem;
			top: 0.64rem;
			left: 1.4rem;
			margin-top: 0.3rem;
			display: flex;
			justify-content: space-between;
			li{
				font-size: 0.21rem;
				display: inline-block;
				width: 0.93rem;
				height: 0.39rem;
				margin:0;
				line-height: 0.39rem;
				text-align: center;
				background: #93A0AA;
				color: #fff;
				border-radius: 0.1rem;
			}
			.active{
					background: #2188FB;
				}
			}
		}
	}
		.down{
			padding:0 0.4rem;
			text-align: center;
			span{
				font-size: 0.21rem;
				color: #93A0AA;
				margin-top: 0.3rem;
				display: inline-block;
				
			}
		}
	.dialog{
		width: 100%;
		height: 100%;
		background:rgba(0,0,0,.6);
		position: fixed;
		top: 0rem;
		z-index: 1;
		.dialogx{
			z-index: 2;
			width: 6.25rem;
			height: auto;
			background-color: #fff;
			position: relative;
			left: 50%;
			top:50%;
			transform: translate(-50%,-50%);
			border-radius: 0.08rem;
			padding:0.42rem 0;
			.title{
				text-align: center;
				color:#1F3E58;
				font-size: 0.35rem;
				margin-bottom: 0.32rem;
			}
		.calcIncome{
			border-top: 0.01rem solid #e9e9e9;
			border-bottom: 0.01rem solid #e9e9e9;
			margin-bottom: 0.3rem;
			color: #506271;
			li{
				height: 0.74rem;
				line-height: 0.74rem;
				border-bottom: 0.01rem solid #e9e9e9;
				font-size: 0.26rem;
				text-align: left;
				padding-left: 0.62rem;
				padding-right: 0.2rem;
				display: flex;
				justify-content: space-between;
				span:last-child{
					color: #1F3E58;
					display: inline-block;
					text-align: left;
					width: 3rem;
					
				}
				.totalIncome{
					p{
						width: 3rem;
						color: #F54531;
						line-height: 0.5rem;
					}
					}		
			}
			li:last-child{
				border-bottom:none;
				height: 0.94rem;
				line-height: 0.94rem;
			}
		}
		.confim{
			width: 5.38rem;
			height: 0.84rem;
			background:linear-gradient(90deg,rgba(18,176,243,1),rgba(4,120,251,1));
			border-radius:0.1rem;
			margin:0 auto;
			text-align: center;
			line-height: 0.84rem;
			font-size: 0.33rem;
			margin-top: 0.53rem;
		}
		}
	}
</style>
