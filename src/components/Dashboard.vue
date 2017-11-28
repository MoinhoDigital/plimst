<template>
  <router-view></router-view>
</template>

<script>
import Loader from './Loader.vue'

export default {
  name: 'dashboard',
  props: ['id'],
  components: {
    'loader': Loader
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
