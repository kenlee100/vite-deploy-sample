<template>
  <div class="row row-cols-3 my-3 g-3">
    {{ mapState }}
    <div class="col" v-for="item in sortProducts" :key="item.id">
      <div class="card">
        <img :src="item.imageUrl" class="card-img-top" :alt="item.title" />
        <div class="card-body">
          <h6 class="card-title">
            {{ item.title }}
            <span class="float-end">$ {{ item.price }}</span>
          </h6>
          <a
            href="#"
            class="btn btn-outline-primary w-100"
            @click.prevent="addToCart(item.id)"
            >加入購物車</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import productsStore from "../stores/productsStore.js";
import cartStore from "../stores/cartStore.js";
import { mapState, mapActions } from "pinia";
export default {
  computed: {
    ...mapState(productsStore, ["sortProducts"]),
  },
  methods: {
    ...mapActions(cartStore, ["addToCart"]),
  },
};
</script>
