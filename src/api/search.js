import request from '@/utils/request'
/**
 * @ 搜索建议
 * @param {String} q
 * @returns Promise
 */
export const getSuggestionsAPI = (q) =>
  request({
    url: '/v1_0/suggestion',
    params: { q }
  })

/**
 * 获取搜索结果
 * @param {Number} page
 * @param {Number} per_page
 * @param {String} q
 * @returns Promise
 */
export const getResultsAPI = (/* eslint-disable-line */ page, per_page, q) =>
  request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
