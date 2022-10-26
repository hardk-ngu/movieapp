<template>
  <div class="search-result">
    <ul
      class="result-list"
      v-show="resultList.length > 0"
      @click="chooseCity"
    >
      <li
        v-for="item in resultList"
        :key="item.cityId"
        class="result-item"
        :data-cityid="item.cityId"
        :data-cityname="item.name"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="no-result" v-show="!resultList">
      没有找到匹配的结果
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resultList: {
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
.search-result {
  padding: 10px;
  padding-right: 0;
  padding-bottom: 0;
  .result-list {
    display: flex;
    flex-wrap: wrap;
    color: grey;
    .result-item {
      padding: 10px;
      border-radius: 5px;
      margin-right: 10px;
      margin-bottom: 10px;
      font-size: 14px;
      background-color: whitesmoke;
    }
  }
  .no-result {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
