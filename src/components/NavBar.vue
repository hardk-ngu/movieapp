<template>
  <van-nav-bar
    :title="tabbarName_x"
    @click-left="onClickLeft"
    safe-area-inset-top
    class="navbar"
  >
    <template #left>
      <span style="color: grey" v-if="isShowLeftText">{{
        store.city.name
      }}</span>
      <van-icon
        class-prefix="myicon"
        :name="leftIconName"
        :size="leftIconSize"
      />
    </template>
    <template #right v-if="isShowSearch">
      <van-icon
        class-prefix="myicon"
        name="search"
        @click="onSearch"
      /> </template
  ></van-nav-bar>
</template>

<script>
import { store } from '@/vuex/index.js'
import { computed } from 'vue'
export default {
  props: {
    title: String,
    isShowLeftText: {
      type: Boolean,
      default: true
    },
    isShowSearch: Boolean,
    leftIconName: {
      type: String,
      default: 'moreunfold'
    },
    leftIconSize: {
      type: Number,
      default: 10
    }
  },
  emits: ['onClickLeft', 'onSearch'],
  setup(props, context) {
    const tabbarName_x = computed(() => {
      if (props.title) {
        return props.title
      } else {
        return store.tabbarName
      }
    })
    function onClickLeft() {
      context.emit('onClickLeft')
    }
    function onSearch() {
      context.emit('onSearch')
    }
    return {
      store,
      tabbarName_x,
      onClickLeft,
      onSearch
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 3;
}
</style>
