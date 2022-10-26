<template>
  <div class="nav-header">
    <van-icon
      class="icon"
      class-prefix="myicon"
      name="back"
      size="25"
      color="grey"
      @click="handleBack"
    ></van-icon>
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  emits: ['handleBack'],
  props: {
    title: String
  },
  setup(props, context) {
    function handleBack(event) {
      context.emit('handleBack', event)
    }
    return {
      handleBack
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-header {
  width: 100%;
  position: fixed;
  top: 0;
  padding: 10px;
  padding-left: 0;
  display: flex;
  align-items: center;
  transition: 0.5s;
  color: DimGrey;
  z-index: 20;
}
.icon {
  background-color: rgba(255, 255, 255, 0.5);
  margin-left: 5px;
}
.title {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
