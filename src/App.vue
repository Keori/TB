<template>
  <div id="app">
  <transition name="fade" mode="out-in">
    <router-view/>
  </transition>
  </div>
</template>

<script>
	import meta from './assets/js/meta.js'
	meta(document,window)
export default {
  name: 'App'
}
</script>


<style>
	@import "./assets/css/reset.css";
  @import "./assets/iconfont/iconfont.css";
</style>

<style lang="less" src="./assets/css/common.less"></style>

<!--路由切换动画-->
<style type="text/css">
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.vux-loading .weui-toast { /*toast插件居中显示*/
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>

