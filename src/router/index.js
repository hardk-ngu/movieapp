import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import filmView from '@/views/FilmView'
const routes = [
  {
    path: '/',
    name: 'filmView',
    component: filmView,
    meta: {
      isShowTabbar: true,
      changeCityIsInital: true
    }
  },
  {
    path: '/filmDetail',
    name: 'filmDetail',
    component: () => import('@/views/FilmDetail.vue')
  },
  {
    path: '/cinemas',
    name: 'cinemas',
    component: () => import('@/views/CinemaView.vue'),
    meta: {
      isShowTabbar: true,
      changeCityIsInital: false
    }
  },
  {
    path: '/cinemaDetail',
    name: 'cinemaDetail',
    component: () => import('@/views/CinemaDetail.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: {
      isShowTabbar: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      isShowTabbar: true
    }
  },

  {
    path: '/city',
    name: 'city',
    component: () => import('@/views/CityView.vue'),
  },
  {
    path: '/searchCinema',
    name: 'search',
    component: () => import('@/views/SearchView.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})
export default router
