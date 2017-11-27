<template>
  <div class="wrapper">
    <h1>Portoflio </h1>
    <div class="box" v-for="(coin, key) in coins" :key="key">
      <div class="item">
        {{coin.name}}
      </div>
       <div class="item quantity">
        {{coin.quantity}}
      </div>
      <div class="item line">
        <md-field>
          <md-input v-model="transferForm.receiver"></md-input>
          <md-input v-model="transferForm.quantity"></md-input>
        </md-field>
        <md-button @click="transferAssets(transferForm, coin.name)">send</md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'portfolio',
  computed: {
    coins () {
      return this.$store.state.data.coins
        .reduce((prev, coin) => {
          const assetIndex = prev.findIndex(i => i.name === coin.asset)
          if (assetIndex === -1) {
            return prev.concat({ name: coin.asset, quantity: 1 })
          }
          prev[assetIndex].quantity = prev[assetIndex].quantity + 1
          return prev
        }, [])
    },
    transferForm: {
      get () {
        return this.$store.state.inputs.transferForm
      },
      set (value) {
        this.$store.commit('transferForm', value)
      }
    }
  },
  methods: {
    transferAssets (form, asset) {
      this.$store.dispatch('transferAssets', { form, asset })
    }
  }
}
</script>

<style scoped>
  .wrapper {
    background: #fff;
    color: #000;
  }
  .box {
    width: 100%;
    display: flex;
  }
  .item {
    width: 30%;
  }
  .quantity {
    font-weight: 900;
  }
</style>