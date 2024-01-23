import { createRouter, createWebHistory } from 'vue-router'
import { useTodo } from '@/store/todo'

const isLoggedIn = (to: any, from: any, next: any) => {
  const store = useTodo()

  if (!store.isLoggedIn) {
    next()
    return
  }
  next('/todo')
}
const isNotLoggedIn = (to: any, from: any, next: any) => {
    const store = useTodo()

    if (store.isLoggedIn) {
        next()
        return
    }
    next('/login')
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'login' },
      beforeEnter: isLoggedIn,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      beforeEnter: isLoggedIn,
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/ToDo.vue'),
      beforeEnter: isNotLoggedIn,
    },
  ]
})

export default router
