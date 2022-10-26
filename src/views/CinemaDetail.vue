<template>
  <div class="detail-view" v-show="films.length > 0">
    <my-nav-bar
      ref="navBar"
      :title="title"
      :isShowLeftText="false"
      leftIconName="back"
      :leftIconSize="20"
      @onClickLeft="goBack"
    />
    <cinema-info :detail="detail" v-model="showServicesPopup" />
    <film-showcase
      ref="coverImg"
      :curFilmId="curFilmId"
      :curFilm="curFilm"
      :films="films"
      :translateX="translateX"
      @changeFilmInfo="changeFilmInfo"
    />
    <film-info
      ref="filmInfo"
      :curFilm="curFilm"
      @toFilmDetail="toFilmDetail"
      :class="{ active: isSticky }"
    />
    <schedule-list
      :schedules="curFilmSchedule"
    />
    <van-popup
      class="popup"
      v-model:show="showServicesPopup"
      position="bottom"
      :style="{ width: '100%' }"
    >
      <template #default>
        <ul class="p_services">
          <li v-for="item in detail.services" class="p_service-item">
            <span class="service">{{ item.name }}：</span>
            <span class="desc">{{ item.description }}</span>
          </li>
        </ul>
      </template>
    </van-popup>
  </div>
  <my-loading position="fixed" v-show="films.length === 0" />
</template>
<script>
import {
  detail,
  films,
  schedules,
  _getCinemaSchedule,
  resetTime,
  getCinemaId
} from '@/compositionAPI/getDataInCD'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CinemaInfo from '@/components/CinemaDetail/CinemaInfo.vue'
import FilmShowcase from '@/components/CinemaDetail/FilmShowcase.vue'
import FilmInfo from '@/components/CinemaDetail/FilmInfo.vue'
import ScheduleList from '@/components/CinemaDetail/ScheduleList.vue'
export default {
  name: 'CinemaDetail',
  components: {
    CinemaInfo,
    FilmShowcase,
    FilmInfo,
    ScheduleList
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const navBar = ref(null)
    const navBarHeight = ref(null)
    const filmInfo = ref(null)
    const isSticky = ref(false)
    const filmId = ref(null)
    const title = ref(null)
    const translateX = ref('36%')
    const coverImg = ref(null)
    const showServicesPopup = ref(false)
    let FIoffsetTop = 0
    let NBoffsetHeight = 0
    const curFilmId = computed({
      get() {
        if (!filmId.value && films[0]) {
          return films[0].filmId
        } else {
          return filmId.value
        }
      },
      set(value) {
        filmId.value = value
      }
    })
    const curFilm = computed(() => {
      const target = films.find(
        (item) => item.filmId === curFilmId.value
      )
      if (target) {
        return target
      } else {
        return films[0]
      }
    })
    const curFilmSchedule = computed(() => {
      return schedules[curFilmId.value] || {}
    })
    getCinemaId(route.query.cinemaId)
    onMounted(() => {
      window.addEventListener('scroll', onScroll)
    })

    function onScroll() {
      const scrollTop = document.documentElement.scrollTop
      setNavBarTitle(scrollTop)
      stickyFilmInfoCom(scrollTop)
    }
    function setNavBarTitle(scrollTop) {
      if (!navBarHeight.value) {
        navBarHeight.value = `${navBar.value.$el.offsetHeight}px`
        NBoffsetHeight = navBar.value.$el.offsetHeight
      }

      if (scrollTop >= NBoffsetHeight) {
        title.value = detail.name
      } else {
        title.value = ''
      }
    }
    function stickyFilmInfoCom(scrollTop) {
      if (!FIoffsetTop) {
        FIoffsetTop = filmInfo.value.$el.offsetTop
      }
      if (scrollTop >= FIoffsetTop) {
        isSticky.value = true
      } else {
        isSticky.value = false
      }
    }

    function changeFilmInfo(filmId, index) {
      if (filmId === curFilmId.value) {
        return
      } else {
        // 要用原始的宽度不要用active的宽度，因为当元素加了active类后父元素的总宽度依然不变，求的就是两个图形中点连线的距离
        curFilmId.value = filmId
        const cover = coverImg.value.cover
        const curWidth = cover[index].offsetWidth / 2
        let marginRight = 15
        let algo = null
        algo = curWidth * 2 + marginRight
        translateX.value = `calc(36% - ${algo * index}px)`
        resetTime()
        checkScheduleCache(filmId)
      }
    }
    function checkScheduleCache(filmId) {
      if (!schedules[filmId]) {
        _getCinemaSchedule(filmId)
      }
    }
    function goBack() {
      router.back()
    }
    function toFilmDetail() {
      router.push({
        path: '/filmDetail',
        query: { filmId: curFilmId.value }
      })
    }

    return {
      navBar,
      navBarHeight,
      filmInfo,
      isSticky,
      detail,
      title,
      films,
      curFilmId,
      curFilm,
      curFilmSchedule,
      translateX,
      coverImg,
      showServicesPopup,
      changeFilmInfo,
      goBack,
      toFilmDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  height: auto !important;
  .p_services {
    padding: 10px;
  }
  .p_service-item {
    display: flex;
    font-size: 15px;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    .service {
      width: 20%;
      color: $orange;
      word-break: keep-all;
      text-align: right;
    }
    .desc {
      flex: 1;
      color: #333;
      font-size: 15px;
    }
  }
}
.active {
  position: sticky;
  top: v-bind(navBarHeight);
  z-index: 2;
}
</style>
