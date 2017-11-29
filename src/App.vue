<template>
  <div id="app">
    <router-view />
    <appMenu />
    <about />
  </div>
</template>
<script>
import Menu from '@/components/Menu'
import About from '@/components/About'

export default {
  name: 'app',
  components: {
    'appMenu': Menu,
    'about': About
  }
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
  width: 100%;
  height: 100%;
  color: #fff;
}
.wrapper {
  width: 450px;
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
