import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
//  vuex-persistedstate --> 持久化数据
// 1. 下载
// -  yarn add vuex-persistedstate@3.2.1
// 2. 引入
// -  import createPersistedState from 'vuex-persistedstate'
// 3. 调用
// -  plugins: [createPersistedState()]

// 配置项
// key: 默认值是vuex
// storage: 存储的方式，默认值是本地存储
// reducer:指定持久化哪些数据.函数,return一个对象，对象就作为存储的value
// 参数state
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      // storage: window.sessionStorage,
      reducer({ tokenObj, myChannels, histories }) {
        return { tokenObj, myChannels, histories }
      }
      // reducer(state) {
      //   const { tokenObj } = state
      //   return { tokenObj }
      // }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: [],
    histories: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    /**
     * @ 设置token
     * @param {String} token
     */
    SET_TOKEN(state, token) {
      state.tokenObj = token
    },
    /**
     * @ SET_MY_CHANNELS: 将channels存入vuex
     * @param {*} channels 删除或者添加后的最新的 channels
     */
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    },
    /**
     * @ 设置搜索历史数组
     * @param {Array} histories // 删除或者添加后的新的数组
     */
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  },
  actions: {},
  modules: {}
})
