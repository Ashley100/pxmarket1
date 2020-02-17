<template>
  <div class="main-nav">
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link exact to="/" tag="a" class="navbar-item">
            <img src="../../../src/assets/images/logo/logo.png" width="112" height="28" />
          </router-link>

          <!-- <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
          </a>-->

          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <!--is-active-->
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <router-link exact to="/" tag="a" class="navbar-item">Главная</router-link>
            <router-link exact to="/market" tag="a" class="navbar-item">Магазин</router-link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <router-link
                  exact
                  to="/admin"
                  v-show="isUserAdmin"
                  tag="a"
                  class="button is-rounded"
                >
                  <i class="material-icons">settings</i>
                </router-link>

                <router-link
                  exact
                  to="/card"
                  v-show="isUserLoged"
                  tag="a"
                  class="button is-rounded"
                >
                  <i class="material-icons">shopping_basket</i>
                  <div class="cart-count" v-if="this.cartCount !== 0">{{this.cartCount}}</div>
                </router-link>
                <router-link
                  exact
                  to="/login"
                  v-show="!isUserLoged"
                  tag="a"
                  class="button is-rounded"
                >
                  <i class="material-icons">person_pin</i>
                </router-link>
                <a v-show="isUserLoged" class="button is-rounded">
                  <i class="material-icons" @click="logoutUser">exit_to_app</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: ["~src/assets/images/logo/logo.png"],
      cartCount: 0
    };
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logoutUser");
      // this.$router.push('/')
      location.reload();
    }
  },
  computed: {
    isUserLoged() {
      if (this.$store.getters.user == null) {
        return false;
      } else if (this.$store.getters.user) {
        return true;
      } else {
        return true;
      }
    },
    isUserAdmin() {
      if (this.$store.getters.user == null) {
        return false;
      } else {
        if (this.$store.getters.user.admin == true) {
          return true;
        } else {
          return false;
        }
      }
      // ==
    },
    updateCartCount() {
      // this.$store.dispatch("loadUserCartStorage").then(() => {
      return this.$store.getters.cardCount;
      // });
    }
  },
  mounted() {
    this.$store.dispatch("loadUserCartStorage").then(() => {
      this.cartCount = this.$store.getters.cardCount;
    });
  },
  watch: {
    updateCartCount(newCount, oldCount) {
      console.log(newCount, oldCount);
      this.cartCount = this.$store.getters.cardCount;
    }
  }
};
</script>

<style scoped>
.navbar {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.main-nav {
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;*/
  z-index: 10;
}

.user-btn_dropdown {
  display: block;
  width: 151.016px;
  left: 405px;
  top: 843.656px;
  height: 150px;
  transform-origin: 0px 0px;
  opacity: 1;
  transform: scaleX(1) scaleY(1);
}

.navbar-item img {
  max-height: 100%;
}

.cart-count {
  display: block;
  padding: 6px;
  background: #000;
  color: #fff;
  line-height: 10px;
  font-size: 0.8em;
  position: absolute;
  margin-top: 29px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
