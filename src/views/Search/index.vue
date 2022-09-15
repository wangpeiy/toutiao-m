<template>
  <div>
    <!--@ 搜索框 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.push('/')"
        @focus="isShowSearchResult = false"
        autofocus
      />
    </form>

    <!--@ 搜索历史/建议/搜索结果 -->
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-result></search-result> -->
    <component
      @change-keywords="onSearch"
      :keywords="keywords"
      :is="componentName"
    ></component>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  components: { SearchHistory, SearchSuggestion, SearchResult },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 把 keywords 关键词存起来
      // 1. 用户手动敲回车 2. 点击了搜索建议
      // 数组去重
      const distincthistories = [...new Set([keywords, ...this.histories])]
      // 存储搜索历史
      this.SET_HISTORIES(distincthistories)

      this.isShowSearchResult = true
      this.keywords = keywords
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
