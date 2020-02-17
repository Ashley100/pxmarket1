<template>
  <div class="mine-market">
    <div class="container">
      <!-- <h1 class="title">Market</h1> -->
      <div class="columns">
        <div class="tabs px-tabs">
          <ul>
            <!-- <li class="is-active">
                <a>Pictures</a>
            </li>-->
            <li v-for="(cat, i) in this.categories" :key="i">
              <a @click="clickedCategory(cat)">{{cat.name}}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="columns is-multiline">
        <!--  -->
        <div class="card column is-3" v-for="(product, index) in product_list" v-bind:key="index">
          <div class="card-image">
            <router-link tag="i" class="material-icons" v-bind:to="'/product/' + product.url">
              <img class="card-image_img" v-bind:src="product.img[0]" />
            </router-link>
            <!-- </figure> -->
          </div>
          <div class="card-content">
            <div class="content">
              <h5 class="subtitle is-5">{{product.title}}</h5>
            </div>
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-gray is-large">{{product.price.new}} руб</span>
                <router-link
                  tag="span"
                  class="tag is-info is-large px-btn-buy"
                  v-bind:to="'/product/' + product.url"
                >Купить</router-link>
                <!-- <span class="tag is-info is-large px-btn-buy">Купить</span> -->
              </div>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      products: this.$store.getters.products,
      product_list: (this.product_list = this.$store.getters.product_list),
      categories: []
    };
  },
  beforeMount() {
    console.log(this.$route);
  },
  mounted: function() {
    // Start load categoryes
    this.$store.dispatch("loadCategories").then(() => {
      this.categories = this.$store.getters.getCategories[0];
      loadCatsByQuery(this);
    });

    let q = this.$route.params.id || null;
    function loadCatsByQuery(that) {
      console.log(q);
      let currentCat = "";
      console.log("categories = ", that.categories);
      for (let cat in that.categories) {
        if (that.categories[cat].id === q) {
          currentCat = that.categories[cat];
        }
      }
      that.$store
        .dispatch("loadProductsByCategory", { id: currentCat.id })
        .then(() => {
          that.productsByCategory = that.$store.getters.productsInCategory;
          that.product_list = that.productsByCategory;
        });
    }
    // End
    if (!q || q === null || q === undefined) {
      this.$store.dispatch("loadProducts").then(() => {
        this.product_list = this.$store.getters.product_list;
      });
    }
  },
  created() {
    //
  },
  methods: {
    clickedCategory(e) {
      this.$store.dispatch("loadProductsByCategory", { id: e.id }).then(() => {
        this.productsByCategory = this.$store.getters.productsInCategory;
        this.product_list = this.productsByCategory;
        // this.$router.push({ path: "market", query: { gategory: e.id } });
        this.$router.push({ path: `/market/${e.id}` });
      });
      // console.log(this.productsByCategory);
    }
  }
};
</script>

<style scoped>
.columns {
  margin: 0px;
}
.card-content {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.card-image,
.px-btn-buy {
  cursor: pointer;
}
.px-tabs {
  padding: 15px 0;
  width: 100%;
}
.px-tabs ul,
.px-tabs ul a {
  border-bottom: none;
}
</style>
