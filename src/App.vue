<script setup>
import { getLocation } from '@/axios/api.js'
import { mutations } from '@/vuex/index.js'
import TabBar from '@/components/TabBar.vue'
import { ref, onMounted, provide, watch } from 'vue'
import { useRoute } from 'vue-router'
components: {
  TabBar
}
const route = useRoute()
const tabBarData = [
  { id: 1, text: '电影', icon: 'all', path: '/' },
  { id: 2, text: '影院', icon: 'comments', path: '/cinemas' },
  { id: 3, text: '我的', icon: 'account', path: '/profile' }
]
const activeTabBarIndex = ref(1)
const tabbar = ref(null)
let tabbarHeight = ref(null)
const isShowTabbar = ref(true)
watch(
  () => route.path,
  (newpath) => {
    const target = tabBarData.find((item) => item.path === newpath)
    if (target) {
      isShowTabbar.value = true
      mutations.updateTabbarName(target.text)
    } else {
      isShowTabbar.value = false
    }
  },
  {
    immediate: true
  }
)
_getLocation()
async function _getLocation() {
  const { city } = await getLocation({
    url: '/gateway',
    XHost: 'mall.film-ticket.city.locate'
  })
  mutations.updateCityInfo(city)
}

onMounted(() => {
  tabbarHeight.value = tabbar.value && tabbar.value.$el.clientHeight
})
provide('tabbarHeight', tabbarHeight)
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="['FilmDetail', 'CinemaDetail']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <tab-bar
    v-if="isShowTabbar"
    ref="tabbar"
    v-model="activeTabBarIndex"
    :tabBarData="tabBarData"
  />
</template>

<style lang="scss">
@import url('./assets/iconfont/iconfont.css');
@import url('./assets/common.scss');
</style>
