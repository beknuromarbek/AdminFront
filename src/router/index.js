import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase/compat'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    meta: {layout: 'main', requiresAuth: true},
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: {layout: 'main', requiresAuth: true},
    component: () => import('../views/About.vue')
  },
  {
    path: '/service_add',
    name: 'AddService',
    meta: {layout: 'main', requiresAuth: true},
    props: true,
    component: () => import('../views/AddService.vue')
  },
  {
    path: '/service_edit',
    name: 'EditService',
    meta: {layout: 'main', requiresAuth: true},
    props: true,
    component: () => import('../views/UpdateService.vue')
  },
  {
    path: '/anticafe',
    name: 'AntiCafe',
    meta: {layout: 'main', requiresAuth: true},
    component: () => import('../views/AntiCafe/AntiCafe.vue'),
    children: [
      {path: 'daily', meta: {layout: 'main', requiresAuth: true} , component: () => import('@/views/AntiCafe/Daily.vue')},
      {path: 'night', meta: {layout: 'main', requiresAuth: true} , component: () => import('@/views/AntiCafe/Night.vue')},
      {path: 'hourly', meta: {layout: 'main', requiresAuth: true} , component: () => import('@/views/AntiCafe/Hourly.vue')},
    ]
  },
  {
    path: '/computer_club',
    name: 'ComputerClub',
    meta: {layout: 'main', requiresAuth: true},
    component: () => import('../views/ComputerClub/ComputerClub.vue'),
    children: [
      {path: 'general', meta: {layout: 'main', requiresAuth: true} , component: () => import('@/views/ComputerClub/General.vue')},
      {path: 'vip', meta: {layout: 'main', requiresAuth: true} , component: () => import('@/views/ComputerClub/Vip.vue')},
      {path: 'private', meta: {layout: 'main', requiresAuth: true} , component: () => import('@/views/ComputerClub/Private.vue')},
    ]
  },
  {
    path: '/ps_club',
    name: 'PsClub',
    meta: {layout: 'main', requiresAuth: true},
    component: () => import('../views/PsClub/PsClub.vue'),
    children: [
      {path: 'hourly', meta: {layout: 'main', requiresAuth: true} , component: () => import('@/views/PsClub/Hourly.vue')},
      {path: 'packet', meta: {layout: 'main', requiresAuth: true} , component: () => import('@/views/PsClub/Packet.vue')},
      {path: 'packet_calyan', meta: {layout: 'main', requiresAuth: true} , component: () => import('@/views/PsClub/PacketWithCalyan.vue')},
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  const currentUser = firebase.auth().currentUser;

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else next();
})

export default router
