import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Auth from '@/components/Auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})
