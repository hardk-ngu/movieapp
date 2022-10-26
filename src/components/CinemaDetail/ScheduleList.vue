<template>
  <div class="schedule-list" v-show="isShow">
    <van-tabs
      v-model:active="activeTab"
      shrink
      color="#ee3b3b"
      title-active-color="#ee3b3b"
      line-height="2px"
    >
      <van-tab
        :title="key"
        v-for="(value, key) in schedules"
        :key="key"
        :title-style="{ fontSize: '15px' }"
        :name="key"
      ></van-tab>
    </van-tabs>
    <template v-if="schedules[activeTab]">
      <div
        :class="{ active: !item.isOnsell }"
        class="schedule-item"
        v-for="item in schedules[activeTab].data"
        :key="item.scheduleId"
      >
        <div class="schedule-item_left">
          <div class="time">
            <span class="showTime">{{
              formatTime(item.showAt)
            }}</span>
            <span class="g-to-g"
              >{{ formatTime(item.endAt) }}散场</span
            >
          </div>
          <div class="type">
            <span class="language">
              {{ item.filmLanguage }}{{ item.imagery }}
            </span>
            <span class="g-to-g">{{ item.hallName }}</span>
          </div>
        </div>
        <div class="schedule-item_right o-to-g">
          <span class="price"
            >￥{{ formatPrice(item.salePrice) }}</span
          >
          <span class="text o-to-g">{{
            item.isOnsell ? '购票' : '停售'
          }}</span>
        </div>
      </div>
    </template>
  </div>
  <my-loading v-show="!isShow" position="fixed" top="80%" />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { formatPrice } from '@/utility/index.js'
const prop = defineProps({
  schedules: {
    type: Object,
    default: () => {}
  }
})
const activeTab = ref(null)
const isShow = computed(() => {
  return Object.keys(prop.schedules).length === 4
})
watch(
  () => isShow.value,
  (newvalue) => {
    if (newvalue) {
      activeTab.value = Object.keys(prop.schedules)[0]
    }
  }
)
function formatTime(timestamp) {
  const date = new Date(timestamp * 1000)
  const hour = date.getHours()
  const minute =
    date.getMinutes() < 10
      ? `0${date.getMinutes()}`
      : date.getMinutes()
  return `${hour}:${minute}`
}
</script>

<style lang="scss" scoped>
.schedule-list {
  position: relative;
  .schedule-item {
    display: flex;
    position: relative;
    padding: 10px;
    border-bottom: 1px solid lightgray;
    &:last-child {
      border-bottom: none;
    }
    &.active {
      color: lightgray !important;
      .g-to-g,
      .o-to-g {
        color: lightgray !important;
        border-color: lightgrey;
      }
    }
  }
  // grey-to-grey
  .g-to-g {
    color: grey;
  }
  // orange-to-grey
  .o-to-g {
    color: $orange;
    border-color: $orange;
  }
  .schedule-item_left {
    flex: 2;
    display: flex;
    .time {
      display: flex;
      flex-direction: column;
      margin-right: 15px;
      font-size: 15px;
      .showTime {
        display: inline-flex;
        height: 20px;
        line-height: 20px;
      }
    }
    .type {
      display: flex;
      flex-direction: column;
      font-size: 15px;
      .language {
        height: 20px;
        line-height: 20px;
        display: inline-flex;
      }
    }
  }
  .schedule-item_right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $orange;
    font-size: 15px;
    .text {
      padding: 3px 5px;
      border-width: 1px;
      border-style: solid;
      border-radius: 3px;
      margin-left: 15px;
      font-size: 14px;
      letter-spacing: 1px;
    }
  }
}
</style>
