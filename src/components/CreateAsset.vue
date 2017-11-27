<template>
  <div class="wrapper">
    <div class="container">
      <md-card class="card hero">
        <md-card-header>
          <div class="md-title">Create a new asset</div>
        </md-card-header>
        <md-card-content>
          <div>
            <h4>Current wallet ID: {{ id }}</h4>
            <md-field>
              <label>Asset Name:</label>
              <md-input v-model="assetForm.asset"></md-input>
              <md-input v-model="assetForm.quantity"></md-input>
            </md-field>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button @click="createAsset(assetForm)">Create Asset</md-button>
        </md-card-actions>
      </md-card>
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