<!-- PROPERTY OF PLIMST -->
<template>
  <div class="wrapper">
    <div class="container">
      <img src="../assets/logo.png" @click="menuAction" />
      <div>
        <md-button class="md-raised md-primary">
          {{ coins[0].name }} {{ coins[0].quantity }}
        </md-button>
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
      const walletCoins = this.$store.state.data.coins
        .reduce((prev, coin) => {
          const assetIndex = prev.findIndex(i => i.name === coin.asset)
          if (assetIndex === -1) {
            return prev.concat({ name: coin.asset, quantity: 1 })
          }
          prev[assetIndex].quantity = prev[assetIndex].quantity + 1
          return prev
        }, [])
      if (walletCoins.length < 1) return [{ name: 'PLIMST', quantity: 0 }]
      else return walletCoins
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
