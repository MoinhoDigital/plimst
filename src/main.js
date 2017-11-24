// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import { MdMenu, MdButton, MdCard, MdField, MdDialog, MdToolbar, MdList } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import router from './router'
import store from './store'
import App from './App'

Vue.config.productionTip = false

Vue.use(MdMenu)
Vue.use(MdButton)
Vue.use(MdCard)
Vue.use(MdField)
Vue.use(MdToolbar)
Vue.use(MdDialog)
Vue.use(MdList)

router.beforeEach((to, from, next) => {
  console.log('FROM', from)
  console.log('To', to)
  console.log('Store', store)
  if (to.path !== '/' && !store.state.handles.appHandle) {
    router.push('/')
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
