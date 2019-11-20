<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right pt-3">
      <button class="btn btn-primary mt-3 text-white" @click="openModal(true)">
        <i class="fa fa-plus" aria-hidden="true"></i> 建立產品
      </button>
    </div>
    <table class="table table-hover mt-4 bg-light shadow-sm rounded">
      <thead class="thead-dark">
        <tr>
          <th width="60">縮圖</th>
          <th width="120">分類</th>
          <th width="250">產品名稱</th>
          <th width="120" class="text-right">原價</th>
          <th width="120" class="text-right">售價</th>
          <th width="120">是否啟用</th>
          <th width="120">編輯 / 刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>
            <img :src="item.imageUrl" width="50" alt />
          </td>
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">
              <i class="fa fa-check" aria-hidden="true"></i> 已啟用
            </span>
            <span class="text-danger" v-if="!item.is_enabled">
              <i class="fa fa-times" aria-hidden="true"></i> 未啟用
            </span>
          </td>
          <td>
            <div class="btn-group" role="group">
              <button class="btn btn-outline-dark btn-sm" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openModal(false, item, true)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Pagination -->
    <Pagination :pagination="pagination" @gopage="getProducts"></Pagination>

    <!-- Product Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>產品資訊</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fa fa-spinner fa-spin fa-fw" v-if="status.fileUploading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img img class="img-fluid" :src="tempProduct.imageUrl" alt />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <label for="content">商品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入商品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="description">商品規格</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入商品規格"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-secondary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delProductModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delProduct(tempProduct.id)">
              <i class="fa fa-trash-o fa-lg"></i> 確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'; // 引入 jQuery $
import Pagination from '@/components/Pagination';

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
      pagination: {},
    };
  },

  methods: {
    // 取得產品列表
    getProducts(page = 1) {
      // 使用 ES6 預設參數語法，如果沒有帶數值就帶入 1
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        // console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },

    // 判斷開啟 Modal
    openModal(isNew, item, isDel) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
        $('#productModal').modal('show');
      } else if (!isNew && isDel) {
        this.tempProduct = Object.assign({}, item); // 將item 值寫到空物件，並避免與 tempProduct 有參考特性。
        $('#delProductModal').modal('show');
      } else {
        this.tempProduct = Object.assign({}, item); // 將item 值寫到空物件，並避免與 tempProduct 有參考特性。
        this.isNew = false;
        $('#productModal').modal('show');
      }
    },

    // 更新 Products 產品列表
    updateProduct() {
      const vm = this;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        // console.log(response.data);
        if (response.data.success) {
          $('#productModal').modal('hide'); // 關閉模版
          vm.getProducts(); // 更新產品列表
          vm.$bus.$emit('message:push', '已更新產品', 'success'); // 使用emit傳出顯示訊息至外層
        } else {
          vm.$bus.$emit('message:push', '新增失敗', 'danger');
          $('#productModal').modal('hide');
          console.log('更新失敗');
        }
        // vm.products = response.data.products;
      });
    },

    // 刪除商品
    delProduct(id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${id}`;
      this.$http.delete(api).then(response => {
        // console.log(response.data);
        vm.isLoading = false;
        $('#delProductModal').modal('hide');
        vm.getProducts(); // 更新產品列表
        vm.$bus.$emit('message:push', '刪除成功', 'danger');
      });
    },

    // 上傳照片
    uploadFile() {
      // console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http
        .post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          // console.log(response.data);
          vm.status.fileUploading = false;
          if (response.data.success) {
            // vm.tempProduct.imageUrl = response.data.imageUrl;
            // 因為 imageUrl 沒有包含 getter 和 setter
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
            // 使用 set() 方式強制寫入
            vm.$bus.$emit('message:push', '上傳成功', 'success');
          } else {
            vm.$bus.$emit('message:push', response.data.message, 'danger');
          }
        });
    },
  },

  created() {
    const vm = this;
    vm.getProducts();
  },

  components: {
    Pagination,
  },
};
</script>
