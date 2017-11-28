import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Welcome from '@/components/Welcome'
import Main from '@/components/Main'
import Auth from '@/components/Auth'
import Dashboard from '@/components/Dashboard'
import Send from '@/components/Send'
import CreateAsset from '@/components/CreateAsset'
import Menu from '@/components/Menu'
import DefaultBar from '@/components/DefaultBar'
import WalletBar from '@/components/WalletBar'

Vue.use(Router)

const Action = {
  template: `
    <md-button class="md-raised md-primary full" @click="action">{{ text }}</md-button>
  `,
  props: ['text', 'action']
}

// const menuButton = {
//   template: '<img src="../assets/logo.png" @click="action" />'
// }

const dashBar = { template: '<router-view name="bar" />' }
const dashAction = { template: '<router-view name="action" />' }

export default new Router({
  routes: [
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/auth',
          name: 'Auth',
          components: {
            default: Auth,
            bar: DefaultBar,
            action: Action
          },
          props: {
            default: true,
            bar: { menuAction: () => console.log('Open Menu') },
            action: { text: 'Create', action: () => store.dispatch('createPublicName') }
          }
        },
        {
          path: '/:id',
          name: 'Dashboard',
          redirect: '/:id/send',
          props: true,
          components: { default: Dashboard, bar: dashBar, action: dashAction },
          children: [
            {
              path: 'send',
              components: { default: Send, bar: WalletBar, action: Action },
              props: {
                default: true,
                bar: { menuAction: () => console.log('Open Menu') },
                action: { text: 'Send', action: () => store.dispatch('transferAssets') }
              }
            },
            {
              path: 'menu',
              components: { default: Menu, bar: DefaultBar, action: Action },
              props: {
                default: true,
                bar: { menuAction: () => console.log('Open Menu') },
                action: { text: 'Send', action: () => store.dispatch('transferAssets') }
              }
            },
            {
              name: 'CreateAsset',
              path: 'create',
              components: { default: CreateAsset, bar: DefaultBar, action: Action },
              props: {
                default: true,
                bar: { menuAction: () => console.log('Open Menu') },
                action: { text: 'Create', action: () => store.dispatch('createAsset') }
              }
            }
          ]
        }
      ]
    }
  ]
})
