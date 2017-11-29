<!-- PROPERTY OF PLIMST -->
<template>
  <div class="wrapper">
    <div class="container">
      <md-field :class="getValidationClass('id')">
        <label>User's public name</label>
        <md-input
          class="input"
          v-model="form.receiver"
          required
          :disabled="transfering">
        </md-input>
        <span class="md-error" v-if="exists">{{ exists }}</span>
        <!-- <span class="md-error">error</span>
        <span class="md-error" v-if="!$v.form.id.required">A name is required</span>
        <span class="md-error" v-else-if="!$v.form.id.minlength">At least 3 characters</span> -->
      </md-field>
      <md-field :class="getValidationClass('amount')">
        <label>Amount</label>
        <md-input
          class="input"
          v-model="form.quantity"
          required
          :disabled="transfering">
        </md-input>
        <span class="md-error" v-if="hasAmount">You don't have enough funds</span>
        <span class="md-error" v-if="$v.amount.required">Amount to transfer is required</span>
      </md-field>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  numeric
} from 'vuelidate/lib/validators'

export default {
  name: 'Auth',
  mixins: [validationMixin],
  validations: {
    id: {
      required,
      minLength: minLength(3)
    },
    amount: {
      required,
      numeric
    }
  },
  computed: {
    form: {
      get () {
        return this.$store.state.inputs.transferForm
      },
      set (value) {
        this.$store.commit('transferForm', value)
      }
    },
    assetHoldings () {
      const { coins, assetIndex } = this.$store.state.data
      const holding = coins[assetIndex].quantity
      console.log('holding', holding)
      if (holding) return holding
      else return 0
    },
    exists () {
      const error = this.$store.state.inputs.transferError.exists
      if (error) {
        return error.toString()
      }
      return null
    },
    hasAmount () {
      const error = this.$store.state.inputs.transferError.hasAmount
      if (error) return true
      else return false
    },
    transfering () {
      return this.$store.state.inputs.transfering
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v[fieldName]
      if (fieldName === 'id' && this.exists) {
        return {
          'md-invalid': true
        }
      } else if (fieldName === 'amount' && this.hasAmount) {
        return {
          'md-invalid': true
        }
      } else if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.$store.commit('transferForm', {
        receiver: '',
        amount: 0
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper {
    width: 420px;
    background: #fff;
    color: #000;
  }
  .container {
  }
  .input {
    padding: 15px 0;
  }
</style>
