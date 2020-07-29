<template>
	<div>
		<Header title="理财产品" rightText='我的定期' to="fund-myregulars"></Header>
		<div class="slideshow">
			<swiper loop auto height=3.34rem :list="urlList" dots-position="top"></swiper>
		</div>
		<ul>
			<li v-for="(item, index) in pro" :key="index" class="content" @click="jump(item.fid)">
					<div class="left">
						<p>{{(item.annualized_return-0).toFixed(1)}}%</p>
						<p>预期年化收益</p>
					</div>
					<div class="right">
						<div class="rightcontent">
							<p>{{item.name}}<span>推荐</span></p>
							<p class="text-overflow">{{item.description}}</p>
						</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { Swiper } from 'vux'
import { showList,fundsList } from '@/api/data'
export default {
  components: {
    Swiper
  },
  data(){
	  return{
		  urlList:[
	    {
	        url: 'javascript:;',
	        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544022197108&di=66db633ebcb9867c58ff7f9be9d49ab0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201508%2F17%2F20150817184103_cXkLz.jpeg',
	    },
	],
		lists:[],
		pro:[],
	  }
  },
  methods:{
	  jump(id){
		  let pass = {}
		  this.pro.forEach((val,index)=>{
			  if(id==val.fid){
				  pass = val;
			  }
		  })
		  pass = JSON.stringify(pass)
		  this.$router.push({name:'fund-product-detail',
		  query:
		  {
			  id:id,
			  pass:pass
		  },
		  })
	  },
	  getApi(){
		  let params = {
			  page:0,
			  num:10
		  }
		  //下方的理财列表
		  fundsList(params).then(res=>{
			  this.pro = res.data.data.data;
		  })
	  },
  },
  created() {
	  //轮播图列表
	  showList().then(res=>{
		  let list = res.data.data;
		//   console.log(list);
		  this.urlList=[]
		  list.forEach((val,index) => {
			  this.lists = {};
			  //跳转到轮播图对应的详情 vux的url可以使用router式路由
			  this.lists.url = {name:'profile-index', query: {id:val.rid}};
			  this.lists.img = val.pic_url;
			  this.lists.name = val.name;
			  this.lists.rid = val.rid;
			  this.urlList.push(this.lists);
		  });
	  })
	  this.getApi();
  },
}
</script>

<style lang="less" scoped>
	div{
		box-sizing: border-box;
	}
	.slideshow{
		height: 3.34rem;
		background-color: #ccc;
	}
	.content{
			height: 1.34rem;
			background-color: #fff;
			border-bottom: 0.02rem solid #ececec;
			.left{
				height: 100%;
				width: 2.19rem;
				padding:0.27rem 0.3rem 0.35rem 0.52rem;
				p:nth-child(1){
					font-size: 0.42rem;
					color: #F54531;
					padding-bottom: 0.12rem;
				}
				p:nth-child(2){
					font-size: 0.21rem;
					color: #93A0AA;
				}
			}
			.right{
				width: 5.3rem;
				padding-top: 0.33rem;
				
				.rightcontent{
					border-left: 0.02rem solid #eee;
					padding-left:0.47rem;
					p:nth-child(1){
						font-size: 0.28rem;
						color: #1F3E58;
						padding-bottom: 0.15rem;
						span{
							background-position:0px 0px;
							background-size: 0.58rem 0.29rem;
							text-align: center;
							line-height: 0.29rem;
							width: 0.58rem;
							height: 0.29rem;
							display:inline-block;
							font-size: 0.17rem;
							margin-left: 0.09rem;
							color: #fff;
							vertical-align: top;
						}
					}
					p:nth-child(2){
						width: 4.38rem;
						font-size: 0.21rem;
						color: #93A0AA;
					}
					.help{
						background: url('../../../../assets/imgs/color.png');
					}
					.gone{
						background: url('../../../../assets/imgs/black.png');
					}
				}
			}
		}
</style>
