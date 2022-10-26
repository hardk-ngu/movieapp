<template>
  <van-list
    ref="clEle"
    class="cinema-list"
    v-model:loading="isLoading"
    :finished="isFinished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <cinema-item
      v-for="item in cinemaList_"
      :key="item.cinemaId"
      :item="item"
    />
  </van-list>
</template>

<script>
import CinemaItem from './CinemaItem'
import { reactive, ref, watch } from 'vue'
export default {
  components: {
    CinemaItem
  },
  props: {
    cinemaList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const isLoading = ref(false)
    const isFinished = ref(false)
    const clEle = ref(null)
    let curTimes = 0
    const piece = 30
    const cinemaList_ = reactive([])
    function onLoad() {
      if (cinemaList_.length === props.cinemaList.length) {
        isFinished.value = true
      } else {
        isLoading.value = true
        const list = props.cinemaList.slice(
          curTimes * piece,
          (curTimes + 1) * piece
        )
        cinemaList_.push(...list)
        curTimes += 1
        isLoading.value = false
      }
    }
    function reset() {
      curTimes = 0
      isFinished.value = false
      cinemaList_.splice(0, cinemaList_.length)
      clEle.value.$el.scrollTop = 0 //回到顶部，因为浏览器有记录功能会停留在上次滚动的地方
    }
    watch(
      () => props.cinemaList,
      (newList, oldlist) => {
        reset()
        onLoad()
      },
      {
        deep: true
      }
    )
    return {
      clEle,
      isLoading,
      isFinished,
      cinemaList_,
      curTimes,
      onLoad
    }
  }
}
</script>

<style lang="scss" scoped>
.cinema-list {
  flex: 1;
  overflow: scroll;
}
</style>
