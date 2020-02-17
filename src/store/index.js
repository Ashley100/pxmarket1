import Vue from "vue";
import Vuex from "vuex";

import products from "./products";
import card from "./card";
import user from "./user";
import product_list from "./product-list";
import shared from "./shared";
import admin_categories from "./admin/categiries";
import productByCategory from "./product-byCategory";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    card,
    user,
    shared,
    product_list,
    productByCategory,
    admin_categories
  }
});
