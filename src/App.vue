<template>
  <div id="app">
    <navBar></navBar>

    <div id="main-content">
      <router-view :key="$route.fullPath"></router-view>
      
    </div>
   


  </div>
</template>

<script>

import navBar from '@/components/Navbar.vue'


export default {
  name: 'App',
  components: {
    navBar

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
  height: 100%;
}

#main-content{

  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100%;
  padding-bottom: 20px;
}
</style>
