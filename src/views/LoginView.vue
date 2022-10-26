<template>
  <div class="login-view">
    <div class="icon-box">
      <van-icon
        class-prefix="myicon"
        name="bussinessman"
        size="30"
        class="icon"
      />
    </div>
    <van-form
      @submit="onSubmit"
      validate-trigger="onChange"
      @failed="onFailed"
    >
      <van-cell-group>
        <div class="number-box">
          <van-field
            v-model="form.phoneNumber"
            name="phoneNumber"
            label="手机号码"
            placeholder="请输入手机号码"
            autocomplete="off"
            :rules="[
              {
                required: true,
                validator: checkPhoneNumber
              }
            ]"
          />
          <van-button
            v-if="!showTime"
            type="primary"
            size="small"
            :disabled="!isPhCorrect"
            @click="sendSMS"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="time"
            format="ss 秒"
            class="counter"
            @finish="onTimeFinish"
          />
        </div>
        <van-field
          v-model="form.verifyCode"
          name="verifyCode"
          label="验证码"
          placeholder="请输入验证码"
          autocomplete="off"
          :rules="[
            {
              required: true,
              validator: checkVerifyCode
            }
          ]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :disabled="!canSubmit"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getVerifyCode, userLogin } from '@/axios/api.js'
import { mutations } from '@/vuex/index.js'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Toast } from 'vant'
export default {
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const isPhCorrect = ref(false)
    const isVcCorrect = ref(false)
    const showTime = ref(false)
    const time = ref(1000 * 60)
    const form = reactive({
      phoneNumber: null,
      verifyCode: null
    })
    const canSubmit = computed(() => {
      if (isPhCorrect.value && isVcCorrect.value) {
        return true
      } else {
        return false
      }
    })
    function checkPhoneNumber(value) {
      const reg =
        /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (reg.test(value)) {
        isPhCorrect.value = true
      } else {
        isPhCorrect.value = false
      }
      return reg.test(value)
    }
    function checkVerifyCode(value) {
      const reg = /^\d{6}$/
      isVcCorrect.value = reg.test(value)
      return reg.test(value)
    }
    async function sendSMS() {
      await getVerifyCode({
        url: '/gateway',
        mobile: form.phoneNumber,
        type: '1'
      })
      showTime.value = true
    }
    function onTimeFinish() {
      showTime.value = false
    }
    async function onSubmit(value) {
      const result = await userLogin({
        url: '/gateway',
        mobile: form.phoneNumber,
        smsCode: `${form.verifyCode}`
      })
      if (result.msg == 'ok') {
        router.push({ path: route.query.fromPath })
        mutations.updateUserInfo('未知名良好市民')
      } else {
        Toast({
          icon: 'none',
          message: result.msg
        })
      }
    }
    function onFailed(errorInfo) {
      if (errorInfo.errors) {
        Toast.fail({
          icon: 'none',
          message: '请输入正确的验证码'
        })
      }
    }
    return {
      form,
      isPhCorrect,
      showTime,
      canSubmit,
      time,
      onSubmit,
      onFailed,
      checkPhoneNumber,
      checkVerifyCode,
      onTimeFinish,
      sendSMS
    }
  }
}
</script>

<style lang="scss" scoped>
.login-view {
  padding-top: 50px;
  background-color: whitesmoke;
}
.icon-box {
  text-align: center;
  margin-bottom: 20px;
  .icon {
    padding: 10px;
    border-radius: 50%;
  }
}

.counter {
  padding: 0 10px;
  white-space: nowrap;
  color: #333;
}
.number-box {
  display: flex;
  align-items: center;
  :deep(.van-button--small) {
    white-space: nowrap;
    padding: 2px;
    margin-right: 10px;
  }
}
</style>
