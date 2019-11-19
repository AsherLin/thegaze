<template>
  <div class="bg-light">
    <Navigation />
    <div class="container pt-6">
      <div class="row">
        <div class="col">
          <h2>今天想了解哪裡的時事呢？</h2>
          <p>- 世界上每天都有大大小小的事在發生。</p>

          <!-- Flag Nav -->
          <div class="mt2">
            <img
              v-for="(item, index) in flags"
              :key="index"
              class="flagsNav"
              :src="require(`@/assets/img/icons/flags/${item.toLowerCase()}.svg`)"
              :alt="item"
              :title="item"
            />
          </div>
          <hr />
        </div>
      </div>
    </div>

    <!-- Article -->
    <article v-for="(item, index) in story" :key="index" class="container pt-3">
      <div class="row">
        <div class="col">
          <h4 class="title mb-2">
            <img :src="require(`@/assets/img/icons/flags/${item.country.toLowerCase()}.svg`)" alt="flag" />
            {{ item.title }}
          </h4>
          <ul class="d-flex text-gray mb-2 list-unstyled">
            <li class="mr-2">
              <small><i class="fa fa-user" aria-hidden="true"></i> {{ item.author }}</small>
            </li>
            <li class="mr-2">
              <small
                ><i class="fa fa-calendar" aria-hidden="true"></i> {{ item.month }} {{ item.date }},
                {{ item.year }}</small
              >
            </li>
          </ul>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <img class="img-fluid mb-3" :src="require(`@/assets/img/story/${item.storyimgurl}`)" alt="story-image" />
            </div>
            <div class="col-md-6">
              <p class="content mb-3">
                {{ item.content }}
              </p>
              <div class="d-flex justify-content-between">
                <a :href="item.srcurl" class="btn btn-outline-secondary rounded-0" target="_blank">原文出處</a>
                <router-link :to="`/products/${item.recId}`" class="btn btn-primary rounded-0">推薦選書</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
    </article>

    <!-- Footer -->
    <Footer />
    <BacktopBtn />
  </div>
</template>

<script>
import $ from 'jquery'; //　引入 jQuery $
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BacktopBtn from '@/components/BacktopBtn';

export default {
  data() {
    return {
      flags: [
        'Australia',
        // 'Belgium',
        // 'Brazil',
        // 'Canada',
        'China',
        // 'Denmark',
        // 'France',
        'Germany',
        'Greece',
        'Hong-Kong',
        'India',
        // 'Indonesia',
        // 'Italy',
        // 'Japan',
        'Mexico',
        // 'Netherlands',
        // 'Norway',
        // 'Russia',
        'Saudi-Arabia',
        // 'Singapore',
        // 'South-Korea',
        // 'Spain',
        // 'Sweden',
        // 'Switzerland',
        'Syria',
        // 'Taiwan',
        // 'Thailand',
        // 'Turkey',
        'USA',
        // 'Vietnam',
      ],
      story: [
        // {
        //   country: '',
        //   title: '',
        //   author: '',
        //   month: '',
        //   date: '',
        //   year: '',
        //   content: '',
        //   storyimgurl: '',
        //   srcurl: '',
        //   recId:'',
        // },
        {
          country: 'Australia',
          title: '伊朗難民被關6年 曝光慘況拿下文學獎！震撼全球然後呢？',
          content:
            '一名遭澳洲政府拘留在太平洋小島上的難民，靠著手機寫書，描述難民營的生活，竟獲得文學大獎，但他卻被禁止進入澳洲領獎，也讓國際再度關注澳洲的移民政策。\n在被關了六年之後，終於被獲准到紐西蘭演講，到時他本人會講什麼？為什麼他的故事這麼重要？給我6分鐘，讓我告訴你。',
          srcurl: 'https://bre.is/Fx5dXNrr',
          author: 'LINE TODAY 看世界',
          month: 'NOV',
          date: 15,
          year: 2019,
          storyimgurl: 'story20191115.jpg',
          recId: '-LtmBWtFqzz04JTZc0MP',
        },
        {
          country: 'Syria',
          title: '他拯救十萬人 卻沒能拯救自己！「白盔隊」創辦人身亡後你更該知道的事',
          content:
            '一個在戰地裡救人無數的志工，被發現陳屍自家公寓樓下。看起來非常單純的自殺案件，為什麼受到各方質疑？今天我們想透過在敘利亞戰地提供緊急救護的白盔隊創辦人的故事，來看看戰地志工，在離開了戰地之後，他的爭戰就跟著結束了嗎？',
          srcurl: 'https://bre.is/CcLfzFPC',
          author: 'LINE TODAY 看世界',
          month: 'NOV',
          date: 14,
          year: 2019,
          storyimgurl: 'story20191114.jpg',
          recId: '-LtsMe7SV58QO2zJc5-V',
        },
        {
          country: 'Hong-Kong',
          title: '暴警入侵！大學校園慘淪血腥戰場 香港抗爭如何落幕？',
          content:
            '香港的情勢在這個星期迅速昇高，香港各大學成為新的衝突點，警方進入大學的逮捕行動，讓香港大學們的校園自治權，到底界線應畫在那裡成為新焦點，到今天還有很多學校在持續停課當中。香港在24日要舉行的地方選舉，會因此被延期嗎?香港的反送中運動，和平落幕的可能性還有嗎？',
          srcurl:
            'https://today.line.me/tw/pc/article/%E6%9A%B4%E8%AD%A6%E5%85%A5%E4%BE%B5%EF%BC%81%E5%A4%A7%E5%AD%B8%E6%A0%A1%E5%9C%92%E6%85%98%E6%B7%AA%E8%A1%80%E8%85%A5%E6%88%B0%E5%A0%B4+%E9%A6%99%E6%B8%AF%E6%8A%97%E7%88%AD%E5%A6%82%E4%BD%95%E8%90%BD%E5%B9%95%EF%BC%9F-wjpe1G',
          author: 'LINE TODAY 看世界',
          month: 'NOV',
          date: 13,
          year: 2019,
          storyimgurl: 'story20191113.jpg',
          recId: '-LtsRIM1B0dbWTUWyLfc',
        },
        {
          country: 'Australia',
          title: '澳洲野火狂燒 350無尾熊慘變焦屍⋯官方說法為何被酸胡說八道',
          content:
            '澳洲野火不斷，昨天更己經到了要宣布緊急狀態的情況，澳洲政府堅持大火跟氣候變遷沒有關係，氣候專家說澳洲政府胡說八道，怎麼可能沒有?今天我們就要透過澳洲政府的例子，來看看為什麼很多政府要對著科學數字睜眼說瞎話。',
          srcurl:
            'https://today.line.me/tw/pc/article/%E6%BE%B3%E6%B4%B2%E9%87%8E%E7%81%AB%E7%8B%82%E7%87%92+350%E7%84%A1%E5%B0%BE%E7%86%8A%E6%85%98%E8%AE%8A%E7%84%A6%E5%B1%8D%E2%8B%AF%E5%AE%98%E6%96%B9%E8%AA%AA%E6%B3%95%E7%82%BA%E4%BD%95%E8%A2%AB%E9%85%B8%E8%83%A1%E8%AA%AA%E5%85%AB%E9%81%93-7nrqXJ',
          author: 'LINE TODAY 看世界',
          month: 'NOV',
          date: 12,
          year: 2019,
          storyimgurl: 'story20191112.jpg',
          recId: '-LtsVmakAlJL9t-vVCt4',
        },
        {
          country: 'Germany',
          title: '柏林圍牆倒塌30週年 東德人為何自認比難民還不如？',
          content:
            '最近這一週，正好是德國柏林圍牆倒塌30週年，在德國境內有很多紀念活動，看起來是頗溫馨。但柏林圍牆倒塌、東西德合併，真的就像童話一樣，王子公主過著幸福快樂的生活嗎？\n我們今天就帶大家快速看一下，從30年前那一晚，一路走到現在，東西德的經濟和政治光譜經歷了什麼變化。',
          srcurl:
            'https://today.line.me/tw/pc/article/%E6%9F%8F%E6%9E%97%E5%9C%8D%E7%89%86%E5%80%92%E5%A1%8C30%E9%80%B1%E5%B9%B4+%E6%9D%B1%E5%BE%B7%E4%BA%BA%E7%82%BA%E4%BD%95%E8%87%AA%E8%AA%8D%E6%AF%94%E9%9B%A3%E6%B0%91%E9%82%84%E4%B8%8D%E5%A6%82%EF%BC%9F-2W93O8',
          author: 'LINE TODAY 看世界',
          month: 'NOV',
          date: 11,
          year: 2019,
          storyimgurl: 'story20191111.jpg',
          recId: '-LtsYPkBztbXzBYsYRiY',
        },
        {
          country: 'Mexico',
          title: '毒梟虐殺美國無辜婦嬬！川普火大要幫忙掃毒為何墨西哥說 NO？',
          content:
            '墨西哥在這個月的5號傳出了一件駭人聽聞的幫派襲擊事件。屬於美墨雙重國籍的三位媽媽，帶著自己的小孩子們開著三部車，準備參加隔壁州教友的婚禮。卻遭到重武裝的不明槍手襲擊，總共有九人被當場擊斃或被燒死，包括多名兒童及一對不到一歲的雙胞胎。\n這個案件不但讓全世界看到墨西哥毒梟有多猖狂，墨國政府的無能回應，還牽動了美墨敏感的政治神經。這一集來帶大家看看墨國毒梟有多誇張。',
          srcurl:
            'https://today.line.me/tw/pc/article/%E6%AF%92%E6%A2%9F%E8%99%90%E6%AE%BA%E7%84%A1%E8%BE%9C%E5%A9%A6%E5%AC%AC%EF%BC%81%E5%B7%9D%E6%99%AE%E8%A6%81%E5%B9%AB%E5%BF%99%E7%82%BA%E4%BD%95%E5%A2%A8%E8%A5%BF%E5%93%A5%E8%AA%AANO%EF%BC%9F-5n2Y8E',
          author: 'LINE TODAY 看世界',
          month: 'NOV',
          date: 10,
          year: 2019,
          storyimgurl: 'story20191110.jpg',
          recId: '-Lts_QyG8p-9mysHvY1w',
        },
        {
          country: 'Hong-Kong',
          title: '香港親中議員被刺傷爆出陰謀論？港府中共下一步棋怎麼走',
          content:
            '香港自六月以來的抗議活動，情勢不斷的昇高，被外界視為 7.21 元朗恐襲幕後黑手的香港親中立法會議員何君堯，6日上午遇襲被刺傷，但很多網民不但不同情，還懷疑他造假，很多分析就認為，北京很可能會用這個理由，要港府出手再重一點。\n\n這次的事件會不會引發港府出手更強力鎮壓？甚至有人擔心，中國會不會坐不住了？',
          srcurl:
            'https://today.line.me/tw/pc/article/%E8%A6%AA%E4%B8%AD%E8%AD%B0%E5%93%A1%E8%A2%AB%E5%88%BA%E5%82%B7%E7%88%86%E9%99%B0%E8%AC%80%E8%AB%96%EF%BC%9F%E6%B8%AF%E5%BA%9C%E4%B8%AD%E5%85%B1%E4%B8%8B%E4%B8%80%E6%AD%A5%E6%A3%8B%E6%80%8E%E9%BA%BC%E8%B5%B0-O9kaJ6',
          author: 'LINE TODAY 看世界',
          month: 'NOV',
          date: 7,
          year: 2019,
          storyimgurl: 'story20191107.jpg',
          recId: '-LtsSGwxrup1-tvruCc0',
        },
        {
          country: 'USA',
          title: '蘋果要出10億美金幫矽谷首購族買房！佛心企業真的好棒棒嗎？為何還被嫌？',
          content:
            '美國矽谷所在的舊金山灣區，可以說是天龍國中的天龍國，因科技業蓬勃帶來的高薪，也帶動房價快速攀升。房價高到讓矽谷員工住不起房子，得去睡車裡。\n科技巨頭們於是紛紛跳出來出錢出力要幫忙解決，你覺得這是有企業良心嗎？還是貪婪企業在洗白？',
          srcurl:
            'https://today.line.me/tw/pc/article/%E8%98%8B%E6%9E%9C%E8%A6%81%E5%87%BA10%E5%84%84%E7%BE%8E%E9%87%91%E5%B9%AB%E7%9F%BD%E8%B0%B7%E9%A6%96%E8%B3%BC%E6%97%8F%E8%B2%B7%E6%88%BF+%E7%82%BA%E4%BD%95%E9%82%84%E8%A2%AB%E5%AB%8C%EF%BC%9F-G6m1jy',
          author: 'LINE TODAY 看世界',
          month: 'NOV',
          date: 6,
          year: 2019,
          storyimgurl: 'story20191106.jpg',
          recId: '-LtscbkhO2XQjutaF5zh',
        },
        {
          country: 'INDIA',
          title: '「RCEP」是什麼為何印度不玩了！中國布局被打亂，台灣是賺到？還是剉咧等？',
          content:
            '東協高峰會昨日（11/4）結束，本次聚焦在國際貿易及主權爭議，對台灣的新南向政策跟南海區域安全都有重大關聯，究竟 RCEP 是什麼？印度不簽會怎樣？台灣被邊緣，新南向政策該何去何從？也歡迎各位觀眾在底下分享你的看法！',
          srcurl:
            'https://today.line.me/tw/pc/article/%E3%80%8CRCEP%E3%80%8D%E6%98%AF%E4%BB%80%E9%BA%BC%E7%82%BA%E4%BD%95%E5%8D%B0%E5%BA%A6%E4%B8%8D%E7%8E%A9%E4%BA%86+%E5%8F%B0%E7%81%A3%E6%98%AF%E8%B3%BA%E5%88%B0%EF%BC%9F%E9%82%84%E6%98%AF%E5%89%89%E5%92%A7%E7%AD%89%EF%BC%9F-ajQBVn',
          author: 'LINE TODAY 看世界',
          month: 'NOV',
          date: 5,
          year: 2019,
          storyimgurl: 'story20191105.jpg',
          recId: '-LtsdCJaSJKC_y7f9491',
        },
        {
          country: 'Saudi-Arabia',
          title: '靠石油發大財？全球最有錢公司要上市了！為何投資人怕怕',
          content:
            '全球最賺錢公司－沙烏地阿拉伯的阿美石油公司，這間狠甩蘋果、阿里巴巴的企業，宣布將要公開上市！這很可能是全世界有史以來最大規模的 IPO。\n為什麼他好大，但投資人卻好怕？究竟全世界對石油的前景是看好？還是看衰呢？通通一次告訴你！',
          srcurl:
            'https://today.line.me/tw/pc/article/%E5%85%A8%E7%90%83%E6%9C%80%E6%9C%89%E9%8C%A2%E5%85%AC%E5%8F%B8%E8%A6%81%E4%B8%8A%E5%B8%82%E4%BA%86+%E7%82%BA%E4%BD%95%E6%8A%95%E8%B3%87%E4%BA%BA%E6%80%95%E6%80%95-MgYXmD',
          author: 'LINE TODAY 看世界',
          month: 'NOV',
          date: 4,
          year: 2019,
          storyimgurl: 'story20191104.jpg',
          recId: '-LtseUF0PpDITmLMqTBO',
        },
      ],
    };
  },
  components: {
    Navigation,
    Footer,
    BacktopBtn,
  },
};
</script>

<style scoped lang="scss">
.flagsNav {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}
.title {
  padding-left: 40px;
  position: relative;
  line-height: 25px;
  img {
    width: 30px;
    height: 30px;
    display: block;
    position: absolute;
    left: 0;
    top: -3px;
  }
}
.content {
  font-size: 16px;
  color: #7e7f81;
}
</style>
