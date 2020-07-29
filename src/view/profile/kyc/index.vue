<template>
	<div class="kyc_info">
		<Header :title="$t('kyc.Authentication')"></Header>
		<div class="card">
			<div class="text">
				<p class="info">{{kycData.truename}}</p>
				<p class="info">{{kycData.email}}</p>
				<p class="info">{{kycData.certificate_number}}</p>
				<p v-if="kycData.status==2" class="info">{{kycData.updated_at}}</p>
			</div>
			<div class="success">
				<img src="../../../assets/imgs/kyc_info.png"/>
				<p>{{status}}</p>
			</div>
			<p class="fail">{{longStatus}}</p>
		</div>
		<Button v-show="kycData.status!=2" :fixed="true" :disabled="kycData.status==1" @click.native="goReKyc">{{kycData.status==1?$t('kyc.auditing'):$t('kyc.Reaudit')}}</Button>
		<Button v-show="kycData.status==2" :fixed="true" to="profile-index">{{$t('kyc.Repersoncenter')}}</Button>
	</div>
</template>

<script>
import { getKyc } from '@/api/data'
export default{
	data(){
		return{
			kycData:{
				status:2
			},
			status:'',
			longStatus:''
		}
	},
	methods: {
		goReKyc(){
			this.$router.push({name:'fill-kyc'})
		}
	},
	created() {
		getKyc().then(res=>{
			this.kycData = res.data.data.certificate;
			if(this.kycData.status == 1){
				this.status = this.$t('kyc.Authenticationbegin')
			}
			switch (this.kycData.status) {
					case 0:
					this.status = this.$t('kyc.Noaudit')
					this.longStatus = this.$t('kyc.Nosubmitaudit')
					break;
					case 1:
					this.status = this.$t('kyc.auditing')
					this.longStatus= this.$t('kyc.auditbegin')
					break;
					case 2:
					this.status = this.$t('kyc.alreadyAuthentication')
					this.longStatus= this.$t('kyc.Authenticationsuccess')
					break;
					case 3:
					this.status = this.$t('kyc.Authenticationfail')
					this.longStatus= this.$t('kyc.failResubmit')
					break;
				default:
					break;
			}
		})
	},
}
</script>

<style scoped="scoped" lang="less">
.kyc_info{
	height: 100vh;
	background: #ededed;
	.card{
		position: relative;
		width:6.68rem;
		// height:2.68rem;
		margin: 0.39rem auto 0;
		padding: 0.35rem 0.31rem;
		background:rgba(255,255,255,1);
		border-radius:0.1rem;
		box-sizing: border-box;
		.info{
			font-size: 0.25rem;
			line-height: 0.5rem;
			color: #1F3E58;
		}
		.success{
			position: absolute;
			right: 0.3rem;
			top:0.43rem;
			text-align: center;
			font-size: 0.21rem;
			color: #93A0AA;
			img{
				width: 0.83rem;
				height: 0.83rem;
				margin-bottom: 0.1rem;
			}
		}
		.fail{
			margin-top: 0.2rem;
			color: #F54531;
		}
	}
}
</style>