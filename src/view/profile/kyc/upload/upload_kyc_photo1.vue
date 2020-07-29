<template>
	<div class="uploadBg">
		<Header :title="$t('kyc.Authentication')"></Header>
		<Form>
			<Title>{{$t('kyc.uploadcertificatephoto')}}</Title>
			<div class="note">{{$t('kyc.formatRement')}}<span>{{$t('kyc.demand')}}</span></div>
			<div class="uploadBox">
				<div class="upload">
					<div class="pic"><img src="@/assets/imgs/upload.png"/></div>
					<p>{{type_certificate==2?$t('kyc.passportcoverpage'):$t('kyc.identityfrontalView')}}</p>
					<div class="picHas" ref="upImg1"><img :src="upImg1"></div>
					<input type="file" name="" id="" value="" @change="upImg($event,'front')" />
				</div>
				<div class="upload">
					<div class="pic"><img src="@/assets/imgs/upload.png"/></div>
					<p>{{type_certificate==2?$t('kyc.passportmessagepage'):$t('kyc.identityReverseSideAs')}}</p>
					<div class="picHas" ref="upImg2"><img :src="upImg2"></div>
					<input type="file" name="" id="" value="" @change="upImg($event,'back')" />
				</div>
			</div>
			<Button :submit='true' :fixed="true" @click.native="next">{{$t('public.next')}}</Button>
		</Form>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				pass:'34545',
				nationality:'',
				type_certificate:'',
				certificate_number:'',
				first_name:'',
				last_name:'',
				upImg1:'',
				upImg2:'',
				formData: new FormData()
			}
		},
		methods:{
			upImg($event,type){
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
							if(type == 'front'){
								that.upImg1 = res.data;
								that.$refs.upImg1.style.display = 'block'
							}else if(type == 'back'){
								that.upImg2 = res.data;
								that.$refs.upImg2.style.display = 'block'
							}
						})
						
					}
				}
			},
			next(){	
				if(!this.upImg1||!this.upImg2){
					this.$vux.toast.show({
						text: this.$t('public.Rementcertificatephoto'),
						type: 'cancel',
						width: '4rem'
					})
					return false
				}
				this.$router.push({name:'upload_kyc_photo2',query:{
					nationality:this.nationality,
					typeCertificate:this.type_certificate,
					// typeCertificate:证照类型 1:身份证 2:护照
					certificateNumber:this.certificate_number,
					firstName:this.first_name,
					lastName:this.last_name,
					front_img:this.upImg1,
					back_img:this.upImg2
				}})
			}
		},
		mounted() {
		},
		created() {
			this.nationality = this.$route.query.nationality;
			this.type_certificate = this.$route.query.typeCertificate;
			this.certificate_number = this.$route.query.certificateNumber;
			this.first_name = this.$route.query.firstName;
			this.last_name = this.$route.query.lastName;
			
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