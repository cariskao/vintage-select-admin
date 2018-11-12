<template>
  <div class="modal fade" id="orderMoadl" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>查看訂單</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="mx-4 modal-body">
          <div class="mx-4 my-4 row justify-content-center">
            <table class="table">
              <thead>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
              </thead>
              <tbody>
                <tr v-for="item in orderInfo.products" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">總計</td>
                  <td class="text-right">{{ orderInfo.total | currency }}</td>
                </tr>
              </tfoot>
            </table>

            <table class="table">
              <tbody>
                <tr>
                  <th width="100">Email</th>
                  <td>{{ orderInfo.user.email }}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{ orderInfo.user.name }}</td>
                </tr>
                <tr>
                  <th>收件人電話</th>
                  <td>{{ orderInfo.user.tel }}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{ orderInfo.user.address }}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <span v-if="!orderInfo.is_paid">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                  </td>
                </tr>
                <tr v-if="orderInfo.message">
                  <th>收件人留言</th>
                  <td>
                    <pre>{{ orderInfo.message }}</pre>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderInfo: {
      type: Object
    }
  }
}
</script>

<style>

</style>
