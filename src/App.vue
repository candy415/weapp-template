<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Api from './api/api.js'
export default {
  data() {
    return {
      code: ''
    }
  },
  created() {
    this.getCode()
    // this.getTestCode()
  },
  methods: {
    //本地测试
    getTestCode() {
      const url = window.location.href.split('?')[0]
      const phone = ''
      const token = '30_2qmwFKY9NsqZT2flbT53eQRsLLChLh9AUiJse4UNSFrqzn-Gkz4MFByU-EaxrHNhRhGhoyzvbrVxzK0sGJ0lIg'
      sessionStorage.setItem(
        'access_token',
        token
      )
      sessionStorage.setItem('phone', phone)
       window.console.log(url)
      if (!phone) {
        this.$router.push('/register')
      } else {
        this.$router.push('/info')
      }
    },
    // 获取code
    getCode() {
      this.code = this.getUrlCode().code // 截取code
      if (this.code == null || this.code === '') {
        // 如果没有code，则去请求
        this.getUrl()
      } else {
        // 你自己的业务逻辑
        Api.apiAuth(this.code).then(res => {
          sessionStorage.setItem('access_token', res.accessToken)
          sessionStorage.setItem('phone', res.phone)
          if (!res.phone) {
            this.$router.push('/register')
          } else {
            this.$router.push('/info')
          }
        })
      }
    },
    // 地址重定向
    getUrl() {
      const appid = 'wxc6249c5392e970ad'
      const url = window.location.href.split('?')[0]
      let redirect_uri = encodeURIComponent(url)
      window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        appid +
        '&redirect_uri=' +
        redirect_uri +
        '&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect'
    },
    // 截取url中的code方法
    getUrlCode() {
      var url = location.search
      var theRequest = new Object()
      if (url.indexOf('?') != -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
      }
      return theRequest
    }
  }
}
</script>

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
