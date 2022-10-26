<template>
  <van-tabbar
    v-model="activeTabBarIndex"
    active-color="#EE6A50"
    route
  >
    <van-tabbar-item
      v-for="tabItem in tabBarData"
      :key="tabItem.id"
      icon-prefix="myicon"
      :icon="tabItem.icon"
      :to="tabItem.path"
      >{{ tabItem.text }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
export default {
  props: {
    activeTabBarIndex: Number,
    tabBarData: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style></style>
