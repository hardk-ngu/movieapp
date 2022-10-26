<template>
  <div class="album">
    <nav-header
      :title="`剧照(${photos.length})`"
      ref="navHeader"
      @handleBack="handleBack"
    />
    <ul class="photo-list" @click.capture="handlePreview">
      <li
        v-for="(item, index) in photos"
        :key="item"
        class="photo-item"
      >
        <img :src="item" alt="" class="photo" :data-index="index" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import GalleryCom from './GalleryCom.vue'
import NavHeader from './NavHeader.vue'
import { onMounted, ref } from 'vue'
export default {
  components: { NavHeader, GalleryCom },
  props: {
    photos: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Boolean
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const navHeader = ref(null)
    const headerHeight = ref(0)
    function handleBack(event) {
      context.emit('update:modelValue', false)
    }
    function handlePreview(event) {
      const index = event.target.dataset.index
      if (index !== undefined) {
        ImagePreview({
          images: props.photos,
          startPosition: index
        })
      }
    }
    onMounted(() => {
      headerHeight.value = `${navHeader.value.$el.offsetHeight}px`
    })
    return {
      navHeader,
      headerHeight,
      handleBack,
      handlePreview
    }
  }
}
</script>

<style lang="scss" scoped>
.album {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: #fff;
  overflow: auto;
}
.photo-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: v-bind(headerHeight);
  .photo {
    width: 125px;
    height: 120px;
    object-fit: cover;
    vertical-align: top;
  }
}
</style>
