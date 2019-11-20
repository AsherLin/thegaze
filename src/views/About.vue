<template>
  <div>
    <div class="row no-gutters section">
      <div class="content col-md-3" v-for="(item, index) in people" :key="index">
        <img
          :src="require(`@/assets/img/editor${index + 1}.jpg`)"
          class="content_img img-fluid"
          alt
        />
        <div class="content_text p-3 text-white">
          <p class="h3">{{ item.name }}</p>
          <p class="h6 text-primary">{{ item.job }}</p>
          <p class="h6 pl-4">{{ item.quote }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      people: [
        {
          name: 'Andrew',
          imgurl: '@/assets/img/editor1.jpg',
          job: '創辦人 & 選書總監',
          quote: '"Dare to be different."',
        },
        {
          name: 'Ann',
          imgurl: '@/assets/img/editor2.jpg',
          job: '選書師 & 採訪編輯',
          quote: '"挑選最不一樣的分享給你"',
        },
        {
          name: 'Raccoon',
          imgurl: '@/assets/img/editor3.jpg',
          job: '選書師 & 採訪編輯',
          quote: '"整個世界就是我的大型遊樂場"',
        },
        {
          name: 'Hannah',
          imgurl: '@/assets/img/editor4.jpg',
          job: '選書師 & 採訪編輯',
          quote: '"For the many, not the few."',
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
.content {
  position: relative;
  .content_text {
    width: 100%;
    position: absolute;
    bottom: 18%;
    right: 0;
    background: rgba(0, 0, 0, 0.85);
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover .content_text {
    opacity: 1;
  }
  .content_img {
    object-fit: cover;
    height: 100vh;
    filter: brightness(0.5);
    transition: filter 0.3s;
  }
  &:hover .content_img {
    filter: brightness(1);
  }
}
</style>
