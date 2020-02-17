<template>
  <div class="main-product">
    <div class="container">
      <div class="columns">
        <div class="column is-full" style="padding: 1.75rem;"></div>
      </div>
      <!-- <h1 class="title">{{product.title}}</h1> -->

      <a>
        <i @click="goBack" class="material-icons">arrow_back</i>
      </a>

      <div class="columns">
        <!--  -->
        <div class="column is-half">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(img, index) in product.img" :key="index">
              <!-- <img class="responsive-img" :src="product.img[index]">  -->
              <img :src="product.img[index]" />
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <!--  -->
        <div class="column is-half">
          <!--  -->
          <h1 class="title">{{product.title}}</h1>
          <span class="tag is-rounded">ID товара: {{product.url}}</span>
          <br />
          <!--  -->
          <div class="columns is-mobile is-multiline px-price">
            <div class="column is-3">
              <p>
                {{product.price.new}} лей
                <s>{{product.price.old}}</s>
              </p>
            </div>
            <div class="column">
              <a class="button is-warning" @click="addToCart">В корзину</a>
            </div>
          </div>
          <!--  -->
          <br />
          <hr />
          <div class="product-features">
            <!--  -->
            <div class="columns is-mobile is-multiline">
              <div class="column is-3">
                <p>Цвет</p>
              </div>
              <div class="column">
                <span
                  v-for="(color, index) in product.colors"
                  :key="index"
                  class="tag px-colors"
                  :class=" 'is-' + product.colors[index]"
                >{{product.colors[index]}}</span>
              </div>
            </div>
            <!--  -->
            <div class="columns is-mobile is-multiline">
              <div class="column is-3">
                <p>Размер</p>
              </div>
              <div class="column">
                <span
                  v-for="(siz, index) in product.size"
                  :key="index"
                  class="tag is-medium px-colors animated fadeIn"
                >{{siz}}</span>
              </div>
            </div>
            <!--  -->
            <div class="columns is-mobile is-multiline">
              <div class="column is-3">
                <p>Материал</p>
              </div>
              <div class="column">
                <span
                  class="tag is-dark"
                  style="margin-right: 3px;"
                  v-for="(material, index) in product.material"
                  :key="index"
                >{{product.material[index]}}</span>
              </div>
            </div>
            <!--  -->
            <div class="container">
              <div class="notification">{{product.description}}</div>
            </div>
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!-- "columns" -->
      <!--  -->
    </div>
    <!-- "container" -->
    <!--  -->
  </div>
</template>

<script>
import "bulma/css/bulma.css";

// Slider vue-awesome-swiper
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      id: this.$route.params["id"],
      product: [],
      // Slider
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  methods: {
    goBack() {
      this.$router.push("/market");
    },
    addToCart() {
      this.$store.dispatch("saveUserCartStorage", this.product.url);
    }
  },
  mounted: function() {
    this.$nextTick(function() {});
    //
    this.$store.dispatch("loadUserCartStorage").then(() => {});
    //

    this.$store.dispatch("loadProduct", { id: this.id }).then(() => {
      this.product = this.$store.getters.product_list;
      // console.log(this.product);

      for (var value of this.$store.getters.product_list) {
        if (value.url == this.id) {
          this.product = value;
        }
      }
    });
  },
  created() {
    // for (var value of this.$store.getters.product_list) {
    //   if (value.url == this.id) {
    //     this.product = value;
    //   }
    // }
    /* eslint-disable no-console */
    // console.log(this.product);
    /* eslint-disable no-console */
  },

  components: {
    swiper,
    swiperSlide
  }
};
</script>


<style scoped>
h4 {
  margin: 0px;
}

.px-price {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
}

.px-colors {
  margin-right: 5px;
}
/* Colors */
.is-black {
  background-color: #0a0a0a;
  color: #fff;
}
.is-dark {
  background-color: #363636;
  color: #fff;
}

.is-light {
  background-color: #f5f5f5;
  color: #0a0a0a;
}
.is-white {
  background-color: #fff;
  color: #0a0a0a;
}

.is-lightgreen {
  background-color: #d7ffce;
  color: #0a0a0a;
}
.is-green {
  background-color: #3cdf4b;
  color: #fff;
}
.is-palegreen {
  background-color: #4feb5d;
  color: #fff;
}
.is-forestgreen {
  background-color: #2b9b35;
  color: #fff;
}

.is-gold {
  background-color: #e4c100;
  color: #0a0a0a;
}
.is-yellow {
  background-color: #f6df38;
  color: #0a0a0a;
}
.is-orange {
  background-color: #ff9c16;
  color: #fff;
}

.is-lightred {
  background-color: #ffcece;
  color: #0a0a0a;
}
.is-coral {
  background-color: #ff6060;
  color: #fff;
}
.is-red {
  background-color: #ff5048;
  color: #fff;
}
.is-carmine {
  background-color: #da352d;
  color: #fff;
}
.is-maroon {
  background-color: #ad2620;
  color: #fff;
}

.is-blue {
  background-color: #5aaaff;
  color: #fff;
}
.is-skyblue {
  background-color: #5ac8ff;
  color: #fff;
}
.is-ultramarine {
  background-color: #3b50ff;
  color: #fff;
}
</style>

