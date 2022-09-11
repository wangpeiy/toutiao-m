import request from '@/utils/request'
/**
 * @登录
 * @param {String} mobile 手机号
 * @param {Number} code 验证码
 * @return Promise
 */
export const login = (mobile, code) =>
  request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })

/**
 * @发送验证码
 * @param {*} mobile 手机号
 * @returns Promise
 */
export const sendCodeAPI = (mobile) =>
  request({
    url: `/v1_0/sms/codes/${mobile}`
  })

/**
 * @获取用户星系
 * @returns Promise
 */
export const getUserInfoAPI = () =>
  request({
    url: '/v1_0/user'
  })
