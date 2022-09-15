<template>
  <div>
    <!--? 搜索历史的标题 -->
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = true" />

        <div v-else>
          <span @click="SET_HISTORIES([])">全部删除</span> &nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <!--? 搜索历史 -->
    <van-cell
      v-for="item in histories"
      :key="item"
      :title="item"
      @click="!isEdit && $emit('change-keywords', item)"
    >
      <template #extra>
        <van-icon
          @click="SET_HISTORIES(histories.filter((i) => item !== i))"
          name="close"
          v-show="isEdit"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState(['histories'])
  },
  methods: {
    ...mapMutations(['SET_HISTORIES'])
  }
}
</script>

<style scoped lang="less">
:deep(.van-icon-delete-o) {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
