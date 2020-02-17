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
class createProduct {
  constructor(
    title,
    url = "",
    img = [],
    description,
    price,
    size,
    colors,
    material,
    currentCategory
  ) {
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
  state: {
    product_list: []
  },
  mutations: {
    // Set User state
    setProductList(state, payload) {
      state.product_list.push(payload);
    },
    loadProductList(state, payload) {
      state.product_list = payload;
    }
  },
  actions: {
    // Async
    // Load Product
    async loadProducts({ commit }) {
      commit("clearError");
      commit("setLoading", true);

      const resultProducts = [];

      try {
        const data = await firebase
          .database()
          .ref("products")
          .once("value");
        const products = data.val();

        Object.keys(products).forEach(key => {
          const prod = products[key];
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

        commit("loadProductList", resultProducts);
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw new Error(error);
      }
    },
    



    
  /**
   * Load one Product from FireBase
   * @param {commit} function
   * @param {ids} array
   */
    async loadProduct({ commit }, id) {
      console.log(id);
      commit("clearError");
      commit("setLoading", true);

      const resultProducts = [];

      try {
        // =============
        const data = await firebase
          .database()
          .ref("products")
          .orderByChild("url")
          .equalTo(id.id)
          .once("value");
        console.log(data.val());
        // =============
        // const data = await firebase
        //   .database()
        //   .ref("products")
        //   .once("value");
        const products = data.val();

        Object.keys(products).forEach(key => {
          const prod = products[key];
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

        commit("loadProductList", resultProducts);
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw new Error(error);
      }
    },




    /**
     * Load All Products from fire Base
     * @param {commit} function
     * @param {ids} array
     */
    async loadCartProducts({ commit }, ids) {
      console.log("loadCartProducts ids = ", ids);
      commit("clearError");
      commit("setLoading", true);

      const resultProducts = [];

      try {
        // =============
        const data = await firebase
          .database()
          .ref("products")
          .once("value");
        // console.log("loadCartProducts data.value() = ", data.val());
        const products = data.val();

        Object.keys(products).forEach(key => {
          const prod = products[key];

          if (ids.id.includes(prod.url)) {
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
          }
        });

        console.log("resultProducts = ", resultProducts);
        commit("loadProductList", resultProducts);
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw new Error(error);
      }
    },




  /**
   * Create product in FireBase
   * @param {commit} function
   * @param {ids} array
   */
    async createProduct({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);

      const images = payload.images;

      /* eslint-disable no-console */
      console.log('Массив с фотками');
      console.log(images);
      /* eslint-disable no-console */
      try {
        // ============================================================================
        /* eslint-disable no-console */
        // console.log("payload-cat ", payload.category);
        /* eslint-disable no-console */

        const newProduct = new createProduct(
          payload.title,
          payload.url,
          ["asd"], //payload.img,
          payload.description,
          payload.price,
          payload.size,
          payload.colors,
          payload.material,
          payload.currentCategory
        );
        //Create Product in DataBase
        const data = await firebase
          .database()
          .ref("products")
          .push(newProduct); //object
        // ============================================================================

        // ============================================================================
        // Img Extention (.png / .jpg / ...)
        const imageExt = [];
        for (let index = 0; index < images.length; index++) {
          const element = images[index].name.slice(
            images[index].name.lastIndexOf(".")
          );
          imageExt.push(element);
          /* eslint-disable no-console */
          // console.log("============== element =============");
          // console.log(element);
          // console.log("============== element =============");
          // console.log("============== imageExt =============");
          // console.log(imageExt[index]);
          // console.log("============== imageExt =============");
          /* eslint-disable no-console */
        }
        /* eslint-disable no-console */

        // console.log("============== images =============");
        // console.log(images);
        // console.log("============== images =============");
        /* eslint-disable no-console */
        // ============================================================================

        // ============================================================================
        // Put on 'product' derictory image like : products/-XasdAS2A34aas.jpg
        const promises = [];
        let imagesCount = 0;
        let imagesLinks = [];
        images.forEach(image => {
          const uploadTask = firebase
            .storage()
            .ref(`products/${data.key}/${imagesCount}${imageExt[imagesCount]}`)
            .put(image);
          imagesCount++;
          promises.push(uploadTask);

          uploadTask.on(
            "state_changed",
            snapshot => {
              // next
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Прогресс", progress);
            },
            error => {
              // error
              console.log(error);
            },
            () => {
              // complete
              uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                // console.log(downloadURL)
                imagesLinks.push(downloadURL);
                firebase
                  .database()
                  .ref("products")
                  .child(data.key)
                  .update({
                    img: imagesLinks
                  });
              });
            }
          );
        });

        Promise.all(promises).then(tasks => {
          console.log("all uploads complete");

          commit("setLoading", false);
        });
        // ============================================================================
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    }
  },
  getters: {
    /**
     * Get Product State(data)
     * @param {object} state 
     */
    product_list(state) {
      return state.product_list;
    }
  }
};
