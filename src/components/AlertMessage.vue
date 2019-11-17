<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible rounded-0 shadow-sm"
      :class="`alert-${item.status} border-${item.status}`"
      v-for="(item, i) in messages"
      :key="i"
    >
      <strong><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> {{ item.message }}</strong>
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      messages: [],
      // messages: [
      //   {
      //     message: message,
      //     status: status,
      //     timestamp: time,
      //   },
      // ],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 6000); // 5秒後自動移除
    },
  },
  created() {
    const vm = this;
    // 自定義名稱 'message:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
    // vm.$bus.$emit('message:push'); // 內層傳入
  },
};
</script>
<style scoped lang="scss">
.message-alert {
  position: fixed;
  max-width: 80%;
  top: 70px;
  right: 20px;
  z-index: 5000;
}
.alert {
  border-left: 10px solid;
}
</style>
