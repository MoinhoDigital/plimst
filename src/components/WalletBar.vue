<!-- PROPERTY OF PLIMST -->
<template>
  <div class="wrapper">
    <div class="container">
      <img src="../assets/logo.png" @click="menuAction" />
      <div>
        <md-menu md-direction="bottom-end">
          <md-button class="md-raised md-primary" md-menu-trigger>
            {{ currentCoin.name }} {{ currentCoin.quantity }}
          </md-button>
          <md-menu-content>
            <md-menu-item
              v-for="(coin, key) in coins" :key="key"
              @click="changeAsset(key)">
              {{ coin.name }} <b>{{ coin.quantity }}</b>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
        <md-button class="md-raised md-accent" :to="{ name: 'CreateAsset' }">
          create asset
        </md-button>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'WalletBar',
  props: ['menuAction'],
  computed: {
    coins () {
      return this.$store.getters.walletData
    },
    currentCoin () {
      return this.$store.getters.currentAsset
    }
  },
  methods: {
    changeAsset (index) {
      this.$store.dispatch('changeAsset', index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper {
  }
  .container {
    display: flex;
    justify-content: space-around;
  }
</style>
