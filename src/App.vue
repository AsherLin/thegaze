<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Home from '@/views/Home.vue';

export default {
  name: 'app',
  components: {
    Home,
  },
};
</script>

<style src="@/assets/css/font-awesome.min.css"></style>
<style lang="scss">
@import '@/assets/css/all';
</style>
