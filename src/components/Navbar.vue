<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap shadow">
      <router-link class="col-sm-3 col-md-2 mr-0" :to="{ name: 'home' }">
        <img src="@/assets/img/logo/text-white.png" height="25px" alt />
      </router-link>
      <h2 class="h5 text-white m-1">後台管理系統</h2>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  ...mapActions(['a_updateMessage']),

  methods: {
    signout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      const vm = this;
      vm.$http.post(api).then(response => {
        // console.log(response.data);
        // 如果回傳成功則重新導向至登入頁
        if (response.data.success) {
          this.$store.dispatch('a_updateMessage', { message: '成功登出', status: 'primary' });
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>
