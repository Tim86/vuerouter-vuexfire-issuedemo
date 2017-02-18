<template>
  <div id="app">
    <div class="content-wrapper">
      <nav>
        <router-link to='/list'>List</router-link> |
        <router-link to='/entry'>Form</router-link> 
      </nav>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {}
  }

</script>

<style>
  #app {
    text-align: center;
  }
  
  .content-wrapper {
    padding: 24px 35px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .demo-raised-button {
    margin: 12px;
  }
</style>