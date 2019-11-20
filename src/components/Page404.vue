<template>
  <div class="bg-light">
    <Navigation />
    <div class="page404 container d-flex justify-content-center align-items-center text-center">
      <div class="row">
        <div class="col">
          <img
            class="img-fluid"
            src="@/assets/img/404_page_not_found_2.png"
            alt="404_page_not_found"
          />
          <h2 class="text-primary mt-4">ㄛㄛ... 找不到頁面！</h2>
          <router-link class="btn btn-primary rounded-0 mt-3" :to="{ name: 'home' }">回首頁</router-link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default {
  components: {
    Navigation,
    Footer,
  },
};
</script>

<style scoped lang="scss">
.page404 {
  min-height: 100vh;
}
</style>
