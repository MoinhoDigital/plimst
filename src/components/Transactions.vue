<template>
  <div class="wrapper">
    <h1>Transactions</h1>
    <div class="box" v-for="inbox in inboxes" :key="inbox.id">
      <div class="item">
        {{inbox.asset}}
      </div>
      <div class="item">
        {{inbox.coinIds.length}}
      </div>
      <div class="item">
        <span :class="inbox.type">{{inbox.type}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'transactions',
  computed: {
    inboxes () {
      return this.$store.state.data.inboxData
    }
  }
}
</script>

<style>
  .wrapper {
    background: #fff;
    color: #000;
  }
  .box {
    width: 100%;
    display: flex;
  }
  .item {
    width: 30%;
  }
  .sent {
    color: red;
  }
  .received {
    color: green;
  }
  .minted {
    color: gold;
  }
</style>