import Vue from 'vue';
Vue.prototype.$bus = new Vue();
// 讓 EventBus 掛載在 Vue 原型下，使其可以直接呼叫

// Message
// vm.$bus.$emit('message:push', message, status;
// message(String): 訊息內容
// message(String): Alert 的樣式
