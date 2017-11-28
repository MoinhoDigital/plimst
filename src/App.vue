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

<style lang=scss>
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(blue, A200) // The primary color of your application
));

@import "~vue-material/dist/theme/all"; // Apply the theme

body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  background: #000;
  background: url('./assets/background.jpg');
  background-size: cover;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.wrapper {
    width: 420px;
    background: #fff;
    color: #000;
  }
.full {
  width: 100%;
}
.input {
  width: 80%;
}
</style>
