const pxToRem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    pxToRem({
      // 根节点字体大小
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      // 所有属性转成 rem
      propList: ['*']
    })
  ]
}
