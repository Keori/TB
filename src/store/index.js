import Vue from 'vue'
import Vuex from 'vuex'
import { userInfo,account } from '@/api/data'

Vue.use(Vuex);

var state = {
	userInfo: '',
	accounts:'',
	meun:true
}
const mutations = {
	//获取登录信息
	getUserInfo(state) {
		 userInfo().then(res => {
			state.userInfo = res.data.data.user;
		})
	},
	//设置账户登录信息
	setUserInfo(state,data){
		state.userInfo = data;
	},
	//获取账户信息
	getUserAccount(state){
		account().then(res=>{
			state.accounts = res.data.data.accounts;
		})
	},
	//设置账户信息
	setUserAccount(state,data){
		state.accounts = data;
	},
	//退出登录
	loginOut(state){
		state.userInfo = '';
		state.accounts = '';
	}
};

const actions = {
	//获取用户信息
	getUserInfo(context) {
		// dispatch的时候实际是在调用mutations中的getUserInfo方法
		// context是store的实例  context.state可以获取到state的属性 context.commit会执行commit命令
		// 当在页面方法里面写this.$store.dispath('getUserInfo')的时候,相当于调用了一次上面getUserInfo的方法
		context.commit('getUserInfo')
	},
	//设置用户信息
	setUserInfo(context){
		context.commit('setUserInfo')
	},
	//获取账户信息
	getUserAccount(context){
		context.commit('getUserAccount')
	},
	loginOut(context){
		context.commit('loginOut')
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})
