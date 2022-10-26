<template>
  <li class="cinema-item" @click="toDetail(item.cinemaId)">
    <div class="cinema-item_left">
      <div class="name">{{ item.name }}</div>
      <div class="ticket-type" v-if="item.ticketTypes">
        {{ handleTicketType(item.ticketTypes) }}
      </div>
      <div class="address">{{ item.address }}</div>
    </div>
    <div class="cinema-item_right">
      <div class="price-box" v-if="!item.ticketTypes">
        ￥<span class="price">{{ formatPrice(item.lowPrice) }}</span
        >起
      </div>
      <van-icon
        v-else
        class-prefix="myicon"
        name="map"
        class="location-icon"
      ></van-icon>
      <div class="distance">{{ handleDistance(item.Distance) }}</div>
    </div>
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { formatPrice } from '@/utility/index.js'
const props = defineProps({
  item: {
    type: Object
  }
})
const router = useRouter()
function handleTicketType(type) {
  let str = ''
  type.forEach((item, index) => {
    if (index % 2 === 1) {
      str += ` | ${item.name}`
    } else {
      str += item.name
    }
  })
  return str
}
function handleDistance(distance) {
  return `${distance.toFixed(1)}km`
}
function toDetail(id) {
  router.push({
    path: '/CinemaDetail',
    query: {
      cinemaId: id
    }
  })
}
</script>

<style lang="scss" scoped>
.cinema-item {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  color: grey;
  font-size: 12px;
  border-bottom: 1px solid whitesmoke;
  &:last-child {
    border-bottom: none;
  }
  &_left {
    flex: 1;
    overflow: hidden;
    .name {
      color: black;
      font-size: 15px;
    }
    .address {
      margin-top: 5px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .ticket-type {
      margin-top: 5px;
    }
  }
  &_right {
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 30px;
    .price-box {
      margin-bottom: 5px;
      color: $theme-color;
      .price {
        font-size: 14px;
      }
    }
    .distance {
      align-self: flex-end;
    }
    .location-icon {
      display: inline-block;
      margin-bottom: 10px;
    }
  }
}
</style>
