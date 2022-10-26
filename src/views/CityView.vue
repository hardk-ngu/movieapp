<template>
  <div class="city-view">
    <div class="sticky-header" ref="stickyHeader">
      <nav-bar
        :title="`当前城市-${store.city.name}`"
        leftIconName="close"
        :leftIconSize="18"
        :isShowLeftText="false"
        @onClickLeft="goBack"
      />
      <van-search
        v-model="inputValue"
        :show-action="inputValue ? true : false"
        placeholder="请输入名称或拼音"
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>
    <div class="normal-content" v-show="!inputValue">
      <location-and-hot
        :curLocation="store.city"
        :hotCities="hotCity.data"
        @chooseCity="chooseCity"
      />
      <city-list
        :firstWords="firstWords.data"
        :letterTable="letterTable.data"
        :sticky-header-height="stickyHeaderHeight"
        @chooseCity="chooseCity"
      />
      <my-loading v-show="!isLetterTableDone" position="absolute" />
    </div>
    <search-result
      v-show="inputValue"
      :resultList="resultList"
      @chooseCity="chooseCity"
    />
  </div>
</template>

<script>
import { store, mutations } from '@/vuex/index.js'
import { getCinemaList_ } from '@/compositionAPI/getCinemaList.js'
import { resetFilms } from '@/compositionAPI/getfilmList.js'
import {
  city,
  firstWords,
  letterTable,
  hotCity,
  _getCities
} from '@/compositionAPI/getCityData.js'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import LocationAndHot from '@/components/CityView/LocationAndHot.vue'
import CityList from '@/components/CityView/CityList.vue'
import SearchResult from '@/components/CityView/SearchResult.vue'
export default {
  components: { NavBar, LocationAndHot, CityList, SearchResult },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const inputValue = ref('')
    const stickyHeader = ref(null)
    const stickyHeaderHeight = ref(0)
    const resultList = computed(() => {
      if (inputValue.value) {
        return city.data.filter((item) => {
          const firstLetter = item.pinyin.charAt(0)
          return (
            item.name.includes(inputValue.value) ||
            firstLetter.includes(inputValue.value)
          )
        })
      }
    })
    const isLetterTableDone = computed(() => {
      return Object.keys(letterTable.data).length > 0
    })
    _getCities()
    // 在电脑上点击首字母会选中该字母的第一个城市，但在手机上不会
    async function chooseCity(event) {
      let dataset = null
      // 之所以要遍历是因为很难选中正确的元素，只能一个个往上面找
      for (let item of event.path) {
        if (item.dataset.cityid) {
          dataset = item.dataset
          break
        }
      }
      const { cityid, cityname } = dataset
      const { fromPath, ticketFlag } = route.query
      if (cityid != store.city.id) {
        mutations.updateCityInfo({ cityId: cityid, name: cityname })
        switch (fromPath) {
          case '/':
            resetFilms()
            break
          case '/cinemas':
            getCinemaList_({ cityId: cityid, ticketFlag })
            break
        }
      }
      router.back()
    }
    function onSearch() {}
    function onCancel() {
      inputValue.value = ''
    }
    function goBack() {
      router.back()
    }
    onMounted(() => {
      stickyHeaderHeight.value = stickyHeader.value.offsetHeight
    })
    return {
      store,
      city,
      firstWords,
      letterTable,
      hotCity,
      inputValue,
      stickyHeader,
      stickyHeaderHeight,
      isLetterTableDone,
      resultList,
      goBack,
      chooseCity,
      onSearch,
      onCancel
    }
  }
}
</script>

<style lang="scss" scoped>
.city-view {
  :deep(.van-index-anchor) {
    width: 95%;
    color: gray;
    background-color: whitesmoke;
  }
  :deep(.van-index-bar__index) {
    font-size: 14px;
    color: grey;
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
