import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from "./router"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// //localStorage
// import store from './store'
import axios from 'axios' //导入axios
//页面名字
import VueWechatTitle from 'vue-wechat-title'; 

Vue.use(VueWechatTitle)
Vue.use(VueQuillEditor)
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Vuex);


new Vue({
  render: h => h(App),
  router,
  // store,
}).$mount('#app')
