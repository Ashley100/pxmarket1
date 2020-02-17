import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/firebase-database";

class Products {
  constructor(
    title,
    id = null,
    url = "",
    img = "",
    description,
    price,
    size,
    colors,
    material,
    currentCategory
  ) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.img = img;
    this.description = description;
    this.price = price;
    this.size = size;
    this.colors = colors;
    this.material = material;
    this.currentCategory = currentCategory;
  }
}

export default {
  state: { products: [] },
  mutations: {
    loadProductList(state, payload) {
      state.products = payload;
    }
  },
  actions: {
    async loadProductsByCategory({ commit }, category) {
      commit("clearError");
      commit("setLoading", true);

      const resultProducts = [];

      try {
        const data = await firebase
          .database()
          .ref("products")
          .once("value");
        const products = data.val();
        // console.log(products);
        Object.keys(products).forEach(key => {
          const prod = products[key];
          console.log("category.id = " + category.id);
          if (prod.currentCategory.id === category.id)
            resultProducts.push(
              new Products(
                prod.title,
                key,
                prod.url,
                prod.img,
                prod.description,
                prod.price,
                prod.size,
                prod.colors,
                prod.material,
                prod.currentCategory
              )
            );
        });
        console.log(resultProducts);
        commit("loadProductList", resultProducts);
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw new Error(error);
      }
    }
  },
  getters: {
    productsInCategory(state) {
      return state.products;
    }
  }
};
