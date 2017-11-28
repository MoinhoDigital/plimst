<!-- PROPERTY OF PLIMST -->
<template>
  <div class="wrapper">
    <div class="container">
      <img src="../assets/logo.png" />
      <slot></slot>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'Appbar'
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
