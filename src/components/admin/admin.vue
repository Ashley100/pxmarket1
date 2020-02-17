<template>
  <div id="admin">
    <div class="container">
      <h3 class="title is-3 animated fadeIn">Admin Panel</h3>

      <div class="columns is-multiline fix-margin-left">
        <aside class="menu">
          <ul class="menu-list">
            <li>
              <router-link
                tag="a"
                to="/admin/all-categories"
                class="px-a"
                @click.native="isActiveLink($event)"
              >
                <i class="material-icons">menu</i>
                Категории
              </router-link>
            </li>
            <li>
              <!-- <a  -->
              <router-link
                tag="a"
                to="/admin/add-product"
                class="px-a"
                @click.native="isActiveLink($event)"
              >
                <i class="material-icons">add</i>
                Добавить товар
              </router-link>
              <!-- </a> -->
            </li>
            <li>
              <router-link
                tag="a"
                exact
                to="/admin/all-products"
                class="px-a"
                @click.native="isActiveLink($event)"
              >
                <i class="material-icons">search</i>
                Все товары
              </router-link>
              <ul>
                <li>
                  <a class="px-a" @click="isActiveLink($event)">Рюкзаки</a>
                </li>
                <li>
                  <a class="px-a" @click="isActiveLink($event)">Сумки</a>
                </li>
                <li>
                  <a class="px-a" @click="isActiveLink($event)">Кашельки</a>
                </li>
              </ul>
            </li>
          </ul>
        </aside>

        <!-- Include an components -->

        <div class="column">
          <router-view></router-view>
        </div>

        <!--  -->
      </div>
      <!--  -->
    </div>
  </div>
</template>


<script>
export default {
  name: "admin",
  data() {
    return {
      isAdmin: false
    };
  },
  components: {},
  methods: {
    isActiveLink(event) {
      let menu_list = document.querySelectorAll(".menu li .px-a");

      if (event.target.classList.contains("is-active")) {
        return true;
      } else {
        for (let cild = 0; cild < menu_list.length; cild++) {
          if (menu_list[cild].classList.contains("is-active")) {
            menu_list[cild].classList.remove("is-active");
          }
        }
        /* eslint-disable no-console */
        // console.log(event.target.classList)
        /* eslint-disable no-console */
        event.target.classList.add("is-active");
        return false;
      }
    }
  }
};
</script>


<style scoped>
.menu {
  padding: 0.75rem;
  border-right: 2px solid #eee;
}
#admin .menu-list li a {
  display: flex;
}
.fix-margin-left {
  margin-left: 0px;
}
.px-a {
  align-items: center;
}
</style>

