<template>
  <div class="detail-info">
    <div class="detail-info_name">{{ detail.name }}</div>
    <ul class="detail-info_services">
      <li
        v-for="(item, index) in detail.services"
        :key="index"
        class="service-item"
      >
        {{ item.name }}
      </li>
      <van-icon
        class-prefix="myicon"
        name="more"
        color="orange"
        @click="handlePopup"
      />
    </ul>
    <div class="detail-info_address">
      <van-icon class-prefix="myicon" name="map" />
      <span class="text">{{ detail.address }}</span>
      <van-icon
        class-prefix="myicon"
        name="phone"
        class="phone-icon"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  detail: {
    type: Object,
    default: () => {}
  },
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])
function handlePopup() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style lang="scss" scoped>
.detail-info {
  padding: 15px;
  &_name {
    text-align: center;
    font-size: 16px;
  }
  &_services {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 10px;
    .service-item {
      padding: 5px;
      padding-bottom: 2px;
      color: $orange;
      font-size: 13px;
      border-bottom: 1px solid rgba(238, 154, 0, 0.3);
      margin-right: 5px;
    }
  }
  &_address {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: grey;
    overflow: hidden;
    .text {
      flex: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 20px;
    }
    .phone-icon {
      margin-left: 15px;
    }
  }
}
</style>
