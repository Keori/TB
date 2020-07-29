<template>
	<div class='parcel'>
		<Header :title="$t('my.helpmiddle')"></Header>
		<section class="Change_color">
            <div class="input_setion">
                <span>
                    <img src="../../../assets/imgs/ICON/091.png" alt="">
                    <input v-model='search' type="text" class="setion" :placeholder="$t('my.searchissue')"/>
                </span>
            </div>
            <div class="list_section">
                <h1>{{$t('my.hotissue')}}</h1>
                <ul>
                    <li v-for='(item,index) in art' :key='index' @click='toqt(item)'><a href="javascript:;" class='text-overflow'>{{index+1}}、{{item.title}}</a></li>
                </ul>
            </div>
		</section>
	</div>

</template>

<script>
import { getArticle } from '../../../api/data.js'
export default{
    data(){
        return{
            search:'',
            art: '',
        }
    },
    computed:{
        searchDate: function(){
            let listitems = this.getArt()
            // let listitems = id
            let search = this.search;
            if(search){
                return this.listitems.filter(function(listitem){
                    return object.keys(listitem).some(function(key){
                        return String(listitem[key]).toLowerCase().indexOf(search) > -1
                    })
                })
            }
            return this.listitems;
        }
    },
    methods:{
        getArt(){
            getArticle().then(res => {
                this.art = res.data.data.data
                this.art.forEach((items,index) => {
                   let id = items.id
                });
            })
        },
        toqt(id){
            this.$router.push({name:'question',query:{
                id:id,
            }})
        }
    },
    created(){
        this.getArt()
    },
}
</script>

<style scoped="scoped" lang="less">
.parcel{
    height: 100vh;
    background: #EDEDED;
}
.Change_color{
    width: 100%;
    .input_setion{
        position: relative;
        width: 100%;
        height: 1.93rem;
        span{
            position: absolute;
            display: block;
            width: 6.63rem;
            height: 0.78rem;
            top: 0.56rem;
            left: 0.44rem;
            background: #FFFFFF;
            border-radius: 0.1rem;
            img{
                position: absolute;
                width: 0.35rem;
                height: 0.35rem;
                left: 0.21rem;
                top: 0.23rem;
            }
            .setion{
                position: absolute;
                width: 5.96rem;
                height: 0.78rem;
                right: 0;
                font-size: 0.29rem;
                color: #000000;
            }
        }
    }
    .list_section{
        position: relative;
        width: 100%;
        height: 4.3rem;
        h1{
            position: absolute;
            left: 0.36rem;
            font-size: 0.29rem;
            color: #1F3E58;
        }
        ul{
            position: absolute;
            width: 6.68rem;
            height: 3.79rem;
            left: 0.41rem;
            top: 0.51rem;
            li{
                width: 6.68rem;
                height: 0.92rem;
                line-height: 0.9rem;
                margin-bottom: 0.03rem;
                background: #FFFFFF;
                border-radius: 0.1rem;
                a{
                    display: block;
                    width: 90%;
                    height: 0.92rem;
                    margin-left: 0.51rem;
                    color: #2188FB;
                    overflow: hidden;
                }
            }
        }
        .text-overflow{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>