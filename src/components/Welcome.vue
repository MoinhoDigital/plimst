<!-- PROPERTY OF PLIMST -->
<template>
  <div class="welcome">
      <div class="container">
        <!-- <img src="../assets/logo.png"> -->
        <loader class="loader" />
        <h1>Welcome to Plimst.</h1>
        <h3>We're connecting to the SAFE Network.</h3>
      </div>
  </div>
</template>

<script>
import router from '../router'
import Loader from '@/components/Loader'
export default {
  name: 'Welcome',
  components: {
    'loader': Loader
  },
  mounted: async function () {
    const { dispatch, state: { appHandle, authUri } } = this.$store
    if (!appHandle || !authUri) {
      await dispatch('init')
      router.push('/auth')
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome {
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.loader {
  background: #000;
  width: 35px;
  height: auto;
  margin: auto;
  padding-bottom: 15px;
}
</style>
