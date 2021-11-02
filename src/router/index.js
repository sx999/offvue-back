import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

//admin
import Index from '../views/Admin/Index'
import Home from '../views/Admin/Home'
import Demond from '../views/Admin/Demond'

//404页面
import NoMatch from '../views/Admin/NoMatch'
//登录
import Login from '../views/User/Login'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path:'/',
    name:'Index',
    component:Index,
    children:[
      {path:"home",component:Home},
      {path:"",redirect:"home"},    //没有输入值时 重定向到home 页面
      {path:"demond",component:Demond}
    ]
  },
  //登录
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
  	path:"*",
  	component:NoMatch,
  	// 配置404 页面  当访问路由path 值不存在时 跳转到NoMatch 组件
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
 //路由守卫 
//  router.beforeEach((to, from, next) => {
//   // 如果用户访问的登录页，直接放行 
//  if(to.path === '/login') return next()
//   // 从 localStorage 中获取到 保存的 token 值 
//  const tokenStr = sessionStorage.getItem('cat_token')
//  // 没有token，强制跳转到登录页 
//  if(!tokenStr)  next({path: '/'})
//  // 存在token 直接放行
//  next()
// })
export default router
