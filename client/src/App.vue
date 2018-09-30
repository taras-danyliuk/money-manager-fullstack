<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "app"
  }
</script>

<style>
  html {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    /*background: #000;*/
    background: linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(56,55,56,1) 100%);
    height: 100%;
  }
  #app {
    padding: 20px;
  }
</style>
