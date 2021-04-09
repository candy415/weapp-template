import { getUrlCode, redirectUrl } from "../utils/index";
import Api from '../api/api.js'

const anthMixin = {
  created() {
    this.getWeappCode()
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
    getWeappCode() {
      let code = getUrlCode().code // 截取code
      if (code == null || code === '') {
        // 如果没有code，则去请求
        redirectUrl()
      } else {
        // 你自己的业务逻辑
        Api.apiAuth(code).then(res => {
          sessionStorage.setItem('access_token', res.accessToken)
          sessionStorage.setItem('phone', res.phone)
          if (!res.phone) {
            this.$router.push('/register')
          } else {
            this.$router.push('/info')
          }
        })
      }
    }
  }
}

export default anthMixin;