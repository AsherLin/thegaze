<template>
  <div id="app">
    <Navigation />
    <Alert />
    <router-view />
    <Footer />
    <BacktopBtn />
  </div>
</template>

<script>
import Home from '@/views/Home.vue';
import Alert from '@/components/AlertMessage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BacktopBtn from '@/components/BacktopBtn';

export default {
  name: 'app',
  components: {
    Home,
    Alert,
    Navigation,
    Footer,
    BacktopBtn,
  },
};
</script>

<style src="@/assets/css/font-awesome.min.css"></style>
<style lang="scss">
@import '@/assets/css/all';
</style>
