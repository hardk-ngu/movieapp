<template>
  <van-swipe
    :autoplay="3000"
    indicator-color="white"
  >
    <van-swipe-item v-for="item in swipeData" :key="item.id"
      ><img :src="item.imgUrl" alt="" class="img"
    /></van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    swipeData: {
      type: Object,
      default: () => []
    }
  },
}
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  height: 100%;
}
</style>
