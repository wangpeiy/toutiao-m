<template>
  <div>
    <!-- 没有图片 -->
    <van-cell
      v-if="article.cover.type === 0"
      :title="article.title"
      :label="label"
    />
    <!-- 一张图片 -->
    <van-cell
      v-else-if="article.cover.type === 1"
      :title="article.title"
      :label="label"
    >
      <van-image
        width="90"
        height="90"
        :src="article.cover.images[0]"
      ></van-image>
    </van-cell>
    <!-- 三张图片 -->
    <van-cell v-else-if="article.cover.type === 3" :title="article.title">
      <template #label>
        <van-image
          v-for="(item, index) in article.cover.images"
          :key="index"
          :src="item"
          width="90"
          height="90"
        ></van-image>
        <p>{{ label }}</p>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      /* eslint-disable */
      const { aut_name, pubdate, comm_count } = this.article
      return `${aut_name} ${comm_count}评论 ${pubdate}`
    }
  }
}
</script>

<style></style>
