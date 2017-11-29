<template>
  <div class="wrapper">
    <div class="container">
      <h2 class="md-title">Create a new asset</h2>
      <md-field :class="getValidationClass('asset')">
        <label>Asset Name:</label>
        <md-input class="input" v-model="assetForm.asset"></md-input>
        <span class="md-error" v-if="assetError">{{assetError}}</span>
       <!--  <span class="md-error" v-if="$v.asset.required">This field is required</span>
        <span class="md-error" v-if="$v.asset.minLength">This should be greater then 3</span>
        <span class="md-error" v-if="$v.asset.maxLength">This should be shorter then 10</span> -->
      </md-field>
      <md-field :class="getValidationClass('quantity')">
        <label>Quantity:</label>
        <md-input class="input" v-model="assetForm.quantity"></md-input>
        <!-- <span class="md-error" v-if="assetError">{{assetError}}</span> -->
      </md-field>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  between,
  minLength,
  maxLength,
  numeric
} from 'vuelidate/lib/validators'

export default {
  name: 'create-asset',
  mixins: [validationMixin],
  validations: {
    asset: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(12)
    },
    quantity: {
      required,
      numeric,
      between: between(1, 100)
    }
  },
  computed: {
    id () {
      return this.$store.state.data.wallet.id
    },
    assetError () {
      if (this.$store.state.inputs.assetError && this.$store.state.inputs.assetError.code === -107) {
        return 'This asset already exists'
      }
      return this.$store.state.inputs.assetError
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
    },
    getValidationClass (fieldName) {
      console.log(this.$v)
      const field = this.$v[fieldName]
      if (fieldName === 'asset' && this.assetError) {
        return {
          'md-invalid': true
        }
      } else if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
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