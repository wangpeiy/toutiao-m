<template>
  <div class="article">
    <!-- 属性 -->
    <!-- @ load: 触底的时候触发load事件 -->
    <!-- @ offset: 滚动条和底部距离多少的时候触发load事件, 默认值是300px -->
    <!-- @ immediate-check: 初渲染的时候是否执行load事件, 默认值是true  -->
    <!-- @ v-model="loading" -->
    <!-- @ loading为true,load事件不会被触发 -->
    <!-- @ loading为false的时候,load事件会被触发 -->
    <!-- @ loading会在load事件执行后,被van-list组件自动设置为ture, 需要手动的改为false -->
    <!-- @ finished:Boolean. false:load事件会被触发 true:load事件不会被出发了, 并且显示finished-text的文本 -->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="-----我是有底线的-----"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'Articles',
  components: { ArticleItem },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticlesAPI(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
        // 更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // js的错误，507的错误 原封不动上抛 ； 400 上抛中文
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        // 1. 发送请求
        const { data } = await getArticlesAPI(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 如果是下滑加载，将数据放在后面，期间loading为true
        // 如果是下拉刷新，将数据放在前面, 期间refreshLoading为true
        // 2. 添加到articles
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }
        // 3. 更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // 4. 对错误进行处理
        this.error = true
      } finally {
        // finally语句一定会执行
        // 5. 更改loading
        this.loading = false
        // 更改refreshLoading
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 如何给盒子拥有自己的滚动条
// - 1.定高 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bfdefd;
    border-radius: 5px;
  }
}
</style>
