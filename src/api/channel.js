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

/**
 * @ 获取所有的频道
 * @returns Promise
 */
export const getAllChannelsAPI = () =>
  request({
    url: '/v1_0/channels'
  })

/**
 * @ 删除用户频道
 * @param {Number | String} id
 * @returns Promise
 */
export const delChannelAPI = (id) =>
  request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })

/**
 * @ 删除频道接口
 * @param {String | Number} id 新增频道的id
 * @param {Number} seq  新增频道添加的索引值
 * @returns Promise
 */
export const addChannelAPI = (id, seq) =>
  request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [{ id, seq }]
    }
  })
