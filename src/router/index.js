import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    // SPA
    // 缺点：首屏加载很慢
    // 可以使用路由懒加载
    //  - 使用到了路由再去加载
    component: () => import('views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
