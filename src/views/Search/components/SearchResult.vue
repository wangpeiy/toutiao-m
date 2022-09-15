<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="-----我是有底线的-----"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      error: false,
      page: 1,
      per_page: 10,
      results: []
    }
  },
  methods: {
    async getResults() {
      try {
        // 测试代码
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        // 发送请求
        const { data } = await getResultsAPI(
          this.page++,
          this.per_page,
          this.keywords
        )

        const results = data.data.results
        // 判断是否还有数据，如果没有就停止触发@load事件
        if (results.length < this.per_page) {
          this.finished = true
        }
        // 保存数据
        this.results = [...this.results, ...results]
      } catch {
        // 若列表数据加载失败，将 error 设置成 true 即可显示错误提示，用户点击错误提示后会重新触发 load 事件。
        this.error = true
      } finally {
        // 关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
