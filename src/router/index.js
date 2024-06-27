import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test.vue'),
    },
    {
      path: '/test2',
      name: 'test2',
      component: () => import('@/views/test2.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: () => import('@/views/login/adminLogin.vue'),
    },
    {
      path: '/',
      name: '',
      redirect: '/home1', // 添加重定向规则
      component: () => import('@/views/home/index.vue'),
      children: [
        {
          path: '/home1',
          name: 'home1',
          component: () => import('@/views/home/home1.vue'),
        },
        {
          path: '/home2',
          name: 'home2',
          component: () => import('@/views/home/home2.vue'),
        },
        {
          path: '/lda',
          name: 'lda',
          component: () => import('@/views/home/LDA.vue'),
          
        },
        {
          path: '/logList',
          name: 'logList',
          component: () => import('@/views/home/logList.vue'),
        },
        {
          path: '/workerList',
          name: 'workerList',
          component: () => import('@/views/home/workerList.vue'),
        },
        {
          path: '/adminList',
          name: 'adminList',
          component: () => import('@/views/home/adminList.vue'),
        },
        {
          path: '/personal',
          name: 'personal',
          component: () => import('@/views/home/personal.vue'),
        },
      ]
    }
  ]
})

export default router
