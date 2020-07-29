<template>
	<div>
		<Header :title="$t('yun.RiskStatement')"></Header>
		<div class='addblock'></div>
		<section class='sections'>
			<h1>风险提示</h1>
			<div class='indent'>
				<p>尊敬的投资者：</p>
				<p>为便于您全面正确地理解网上交易的风险，T-Bond特此提示您在决定认购相关产品之前务必仔细阅读以下内容。如您无法接受以下内容的，请您不要认购相关产品。一旦您认购相关产品，即视为您已完全知悉并确认接受本声明的所有内容。</p>
				<p>您首先应该清楚地了解T-Bond的业务模式。T-Bond-定期理财是一个广告聚合类型服务功能项目。产品内展示的内容、介绍等所有内容，均系根据产品供应商情况展示。</p>
				<p>本着对投资者负责的态度，T-Bond在此郑重提示，下列风险所导致的损失或责任，均应由您或产品供应商自行承担，T-Bond对此不承担任何责任：</p>
				<p>一、 您充分意识到，产品本身存在以下风险：</p>
				<p>1、市场风险：由于金融市场存在波动性，投资者认购产品将面临一定的市场风险。</p>
				<p>2、流动性风险：在产品存续期内如果产生流动性需求，可能面临产品持有期与资金需求日不匹配的流动性风险，<span>当存在上述情况时，您可以申请提前赎回产品，T-Bond将根据产品收取必要的手续费用。</span></p>
				<p>3、不可抗力及意外事件风险：自然灾害、战争或国家政策变化等不能预见、不能避免、不能克服的不可抗力事件或系统故障、通讯故障、市场停止交易等意外事件的发生，可能对产品的成立、投资运作、资金返还、信息披露、公告通知造成影响，甚至可能导致产品收益降低乃至本金损失。</p>
				<p>T-Bond不对T-Bond平台推广的任何一款产品本身存在的上述风险承担任何责任。您在认购任何产品之前，应仔细阅读相应的产品说明，认购产品后的风险将由您自行承担。</p>
				<p>二、您确知并同意，T-Bond平台仅提供产品的展示和介绍服务。您承诺，认购任何产品均来自于您自己的独立判断；就产品发生的任何争议、纠纷、行政处罚、仲裁等，均由您和产品供应商各自承担相应的责任；T-Bond不对任何非与T-Bond直接发生的交易和行为承担任何直接、间接、附带或衍生的损失和责任。在上述争议、纠纷、行政处罚、仲裁的处理过程中，T-Bond将会根据需要依法提供必要的协助。</p>
				<p>三、T-Bond不作任何形式的担保行为，对产品的展示和介绍的真实性、准确性、完整性不作任何承诺和保证，对信息的延误、失误和遗漏不承担任何责任。您明确同意，据此进行交易等行为，而引致的人身伤害、财产毁损（包括因下载而感染电脑病毒，导致电脑损坏或数据丢失等）、名誉或商誉诽谤、版权或知识产权等权利的侵犯等事件，及因该等事件所造成的损害后果，T-Bond概不负责，也不承担何法律责任。您将自行承担认购产品后可能引起的一切风险。</p>
			</div>
		</section>
	</div>
</template>



<script>
export default {
  data(){
	  return{

	  }
  },
}
</script>

<style lang="less" scoped>
.g_head{
    position: fixed;
    width: 100%;
}
.addblock{
    height: 0.95rem;
}
.sections{
	width: 100%;
	height: 100%;
	background: #FFFFFF;
	text-align: center;
	h1{
		color: #000000;
		font-size: 0.4rem;
		font-weight: inherit;
		text-align: left;
		line-height: 1rem;
		text-indent: 0.4rem;
	}
	p:nth-of-type(1){
		text-indent: 0;
	}
	p:nth-of-type(6),p:nth-of-type(7),p:nth-of-type(8){
		text-indent: 0.6rem;
	}
	p{
		color: #000000;
		text-align: left;
		line-height: 0.5rem;
		margin-top: 0.3rem;
		text-indent: 0.3rem;
		span{
			color: #FF0000;
		}
	}
	.indent{
		width: 90%;
		margin: auto;
	}
}
</style>
