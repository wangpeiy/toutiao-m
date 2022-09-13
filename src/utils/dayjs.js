// dayjs语言默认使用英文
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 配置语言为中文
dayjs.extend(relativeTime)

export default dayjs
