<template>
  <div class="wrap">
    <div class="bg-light">
      <video-bg class="video-bg" :sources="['./video.mp4']" img="assets/bg.jpg">
        <div class="home_title d-flex justify-content-center align-content-center flex-wrap text-center">
          <p class="text-white h2" style="width:100%;">The Gaze 凝視</p>
          <p class="text-white h4">每天一件時事、一本書，推薦給您。</p>
        </div>
      </video-bg>
    </div>

    <section class="bg-light">
      <div class="container">
        <div class="row py-5">
          <div class="col-md-7 d-flex justify-content-center align-items-center flex-column mb-4 mb-md-0">
            <h3>
              每天，我們分享一件時事並推薦一本書給您。
            </h3>
            <p>
              分享閱讀，分享一個句子、一本書、一個作者、一段評論，享讀文字裡的經典不朽和新鮮知識。
            </p>
            <router-link class="btn btn-outline-primary rounded-0" to="/story">更多時事</router-link>
          </div>
          <div class="col-md-5">
            <img class="img-fluid" src="@/assets/img/home02.png" alt="" />
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white">
      <div class="container">
        <div class="row py-5">
          <div class="col-lg-5 mb-4 mb-lg-0">
            <img class="img-fluid" src="@/assets/img/home03.png" alt="" />
          </div>
          <div class="col-lg-7 d-flex justify-content-center align-items-center flex-column">
            <h3>
              我們是...？
            </h3>
            <p>
              一群喜歡閱讀也喜歡分享國際時事的團隊。
            </p>
            <router-link class="btn btn-outline-primary rounded-0" to="/about">認識我們</router-link>
          </div>
        </div>
      </div>
    </section>

    <div id="section3" class="empty"></div>

    <div id="section4" class="bg-light py-3 py-md-6">
      <div class="conatainer">
        <div class="row text-center px-3 py-4">
          <div class="col-md-4 p-3">
            <h5 class="mb-4">每天挑選一篇國際時事分享給您。</h5>
            <img class="img-fluid align-center" src="@/assets/img/home04.png" alt="" />
          </div>
          <div class="col-md-4 p-3">
            <h5 class="mb-4">以此推薦相關書籍。</h5>
            <img class="img-fluid align-center" src="@/assets/img/home05.png" alt="" />
          </div>
          <div class="col-md-4 p-3">
            <h5 class="mb-4">從這裡，我們一起探索世界！</h5>
            <img class="img-fluid align-center" src="@/assets/img/home06.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  methods: {
    toNextSection(sectionName) {
      const { top } = $(`#${sectionName}`).offset();
      if (sectionName) {
        $('html,body').animate({ scrollTop: top }, 1000);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  background-image: url('~@/assets/img/home01.jpeg');
  overflow: hidden;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
}
.video-bg {
  background: fixed;
  position: relative;
  .home_title {
    position: absolute;
    width: 100%;
    min-height: 20%;
    background: rgba(171, 147, 83, 0.5);
    top: 40%;
    z-index: 900;
  }
}
.empty {
  height: 400px;
}
.toNextSectionBtn {
  cursor: pointer;
}
</style>
