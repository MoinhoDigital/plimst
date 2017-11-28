<template>
  <div class="wrapper">
    <div class="container">
      <h2 class="md-title">Create a new asset</h2>
      <md-field>
        <label>Asset Name:</label>
        <md-input class="input" v-model="assetForm.asset"></md-input>
      </md-field>
      <md-field>
        <label>Quantity:</label>
        <md-input class="input" v-model="assetForm.quantity"></md-input>
      </md-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create-asset',
  computed: {
    id () {
      return this.$store.state.data.wallet.id
    },
    assetForm: {
      get () {
        return this.$store.state.inputs.assetForm
      },
      set (value) {
        this.$store.commit('assetForm', value)
      }
    }
  },
  methods: {
    createAsset (assetForm) {
      this.$store.dispatch('createAsset', assetForm)
    }
  }
}
</script>

<style scoped>
  .container {
    background: #fff;
    color: #000;
  }
  .item {
    width: 30%;
  }
</style>