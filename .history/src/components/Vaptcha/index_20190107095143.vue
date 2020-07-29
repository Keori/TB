<template>
    <div>
        <div ref="vaptcha" style="height: 0.78rem;margin-top: 0.3rem">
    <div class="vaptcha-init-main">
    <div class="vaptcha-init-loading">
        <a href="/" target="_blank"><img src="https://cdn.vaptcha.com/vaptcha-loading.gif"/></a>
        <span class="vaptcha-text">验证启动中...</span>
    </div>
    </div>
    </div>
    </div>
</template>
<script>
export default{
  data() {
    return {
      script: null
    }
  },
	props: {
    type: {
      type: String,
      default: 'click'
    },
    scene: {
      type: String,
      default: ''
    },
    vpStyle: {
      type: String,
      default: 'dark'
    },
    color: {
      type: String,
      default: '#3C8AFF' 
    },
    lang: {
      type: String,
      default: 'zh-CN'
    },
  },
  mounted() {
    var config = extend({
        vid: '5c2441e3fc650eb9ac04e8d8',
        container: this.$refs.vaptcha,
        style: this.vpStyle
      }, this.$props)
  	this.loadV2Script().then(() => {
      window.vaptcha(config).then(obj => {
      	this.$emit('input', obj)
        obj.render()
      })
    })
  },
  methods: {
    loadV2Script() {
      if (typeof window.vaptcha === 'function') { //如果已经加载就直接返回
        return Promise.resolve()
      } else {
        return new Promise(resolve => {
          var script = document.createElement('script')
            script.src = 'https://cdn.vaptcha.com/v2.js'
            script.async = true
            script.onload = script.onreadystatechange = function() {
              if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
                resolve()
                script.onload = script.onreadystatechange = null
              }
            }
            document.getElementsByTagName("head")[0].appendChild(script)
        })
      }
    }
  }
}
const extend = function(to, _from){
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
</script>
<style lang="less" scoped>
#app {
  padding: 20px;
}
.vaptcha-init-main {
    display: table;
    width: 100%;
    height: 100%;
    background-color: #EEEEEE;
}
.vaptcha-init-loading {
    display: table-cell;
    vertical-align: middle;
    text-align: center
}
.vaptcha-init-loading>a {
    display: inline-block;
    width: 18px;
    height: 18px;
}
.vaptcha-init-loading>a img{
    vertical-align: middle
}
.vaptcha-init-loading .vaptcha-text {
    font-family: sans-serif;
    font-size: 12px;
    color: #CCCCCC;
    vertical-align: middle
}
</style>
