<!-- PROPERTY OF PLIMST -->
<template>
  <div class="wrapper">
      <div class="container">
        <!-- <img src="../assets/logo.png"> -->
        <loader class="loader" />
        <h1>Welcome to Plimst.</h1>
        <h3>We're connecting to the SAFE Network.</h3>
      </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
export default {
  name: 'Welcome',
  components: {
    'loader': Loader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  padding-bottom: 15px;
}
.loader {
  width: 35px;
  height: auto;
  margin: auto;
  padding-bottom: 15px;
}
</style>
