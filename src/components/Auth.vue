<!-- PROPERTY OF PLIMST -->
<template>
  <div class="wrapper">
      <div class="container">
        <md-card>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">Authentication</div>
              <div class="" v-if="!publicNames">Loading...</div>
              <div class="md-subhead" v-if="isEmpty">You don't seem to have a public id yet. Please create a new one.</div>
            </md-card-header-text>
          </md-card-header>
          <md-card-content>
            <div v-for="name in publicNames">
              <md-button @click="selectId(name)" md-primary>{{ name }}</md-button>
            </div>
            <md-field :class="getValidationClass('publicName')">
              <label for="public-name">Public Name</label>
              <md-input name="public-name" id="public-name" v-model="form.publicName" :disabled="form.sending" />
              <span class="md-error" v-if="!$v.form.publicName.required">The last name is required</span>
              <span class="md-error" v-else-if="!$v.form.publicName.minlength">Invalid last name</span>
            </md-field>
          </md-card-content>
          <md-card-actions>
            <md-button @click="createPublicName()">Create</md-button>
          </md-card-actions>
        </md-card>
      </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength
} from 'vuelidate/lib/validators'
import router from '../router'

export default {
  name: 'Auth',
  mixins: [validationMixin],
  mounted: async function () {
    const { dispatch } = this.$store
    await dispatch('getPublicNames')
  },
  data: () => ({
    form: {
      publicName: null,
      sending: false
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
  computed: {
    isEmpty () {
      const { publicNames } = this.$store.state.data
      return (publicNames && publicNames.length < 1)
    },
    publicNames () {
      return this.$store.state.data.publicNames
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
    },
    createPublicName () {
      this.$store.dispatch('createPublicName', this.form.publicName)
    },
    selectId (id) {
      router.push(id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  background: #fff;
  color: #000;
}
</style>
