<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible rounded-0 shadow-sm"
      :class="`alert-${item.status} border-${item.status}`"
      v-for="(item, i) in messages"
      :key="i"
    >
      <strong>
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        {{ item.message }}
      </strong>
      <button type="button" class="close" @click="m_removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'AlertMessage',
  methods: {
    ...mapMutations(['m_removeMessage']),
  },
  computed: {
    ...mapGetters(['messages']),
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
