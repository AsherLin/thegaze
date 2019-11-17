<template>
  <footer class="bg-dark">
    <div class="container text-white py-5">
      <div class="row">
        <div class="col-md-5 mb-2">
          <p class="font-weight-bold h2">
            <img src="@/assets/img/logo/text-white.png" height="30px" alt="" />
          </p>
          <!-- <p>Copyright &copy; 2019, The Gaze.</p> -->
          <p class="danger">
            <small
              >本站資料、圖片來源皆取自網路，僅做為<br />個人學習用途，如有侵權請<a
                href="mailto:thegaze77@gmail.com"
                style="color:white;"
                >來信</a
              >告知。</small
            >
          </p>
          <div class="d-flex">
            <img class="payment_icon" src="@/assets/img/icons/payments/amazon.svg" alt="Amazon" title="Amazon" />
            <img
              class="payment_icon"
              src="@/assets/img/icons/payments/american-express.svg"
              alt="American Express"
              title="American Express"
            />
            <img class="payment_icon" src="@/assets/img/icons/payments/jcb.svg" alt="JCB" title="JCB" />
            <img class="payment_icon" src="@/assets/img/icons/payments/paypal.svg" alt="Paypal" title="Paypal" />
            <img class="payment_icon" src="@/assets/img/icons/payments/visa.svg" alt="Visa" title="Visa" />
          </div>
        </div>
        <div class="col-md-2">
          <p class="font-weight-bold">服務政策</p>
          <ul>
            <li>
              <a href="#">關於我們</a>
            </li>
            <li>
              <a href="#">退貨政策</a>
            </li>
            <li>
              <a href="#">服務條款</a>
            </li>
            <li>
              <a href="#">訊息公告</a>
            </li>
          </ul>
        </div>

        <div class="col-md-2">
          <p class="font-weight-bold">聯絡方式</p>
          <ul class="text-white">
            <li>
              <a href="https://github.com/thegaze77">
                <i class="fa fa-github text-center" aria-hidden="true"></i>
                <span>Github</span>
              </a>
            </li>
            <li>
              <a href="https://codepen.io/oliverlin-gaze">
                <i class="fa fa-codepen text-center" aria-hidden="true"></i>
                <span>CodePen</span>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/oliverlin.gaze">
                <i class="fa fa-facebook-official" aria-hidden="true"></i>
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="mailto:thegaze77@gmail.com">
                <i class="fa fa-envelope-square" aria-hidden="true"></i>
                <span>E-mail</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="col-md-3 d-flex flex-column">
          <p class="font-weight-bold">Subscribe</p>
          <p class="text-light">想獲得最新消息嗎？</p>
          <div class="input-group input-group-sm mb-3">
            <input
              type="mail"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="輸入電子信箱吧！"
            />
            <div class="input-group-prepend">
              <button type="button" class="btn btn-sm btn-secondary">訂閱</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped lang="scss">
ul {
  a {
    color: $gray-500;
    i {
      display: inline-block;
      width: 15px;
      margin-right: 7px;
    }
    &:hover {
      color: white;
      text-decoration: none;
    }
  }
}
.payment_icon {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}
</style>
