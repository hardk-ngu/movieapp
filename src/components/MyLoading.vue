<template>
  <van-loading
    type="spinner"
    class="loading"
    :style="{ position, top, left }"
    >加载中</van-loading
  >
</template>

<script>
export default {
  props: {
    position: String,
    top: {
      type: String,
      default: '50%'
    },
    left: {
      type: String,
      default: '50%'
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  transform: translate(-50%, -50%);
}
</style>
