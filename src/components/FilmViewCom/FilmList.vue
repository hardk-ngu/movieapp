<template>
  <van-list
    class="list"
    v-model:loading="isLoad"
    :finished="isFinish"
    finished-text="没有更多了"
    @load="onLoad"
    :style="{
      marginBottom: `${tabbarHeight}px`
    }"
  >
    <film-item
      v-for="item in curTabList"
      :key="item.filmId"
      :filmItem="item"
    />
  </van-list>
</template>

<script>
import { isLoad, isFinish } from '@/compositionAPI/getfilmList.js'
import FilmItem from './FilmItem.vue'
import { inject } from 'vue'
export default {
  components: {
    FilmItem
  },
  props: {
    curTabList: {
      type: Array,
      default: () => []
    },
    stickyHeaderHeight: Number
  },
  emits: ['onLoad'],
  setup(props, context) {
    const tabbarHeight = inject('tabbarHeight') // 用于躲避tabbar的阻挡

    function onLoad() {
      context.emit('onLoad')
    }
    return {
      isLoad,
      isFinish,
      tabbarHeight,
      onLoad
    }
  }
}
</script>

<style lang="scss" scoped></style>
