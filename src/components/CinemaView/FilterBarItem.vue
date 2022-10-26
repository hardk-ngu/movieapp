<template>
  <van-dropdown-item
    :ref="refName"
    v-model="modelValue"
    :title="title"
    :options="options"
    @change="change"
  >
    <slot
      :districts="districts"
      :chooseDistrict="chooseDistrict"
      :currentDistrictId="currentDistrictId"
    ></slot>
  </van-dropdown-item>
</template>
<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  refName: String,
  modelValue: Number,
  currentDistrictId: String | Number,
  districts: {
    type: Object,
    default: () => {}
  },
  options: {
    type: Array,
    default: () => []
  },
  change: {
    type: Function,
    default: function () {}
  }
})
const emit = defineEmits(['chooseDistrict'])

const title = computed(() => {
  if (props.currentDistrictId && props.districts) {
    return props.districts[props.currentDistrictId] || '全城'
  } else {
    return ''
  }
})

const cityDrop = ref(null)
defineExpose({
  cityDropEle: cityDrop //一定要暴露出去父组件才能获取到
})
function chooseDistrict(event) {
  emit('chooseDistrict', event)
}
</script>

<style lang="scss" scoped></style>
