<!-- PROPERTY OF PLIMST -->
<template>
  <div class="wrapper" v-if="open">
    <md-card class="container">
      <md-card-header>
        <defaultbar :menuAction="closeMenu" />
        <md-card-header-text>
        </md-card-header-text>
      </md-card-header>
      <md-card-content>
        <ul>
          <li @click="gotoWallet">send</li>
          <li @click="openAbout">about</li>
          <li @click="changeId">change id</li>
        </ul>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import DefaultBar from './DefaultBar'
import router from '../router'

export default {
  name: 'Menu',
  components: {
    'defaultbar': DefaultBar
  },
  computed: {
    open () {
      return this.$store.state.modals.menu
    }
  },
  methods: {
    closeMenu () {
      this.$store.commit('toggleMenuModal', false)
    },
    openAbout () {
      const { commit } = this.$store
      commit('toggleMenuModal', false)
      commit('toggleAboutModal', true)
    },
    changeId () {
      this.$store.dispatch('resetId')
    },
    gotoWallet () {
      const id = this.$store.state.data.wallet.id
      router.push({ name: 'Dashboard', params: { id } })
      this.$store.commit('toggleMenuModal', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper {
    background: url('../assets/background.jpg');
    background-size: cover;
    display: flex;
    align-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .container {
  	background: #2BA6E3;
    color: #fff;
    text-align: left;
    margin: 0 auto;
    text-transform: uppercase;
  }
</style>
