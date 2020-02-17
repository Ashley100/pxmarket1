export default {
  state: {
    card: [],
    cardCount: 0
  },
  mutations: {
    updateCart(state, payload) {
      state.card.push(payload);
      if (payload) {
        if (payload.length) {
          state.cardCount = payload.length;
        }
      }
    },
    setCart(state, payload) {
      state.card = payload;
      if (payload) {
        if (payload.length) {
          state.cardCount = payload.length;
        }
      }
    }
  },
  actions: {
    saveUserCartStorage({ commit }, payload) {
      let cart_stringify;

      let locST = [];
      let getlocST = JSON.parse(localStorage.getItem("user-card"));
      if (getlocST) {
        locST.push(...getlocST);
      }
      locST.push(payload);

      cart_stringify = JSON.stringify(locST);

      try {
        localStorage.setItem("user-card", cart_stringify);
      } catch (error) {
        if (error == QUOTA_EXCEEDED_ERR) {
          console.log("Превышен лимит localStorage!");
        }
      }
      let pay = JSON.parse(localStorage.getItem("user-card"));

      commit("updateCart", pay);
    },
    loadUserCartStorage({ commit }) {
      let getlocST = JSON.parse(localStorage.getItem("user-card"));
      commit("setCart", getlocST);
    }
  },
  getters: {
    card(state) {
      return state.card;
    },
    cardCount(state) {
      return state.cardCount;
    }
  }
};
