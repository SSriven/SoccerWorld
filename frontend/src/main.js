import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import less from 'less'
import './plugins/plugin_elements.js'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter)
Vue.use(less)
Vue.config.productionTip = true;
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    let currentTime = new Date().getTime()
    let lastLoginTime = localStorage.getItem('last_login_time')
    let d = currentTime - lastLoginTime
    const valid_time = 2592000000   //登陆有效时间为30天2592000000
    console.log(d)
    if (localStorage.getItem("user_id") != null && d <= valid_time) { // 判断当前的user_id是否存在 ； 登录存入的user_id
      console.log(localStorage.user_id)
      next();
    }
    else {
      next({
        path: '/login'
      })
    }
  }
  else {
    next();
  }
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
