import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '../views/SigninView.vue'
import LandingPageView from '../views/LandingPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPageView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView,
    }
  ]
})

export default router
