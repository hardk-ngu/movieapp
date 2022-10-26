<template>
  <div class="film-info" v-if="curFilm">
    <div class="info-header">
      <span class="film-name">{{ curFilm.name }}</span>
      <span class="grade">{{ curFilm.grade }}分</span>
    </div>
    <div class="film-introduce">
      <span class="no-break"
        >{{ curFilm.category }}&nbsp;|&nbsp;</span
      >
      <span class="no-break"
        >{{ curFilm.runtime }}分钟&nbsp;|&nbsp;</span
      >
      <span class="no-break ellipsis"
        >{{ curFilm.director }}&nbsp;|&nbsp;</span
      >
      <span class="actors ellipsis">{{
        formartActors(curFilm.actors)
      }}</span>
    </div>
    <van-icon
      class-prefix="myicon"
      name="more"
      class="moreIcon"
      @click="toFilmDetail"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  curFilm: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['toFilmDetail'])
function formartActors(actors) {
  let str = ''
  actors.forEach((item, index) => {
    if (index === actors.length - 1) {
      str += item.name
    } else {
      str += `${item.name} `
    }
  })
  return str
}
function toFilmDetail() {
  emit('toFilmDetail')
}
</script>

<style lang="scss" scoped>
.no-break {
  white-space: nowrap;
}
.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.film-info {
  padding: 15px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fff;
  .info-header {
    text-align: center;
    margin-bottom: 10px;
    .film-name {
      margin-right: 5px;
    }
    .grade {
      color: $orange;
    }
  }

  .film-introduce {
    display: flex;
    font-size: 13px;
    color: #797d82;
    overflow: hidden;

    .actors {
      flex: 1;
    }
  }
  .moreIcon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
