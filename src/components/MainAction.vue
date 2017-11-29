<!-- PROPERTY OF PLIMST -->
<template>
  <div class="wrapper">
    <div class="container">
    	<md-button
	      class="md-raised md-primary full"
	      :disabled="disabledState"
	      @click="action">
	      {{ text }}
	    </md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainAction',
  props: ['text', 'action', 'disabled'],
  computed: {
    disabledState () {
      return this.$store.state.inputs[this.disabled]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper {
  }
</style>
