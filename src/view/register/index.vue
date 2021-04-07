<template>
  <div class="home">
    <van-cell-group>
      <van-field
        v-model="phone"
        required
        label="手机号码"
        placeholder="请输入手机号码"
        @blur="blurEvent"
        :error-message="phoneErr"
      />
      <van-field
        v-model="code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          :disabled="countFlag"
          @click="sendCode"
        >
          {{ sendMsg ? sendMsg : countNum + 's后重新发送' }}
        </van-button>
      </van-field>
    </van-cell-group>
    <div class="btn-box">
      <van-button type="primary" block @click="handleRegister">注册</van-button>
    </div>
  </div>
</template>

<script>
import api from '../../api/api.js'
export default {
  data() {
    return {
      value: '',
      phone: '',
      phoneErr: '',
      sendMsg: '发送验证码',
      // 倒计时周期
      countNum: 60,
      // 用于倒计时标记，true-正在倒计时
      countFlag: false,
      timer: null,
      token: '',
      code: '' // 验证码
    }
  },
  created() {
    this.token = sessionStorage.getItem('access_token')
  },
  methods: {
    blurEvent() {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/
      window.console.log(reg.test(this.phone))
      if (this.phone&&reg.test(this.phone)) {
        this.phoneErr = ''
      } else {
        this.phoneErr = '手机号格式错误'
      }
    },
    sendCode() {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (this.phone&&reg.test(this.phone)) {
        this.phoneErr = ''
        this._sendCode()
      } else {
        this.phoneErr = '手机号格式错误'
      }
    },
    // 调取发送验证码
    _sendCode() {
      api.sendCode({phone: this.phone,access_token: this.token}).then(() => {
        this.countDown()
      })
    },
    // 注册
    handleRegister() {
      api.confirmCode({phone:this.phone,code:this.code,access_token: this.token}).then(() => {
        this.$router.push('/info')
      })
    },
    // 60s倒计时
    countDown() {
      // 设置btn倒计时时显示的信息
      this.sendMsg = null
      // 更改btn状态
      this.countFlag = !this.countFlag
      // 设置倒计时
      this.timer = setInterval(() => {
        if (this.countNum <= 0) {
          // 重置btn提示信息
          this.sendMsg = '点击发送验证码'
          // 清除定时器
          clearInterval(this.timer)
          // 更改btn状态
          this.countFlag = !this.countFlag
          // 重置倒计时状态
          this.countNum = 5
        }
        // 倒计时
        this.countNum--
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  padding: 0 20px;
  margin-top: 30px;
}
</style>
