<template>
  <div>
    <!--@ 头部导航--S -->
    <van-nav-bar class="nav-bar" title="登录" />
    <!--@ 头部导航--E -->

    <!--@ 表单--S -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码按钮 -->
        <template #button>
          <van-button
            v-if="isShowCodeBtn"
            class="btn"
            block
            type="default"
            round
            size="small"
            native-type="button"
            @click="sendCode"
            >获取验证码</van-button
          >
          <!-- 在表单中，除了提交按钮外，可能还有一些其他的功能性按钮，如发送验证码按钮。在使用这些按钮时，要注意将native-type设置为button，否则会触发表单提交。 -->
          <!-- 倒计时按钮 -->
          <van-count-down
            v-else
            :time="3 * 1000"
            format="ss秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!--* 表单--E -->
  </div>
</template>

<script>
// 引入校验规则
import { mobileRules, codeRules } from './rules'
// 引入 API
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    loading() {
      // loading
      // message: 提示文案
      // forbidClick: 禁止点击,
      // duration: 展示的时长，如果为0则一直展示
      // toast 在同一时间只能展示一个
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        // 将 token 存入 vuex
        this.SET_TOKEN(data.data)
        // 跳转路由
        this.$router.push('/profile')
        // 成功的提示
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分一下失败：提示用户手机号和验证码
        // 如果是手机号或者验证码错了，用户能知道
        // error:1.js抛的错 2.axios封装的e
        // axios封装的error对象
        // - error.response.data 后端返回的数据
        // - error.response.status 后端返回的状态码
        // if (error.response && error.response.status === 400)
        // 1. ?? ==> 相当于 ||, 常用于语句
        // 2. 可选链操作符: ?. ==> ?前面是 undefined ，那么不会往后取值
        if (error.response?.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          console.dir(error)
        }
      }
    },
    async sendCode() {
      // 0. 验证用户是否输入了有效的手机号
      // - 1 form 绑定 ref
      // - 2  $refs.form.validate(name)
      await this.$refs.form.validate('mobile')
      // 1. 发送请求
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        // 2. 显示倒计时组件
        this.isShowCodeBtn = false
        this.$toast.success('验证码发送成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 429)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// scoped 样式作用于当前的组件
// vue-cli 提供了语法 :deep()  深度穿透
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  background-color: #eee;
  height: 0.64rem;
  color: #a58594;
}
</style>
