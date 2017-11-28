import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Welcome from '@/components/Welcome'
import Main from '@/components/Main'
import Auth from '@/components/Auth'
import Dashboard from '@/components/Dashboard'
import Send from '@/components/Send'
import CreateAsset from '@/components/CreateAsset'

Vue.use(Router)

const sendBar = {
  template: `
    <div>
      <md-button class="md-raised md-primary">{{ coins[0].asset }} {{ coins[0].quantity }}</md-button>
      <md-button class="md-raised md-accent" :to="{ name: 'CreateAsset' }">
        create asset
      </md-button>
    </div>
  `,
  props: ['coins']
}

const defaultBar = { template: '<h2 class="md-title">SAVE TIME | SAFE MONEY</h2>' }

const Action = {
  template: `
    <md-button class="md-raised md-primary full" @click="action">{{ text }}</md-button>
  `,
  props: ['text', 'action']
}

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
          components: { default: Auth, bar: defaultBar, action: Action },
          props: {
            default: true,
            bar: true,
            action: { text: 'Create', action: () => store.dispatch('createPublicName') } }
        },
        {
          path: '/:id',
          name: 'Dashboard',
          redirect: '/:id/send',
          component: Dashboard,
          props: true,
          children: [
            {
              path: 'send',
              components: { default: Send, bar: sendBar, action: Action },
              props: {
                default: true,
                bar: { coins: [{ asset: 'PLIMST', quantity: 0.001 }] },
                action: { text: 'Send', action: () => store.dispatch('transferAssets') } }
            },
            {
              name: 'CreateAsset',
              path: 'create',
              components: { default: CreateAsset, bar: sendBar, action: Action },
              props: { default: true, bar: true, action: { text: 'Create', action: () => store.dispatch('createAsset') } }
            }
          ]
        }
      ]
    }
  ]
})
