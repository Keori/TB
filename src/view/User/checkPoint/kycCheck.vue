<template>
	<div>
		<Alert :value="true" :txt="!kycPassing?NoKyc:Kycing" :cancel_text="!kycPassing?NoKycCancel:KycingCancel" :ok_text="!kycPassing?NoKycOk:KycingOk" @on-confirm="gokyc" @on-cancel="goRe"></Alert>
	</div>
</template>

<script>
export default{
	data(){
		return{
			kycPassing:false,
			NoKyc: this.$t('public.kyc'),
			Kycing: this.$t('public.kyc'),
			NoKycCancel: this.$t('public.Noapprove'),
			KycingCancel: this.$t('public.cancelexamine'),
			NoKycOk: this.$t('public.Toapprove'),
			KycingOk: this.$t('public.examinestate'),
		}
	},
	methods:{
		gokyc(){
			if(!this.kycPassing){
				  this.$router.replace({name:'fill-kyc'});
				  return false
			}
			 this.$router.replace({name:'kyc-info'})
		},
		goRe(){
			this.$router.go(-1)
		}
	},
	created() {
		if(this.$store.state.userInfo.status_kyc_verify==0){
			this.kycPassing = false
		}else{
			this.kycPassing = true;
		}
	},
}
</script>

<style>
</style>