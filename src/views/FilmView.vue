<template>
  <div ref="filmView" class="film-view">
    <div class="sticky-header" ref="stickyHeader">
      <nav-bar @onClickLeft="toCityPage" />
      <tabs
        :tabsData="tabsData"
        v-model:activeTabIndex="activeTabIndex"
        @recordScrollTop="handleRecord"
      />
    </div>
    <film-list
      ref="filmListEle"
      :curTabList="curTabList"
      :sticky-header-height="stickyHeaderHeight"
      @onLoad="handleOnLoad"
    />
  </div>
</template>

<script>
import { store } from '@/vuex/index.js'
import {
  _getfilmList,
  checkCache,
  isLoad,
  isFinish
} from '@/compositionAPI/getfilmList.js'
import NavBar from '@/components/NavBar.vue'
import Tabs from '@/components/FilmViewCom/Tabs.vue'
import FilmList from '@/components/FilmViewCom/FilmList.vue'
import { ref, provide, watch, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  components: {
    NavBar,
    Tabs,
    FilmList
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const tabsData = [
      { id: 1, text: '正在热映', type: 1 },
      { id: 2, text: '即将上映', type: 2 }
    ]
    let tabScroll = {}
    const filmView = ref(null)
    const stickyHeader = ref(null)
    const filmListEle = ref(null)
    const stickyHeaderHeight = ref(0)
    const activeTabIndex = ref(1)
    const curTabList = computed(() => {
      return (
        store.films[activeTabIndex.value] &&
        store.films[activeTabIndex.value].data
      )
    })
    watch(
      () => store.city.id,
      (newvalue, oldvalue) => {
        handleOnLoad()
      }
    )
    watch(
      () => activeTabIndex.value,
      (newvalue) => {
        if (!checkCache(newvalue) && !checkScrollTop()) {
          _getfilmList(newvalue)
        }

        setTimeout(() => {
          handleBackPos() //一定要等有数据然后将节点渲染上去了才有高度
        }, 0)
      }
    )
    onMounted(() => {
      stickyHeaderHeight.value = stickyHeader.value.offsetHeight
    })
    // 更新了当前城市后再获取电影数据
    function handleOnLoad() {
      if (store.city.id) {
        _getfilmList(activeTabIndex.value)
      }
    }
    function toCityPage() {
      router.push({
        path: '/city',
        query: {
          fromPath: route.path
        }
      })
    }
    function handleRecord() {
      tabScroll[activeTabIndex.value] = filmView.value.scrollTop
    }
    function checkScrollTop() {
      return filmView.value.scrollTop
    }
    function handleBackPos() {
      filmView.value.scrollTop = tabScroll[activeTabIndex.value]
        ? tabScroll[activeTabIndex.value]
        : 0
    }

    // filmItem会用到
    provide('activeTabIndex', activeTabIndex)
    return {
      store,
      tabScroll,
      filmView,
      stickyHeader,
      filmListEle,
      stickyHeaderHeight,
      tabsData,
      activeTabIndex,
      curTabList,
      handleOnLoad,
      handleBackPos,
      handleRecord,
      toCityPage,
      isLoad,
      isFinish
    }
  }
}
</script>

<style lang="scss" scoped>
.film-view {
  // 想要有滚动距离一定要设置宽高且超出滚动效果
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
.sticky-header {
  width: 100%;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 2;
}
</style>
