<template>
  <div id="app">
    <div>
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  background: #000;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
