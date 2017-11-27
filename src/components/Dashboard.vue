<template>
  <div class="wrapper">
      <div class="container">
        <div class="wallet" v-if="wallet">
          <create-asset />
          <portfolio />
          <transactions />
        </div>
      </div>
  </div>
</template>

<script>
import Portfolio from './Portfolio.vue'
import Transactions from './Transactions.vue'
import CreateAsset from './CreateAsset.vue'
export default {
  name: 'dashboard',
  props: ['id'],
  components: {
    'portfolio': Portfolio,
    'transactions': Transactions,
    'create-asset': CreateAsset
  },
  mounted: async function () {
    this.$store.dispatch('selectId', this._props.id)
  },
  computed: {
    wallet () {
      return this.$store.state.data.wallet
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 100%;
}
</style>
