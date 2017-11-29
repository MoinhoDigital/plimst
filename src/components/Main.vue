<template>
  <div class="main" v-if="!modalOpened">
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
  },
  computed: {
    modalOpened () {
      const { menu, about } = this.$store.state.modals
      return menu || about
    }
  }
}
</script>

<style lang=scss>
.main {
  background: url('../assets/background.jpg');
  background-size: cover;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
