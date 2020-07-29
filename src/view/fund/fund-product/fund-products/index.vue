<template>
	<div>
		<Header :title="$t('yun.Fproduct')" :rightText="$t('yun.myregular')" to="fund-myregulars"></Header>
		<div class="slideshow">
			<swiper loop auto height=3.34rem :list="urlList" dots-position='center'></swiper>
		</div>
		<div class="roll">
			<Vscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :noData="noData">
				<ul>
					<li v-for="(item, index) in pro" :key="index" class="content" @click="jump(item.id)">
						<div class="left">
							<p>{{(item.annualized_return-0).toFixed(2)}}%</p>
							<p>{{$t('funds.expectEar')}}</p>
						</div>
						<div class="right">
							<div class="rightcontent">
								<p><span>{{item.name|checklang}}</span>
									<span v-if="item.surplus_amount==0" class="black">{{$t('funds.sellout')}}</span>
									<span v-else-if="item.recommend==1" class="color">{{$t('funds.comment')}}</span>
								</p>
								<p class="text-overflow">{{item.description|checklang}}</p>
							</div>
						</div>
					</li>
				</ul>
			</Vscroll>
		</div>
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
	//         img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544022197108&di=66db633ebcb9867c58ff7f9be9d49ab0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201508%2F17%2F20150817184103_cXkLz.jpeg',
	        img: '',
	    },
	],
		lists:[],
		pro:[],
		noData:false,
		pageid:0,
		pagesize:10,
		count:'',
		totalPage:'',
	  }
  },
  methods:{
	  jump(id){
		  this.$router.push({name:'fund-product-detail',
		  query:
		  {
			  id:id
		  },
		  })
	  },
	  	//上拉刷新 完成要执行的
		onRefresh(done) {
			this.noData = false
			this.pro = []
			this.pageid = 0;
			this.getApi()
            done() // call done
		},
		//下拉加载要执行的
		onInfinite(done) {
			if(this.pageid<this.totalPage){
				this.pageid++
				let params ={
					pageid:this.pageid,
					pagesize:this.pagesize
				}
				this.getApi(params)
			}else{	
				this.noData = true;
			}
			done()
		},
	  getApi(params){
		  //下方的理财列表
		  fundsList(params).then(res=>{
			  this.count = res.data.data.count;
			  this.totalPage = Math.ceil(this.count/this.pagesize);
			  this.pro.push(...res.data.data.data);
		  })
	  },
  },
  created() {
	  //轮播图列表
	  showList().then(res=>{
		  let list = res.data.data;
		  this.urlList=[]
		  list.forEach((val,index) => {
			this.lists = {};
			//跳转到轮播图对应的详情 vux的url可以使用router式路由
			//this.lists.url = {name:'profile-index', query: {id:val.rid}};
			//轮播图链接跳转到活动外链
			this.lists.url = val.content_url;
			this.lists.img = val.pic_url;
			this.lists.name = val.name;
			this.lists.rid = val.rid;
			this.urlList.push(this.lists);
		  });
	  })
	  this.getApi();
  },
  mounted() {
	  let a = document.querySelector('.g_head').offsetHeight;
	  let b = document.querySelector('.slideshow').offsetHeight;
	  let srcenHight = document.documentElement.clientHeight;
	  document.querySelector('.roll').style.height = srcenHight-a-b+'px';
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
	.roll{
		position: relative;
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
						span:nth-child(1){
							text-overflow:ellipsis;
							white-space:nowrap;
							overflow: hidden;
							display: inline-block;
							width: 3.5rem;
						}
						span:nth-child(2){
							background-position:0px 0px;
							background-size: 0.58rem 0.29rem;
							text-align: center;
							line-height: 0.29rem;
							width: 0.6rem;
							height: 0.3rem;
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
						height: 0.25rem;
					}
					.color{
						background: url('../../../../assets/imgs/color.png');
					}
					.black{
						background: url('../../../../assets/imgs/black.png');
					}
				}
			}
		}
</style>
