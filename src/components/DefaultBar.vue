<!-- PROPERTY OF PLIMST -->
<template>
  <div class="wrapper">
    <div class="container">
      <img src="../assets/logo.png" @click="menuAction" />
      <h2 class="md-title">SAVE TIME | SAFE MONEY</h2>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'DefaultBar',
  props: ['menuAction']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper {
  }
  .container {
    display: flex;
    justify-content: space-around;
  }
</style>
