<template>
  <div class="locate-and-hot">
    <p>GPS定位你所在的城市</p>
    <span
      class="location"
      :data-cityid="curLocation.cityId"
      :data-cityname="curLocation.name"
      @click="chooseCity"
      >{{ curLocation.name || '定位失败' }}</span
    >
    <p>热门城市</p>
    <ul class="hot-citys">
      <li
        class="hot-item"
        v-for="item in hotCities"
        :key="item.cityId"
        :data-cityid="item.cityId"
        :data-cityname="item.name"
        @click="chooseCity"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    curLocation: {
      type: Object,
      default: () => {}
    },
    hotCities: {
      type: Array,
      default: () => []
    }
  },
  emits: ['chooseCity'],
  setup(props, context) {
    function chooseCity(event) {
      context.emit('chooseCity', event)
    }
    return {
      chooseCity
    }
  }
}
</script>

<style lang="scss" scoped>
.locate-and-hot {
  padding: 10px 15px;
  padding-top: 0;
  font-size: 14px;
  color: grey;
  .location {
    padding: 10px 15px;
    font-size: 14px;
    text-align: center;
    color: black;
    background-color: whitesmoke;
  }
  .hot-citys {
    display: flex;
    flex-wrap: wrap;
    .hot-item {
      padding: 10px 15px;
      font-size: 14px;
      margin-left: 15px;
      color: black;
      background-color: whitesmoke;
      &:first-child {
        margin-left: 0px;
      }
    }
  }
}
</style>
