<template>
  <div
    v-if="filmDetail.data.poster"
    :style="{ top: `-${scrollTop}px` }"
    :class="['film-detail', { active: isShowAlbum }]"
    @scroll="onPageScroll"
  >
    <nav-header
      v-show="isShowNH"
      :title="filmDetail.data.name"
      v-scroll="onScroll"
      @handleBack="handleBack"
    />
    <div
      class="cover"
      :style="`background-image:url(${filmDetail.data.poster})`"
    ></div>
    <div class="film-info">
      <div class="info-header">
        <span>{{ filmDetail.data.name }}</span>
        <span class="tag">{{ filmDetail.data.filmType.name }}</span>
        <div class="grade-box" v-show="filmDetail.data.grade">
          <span class="grade">{{ filmDetail.data.grade }}</span
          >分
        </div>
      </div>
      <div class="category">
        {{ formatCategory(filmDetail.data.category) }}
      </div>
      <div class="date">
        {{ formatTime(filmDetail.data.premiereAt) }}
      </div>
      <div class="nation">
        {{ filmDetail.data.nation }} |
        {{ filmDetail.data.runtime }}分钟
      </div>
      <div
        ref="synopsis"
        :style="`height:${realHeight}`"
        :class="['synopsis', { hidden: isHidden }]"
      >
        {{ filmDetail.data.synopsis }}
      </div>
      <van-icon
        class-prefix="myicon"
        :name="isHidden ? 'moreunfold' : 'less'"
        class="arrow"
        @click="isHidden = !isHidden"
      />
    </div>
    <div class="actors commonStyle">
      <div>演职人员</div>
      <gallery-com :photos="filmDetail.data.actors" />
    </div>
    <div class="photos commonStyle">
      <div class="header">
        <span>剧照</span>
        <div class="header-right" @click="handleShowAlbum">
          <span>全部({{ filmDetail.data.photos.length }})</span>
          <van-icon
            class-prefix="myicon"
            name="more"
            size="14"
          ></van-icon>
        </div>
      </div>
      <gallery-com
        :photos="filmDetail.data.photos"
        width="140px"
        height="100px"
        :imagePreview="true"
      />
    </div>
    <transition name="slide">
      <album-com
        v-if="isShowAlbum"
        :photos="filmDetail.data.photos"
        v-model="isShowAlbum"
      />
    </transition>
  </div>
  <my-loading position="fixed" v-else></my-loading>
</template>

<script>
import { getFilmDetail } from '@/axios/api.js'
import { formatTime, throttle } from '@/utility'
import { useRoute, useRouter } from 'vue-router'
import { nextTick, reactive, ref, watch } from 'vue'
import GalleryCom from '@/components/FilmDetail/GalleryCom.vue'
import NavHeader from '@/components/FilmDetail/NavHeader.vue'
import AlbumCom from '@/components/FilmDetail/AlbumCom.vue'

export default {
  name: 'FilmDetail',
  components: { GalleryCom, NavHeader, AlbumCom },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const filmDetail = reactive({
      data: {}
    })
    const isHidden = ref(false)
    const realHeight = ref(null)
    const synopsis = ref(null)
    const isShowAlbum = ref(false)
    let tempScrollTop = 0
    const scrollTop = ref(0)
    const isShowNH = ref(true)
    _getFilmDetail()
    async function _getFilmDetail() {
      const { film } = await getFilmDetail({
        url: '/gateway',
        filmId: route.query.filmId,
        k: 1584083,
        XHost: 'mall.film-ticket.film.info'
      })
      filmDetail.data = film
      nextTick(() => {
        realHeight.value = `${synopsis.value.offsetHeight}px`
        isHidden.value = !isHidden.value
      })
    }
    function formatCategory(category) {
      let str = ''
      for (let i = 0; i < category.length; i++) {
        if (category[i].charCodeAt() < 10000) {
          str += ` ${category[i]} `
        } else {
          str += category[i]
        }
      }
      return str
    }
    function handleBack(event) {
      router.back()
    }
    function handleShowAlbum() {
      scrollTop.value = tempScrollTop
      isShowAlbum.value = !isShowAlbum.value
      setTimeout(() => {
        isShowNH.value = false
      }, 500)
    }
    function handleCloseAlbum() {
      nextTick(() => {
        window.scrollTo(0, scrollTop.value)
        isShowNH.value = true
      })
    }
    function onScroll(el, isbind) {
      function modify(event) {
        event.preventDefault()
        tempScrollTop =
          document.documentElement.scrollTop | document.body.scrollTop

        const opacity = tempScrollTop / el.offsetHeight

        el.style.backgroundColor = `rgba(255,255,255,${opacity})`
        el.style.color = `rgba(105,105,105,${opacity})`
      }
      return throttle(modify, 50, isbind)
    }
    watch(
      () => isShowAlbum.value,
      (newvalue, oldvalue) => {
        if (!newvalue) {
          handleCloseAlbum()
        }
      }
    )
    return {
      synopsis,
      realHeight,
      filmDetail,
      isHidden,
      isShowNH,
      isShowAlbum,
      scrollTop,
      formatTime,
      formatCategory,
      handleBack,
      handleShowAlbum,
      onScroll
    }
  },
  directives: {
    scroll: {
      mounted(el, binding) {
        el.style.color = 'transparent'
        window.addEventListener('scroll', binding.value(el, true))
      },
      unmounted(el, binding) {
        window.removeEventListener('scroll', binding.value(el, false))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.film-detail {
  width: 100%;
  background-color: whitesmoke;
  &.active {
    position: fixed;
    left: 0;
  }
}
.cover {
  width: 100%;
  // height: 300px;
  height: 200px;
  background-size: cover;
  background-position: center;
}
.commonStyle {
  color: grey;
  background-color: #fff;
  padding: 15px;
}
.film-info {
  font-size: 14px;
  padding: 15px;
  padding-bottom: 0;
  margin-bottom: 10px;
  color: grey;
  background-color: #fff;
}
.info-header {
  position: relative;
  font-size: 18px;
  color: black;
  .tag {
    font-size: 14px;
    padding: 1px;
    margin-left: 5px;
    border-radius: 1px;
    background-color: LightGray;
    color: #fff;
  }
  .grade-box {
    position: absolute;
    right: 0;
    display: inline-block;
    color: #ee9a00;
    .grade {
      font-style: italic;
    }
  }
}
.category {
  margin: 5px 0;
}
.nation {
  margin: 5px 0;
}
.synopsis {
  transition: all 0.5s;
  overflow: hidden;
  &.hidden {
    height: 30px !important;
  }
}
.arrow {
  font-size: 20px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 5px;
}
.actors {
  margin-bottom: 10px;
}
.photos {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 21px;
  }
  .header-right {
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
  }
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
</style>
