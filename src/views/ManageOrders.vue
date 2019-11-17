<template>
  <div>
    <Loading :active.sync="isLoading" />
    <table class="table table-hover mt-4 bg-light shadow-sm rounded">
      <thead class="thead-dark">
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>訂單內容</th>
          <th>訂單編號</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orders" :key="key" v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ item.create_at | date }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ item.id }}</td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td class="text-center">
            <strong v-if="item.is_paid" class="text-success"><i class="fa fa-check" aria-hidden="true"></i></strong>
            <span v-else class="text-danger"><i class="fa fa-times" aria-hidden="true"></i></span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-secondary" @click="openModal(item)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <Pagination :pagination="pagination" @gopage="getOrders"></Pagination>

    <BacktopBtn />

    <!-- Order Modal -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>訂單資訊</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="order_id">訂單編號</label>
                  <input type="text" class="form-control" id="order_id" v-model="tempOrder.id" disabled />
                </div>
                <div class="form-group">
                  <label for="create_at">建立日期</label>
                  <input type="text" class="form-control" id="create_at" v-model="tempOrder.create_at" disabled />
                </div>
                <div class="form-group">
                  <label for="create_at">付款日期</label>
                  <input type="text" class="form-control" id="create_at" v-model="tempOrder.paid_date" disabled />
                </div>
                <div class="form-group form-check">
                  <input class="form-check-input" type="checkbox" value="" id="is_paid" v-model="tempOrder.is_paid" />
                  <label class="form-check-label" for="is_paid">
                    是否付款
                  </label>
                </div>
              </div>
              <div class="col-md-8">
                <!-- User Info -->
                <div class="form-group">
                  <label for="useremail">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.has('email') }"
                    name="email"
                    id="useremail"
                    v-model="tempOrder.user.email"
                    v-validate="'required|email'"
                    placeholder="請輸入 Email"
                  />
                  <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
                </div>

                <div class="form-group">
                  <label for="username">收件人姓名</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.has('name') }"
                    name="name"
                    id="username"
                    v-model="tempOrder.user.name"
                    v-validate="'required'"
                    placeholder="輸入姓名"
                  />
                  <span class="text-danger" v-if="errors.has('name')">姓名欄位不得留空</span>
                </div>

                <div class="form-group">
                  <label for="usertel">收件人電話</label>
                  <input
                    type="tel"
                    class="form-control"
                    :class="{ 'is-invalid': errors.has('tel') }"
                    name="tel"
                    id="usertel"
                    v-model="tempOrder.user.tel"
                    v-validate="'required'"
                    placeholder="請輸入電話"
                  />
                  <span class="text-danger" v-if="errors.has('tel')">電話欄位不得留空</span>
                </div>

                <div class="form-group">
                  <label for="useraddress">收件人地址</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.has('address') }"
                    name="address"
                    id="useraddress"
                    v-model="tempOrder.user.address"
                    v-validate="'required'"
                    placeholder="請輸入地址"
                  />
                  <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-secondary" @click="editOrder">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination';
import BacktopBtn from '@/components/BacktopBtn';
import Alert from '@/components/AlertMessage';

export default {
  data() {
    return {
      orders: [],
      tempOrder: {
        products: [],
        user: {},
      },
      isLoading: false,
      pagination: {},
    };
  },

  methods: {
    openModal(item) {
      this.tempOrder = Object.assign({}, item); // 將item 值寫到空物件，並避免與 tempOrder 有參考特性。
      $('#orderModal').modal('show');
      // console.log(this.tempOrder);
    },
    getOrders(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        // console.log(response.data);
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
    editOrder() {
      const vm = this;
      const id = vm.tempOrder.id;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${id}`;
      vm.isLoading = true;
      this.$http.put(api, { data: vm.tempOrder }).then(response => {
        // console.log(response.data);
        vm.isLoading = false;
        if (response.data.success) {
          vm.$bus.$emit('message:push', '已更新訂單', 'success');
          $('#orderModal').modal('hide');
          vm.getOrders();
        } else {
          vm.$bus.$emit('message:push', '找不到訂單', 'danger');
        }
      });
    },
  },
  created() {
    const vm = this;
    vm.getOrders();
  },
  components: {
    Pagination,
    BacktopBtn,
    Alert,
  },
};
</script>
