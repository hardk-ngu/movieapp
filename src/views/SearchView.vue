<template>
  <div class="search-view">
    <van-search
      class="search-box"
      v-model="inputValue"
      show-action
      placeholder="请输入影院名称"
      autocomplete="off"
      @search="onSearch"
      @cancel="onCancel"
    />
    <div class="recommend-content" v-show="!inputValue">
      <span class="text">离你最近</span>
      <ul class="recommend-list" @click.capture="toCinemaDetail">
        <li
          v-for="item in recommendList"
          :key="item.cinemaId"
          class="recommend-item"
          :data-cinemaId="item.cinemaId"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <cinema-list
      :cinemaList="resultList"
      v-show="resultList.length"
    />

    <div class="no-result" v-show="inputValue && !resultList.length">
      没有找到匹配的结果
    </div>
  </div>
</template>

<script>
import CinemaList from '@/components/CinemaView/CinemaList.vue'
import { cinemas } from '@/compositionAPI/getCinemaList.js'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  components: { CinemaList },
  setup(props) {
    const router = useRouter()
    const inputValue = ref('')
    const recommendList = computed(() => {
      return cinemas[1].slice(0, 5)
    })
    const resultList = computed(() => {
      if (inputValue.value) {
        return cinemas[1].filter((item) => {
          return item.name.includes(inputValue.value)
        })
      } else {
        return []
      }
    })
    function onSearch() {}
    function toCinemaDetail(event) {
      const cinemaId = event.target.dataset.cinemaid
      router.push({
        path: '/cinemaDetail',
        query: {
          cinemaId
        }
      })
    }
    function onCancel() {
      router.back()
    }
    return {
      inputValue,
      recommendList,
      resultList,
      onSearch,
      toCinemaDetail,
      onCancel
    }
  }
}
</script>

<style lang="scss" scoped>
.search-view {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  position: relative;
}
.search-box {
  position: sticky;
  top: 0;
}

.recommend-content {
  padding: 0 10px;
}
.text {
  color: lightgray;
  font-size: 14px;
}
.recommend-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  .recommend-item {
    padding: 5px;
    font-size: 13px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    color: gray;
    background-color: whitesmoke;
    &:last-child {
      margin-right: 0px;
    }
  }
}

.no-result {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
