export const mobileRules = [
  { required: true, message: '手机号不能为空' },
  {
    pattern:
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
    message: '手机号格式错误'
  }
]

export const codeRules = [
  { required: true, message: '验证码不能为空' },
  { pattern: /[0-9]{6}/, message: '验证码格式不正确' }
]
