<!-- PROPERTY OF PLIMST -->
<template>
  <div>
    <loader v-if="!publicNames" />
    <div class="md-subhead" v-if="isEmpty">
      You don't seem to have a public id yet. Please create a new one.
    </div>
    <h2 class="md-title" v-if="!isEmpty">Select an ID</h2>
    <div class="namelist" v-for="name in publicNames">
      <md-button class="md-raised md-accent" :to="{ name: 'Dashboard', params: { id: name }}">
        {{ name }}
      </md-button>
    </div>
    <div v-if="!isEmpty">
      <div class="md-subhead">or</div>
      <div class="md-subhead">Create a new public name</div>
    </div>
    <md-field :class="getValidationClass('publicName')">
      <label for="public-name">Public Name</label>
      <md-input name="public-name" id="public-name" v-model="form.publicName" :disabled="form.sending" />
      <span class="md-error">error</span>
      <span class="md-error" v-if="!$v.form.publicName.required">A name is required</span>
      <span class="md-error" v-else-if="!$v.form.publicName.minlength">At least 3 characters</span>
    </md-field>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength
} from 'vuelidate/lib/validators'
import router from '../router'
import Loader from './Loader.vue'

export default {
  name: 'Auth',
  mixins: [validationMixin],
  components: {
    'loader': Loader
  },
  mounted: async function () {
    const { dispatch } = this.$store
    await dispatch('getPublicNames')
  },
  data: () => ({
    form: {
      publicName: null,
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
    async createPublicName () {
      const id = this.form.publicName
      const dispatch = await this.$store.dispatch('createPublicName', id)
      if (dispatch.success) {
        router.push(id)
      } else if (dispatch.error) {
        console.log(dispatch.error)
        this.form.errorMessage = dispatch.error
        console.log(this.form.errorMessage)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .namelist {
    padding: 30px 0;
  }
  .md-error {
    color: red;
  }
</style>
