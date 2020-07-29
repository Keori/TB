<template>
	<div>
		<Header :title="$t('my.aboutus')"></Header>
		<section class="Change_color">
            <span>
                <img src="../../../assets/imgs/LogoHU.png" alt="">
            </span>
            <!-- <p>V{{wors.OnlyNum}}  版本</p> -->
            <!-- <p>{{wors.OnlyWords}}
            </p> -->
		</section>
	</div>

</template>

<script>
// import { getMyAboutUsData } from '../../../api/data.js'
export default{
    data(){
        return{
            wors:{}
        }
    },
    methods:{
    },
    mounted(){
    },
    created(){
        // getMyAboutUsData()
        // .then(res => {
        //     this.wors = res.data.data[0]
        // })
    }
}
</script>

<style scoped="scoped" lang="less">
.Change_color{
    width: 100%;
    span{
        display: block;
        width: 2.02rem;
        height: 2.02rem;
        margin: 0.91rem 2.74rem 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
    p:nth-of-type(1){
        width: 1.84rem;
        height: 0.31rem;
        margin: 0.43rem 2.94rem 0;
        font-size: 0.33rem;
        color: #1F3E58;
    }
    p:nth-of-type(2){
        width: 6.8rem;
        height: 1.77rem;
        margin: 0.89rem 0.35rem 0;
        line-height: 0.5rem;
        color: #506271;
    }
}
</style>