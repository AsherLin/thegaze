<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary text-white" @click="openCouponModal(true)">
        <i class="fa fa-plus" aria-hidden="true"></i> 建立優惠券
      </button>
    </div>

    <table class="table mt-4 table-hover shadow-sm rounded bg-light">
      <thead class="thead-dark">
        <tr>
          <th class="pl-4">名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯 / 刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td class="pl-4">{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date | date }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">
              <i class="fa fa-check" aria-hidden="true"></i> 已啟用
            </span>
            <span v-else class="text-muted">
              <i class="fa fa-times" aria-hidden="true"></i> 未啟用
            </span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-dark btn-sm" @click="openCouponModal(false, item)">編輯</button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openCouponModal(false, item, true)"
              >刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <Pagination :pagination="pagination" @gopage="getCoupons"></Pagination>

    <!-- Cuppon Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">優惠券資訊</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入優惠券標題"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date" v-model="due_date" />
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="tempCoupon.percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-secondary" @click="updateCoupon">確定</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delCouponModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCoupon(tempCoupon.id)">
              <i class="fa fa-trash-o fa-lg"></i> 確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import moment from 'moment';
import Pagination from '@/components/Pagination';
import { mapActions } from 'vuex';

export default {
  props: { config: Object },

  data() {
    return {
      coupons: [],
      tempCoupon: {
        // title: '超級特惠價格',
        // is_enabled: 1,
        // percent: 80,
        // due_date: 1555459200,
        // code: 'testCode',
      },
      due_date: moment().format('YYYY-MM-DD'),
      isNew: false,
      isLoading: false,
      pagination: {},
    };
  },

  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },

  methods: {
    ...mapActions(['a_updateMessage']),

    onClickCreate() {},

    onClickEdit(id) {},

    onClickDelete(id) {},

    // 取得優惠券列表
    getCoupons(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        // console.log(response.data);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },

    // 判斷開啟 Modal
    openCouponModal(isNew, item, isDel) {
      const vm = this;
      if (isNew) {
        vm.tempCoupon = {};
        vm.isNew = true;
        $('#couponModal').modal('show');
      } else if (!isNew && isDel) {
        vm.tempCoupon = Object.assign({}, item);
        $('#delCouponModal').modal('show');
      } else {
        vm.tempCoupon = Object.assign({}, item);
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
        // 轉成 ISO 8601 的格式，並捨去 T
        vm.due_date = dateAndTime[0];
        $('#couponModal').modal('show');
      }
    },

    // 更新優惠券
    updateCoupon() {
      const vm = this;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
        vm.due_date = new Date(vm.tempCoupon.due_date * 1000);
      }
      // console.log('httpMethod: ' + httpMethod, +'api' + api);
      // console.log('vm.due_date: ' + vm.due_date);
      // console.log('vm.tempCoupon: ' + vm.tempCoupon);
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(respons => {
        // console.log(response);
        // console.log(response, vm.tempCoupon);
        if (response.data.sucess) {
          $('#couponModal').modal('hide');
          vm.getCoupons();
          this.$store.dispatch('a_updateMessage', { message: '已更新優惠券', status: 'primary' });
        } else {
          $('#couponModal').modal('hide');
          // console.log('新增失敗');
          this.$store.dispatch('a_updateMessage', { message: '更新失敗', status: 'danger' });
        }
        vm.products = response.data.products;
      });
    },

    // 刪除優惠券
    delCoupon(id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${id}`;
      this.$http.delete(api).then(response => {
        // console.log(response.data);
        vm.isLoading = false;
        $('#delCouponModal').modal('hide');
        vm.getCoupons(); // 更新產品列表
        this.$store.dispatch('a_updateMessage', { message: '成功刪除優惠券', status: 'primary' });
      });
    },
  },

  created() {
    this.getCoupons();
  },

  components: {
    Pagination,
  },
};
</script>
