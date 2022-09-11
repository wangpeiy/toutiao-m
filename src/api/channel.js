// 所有频道的接口
import request from '@/utils/request'
/**
 * @ 获取用户的频道
 * @returns Promise
 */
export const getUserChannelAPI = () =>
  request({
    url: '/v1_0/user/channels'
  })
