<template>
	<div>
		<Header :title="$t('kyc.Authentication')"></Header>
		<Form>
			<Title>{{$t('kyc.writepersonalms')}}</Title>
			<Label :title="$t('kyc.nationality')">
				<Input placeholder="" :arrowDown='true' v-model="countries[countryValue[0]]['value']" @on-select="countryShow=true" />
			</Label>
			<Label :title="$t('kyc.certificatetype')">
				<Input placeholder="" :arrowDown='true' v-model="IdData[idValue[0]]['value']" @on-select="idShow=true"/>
			</Label>
			<Label :title="$t('kyc.truename')" class="clearfix">
				<span class="last"><Input :placeholder="$t('kyc.truenamehint1')" v-model="firstName"/></span>
				<span class="first"><Input :placeholder="$t('kyc.truenamehint2')" v-model="lastName"/></span>				
			</Label>
			<Label :title="$t('kyc.certificateID')">
				<Input :placeholder="$t('kyc.certificateIDhint')" v-model="idNum"/>
			</Label>
			<Button :submit='true' :fixed="true" @click.native="next">{{$t('public.next')}}</Button>
		</Form>
		<Picker v-model='countryValue' :data="countries" :textTitle="$t('kyc.choosenationality')" :pickerShow.sync='countryShow' @on-change='test'></Picker>
		<Picker v-model='idValue' :data="IdData" :textTitle="$t('kyc.choosecertificatetype')" :pickerShow.sync='idShow'></Picker>
	</div>
</template>
<script>
import { upKyc,getNations } from '@/api/data'
	export default{
		data(){
			return{
				countryShow:false,//国家picker显示
				countryValue:[0],//国家默认数据
				nations:[],
				country:[],
				da:[],
				countries:[{
					value:'中国',
					key:'1'
				}],
				idShow:false,//证件picker显示
				idValue:['0'],
				IdData:[{
					value:'身份证',
					key:1
				}],
				idNum:'',
				firstName:'',
				lastName:'',
			}
		},
		methods:{
			next(){
				// 身份证:1 护照:2
				let kycTypes = this.IdData[this.idValue[0]]['key']
				
				// 护照Reg
				let idRegH = /^[a-zA-Z0-9]{6,18}$/
				// 身份证Reg
				let idRegS = /^([a-zA-Z0-9]{18})+$/;
				// 姓名Reg
				let nameReg = /^[\u4E00-\u9FA5A-Za-z]+$/;
				if(!this.firstName||!this.lastName){
					this.$vux.toast.show({
						text: this.$t('public.namenospace'),
						type: 'cancel',
						width: '3.5rem'
					})
					return false;
				}
				if(!nameReg.test(this.firstName+this.lastName)){
					this.$vux.toast.show({
						text: this.$t('public.namelayoutfail'),
						type: 'cancel',
						width: '3.2rem'
					})
					return false
				}
				switch (kycTypes) {
					case 1:
						if(!idRegS.test(this.idNum)){
							this.$vux.toast.show({
								text: this.$t('public.certificateIDfali'),
								type: 'cancel',
								width: '3.5rem'
							})
							this.idNum = ''
							return false
						}
						break;
					case 2:
						if(!idRegH.test(this.idNum)){
							this.$vux.toast.show({
								text: this.$t('public.certificateIDfali'),
								type: 'cancel',
								width: '3.5rem'
							})
							this.idNum = ''
							return false
						}
						break;
					default:
						break;
				}
			
				this.$router.push({name:'upload_kyc_photo1',query:{
					nationality:this.countries[this.countryValue[0]]['key'],
					typeCertificate:this.IdData[this.idValue[0]]['key'],
					certificateNumber:this.idNum,
					firstName:this.firstName,
					lastName:this.lastName
				}})
			},
			test(data){
				let kyc = this.countries[data[0].index]
				// 1:身份证
				// 2：护照
				// 3：两种皆可
				switch (kyc.kycType) {
					case 1:
							this.IdData = [{
							value: this.$t('kyc.identity'),
							key:1
						}]
						break;
					case 2:
							this.IdData = [{
							value: this.$t('kyc.passport'),
							key:2
						}]
						break;
					case 3:
							this.IdData = [{
							value: this.$t('kyc.identity'),
							key:1
						},
						{
							value: this.$t('kyc.passport'),
							key:2
						}]
						break;
					default:
						break;
				}
			}
		},
		created() {
			getNations().then(res=>{
				this.nations = res.data.data.nationalities;
				
				var a = window.localStorage.getItem('lang');
				this.countries=[];
				this.nations.forEach((val,index)=>{
					this.country = {}
					switch (a) {
						case 'zh_tw':
							this.country.value = val.name
							break;
						case 'en':
							this.country.value = val.en_name
							break;
						default:
							break;
					}
					this.country.key = val.id
					this.country.kycType = val.kyc_type;
					this.countries.push(this.country)
				})
				this.countries = this.countries.reverse();
			})
		},
	}
</script>

<style scoped="scoped" lang="less">
	.g_label{
		.last{
			float: left;
			width: 2.56rem;
		}
		.first{
			float: right;
			width: 3.9rem;
		}
	}
</style>