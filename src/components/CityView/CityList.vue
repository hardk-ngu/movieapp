<template>
  <van-index-bar
    class="index-bar"
    :index-list="firstWords"
    highlight-color="#FF4040"
    :sticky="true"
    :sticky-offset-top="stickyHeaderHeight"
  >
    <template v-for="(value, key) in letterTable" :key="key">
      <van-index-anchor :index="key"></van-index-anchor>
      <div @click.capture="chooseCity">
        <van-cell
          :title="item.name"
          v-for="item in value"
          :key="item.cityId"
          :data-cityid="item.cityId"
          :data-cityname="item.name"
        ></van-cell>
      </div>
    </template>
  </van-index-bar>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    firstWords: {
      type: Array,
      default: () => []
    },
    letterTable: {
      type: Object,
      default: () => {}
    },
    stickyHeaderHeight: Number
  },
  emits: ['chooseCity'],
  setup(props, context) {
    function chooseCity(event) {
      context.emit('chooseCity', event)
    }
    return {
      chooseCity
    }
  }
}
</script>

<style lang="scss" scoped>
.index-bar {
  user-select: none;
  :deep(.van-index-anchor) {
    pointer-events: none;
  }
}
</style>
