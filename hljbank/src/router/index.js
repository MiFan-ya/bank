import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/user/Login')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  ]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router