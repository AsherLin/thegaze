<template>
  <div>
    <a href="#" id="backtop" class="backtop" @click.prevent="backtop" style="display:none;">
      <i class="fa fa-angle-up fa-2x" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  methods: {
    backtop() {
      let timer = null;
      cancelAnimationFrame(timer);
      //取得當下時間（毫秒）
      var startTime = +new Date();
      //取得所在高度
      var b = document.body.scrollTop || document.documentElement.scrollTop;
      var d = 500;
      var c = b;
      timer = requestAnimationFrame(function func() {
        var t = d - Math.max(0, startTime - +new Date() + d);
        document.documentElement.scrollTop = document.body.scrollTop = (t * -c) / d + b;
        timer = requestAnimationFrame(func);
        if (t == d) {
          cancelAnimationFrame(timer);
        }
      });
    },
    toggleBacktopBtn() {
      if ($(window).scrollTop() > 5) {
        $('#backtop').fadeIn(250);
      } else {
        $('#backtop')
          .stop()
          .fadeOut(250);
      }
    },
  },
  mounted() {
    this.toggleBacktopBtn();
    /* 偵測卷軸滑動時執行以下程式 */
    $(window).scroll(this.toggleBacktopBtn);
  },
};
</script>

<style scoped lang="scss">
.backtop {
  position: fixed;
  z-index: 2000;
  display: inline;
  right: 10px;
  bottom: 10px;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  line-height: 42px;
  font-size: 18px;
  text-align: center;
  color: #fff;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  transition: transform 0.2s linear, background-color 0.2s linear;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.5);
  &:hover {
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.2);
    background-color: $primary;
    transform: translateY(-3px);
    color: #fff;
  }
}
</style>
