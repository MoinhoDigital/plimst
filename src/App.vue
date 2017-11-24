<template>
  <div id="app">
    <div>
      <welcome v-if="!appHandle" />
      <router-view v-else/>
    </div>
  </div>
</template>
<script>
import Welcome from '@/components/Welcome.vue'
// import CreateWallet from '@/components/CreateWallet'
export default {
  name: 'app',
  components: {
    'welcome': Welcome
    // 'create-wallet': CreateWallet
  },
  mounted: function () {
    this.$nextTick(async function () {
      const { dispatch, state: { appHandle, authUri } } = this.$store
      if (!appHandle || !authUri) {
        await dispatch('init')
      }
      // if (!walletList) {
      //   dispatch('getWallets')
      // }
    })
  },
  computed: {
    appHandle () {
      return this.$store.state.appHandle
    }
  },
  methods: {
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  background: #000;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
