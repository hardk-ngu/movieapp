<template>
  <div
    ref="filmItemEle"
    class="film-item"
    @click="toDetail(filmItem.filmId)"
  >
    <van-image
      width="80"
      height="100"
      :src="filmItem.poster"
      lazy-load
    />
    <div class="film-info">
      <div class="title">
        <span>{{ filmItem.name }}</span>
        <span class="tag">{{ filmItem.filmType.name }}</span>
      </div>
      <div class="grade" v-if="filmItem.grade">
        观众评分:{{ filmItem.grade ? filmItem.grade : '暂无评分' }}
      </div>
      <div class="actors">
        主演:{{ handleActors(filmItem.actors) }}
      </div>
      <div v-if="activeTabIndex === 1">
        {{ filmItem.nation }} | {{ filmItem.runtime }}分钟
      </div>
      <div v-else>
        上映日期：{{ formatTime(filmItem.premiereAt) }}
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatTime } from '@/utility'
export default {
  props: {
    filmItem: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const activeTabIndex = inject('activeTabIndex')
    const router = useRouter()
    const filmItemEle = ref(null)
    function handleActors(value) {
      if (!Array.isArray(value)) {
        return '暂无主演'
      }
      const actors = value.reduce((pre, next, index) => {
        pre = `${pre} ${next.name}`
        return pre
      }, '')
      return actors
    }
    function toDetail(filmId) {
      router.push({ path: '/filmDetail', query: { filmId } })
    }
    return {
      filmItemEle,
      activeTabIndex,
      handleActors,
      formatTime,
      toDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.film-item {
  padding: 10px;
  font-size: 14px;
  display: flex;
  margin-top: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.film-item:not(:last-child) {
  margin-top: 0;
}
.film-info {
  flex: 1;
  padding: 5px 0;
  margin-left: 10px;
  color: grey;
  overflow: hidden;
  .title {
    font-size: 16px;
    color: #363636;
    .tag {
      font-size: 14px;
      padding: 1px;
      margin-left: 5px;
      border-radius: 1px;
      background-color: LightGray;
      color: #fff;
    }
  }
  .grade {
    margin-top: 5px;
  }
  .actors {
    margin: 5px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
