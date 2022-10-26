<template>
  <van-tabs
    v-model:active="activeTabIndex"
    title-active-color="#FF4040"
    title-inactive-color="grey"
    @click-tab="onClickTab"
    color="#FF4040"
  >
    <van-tab
      v-for="tabItem in tabsData"
      :key="tabItem.id"
      :name="tabItem.type"
      :title="tabItem.text"
    ></van-tab>
  </van-tabs>
</template>

<script>
export default {
  props: {
    tabsData: {
      type: Object,
      default: () => []
    },
    activeTabIndex: Number
  },
  emits: ['update:activeTabIndex', 'recordScrollTop'],
  setup(props, context) {
    function onClickTab(cur) {
      context.emit('recordScrollTop') //在更新下标之前记录
      context.emit('update:activeTabIndex', cur.name)
    }
    return {
      onClickTab
    }
  }
}
</script>

<style></style>
