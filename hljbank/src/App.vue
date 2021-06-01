<template>
  <div id="app">
   <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
   
  },
  
}
</script>

<style>
 @import url("assets/css/base.css");

</style>
