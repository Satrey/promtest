import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main-layout'},
    component: Home
  },
  {
    path: '/wah',
    name: 'wahtest',
    meta: {layout: 'main-layout'},
    component: () => import('../views/WahTest.vue')
  },
  {
    path: '/tw',
    name: 'twtest',
    meta: {layout: 'main-layout'},
    component: () => import('../views/TwTest.vue')
  },
  {
    path: '/safety',
    name: 'safetytest',
    meta: {layout: 'main-layout'},
    component: () => import('../views/SafetyTest.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    meta: {layout: 'form-layout'},
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/reg',
    name: 'reg',
    meta: {layout: 'form-layout'},
    component: () => import('../views/Registration.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
