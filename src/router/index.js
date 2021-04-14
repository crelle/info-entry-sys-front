import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=> import('../views/Login.vue')
  },
  {
    path: '/sys',
    name: 'Sys',
    component: Home,
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/About.vue')
      }
    ]
  },
  
]

// 设置路由守卫，请求鉴权接口，设置放行和转跳的逻辑

const router = new VueRouter({
  routes
})

export default router
