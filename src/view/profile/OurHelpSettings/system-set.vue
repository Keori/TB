<template>
	<div>
		<Header :title="$t('my.personalms')"></Header>
		<section class="Change_color">
            <ul>
                <li>
                    <Input :placeholder="$t('my.language')" :arrowRight='true' @on-select="LangShow=true" />
                    <span class='Lang'>{{Langses[LangValue[0]]['value']}}</span>
                </li>
                <li>
                    <Input :placeholder="$t('my.currency')" :arrowRight='true' @on-select="CurShow=true" />
                    <span class='Cur'>{{Curses[CurValue[0]]['value']}}</span>
                </li>
            </ul>
		</section>
        <Picker v-model='LangValue' :data="Langses" :textTitle="$t('my.chooselanguage')" :pickerShow.sync='LangShow' :textConfirm="$t('public.confirm')" :textCancel="$t('public.close')"></Picker>
        <Picker v-model='CurValue' :data="Curses" :textTitle="$t('my.choosecurUnit')" :pickerShow.sync='CurShow' :textConfirm="$t('public.confirm')" :textCancel="$t('public.close')"></Picker>
		<Button v-if="isLogin" :submit='true' :fixed="true" @click.native="loginOut">{{$t("public.Quitlogin")}}</Button>
	</div>

</template>

<script>
	export default{
		data(){
			return{
                LangShow:false,
				LangValue:[0],
				Langses:[{
					value: this.$t('my.Traditional'),
					key:'0'
				},{
                    value: this.$t('my.English'),
                    key:'1'
                }],
                CurShow:false,
				CurValue:[0],
				Curses:[{
					value: this.$t('my.HKcur'),
					key:'0'
				},{
                    value: this.$t('my.Dollar'),
                    key:'1'
                }],
                LangValue:window.localStorage.getItem('lang')=='en'?['1']:['0']
			}
        },
        watch:{
            LangValue(val){
				if( val == '0'){
					this.$i18n.locale = 'zh_tw';
					window.localStorage.setItem('lang','zh_tw')
				}else{
					this.$i18n.locale = 'en'
					window.localStorage.setItem('lang','en')
				}
			}
        },
        computed: {
            isLogin(){
                if(this.$store.state.userInfo){
                    return true;
                }else{
                    return false
                }
            }
        },
		methods:{
            loginOut(){
                this.$router.replace({name:'login'})
            },
		},
		mounted(){
		}
	}
</script>

<style scoped="scoped" lang="less">
.Change_color {
    width: 100%;
    height: 100%;
    background: #EDEDED;
    ul {
        width: 100%;
        height: 100%;
        padding-top: 0.22rem;
        li {
            background: #FFF;
            &>.g_input {
                height: 0.93rem;
                border-radius: 0;
                z-index: 3;
            }
            .Lang,
            .Cur {
                position: absolute;
                right: 0.6rem;
                color: #1F3E58;
            }
            .Lang {
                top: 1.53rem;
            }
            .Cur {
                top: 2.5rem;
            }
        }
    }
}
</style>