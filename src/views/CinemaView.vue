<template>
  <div class="cinema-view">
    <nav-bar
      :isShowSearch="true"
      @onClickLeft="toCityView"
      @onSearch="toSearchView"
    />
    <filter-bar>
      <filter-bar-item
        ref="cityDrop"
        refName="cityDrop"
        :districts="districts.data"
        :currentDistrictId="currentDistrictId"
        @chooseDistrict="chooseDistrict"
      >
        <template
          #default="{ districts, chooseDistrict, currentDistrictId }"
        >
          <ul class="city-options" @click.capture="chooseDistrict">
            <li
              class="option-item"
              :class="{ active: key == currentDistrictId }"
              v-for="(value, key) in districts"
              :key="key"
              :data-districtId="key"
            >
              {{ value }}
            </li>
          </ul>
        </template>
      </filter-bar-item>
      <filter-bar-item
        :options="ticketOptions"
        :modelValue="ticketFlag"
        :change="bookWayChange"
      ></filter-bar-item>
      <filter-bar-item
        :options="likeOptions"
        :modelValue="likeFlag"
        :change="likeChange"
      ></filter-bar-item>
    </filter-bar>
    <cinema-list
      v-if="cinemas[ticketFlag]"
      :style="{
        marginBottom: `${tabbarHeight}px`
      }"
      :cinemaList="dynamicList.data"
    />
    <my-loading v-else position="absolute" />
  </div>
</template>

<script>
import CinemaList from '@/components/CinemaView/CinemaList.vue'
import { store } from '@/vuex/index.js'
import {
  getCinemaList_,
  cinemas,
  districts,
  filterDistrict
} from '@/compositionAPI/getCinemaList.js'
import NavBar from '@/components/NavBar.vue'
import FilterBar from '@/components/CinemaView/FilterBar.vue'
import FilterBarItem from '@/components/CinemaView/FilterBarItem.vue'
import { reactive, inject, ref, computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Toast } from 'vant'
export default {
  components: { CinemaList, NavBar, FilterBar, FilterBarItem },
  setup(props) {
    const tabbarHeight = inject('tabbarHeight')
    const router = useRouter()
    const route = useRoute()
    const dynamicList = reactive({
      data: []
    })
    const ticketOptions = [
      { text: 'APP订票', value: 1 },
      { text: '前台订票', value: 2 }
    ]
    const likeOptions = [
      { text: '离我最近', value: 1 },
      { text: '最近去过', value: 2 }
    ]
    const ticketFlag = ref(1)
    const likeFlag = ref(1)
    const cityDrop = ref(null)
    const currentDistrictId = ref(null)
    const newList = computed(() => {
      if (currentDistrictId.value == store.city.id) {
        return cinemas[ticketFlag.value]
      } else {
        return (
          cinemas[ticketFlag.value] &&
          cinemas[ticketFlag.value].filter((item) => {
            return item.district.districtId == currentDistrictId.value
          })
        )
      }
    })
    watchEffect(() => {
      if (newList.value && newList.value.length) {
        dynamicList.data = newList.value
      }
    })
    // 这个主要用于是切换城市回来后修改currentDistrictId值
    watchEffect(() => {
      if (store.city.id) {
        currentDistrictId.value = store.city.id
      }
    })

    checkCache()
    async function checkCache() {
      if (!cinemas[ticketFlag.value]) {
        await getCinemaList_({
          cityId: store.city.id,
          ticketFlag: ticketFlag.value
        })
      } else {
        filterDistrict(ticketFlag.value)
      }
    }

    function chooseDistrict(event) {
      if (
        event.target.dataset.districtid == currentDistrictId.value
      ) {
        return
      } else {
        currentDistrictId.value = event.target.dataset.districtid
        cityDrop.value.cityDropEle.toggle(false) //收起下拉框
      }
    }

    function bookWayChange(value) {
      ticketFlag.value = value
      checkCache()
    }
    function likeChange(value) {
      likeFlag.value = value
      if (likeFlag.value === 1) {
        dynamicList.data.sort(
          (cur, pre) => cur.Distance - pre.Distance
        )
      } else {
        dynamicList.data.sort(
          (cur, pre) => pre.Distance - cur.Distance
        )
      }
    }
    function toCityView() {
      router.push({
        path: '/city',
        query: {
          fromPath: route.path,
          ticketFlag: ticketFlag.value
        }
      })
    }
    function toSearchView() {
      router.push({
        path: '/searchCinema'
      })
    }
    return {
      store,
      cinemas,
      districts,
      tabbarHeight,
      cityDrop,
      dynamicList,
      currentDistrictId,
      ticketOptions,
      likeOptions,
      ticketFlag,
      likeFlag,
      chooseDistrict,
      bookWayChange,
      likeChange,
      toCityView,
      toSearchView
    }
  }
}
</script>

<style lang="scss" scoped>
.cinema-view {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  :deep(.van-dropdown-menu__bar) {
    box-shadow: unset;
    border-bottom: 1px solid whitesmoke;
  }
  :deep(.van-dropdown-menu__title) {
    color: gray;
  }

  // :deep(.van-dropdown-item__content) {
  //   display: flex;
  //   flex-wrap: wrap;
  // }
}

.city-options {
  padding: 10px;
  padding-left: 0;
  padding-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  color: gray;
  background-color: white;
  .option-item {
    width: calc((100vw - 4 * 10px - 10px) / 4);
    padding: 5px 10px;
    border: 1px solid rgba(211, 211, 211, 0.5);
    margin-left: 10px;
    margin-bottom: 10px;
    text-align: center;
    white-space: nowrap;
    box-sizing: border-box;
    &.active {
      color: $theme-color;
    }
  }
}
</style>
