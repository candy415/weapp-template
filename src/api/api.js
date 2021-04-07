import api from './axios'

export default {
  // 微信授权
  apiAuth: code => api.get(`/emergency/wx/auth/getCode/${code}`),
  // 发送验证码,参数phone
  sendCode: params => api.get('/emergency/wx/sms/sendCode', { params: params }),
  // 验证短信验证码,参数phone,code
  confirmCode: params => api.get('/emergency/wx/sms/checkCode', { params: params }),
  // 获取当前微信用户的个人信息(已绑定手机号)
  getUserInfo: params => api.get('/emergency/wx/employee/getUserInfo', { params: params }),
  // 更新用户信息
  updateUserInfo: params => api.post(`/emergency/wx/employee/update?access_token=${sessionStorage.getItem('access_token')}`, params)
}