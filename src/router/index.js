import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Welcome from '@/components/Welcome'
import Main from '@/components/Main'
import Auth from '@/components/Auth'
import Dashboard from '@/components/Dashboard'
import Send from '@/components/Send'
import CreateAsset from '@/components/CreateAsset'
import DefaultBar from '@/components/DefaultBar'
import WalletBar from '@/components/WalletBar'
import MainAction from '@/components/MainAction'

Vue.use(Router)

const dashBar = { template: '<router-view name="bar" />' }
const dashAction = { template: '<router-view name="action" />' }

const openMenu = () => store.commit('toggleMenuModal', true)
const openAbout = () => store.commit('toggleAboutModal', true)

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
            action: MainAction
          },
          props: {
            default: true,
            bar: { menuAction: () => openAbout() },
            action: {
              text: 'Create',
              action: () => store.dispatch('createPublicName'),
              disabled: 'authenticating'
            }
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
              components: { default: Send, bar: WalletBar, action: MainAction },
              props: {
                default: true,
                bar: { menuAction: () => openMenu() },
                action: {
                  text: 'Send',
                  action: () => store.dispatch('transferAssets'),
                  disabled: 'transfering'
                }
              }
            },
            {
              name: 'CreateAsset',
              path: 'create',
              components: { default: CreateAsset, bar: DefaultBar, action: MainAction },
              props: {
                default: true,
                bar: { menuAction: () => openMenu() },
                action: {
                  text: 'Create',
                  action: () => store.dispatch('createAsset'),
                  disabled: 'creatingAsset'
                }
              }
            }
          ]
        }
      ]
    }
  ]
})
