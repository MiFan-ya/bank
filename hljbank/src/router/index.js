import Vue from 'vue'
import VueRouter from 'vue-router'



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
    name: 'Login',
    component: () => import('../views/user/Login.vue')
  },
  {
    path: '/workplace',
    name: 'Workplace',
    redirect: '/userorder',
    meta:{title:'系统主页'},
    component: () => import('../views/home/Workplace.vue'),
    children: [
      {
        path: '/userorder',
        name: 'Userorder',
        component: () => import('../views/home/Userorder.vue'),
      },
      {
        path: '/usermanagement',
        name: 'Usermanagement',
        component: () => import('../views/home/Usermanagement.vue'),
      },
    ]
  }
  ]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router