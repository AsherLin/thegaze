<template>
  <div class="bg-light">
    <Alert />
    <div class="form d-flex pt-6">
      <loading :active.sync="isLoading"></loading>
      <form class="form-signin text-center" @submit.prevent="signin">
        <img class="mb-4 img-fluid" src="@/assets/img/login.png" alt />
        <h3 class="h3 mb-3 text-primary font-weight-normal">會員登入</h3>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="電子信箱帳號"
          v-model="user.username"
          required
          autofocus
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="密碼"
          v-model="user.password"
          required
        />
        <div class="checkbox mb-3 text-primary">
          <label>
            <input type="checkbox" value="remember-me" /> 記住我
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
      </form>
    </div>
    <!--
    <div class="container d-flex flex-column align-items-center">
      <div class="row">
        <div class="col-12">
          <h3 class="text-primary font-weight-normal">免登入查詢訂單狀態</h3>
        </div>
        <div class="col-12">
          <div class="input-group text-center">
            <input type="text" class="form-control form-control-sm" placeholder="輸入訂單編號" v-model="orderId" />
            <div class="input-group-append">
              <button class="btn btn-sm btn-primary" @click="getOrder" type="button">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
import Alert from '@/components/AlertMessage';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isLoading: false,
      orderId: '',
    };
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      vm.isLoading = true;
      this.$http.post(api, vm.user).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push('/admin/manage_products');
          vm.$bus.$emit('message:push', '登入成功', 'primary');
        } else {
          vm.$bus.$emit('message:push', '登入失敗', 'danger');
        }
        vm.isLoading = false;
      });
    },
    getOrder() {
      const id = this.orderId;
      this.$router.push(`/checkout/${id}`);
    },
  },
  components: {
    Alert,
  },
};
</script>

<style scoped>
.form {
  min-height: 100vh;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
