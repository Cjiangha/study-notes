<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <count/>
  </div>
</template>

<script>
import count from './components/count.vue'
export default {
  name: 'App',
  components: {
    count
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
