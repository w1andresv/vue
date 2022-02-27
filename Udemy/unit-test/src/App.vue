<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <AppCounter :title="'Entraron'" :start="3"/> v-bind => : -->
  <!-- <AppCounter :title="'Titulo'"/> -->
  <AppIndecision></AppIndecision>
</template>

<script>
// import AppCounter from './components/Counter.vue'
import AppIndecision from './components/Indecision'

export default {
  name: 'App',
  components: {
    // AppCounter,
    AppIndecision
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
