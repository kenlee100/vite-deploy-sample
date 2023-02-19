<template>
  <div class="bg-light p-4 my-4">
    <div v-if="!cartList.carts.length">購物車沒有任何品項</div>
    <table v-else class="table align-middle">
      <tbody>
        <tr v-for="item in cartList.carts" :key="item.id">
          <td width="100">
            <a
              href="#"
              class="text-dark"
              @click.prevent="removeCartItem(item.id)"
              ><i class="fas fa-times">remove</i></a
            >
          </td>
          <td width="100">
            <img :src="item.product.imageUrl" class="table-image" alt="" />
          </td>
          <td>{{ item.product.title }}</td>
          <td width="200">
            <!-- 這裡是在computed 把資料取出來 ，並沒有要做寫入，用v-model 並不適合。影片中老師使用:value ，在按加入購物車時，可讓select內的數量增加 -->
            <!-- @change="(e)=> ，這裡的(e)=>是取 e 事件用"-->
            <select
              name=""
              id=""
              class="form-select"
              :value="item.qty"
              @change="(e) => setCartQty(item.id, e)"
            >
              <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
            </select>
          </td>
          <td width="200" class="text-end">$ {{ item.subtotal }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-end">總金額 NT$ {{ cartList.total }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import cartStore from "../stores/cartStore.js";
export default {
  computed: {
    ...mapState(cartStore, ["cartList"]),
  },
  methods: {
    ...mapActions(cartStore, ["removeCartItem", "setCartQty"]),
  },
};
</script>
