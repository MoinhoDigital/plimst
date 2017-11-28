<template>
  <div id="app">
    <div class="wrapper">
      <div class="container">
       <md-card>
          <md-card-header>
              <router-view name="bar"></router-view>
            <md-card-header-text>
            </md-card-header-text>
          </md-card-header>
          <md-card-content>
            <router-view></router-view>
          </md-card-content>
          <md-card-actions>
            <router-view name="action" />
          </md-card-actions>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from '@/components/Loader'

export default {
  name: 'main',
  components: {
    'loader': Loader
  }
}
</script>

<style lang=scss>
</style>
