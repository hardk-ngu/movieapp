<template>
  <ul class="photo-list" @click.capture="handleImagePreview">
    <li v-for="item in photos" :key="item" class="photo-item">
      <img :src="handleImg(item)" alt="" class="img" />
      <template v-if="item.name">
        <div class="actor-relate">
          <div class="actor-name">{{ item.name }}</div>
          <div>{{ item.role }}</div>
        </div>
      </template>
    </li>
  </ul>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  props: {
    photos: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: '80px'
    },
    height: {
      type: String,
      default: '100px'
    },
    imagePreview: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    function handleImg(item) {
      return item.avatarAddress ? item.avatarAddress : item
    }
    function handleImagePreview() {
      if (props.imagePreview) {
        ImagePreview({
          images: props.photos
        })
      }
    }
    return {
      handleImg,
      handleImagePreview
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-list {
  display: flex;
  margin-top: 10px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
.photo-item {
  width: v-bind(width);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  margin-right: 10px;
  overflow: hidden;
  &:last-child {
    margin-right: 0;
  }
  .actor-relate {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .actor-name {
      margin-top: 5px;
    }
  }
}
.img {
  width: v-bind(width);
  height: v-bind(height);
  object-fit: cover;
}
</style>
