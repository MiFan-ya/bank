import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store";

// 1.安装插件
Vue.use(VueRouter);

// 2.创建router
const routes = [
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录" },
    component: () => import("../views/user/Login.vue"),
  },
  {
    path: "/workplace",
    name: "Workplace",
    redirect: "/userorder",
    meta: { title: "系统主页" },
    component: () => import("../views/home/Workplace.vue"),
    children: [
      {
        path: "/userorder",
        name: "Userorder",
        meta: { title: "系统主页",requireAuth: true },
        component: () => import("../views/home/Userorder.vue"),
      },
      {
        path: "/usermanagement",
        name: "Usermanagement",
        meta: { title: "系统主页",requireAuth: true },
        component: () => import("../views/home/Usermanagement.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});


export default router;

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("token") == 'true') { // 判断本地是否存在token
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/login'
      })
    }
  } else {
    if(sessionStorage.getItem("token") == 'true'){
      next('/workplace');
    }else{
      next();
    }
  }
});