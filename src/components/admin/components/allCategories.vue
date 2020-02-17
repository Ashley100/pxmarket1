<template>
  <div id="categories">
    <div class="container">
      <h3 class="title is-3 animated fadeIn">Все категории</h3>
      <!--  -->
      <div class="columns is-half px-column">
        <div class="column" v-for="(cat, index) in this.categories" :key="index">{{cat.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: []
    };
  },
  created: function() {},
  beforeCreate() {
    this.$store.dispatch("loadCategories").then(() => {
      this.categories = this.$store.getters.getCategories[0];
    });
  }
};
</script>

<style scoped>
.px-column {
  display: flex;
  flex-direction: column;
  /* border-right: 1px solid #ccc; */
  width: 300px;
}
.px-column .column {
  transition: 0.2s ease-in-out;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  border-radius: 30px;
}

.px-column .column:hover {
  background: #ccc;
}
</style>