<template>
  <div id="app">
    <MainNav /> 

    <router-view></router-view>
  
  
  
  
  
  
  <!-- Error Block -->
  <template v-if="error" class="has-background-danger">
    <div class="error-block">
      <div class="container">
        <div class="collection" @click="closeError">
          <a  class="collection-item"><span class="badge">{{this.$store.getters.error}}</span>Ошибка</a>
        </div>
      </div>
    </div>
  </template>
  <!-- ----------- -->
  
  <template v-if="loading">
    <div class="loading-block-top">
      <progress class="progress is-small is-primary" max="100">15%</progress>
    </div>
  </template>

  <!-- Loading Block -->
  
  <!-- ----------- -->
  
  </div>
  
</template>

<script>
import MainNav from './components/navigation/nav' 

export default {
  name: 'app',
  data() {
    return {
      
    }
  },
  components: {
    MainNav
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    },
    // 
    isUserAdmin () { 
        if(this.$store.getters.user == null || this.$store.getters.user.id == null) {
          return false
        }
        else if(this.$store.getters.user) {
          return true
        }
        else{
          return true
        }
      }
  },
  methods: {
    closeError () {
      return this.$store.dispatch('clearError');
    }
  }
}

</script>

<style scoped>
.error-block { position: absolute; bottom: 0px; margin-bottom: 10px; left: 0; right: 0; }
.error-block .container { display: flex; justify-content: center; }
.error-block .container .collection { max-width: 700px; }

/*  */
.loading-block { 
  position: fixed; 
  display: flex; 
  justify-content: center;
  align-items: center;
  transition: 4.5s ease-out;
  z-index: 999; 
  width: 100%; 
  height: 100%; 
  top: 0; 
  background: #3fbfae70 ; 
}
.loading-block-top {
  position: fixed;
  transition: 4.5s ease-out;
  z-index: 999; 
  width: 100%;
  top: 0; 
}
.loading-block-top .progress {
  margin: 0px;
}
.loading-block-top .progress.is-small {
  height: 0.2em;
}
</style>
