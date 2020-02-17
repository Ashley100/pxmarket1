<template>
  <div class="main-card">
    <div class="container">
      <div class="title">Корзина</div>
      <div class="row" v-for="(item, i) in this.products" :key="i">
        <div class="item">
          <div class="left">
            <router-link tag="a" class="material-icons" v-bind:to="'/product/' + item.url">
              <img class="card-image_img" v-bind:src="item.img[0]" />
            </router-link>

            <!-- <a :href="'/product/'+item.url">
              <img :src="item.img[0]" alt />
            </a>-->
          </div>
          <div class="right">
            <div class="title">
              <div class="price">
                <span class="tag is-black">{{item.price.new}} pуб</span>
              </div>
              <div class="name">{{item.title}}</div>
            </div>
            <div class="description">{{item.colors}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drop: false,
      products: []
    };
  },
  mounted: function() {
    this.$store.dispatch("loadUserCartStorage").then(() => {
      let products = this.$store.getters.card;

      this.$store.dispatch("loadCartProducts", { id: products }).then(() => {
        this.products = this.$store.getters.product_list;

        console.log(this.products);
        // for (var value of this.$store.getters.product_list) {
        //   if (value.url == el) {
        //     this.product = value;
        //   }
        // }
      });
    });
  },
  created() {}
};
</script>

<style scoped>
.row .item {
  display: flex;
}
.row .item .title {
  font-size: 1.2em;
  display: flex;
}
.row .item .left a {
  display: block;
  width: 100px;
  height: 100px;
}
.row .item .left a img {
  display: block;
  width: 100%;
}
/*  */
.row .item .right {
  display: flex;
  flex-direction: column;
}
.row .item .title .price {
  padding-right: 20px;
  color: #000;
}
</style>

