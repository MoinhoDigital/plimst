<!-- PROPERTY OF PLIMST -->
<template>
  <div class="wrapper" v-if="open">
    <md-card class="container">
      <md-card-header>
        <defaultbar :menuAction="closeAbout" />
        <md-card-header-text>
        </md-card-header-text>
      </md-card-header>
      <md-card-content>
        ABOUT
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import DefaultBar from './DefaultBar'

export default {
  name: 'About',
  components: {
    'defaultbar': DefaultBar
  },
  computed: {
    open () {
      return this.$store.state.modals.about
    }
  },
  methods: {
    closeAbout () {
      this.$store.commit('toggleAboutModal', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper {
    background: url('../assets/background.jpg');
    background-size: cover;
    display: flex;
    align-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .container {
  	background: #2BA6E3;
    color: #fff;
    text-align: left;
    margin: 0 auto;
  }
</style>
