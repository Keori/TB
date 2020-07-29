<template>
	<div class="uploadBg">
		<Header :title="$t('kyc.Authentication')"></Header>
		<Form>
			<Title>{{$t('kyc.uploadcertificatephoto')}}</Title>
			<div class="note">{{$t('kyc.formatRement')}}<span>{{$t('kyc.demand')}}</span></div>

				<div class="upload">
					<div class="pic"><img src="../../../../assets/imgs/upload.png"/></div>
					<p>{{$t('kyc.tackcertificatephoto')}}</p>
					<div class="picHas" ref="upimg"><img :src="hand_img"></div>
					<input type="file" name="" id="" value="" @change="upImg($event)" />
				</div>
			<Tips :title="$t('kyc.Rementcertifacate')">
				<p>1、{{$t('kyc.Rement1')}}</p>
				<p>2、{{$t('kyc.Rement2')}}</p>
				<p>3、{{$t('kyc.Rement3')}}</p>
			</Tips>
			<Button :submit='true' :fixed="true" @click.native="upK">{{$t('kyc.submitaudit')}}</Button>
		</Form>
	</div>

</template>

<script>
import {upKyc} from '@/api/data'
	export default{
		data(){
			return{
				pass:'34545',
				nationality_id:'',
				type_certificate:'',
				certificate_number:'',
				first_name:'',
				last_name:'',
				front_img:'',
				back_img:'',
				hand_img:'',
				formData: new FormData()
			}
		},
		methods:{
			upImg($event){
				var that = this;
				// 阻止默认事件
				event.preventDefault();
				var file = event.target.files[0];
				var percentage;
				if(file.size > 52428800) {
					this.$vux.toast.text(this.$t('id_cert.limit'));
					return false;
				} else if(file.size < 51200) {
					percentage = .7
				} else if(file.size > 307200) {
					percentage = .4
				} else {
					percentage = .5
				}
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(e) {
					var canvas = document.createElement('canvas');
					var cxt = canvas.getContext('2d');
					var img = new Image();
					img.src = this.result;
					
					img.onload = function() {
						var w = img.width;
						var h = img.height;
						canvas.width = w;
						canvas.height = h;
						cxt.drawImage(img, 0, 0, w, h);
						//获取base64路径
						var basestr = canvas.toDataURL(file.type, percentage);
						var text = window.atob(basestr.split(",")[1]);
						var buffer = new Uint8Array(text.length);
						for(var i = 0; i < text.length; i++) {
							buffer[i] = text.charCodeAt(i);
						}
						//转成blob对象
						var blob = getBlob([buffer], file.type);
						that.formData.set('file',blob,file.name); //传文件到formdata
						var Form = that.formData;
					
						that.$axios.post('https://p.test.tbond.io/upload',
							Form,
						{headers: {'Content-Type': 'multipart/form-data'}}
						)
						.then(res=>{
								
								that.hand_img = res.data;
							
								that.$refs.upimg.style.display = 'block'
						})
						
					}
				}
			},
			upK(){
				if(!this.hand_img){
					this.$vux.toast.show({
						text: this.$t('kyc.RementneeduploadIDphoto'),
						type: 'cancel',
						width: '4.8rem'
					})
					return false
				}
				let data = {
					nationality_id:this.nationality_id,
					type_certificate:this.type_certificate,
					certificate_number:this.certificate_number,
					first_name:this.first_name,
					last_name:this.last_name,
					front_img:this.front_img,
					back_img:this.back_img,
					hand_img:this.hand_img
				}
				upKyc(data).then(res=>{
					if(res.data.errcode==0){
						this.$vux.toast.show({
						text: this.$t('kyc.Msalreadysubmit'),
						type: 'cancel',
						width: '4.8rem'
						})
						this.$router.push({name:'kyc-info',query:{isKycing:true}})
					}
				})
			}
		},
		mounted() {
			this.nationality_id = this.$route.query.nationality;
			this.type_certificate = this.$route.query.typeCertificate;
			this.certificate_number = this.$route.query.certificateNumber;
			this.first_name = this.$route.query.firstName;
			this.last_name = this.$route.query.lastName;
			this.front_img = this.$route.query.front_img;
			this.back_img = this.$route.query.back_img;

		},
	}
		/**
	 * 获取blob对象的兼容性写法
	 * @param buffer
	 * @param format
	 * @returns {*}
	 */
	function getBlob(buffer, format) {
		try {
			return new Blob(buffer, {
				type: format
			});
		} catch(e) {
			var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
			buffer.forEach(function(buf) {
				bb.append(buf);
			});
			return bb.getBlob(format);
		}
	}
</script>

<style scoped="scoped" lang="less">
.uploadBg{
	height: 100vh;
	background: #ededed;
}
.g_tips{
	padding-top: 0 !important;
	.caption{
		padding-bottom: 0;
	}
}
	.g_title{
		padding-bottom: 0.35rem;
	}
	.note{
		padding-bottom: 0.23rem;
		color: #506271;
		span{
			font-size: 0.25rem;
			color: #93A0AA;
		}
	}
	.uploadBox{
		padding-bottom: 1.2rem;
	}
	.upload{
		position: relative;
		width:6.66rem;
		height:4.03rem;
		margin: 0 auto 0.33rem;
		text-align: center;
		color: #1F3E58;		
		background:rgba(255,255,255,1);
		.pic{
			padding:1.8rem 0 0.31rem;
			
			img{
				width: 0.43rem;
			}
		}
		.picHas{
			height: 4.03rem;
			position: absolute;
			top: 0rem;
			left: 0rem;
			display: none;
			img{
				width: 6.66rem;
				height:4.03rem;
				display: inline-block;

			}
		}
		input[type="file"]{
			position: absolute;
			top:0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
			opacity: 0;
		}
	}
</style>