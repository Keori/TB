<template>
    <div>
		<Header :title="this.details.title"></Header>
        <div class='addblock'></div>
		<section class="sections">
            <div class='section'>
                <h1>{{this.details.Ctitle}}</h1>
                <p v-html="this.details.content"></p>
            </div>
		</section>
	</div>
</template>

<script>
export default{
    data(){
        return{
            details: []
        }
    },
    created(){
        this.details = this.$route.query.id;
    }
}
</script>

<style scoped="scoped" lang="less">
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
    .section{
        width: 90%;
        height: 100%;
        margin: auto;
        h1,p{
            color: #000000;
        }
        h1{
            font-size: 0.38rem;
            margin-top: 0.45rem;
        }
        p{
            margin-top: 0.45rem;
            text-indent: 0.3rem;
            line-height: 0.5rem;
        }
    }
}
</style>