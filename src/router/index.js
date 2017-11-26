import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Auth from '@/components/Auth'
import Dashboard from '@/components/Dashboard'

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
    },
    {
      path: '/:id',
      name: 'Dashboard',
      component: Dashboard,
      props: true
    }
  ]
})
