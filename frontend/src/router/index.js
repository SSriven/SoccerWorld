import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import NewsDetail from '../views/NewsDetail'
import UserNewsDetail from '../views/UserNewsDetail'
import MyHistories from "../components/myView/myHistories"
import MySend from "../components/myView/mySend"
import MysendDetail from "../components/myView/myNewsDetail"


Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
const routes = [

  {
    path: '/',
    name: 'main',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive:true
    },
    component: Main
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    meta:{
      requireAuth: true,
      keepAlive:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/detail',
    name: 'detail',
    component :NewsDetail
  },
  {
    path:'/userNewsDetail',
    name:'userNewsDetail',
    component:UserNewsDetail
  },
  {
    path:"/myhistories",
    name:'myhistories',
    component:MyHistories
  },
  {
    path:"/mynews",
    name:'mynews',
    component:MySend
  },
  {
    path:'/mynewsdetail',
    name:'mynewsdetail',
    component:MysendDetail
  }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

export default router
