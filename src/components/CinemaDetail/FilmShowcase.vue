<template>
  <div class="showcase-box">
    <div
      v-if="curFilm"
      class="bg-image"
      :style="{ backgroundImage: `url(${curFilm.poster})` }"
    ></div>
    <div
      class="showcase"
      :style="{ transform: `translateX(${translateX})` }"
    >
      <div
        v-for="(item, index) in films"
        :key="item.filmId"
        class="case-item"
        :class="{ active: curFilmId === item.filmId }"
        @click="changeFilmInfo(item.filmId, index)"
      >
        <img ref="cover" :src="item.poster" class="img" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'

const props = defineProps({
  curFilmId: Number,
  curFilm: {
    type: Object,
    default: () => {}
  },
  films: {
    type: Array,
    default: () => []
  },
  translateX: String
})
const emit = defineEmits(['changeFilmInfo'])
const cover = ref(null)
defineExpose({
  cover
})
function changeFilmInfo(id, index) {
  emit('changeFilmInfo', id, index)
}
</script>

<style lang="scss" scoped>
.showcase-box {
  height: 170px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &::after {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
  .bg-image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(25px);
    background-size: cover;
    background-position: center;
  }
  .showcase {
    display: flex;
    transition: all 0.3s;

    .case-item {
      width: 70px;
      height: 100px;
      flex-shrink: 0;
      margin-right: 15px;
      transition: all 0.5s;
      &.active {
        width: 90px;
        height: 130px;
      }
      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
