<!-- PROPERTY OF PLIMST -->
<template>
  <div class="wrapper">
    <div class="container">
      <md-field :class="getValidationClass('publicName')">
        <label for="sendId">User's public name</label>
        <md-input
          class="input"
          name="send-id"
          id="send-id"
          v-model="form.publicName"
          :disabled="form.sending" />
        <span class="md-error">error</span>
        <span class="md-error" v-if="!$v.form.publicName.required">A name is required</span>
        <span class="md-error" v-else-if="!$v.form.publicName.minlength">At least 3 characters</span>
      </md-field>
      <md-field :class="getValidationClass('publicName')">
        <label for="sendId">Amount</label>
        <md-input
          class="input"
          name="send-id"
          id="send-id"
          v-model="form.publicName"
          :disabled="form.sending" />
        <span class="md-error">error</span>
        <span class="md-error" v-if="!$v.form.publicName.required">A name is required</span>
        <span class="md-error" v-else-if="!$v.form.publicName.minlength">At least 3 characters</span>
      </md-field>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'Auth',
  mixins: [validationMixin],
  data: () => ({
    form: {
      sending: false,
      errorMessage: null
    }
  }),
  validations: {
    form: {
      publicName: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.publicName = null
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
    width: 80%;
  }
</style>
