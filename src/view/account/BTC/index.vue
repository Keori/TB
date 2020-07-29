<template>
	<div>
		<!-- <Header v-if="this.pass.currency_name=='HKP'" :title="$t('index.recharge')"></Header> -->
		<Header v-if="this.isOut" :tab1Text="$t('index.recharge')" :tab2Text="$t('index.rollout')" @tabClick="changeTab" :activeTab="2"></Header>
		<Header v-else :tab1Text="$t('index.recharge')" :tab2Text="$t('index.rollout')" @tabClick="changeTab"></Header>
		<!--头部余额状态-->
		<ul class="curr_num flexbox">
			<li>
				<div v-if="pass.currency_name=='BTC'" class="num">{{pass.total_amount |cutZreo}}</div>
				<div v-else class="num">{{pass.total_amount |cutZreoFour}}</div>
				<div class="title">{{$t('index.gross')}}({{pass.currency_name}})</div>
			</li>
			<li>
				<div v-if="pass.currency_name=='BTC'" class="num">{{pass.available_amount |cutZreo}}</div>
				<div v-else class="num">{{pass.available_amount |cutZreoFour}}</div>
				<div class="title">{{$t('index.usable')}}({{pass.currency_name}})</div>
			</li>
			<li>
				<div v-if="pass.currency_name=='BTC'" class="num">{{pass.frozen_amount |cutZreo}}</div>
				<div v-else class="num">{{pass.frozen_amount |cutZreoFour}}</div>
				<div class="title">{{$t('index.freeze')}}({{pass.currency_name}})</div>
			</li>
		</ul>
<!--充值-->
		<div class="recharge_con" v-show="tab==1">
			<div class="code" id="qrcode" ref='qrcode'>
				<QRCode :text='inAddress'></QRCode>
			</div>
			<div class="adr">
				{{$t('index.rechargeadd')}}
				<p>{{inAddress}}</p>
				<!--复制隐藏的input上的值-->
				<input type="text" style="opacity: 0;height:0rem" :id="'copy'" :value="inAddress"/>
			</div>
			<button class="g_button" style="width: 2.33rem;height: 0.88rem;" data-clipboard-target="#copy" ref='copy' @click="copy()" v-show="copyBtn">{{$t('public.copy')}}</button>
			<Tips>
				<p>{{$t('index.TIPS1')}}</p>
				<p>
					{{pass.currency_name}}
					{{$t('index.TIPS2')}}
					{{pass.currency_name}}
					{{$t('index.TIPS3')}}
					{{pass.currency_name}}
					{{$t('index.TIPS4')}}
					{{pass.currency_name}}
					{{$t('index.TIPS5')}}
				</p>
			</Tips>
		</div>
<!--转出-->
		<div class="Out_con" v-show="tab==2">
			<Form>
				<Label :title="$t('index.purseadd')">
					<Input :placeholder="$t('index.pursehint')" :adress="true" @adrPicker='adr=true' @onkeyup="inputAdd" v-model="address"/>
					<div v-if="save" class='prevleft'>
						<p>
							<span @click='checkOhterCube' class='otherCube' :class='{otherCubes:otherCubecheck}'><i v-show='otherCubecheck' class='iconfont icon-apr-duihao'></i></span>
							<span>{{$t('public.saveAdd')}}</span>
						</p>
					</div>
				</Label>
				<Label v-if="otherCubecheck" :title="$t('public.ReAdd')">
					<Input :placeholder ="$t('public.WrSaveAdd')" v-model="addressTip" @onkeyup='addtip'/>
				</Label>
				<Label :title="$t('index.rolloutamount')">
					<Input :placeholder = holder :allOut="$t('index.allout')" @onkeyup="checkNum" @allout="outAll" v-model="outNum"/>
				</Label>
				<div v-if="pass.currency_name=='BTC'" class="fee">
					<p>{{$t('index.commission')}}：{{$t('index.gather')}}{{fee}}BTC{{$t('index.commission')}}</p>
					<p v-if="serCharge">{{$t('index.realitypay')}}：{{serCharge | cutZreo}}</p>
					<p v-else>{{$t('index.realitypay')}}：{{$t('index.autocount')}}</p>
				</div>
				<div v-else class="fee">
					<p>{{$t('index.commission')}}：{{$t('index.gather')}}{{fee}}{{pass.currency_name}}{{$t('index.commission')}}</p>
					<p v-if="serCharge">{{$t('index.realitypay')}}：{{serCharge | cutZreoFour}}</p>
					<p v-else>{{$t('index.realitypay')}}：{{$t('index.autocount')}}</p>
				</div>
				<Tips style="padding: 0.4rem 0 1rem;">
					<p>1、{{$t('index.TIPS03')}}
						<span>{{pass.currency_name}}</span>
						{{$t('index.TIPS04')}}
					</p>
					<p>2、{{$t('index.TIPS05')}}
						<span>{{fee}}{{pass.currency_name}}</span>
						{{$t('index.TIPS06')}}
					</p>
					<p>3、{{$t('index.TIPS07')}}
						<span>{{pass.currency_name}}</span>
						{{$t('index.TIPS08')}}
					</p>
				</Tips>
				<Button @click.native="next">{{$t('public.next')}}</Button>
			</Form>
		</div>
		<!--选择地址-->
		<Transform v-model='adr' :title="$t('index.choosepurseadd')">
			<div v-if="yan" class="yan">
				<span class="iconfont icon-apr-wunaibiaoqing"></span>
				<p>{{$t('public.nosaveAaa')}}~</p>
			</div>
			<ul v-if="!yan" class="adr_list">
				<li v-for="(item,index) in adrData" @click="chooseAdr(item.address)" :key='index'>
					<div class="txt">
						<p>{{item.name}}</p>
						<div class="adr">{{item.address}}</div>
					</div>
				</li>
			</ul>
		</Transform>
		<!--支付-->
		<PayPassword v-if="this.pass.currency_name=='BTC'" v-model='payPicker' :amount='serCharge|cutZreo' :unit='pass.currency_name' :ga.sync="ga" :pwd.sync="payPassword" @goPay='payOut'></PayPassword>
		<PayPassword v-else v-model='payPicker' :amount='serCharge|cutZreoFour' :unit='pass.currency_name' :ga.sync="ga" :pwd.sync="payPassword" @goPay='payOut'></PayPassword>
	</div>
</template>
<script>
	import myMath from '../../../assets/js/math.js'
	import { getCoinAdress,takeCoin,account,takeCoinRate,takeCoinAdd } from '@/api/data'
	import QRCode from '../../../components/QRCode'
	export default {
		data() {
			return {
				address:'',//收款地址
				adr:false,
				adrData:[],
				payPicker:false,
				tab:1,
				picker:false,
				payPassword:'',
				ga:'',
				copyBtn:'',//复制
				isOut:'',
				pass:[],
				inAddress:'',//充值地址
				addressTip:'',
				holder:'',
				outNum:'',
				fee:'',
				otherCubecheck: false,
				save:false,
				reg:'',
				regs:'',
				cNAme:'',
				yan:false
			}
		},
		components:{QRCode},
		methods: {
			changeTab(data){
				this.tab = data;
				if(data == 2){
					this.getAdd()
					this.getfee()
					
				}
			},
			checkOhterCube(){
				this.otherCubecheck = !this.otherCubecheck
				
			},
			inputAdd(){
				if(this.address){
					this.save = true
				}else{
					this.save = false
				}
			},
			addtip(){
				if(this.addressTip.length>10){
					this.addressTip = this.addressTip.substr(0, this.addressTip.length - 1);
					this.$vux.toast.show({
						text: this.$t('public.Address1'),
						type: 'cancel',
						width:'5.5rem'
					})
				}
			},
			upBig(){
				this.$vux.toast.show({
					text: this.$t('public.Address2'),
					type: 'cancel',
					width:'5.5rem'
				})
			},
			checkNum(){
				this.reg = /((^[1-9]\d*)|^0)(\.\d{0,4}){0,1}$/;
				this.regs = /((^[1-9]\d*)|^0)(\.\d{0,8}){0,1}$/;
					switch (this.pass.currency_name) {
						case 'BTC':
						if(!this.regs.test(this.outNum)){
							this.outNum = this.outNum.substr(0, this.outNum.length - 1)
							this.upBig()
						}
						if(this.outNum>=(this.pass.available_amount-0)){
							this.outNum = this.$options.filters.cutZreo(this.pass.available_amount-this.fee);
						}
							break;
						default:
						if(!this.reg.test(this.outNum)){
							this.outNum = this.outNum.substr(0, this.outNum.length - 1)
							this.upBig()
						}
						if(this.outNum>=(this.pass.available_amount-0)){
							this.outNum = this.$options.filters.cutZreoFour(this.pass.available_amount-this.fee);
						}
							break;
					}
				},
			//複製
			copy() {
			    let _this = this;
			    let clipboard = _this.copyBtn;
			    clipboard.on('success', function() {
			        _this.$vux.toast.show({
						text: _this.$t('public.copysuccess'),
						type: 'success',
					})
			    });
			    clipboard.on('error', function() {
			        _this.$vux.toast.show({
						text: _this.$t('public.copyfail'),
						type: 'cancel',
					})
				});
			},
			next(){
				if(!this.address||!this.outNum){
					this.$vux.toast.show({
						text: this.$t('index.Turnwallet'),
						type: 'cancel',
						width:'5.5rem'
					})
					return false
				}
				if(this.otherCubecheck&&!this.addressTip){
					this.$vux.toast.show({
						text: this.$t('index.Address3'),
						type: 'cancel',
						width:'5.5rem'
					})
					return false
				}
				if(this.addressTip.length>10){
					this.$vux.toast.show({
						text: this.$t('public.Address1'),
						type: 'cancel',
						width:'5.5rem'
					})
					return false
				}
				if(this.serCharge>(this.pass.available_amount-0)){
					this.$vux.toast.show({
						text: this.$t('index.Address4'),
						type: 'cancel',
						width:'5.5rem'
					})
					return false
				}
				this.payPicker = true;
			},
			getfee(){
				takeCoinRate().then(res=>{
				res.data.data.withdraw_currecy.forEach(val=>{
						if(this.pass.currency_name==val.currency){
							this.fee = val.fee;
						}
					})
					if(this.pass.currency_name=="BTC"){
						this.fee = String(this.fee).replace(/^(.*\..{8}).*$/,"$1");
					}else{
						this.fee = String(this.fee).replace(/^(.*\..{4}).*$/,"$1");
					}
				})
			},
			getAdd(){
				let params={
					currency:this.cNAme
				}
				takeCoinAdd(params).then(res=>{
					this.adrData = res.data.data.withdraw_address;	
					if(this.adrData.length ==0){
						this.yan = true
					}else{
						this.yan = false
					}
								
				})
			},
			payOut(){
				let data = {
					//币种名称如BTC
					currency:this.pass.currency_name,
					//提现数量
					amount:this.outNum,
					//提现地址
					address:this.address,
					//地址名字
					address_name:this.addressTip,
					pay_password:this.$md5(this.payPassword),
					ga_key:this.ga
				}
				//支付密码不正确
				takeCoin(data).then(res=>{
					switch (res.data.errcode) {
						case 0:
							let oid = res.data.data.oid;
							this.$router.push({name:'bill-info',query:{oid:oid}})
							break;
						case 11012:
							this.$vux.toast.show({
							text: this.$t('public.payNcorrect'),
							type: 'cancel',
							width:'4rem'
						})
							break;
						default:
							break;
					}
				})
			},
			chooseAdr(adr){
				this.address = adr;
				this.adr = false
				this.save = false
			},
			outAll(){
				switch (this.pass.currency_name) {
					case 'BTC':
						this.outNum = this.$options.filters.cutZreo(this.pass.available_amount-this.pass.frozen_amount-this.fee);
						break;
					default:
						this.outNum = this.$options.filters.cutZreoFour(this.pass.available_amount-this.pass.frozen_amount-this.fee);
						break;
				}
			},
			getCoinAdr(){
				getCoinAdress().then(res=>{
					res.data.data.deposit_address.forEach(val => {
						if(this.pass.currency_name == val.currency){
							this.inAddress = val.address;
						}
					});
				})
				if(this.pass.currency_name!='BTC'){
					this.holder = this.$t('index.usable') + String(this.pass.available_amount).replace(/^(.*\..{4}).*$/,"$1")+this.pass.currency_name;
				}
				if(this.pass.currency_name=='BTC'){
					this.holder = this.$t('index.usable') + String(this.pass.available_amount).replace(/^(.*\..{8}).*$/,"$1")+this.pass.currency_name;
				}
			}
		},
		computed: {
			serCharge(){
				if(this.outNum){
					return (this.outNum-0)+(this.fee-0);
				}else{
					return ''
				}
			}
		},
		created(){
			this.isOut = this.$route.query.isOut;
			this.cNAme = this.$route.query.pass;
			if(this.isOut){
				this.cNAme = 'BTC'
			}
			account().then(res=>{
				res.data.data.accounts.forEach(val=>{
					if(val.currency_name==this.cNAme){
						this.pass = val;
					}
				})
				this.getCoinAdr();
			})
		},
		mounted(){
			try{
				this.copyBtn = new this.clipboard(this.$refs.copy);
			}catch(e){
			}
			//云算力详情页面的BTC转出来这里 到了这里说明是BTC的转出选项 采用BTC相关的数据
			if(this.isOut){
				this.changeTab(2)
			}
		}
	}
	window.addEventListener('keydown', event => {
      if (event.keyCode === 9) {
        // console.log('tabfalse13')
        event.preventDefault()
      }
})
</script>

<style scoped="scoped" lang="less">

	.g_form{
		background-color: #fff;
	}
	.adr_list{
		max-height: 3.29rem;
		overflow-y: auto;
		color: #1F3E58;
		li{
			height: 1.08rem;
			border-bottom:1px #e9e9e9 solid;
			display: flex;
			align-items: Center;
		}
		.txt{
			margin-left: 0.29rem;
			.adr{
				margin-top: 0.1rem;
				font-size:0.25rem;
				color: #93A0AA;
				// .iCopy{}
			}
		}
	}

/*头部货币信息*/
	.curr_num {
		height: 1.4rem;
		margin-bottom: 0.22rem;
		background: #fff;
		text-align: center;
		color: #1F3E58;
		li {
			height: 0.69rem;
			margin-top: 0.42rem;
			border-right: 1px #e9e9e9 solid;
			&:last-child {
				border: none;
			}
		}
		.title {
			padding-top: 0.16rem;
			font-size: 0.24rem;
			color: #93A0AA;
		}
	}
	/*转出*/
	.Out_con{
		position: absolute;
		top:2.56rem;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0.46rem 0 0;
		background: #fff;
		.fee{
			p{
				padding-bottom: 0.2rem;
			}
			line-height:0.37rem;
			color: #506271;
		}
	}
	/*充值*/
	.recharge_con{
		padding: 0.67rem 0.55rem 0.75rem;
		background: #fff;
		.code{
			width: 3.71rem;
			height: 3.71rem;
			margin: 0 auto;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.adr{
			padding-top: 0.64rem;
			text-align: center;
			color: #506271;
			p{	
				margin: 0.21rem -0.3rem 0.5rem;
			}
		}
	}
	/*购买*/
	.buy_con {
		padding: 0.34rem 0.55rem 0;
		background: #fff;
		.card {
			position: relative;
			height: 3.65rem;
			margin: 0 auto 0.59rem;
			padding: 0.88rem 0.55rem 0;
			box-sizing: border-box;
			background: url(../../../assets/imgs/buy_hkp.png) no-repeat;
			background-size: 100%;
			.text {
				padding-bottom: 0.26rem;
				font-size: 0.42rem;
			}
			.g_input {
				position: absolute;
				left: 0.55rem;
				bottom: 0.74rem;
				width: 5.28rem;
				border: none;
			}
		}
		.payBnt{
			padding-top: 0.73rem;
			font-size: 0.25rem;
			color: #506271;
			text-align: center;
			.num{
				padding: 0.4rem 0 0.56rem;
				color: #F54531;
				font-size: 0.5rem;
			}
		}
		/*支付方式*/
		.payType {
			.title {
				padding-bottom: 0.3rem;
				color: #506271;
			}
			.list {
				border: 1px solid rgba(222, 222, 222, 1);
				border-radius: 0.15rem;
				.name {
					margin-left: 0.29rem;
					line-height: 0.7rem;
					color: #1F3E58;
				}
				.pic {
					float: left;
					width: 0.7rem;
					height: 0.7rem;
					margin-right: 0.2rem;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.check {
					margin-right: 0.3rem;
					width: 0.4rem;
					height: 0.4rem;
					border: 0.03rem solid rgba(222, 222, 222, 1);
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: Center;
					&.checked {
						border-color: rgba(245, 69, 49, 1);
						&:after {
							display: block;
							content: '';
							width: 0.25rem;
							height: 0.25rem;
							background: rgba(245, 69, 49, 1);
							border-radius: 50%;
						}
					}
				}
				li {
					display: flex;
					justify-content: space-between;
					align-items: Center;
					height: 1.17rem;
					border-bottom: 1px solid rgba(222, 222, 222, 1);
					&:last-child {
						border: none;
						
					}
				}
			}
		}
	}
	.prevleft{
		height: 0.5rem;
		line-height: 0.5rem;
		padding-top: 0.2rem;
		padding-left: 0.2rem;
		.otherCube{
			width: 0.26rem;
			height: 0.26rem;
			line-height: 0.26rem;
			border: 0.01rem solid #CAC7CB;
			display: inline-flex;
			margin-right: 0.05rem;
			text-align: center;
		}
		.otherCubes{
			border: 0.01rem solid #F54531;
			background: #F54531;
		}
		span{
			height: 0.26rem;
			font-size: 0.22rem;
		}
		span:nth-of-type(2){
			color: #000000
		}
		span:last-child{
			color: #23C2Fe;
			display: inline-block;
			padding-left: 0.05rem;
			vertical-align: top;
			font-size: 0.26rem;
			line-height: 0.44rem;
		}
	}
.yan{
    width: 4rem;
    height: 1.5rem;
    margin: 2rem auto;
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