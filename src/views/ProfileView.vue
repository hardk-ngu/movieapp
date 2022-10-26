<template>
  <div class="profile-view">
    <div class="profile">
      <div class="avatar-box">
        <img src="@/assets/avatar.png" alt="" class="avatar" />
      </div>
      <span @click="toLogin" data-name="00">{{ userName }}</span>
    </div>
    <div class="orders">
      <div class="order-item">
        <van-icon class-prefix="myicon" name="imagetext" size="20" />
        <span>电影订单</span>
      </div>
      <div class="order-item">
        <van-icon class-prefix="myicon" name="text" size="20" />
        <span>商品订单</span>
      </div>
    </div>
    <div class="user-sys">
      <van-cell
        is-link
        :title="item.title"
        v-for="item in uses"
        :key="item.icon"
        title-class="title-cell"
        @click="handleAffair(item.word)"
      >
        <template #value v-if="item.icon === 'trade'">
          <span>￥0.00</span>
        </template>
        <template #icon>
          <van-icon class-prefix="myicon" :name="item.icon" />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { store, mutations } from '@/vuex/index.js'
import { useRouter, useRoute } from 'vue-router'
import { computed } from '@vue/runtime-core'
export default {
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const uses = [
      { title: '卖座卷', icon: 'store', word: 'coupon' },
      { title: '组合红包', icon: 'bags', word: 'redPacket' },
      { title: '余额', icon: 'trade', word: 'balance' },
      { title: '帮助与客服', icon: 'bussinessman', word: 'help' },
      { title: '设置', icon: 'set', word: 'setting' },
      {
        title: '退出登录',
        icon: 'cry',
        word: 'logOut'
      }
    ]
    const userName = computed(() => {
      if (store.userInfo.name) {
        return store.userInfo.name
      } else {
        return '立即登录'
      }
    })
    function toLogin() {
      router.push({ path: '/login', query: { fromPath: route.path } })
    }
    function handleAffair(affair) {
      if (affair === 'logOut') {
        handleLogOut()
      }
    }
    function handleLogOut() {
      if (store.userInfo.name) {
        mutations.updateUserInfo(null)
        router.push({
          path: '/login',
          query: { fromPath: route.path }
        })
      }
    }
    return {
      userName,
      uses,
      toLogin,
      handleAffair
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-view {
  background-color: whitesmoke;
  height: 100vh;
}
.profile {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  background-color: rgba(239, 106, 80, 1);
  color: whitesmoke;
  .avatar-box {
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 50%;
    text-align: center;
    margin: 0 20px;
    background-color: whitesmoke;
    .avatar {
      width: 80%;
      height: 80%;
      vertical-align: middle;
    }
  }
}
.orders {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  margin-bottom: 10px;
  font-size: 15px;
  color: grey;
  .order-item {
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.user-sys {
  :deep(.title-cell) {
    margin-left: 10px;
    font-size: 15px;
  }
}
</style>
