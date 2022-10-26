import { getfilmList } from '@/axios/api'
import { store, mutations } from '@/vuex/index.js'
import { ref } from 'vue'
let isLoad = ref(false),
  isFinish = ref(false)
async function _getfilmList(activeTabIndex) {
  mutations.initializeFilms(activeTabIndex)
  const curTabList = store.films[activeTabIndex].data || []
  if (curTabList.length === store.films[activeTabIndex].total) {
    isFinish.value = true
    isLoad.value = false
  } else {
    isLoad.value = true
    mutations.updateFilmListPageNum(activeTabIndex)
    const data = await getfilmList({
      url: '/gateway',
      pageNum: store.films[activeTabIndex].pageNum,
      pageSize: 10,
      cityId: store.city.id,
      type: activeTabIndex
    })
    mutations.updateFilms(activeTabIndex, data.films)
    mutations.updateFilmTotal(activeTabIndex, data.total)
    isLoad.value = false
  }
}


function checkCache(activeTabIndex) {
  let isCache = null
  if (!store.films[activeTabIndex]) {
    isCache = false
  } else {
    isCache = true
  }
  isFinish.value = false
  return isCache
}

function resetFilms() {
  mutations.resetFilms()
  isLoad.value = true //这里也一定要初始化不然的话不会出现文字提示
  isFinish.value = false
}
export { isLoad, isFinish, _getfilmList, checkCache, resetFilms }
