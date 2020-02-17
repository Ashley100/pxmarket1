import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/firebase-database";

export default {
  state: {
    categories: []
  },
  mutations: {
    loadCatList(state, payload) {
      state.categories.push(payload);
    }
  },
  actions: {
    async loadCategories({ commit }) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const data = await firebase
          .database()
          .ref("categories")
          .once("value");
        const categories = data.val();

        commit("loadCatList", categories);
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw new Error(error);
      }
    }
  },
  getters: {
    getCategories(state) {
      return state.categories;
    }
  }
};
