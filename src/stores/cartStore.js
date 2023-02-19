import { defineStore } from "pinia";
import productsStore from "../stores/productsStore.js";
export default defineStore("cartStore", {
  state: () => ({
    cart: [],
  }),
  actions: {
    addToCart(productId, qty = 1) {
      // 取得已經有加入購物車的項目
      const currentCartItem = this.cart.find(
        (item) => item.productId === productId
      );
      //進行判斷，如果購物車有該項目則 +1，如果沒已則是新增一個購物車項目
      if (currentCartItem) {
        currentCartItem.qty += 1;
      } else {
        this.cart.push({
          // 加入購物車時的id
          id: new Date().getTime(),
          productId,
          qty,
        });
      }
    },
    removeCartItem(id) {
      // cart item id 與 傳入的id 一樣，就取得目前陣列索引
      const index = this.cart.findIndex((item) => item.id === id);
      // 帶入取得的索引，並刪除一個項目
      this.cart.splice(index, 1);
    },
    // 寫入數量
    // 外面 (e)=> 傳入e
    setCartQty(id, e) {
      const currentCartItem = this.cart.find((item) => item.id === id);
      // console.log(id, );
      currentCartItem.qty = e.target.value * 1; // 轉數值
    },
  },
  getters: {
    // 產品資訊已經存在productsStore
    cartList: ({ cart }) => {
      // 1. 購物車的品項資訊，需要整合產品資訊
      // 2. 必須計算小計的金額
      // 3. 必須提供總金額

      // 直接執行productsStore，然後透過展開將資料狀態取出來
      const { products } = productsStore();
      // console.log(products, cart);
      const carts = cart.map((item) => {
        // 單一產品資訊
        const product = products.find(
          (content) => content.id === item.productId
        );
        // console.log('product', product,item);
        return {
          ...item,
          product,
          subtotal: item.qty * product.price,
        };
      });
      const total = carts.reduce((acc, current) => {
        return acc + current.subtotal;
      }, 0);
      // console.log(carts, total);
      return {
        carts, // 列表
        total, // 總金額
      };
    },
  },
});
