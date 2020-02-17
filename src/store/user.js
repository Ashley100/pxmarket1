import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/firebase-database"

// const fb = firebase.database();

// class User {
//     constructor (id, admin, email, name, card) {
//         this.id = id
//         this.admin = admin
//         this.email = email
//         this.name = name
//         this.card = card
//     }
// }

export default {
  state: {
    user: null
  },
  mutations: {
    // Set User state
    setUser(state, payload) {
      state.user = payload;
    },
    saveUserToLocalStorage(payload) {
      let user = {
          admin: payload.user.admin,
          email: payload.user.email,
          id: payload.user.id
        },
        user_stringify;

      user_stringify = JSON.stringify(user);

      try {
        localStorage.setItem("px-market-user", user_stringify);
      } catch (error) {
        if (error == QUOTA_EXCEEDED_ERR) {
          console.log("Превышен лимит localStorage!");
        }
      }
    }
  },
  actions: {
    // Async
    async registerUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const userList = firebase.database().ref("users"); // Получаем лист всех пользователей
        var newUserRef = userList.push(); // Создаём место для новой записи

        await firebase
          .database()
          .ref("users") // Поиск пользователей с данным email
          .orderByChild("email")
          .equalTo(email)
          .once("value")
          .then(snap => {
            snap = snap.val();
            if (snap) {
              commit("setError", "Данный Email занят другим пользователем!");
            } else {
              const user_object = {
                admin: false,
                email: email,
                password: password,
                id: newUserRef.key
              };
              newUserRef
                .set({ ...user_object })
                .then(() => {
                  commit("setUser", { ...user_object });
                  commit("saveUserToLocalStorage", { ...user_object });
                })
                .catch(() => {});

              // commit('setUser', snap)
              alert("Вы зарегистрированны");
            }
          })
          .catch(error => {
            commit("setError", error.message);
          });
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    // ===========================================
    async loginUser({ commit }, { email, password }) {
      try {
        await firebase
          .database()
          .ref("users") // Поиск пользователей с данным email
          .orderByChild("email")
          .equalTo(email)
          .once("value")
          .then(snap => {
            snap = snap.val();
            if (snap) {
              let snap_result = null;
              Object.keys(snap).forEach(function(key) {
                snap_result = snap[key];
                /* eslint-disable no-console */
                // console.log(snap_result)
                /* eslint-disable no-console */
              });
              if (password === snap_result.password) {
                commit("setUser", snap_result);
                commit("saveUserToLocalStorage", snap_result);
              } else {
                commit("setError", "Не верный пароль!");
              }

              /* eslint-disable no-console */
              // console.log(snap)
              /* eslint-disable no-console */
            } else {
              commit("setError", "Данный Email не зарегистрирован!");
            }
          })
          .catch(error => {
            commit("setError", error.message);
          });
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    // ==========================================
    async autoLoginUser({ commit }, { email, id }) {
      if (
        email == undefined ||
        email == null ||
        id == undefined ||
        id == null
      ) {
        /* eslint-disable no-console */ console.log("LocalStorage Пуст!");
        return; /* eslint-disable no-console */
      }
      try {
        await firebase
          .database()
          .ref("users") // Поиск пользователей с данным email
          .orderByChild("email")
          .equalTo(email)
          .once("value")
          .then(snap => {
            snap = snap.val();
            if (snap) {
              let snap_result = null;
              Object.keys(snap).forEach(function(key) {
                snap_result = snap[key];
              });
              /* eslint-disable no-console */
              // console.log(snap_result.id)
              // console.log(id)
              /* eslint-disable no-console */
              if (id === snap_result.id) {
                commit("setUser", snap_result);
                commit("saveUserToLocalStorage", snap_result);
              } else {
                commit("setError", "Не верный пароль!");
              }
            } else {
              commit("setError", "Данный Email не зарегистрирован!");
            }
          })
          .catch(error => {
            commit("setError", error.message);
          });
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    // ===========================================
    logoutUser() {
      localStorage.removeItem("px-market-user");
    }
  },
  getters: {
    // Get User state
    user(state) {
      return state.user;
    },
    user_info(state) {
      return state.user_info;
    }
  }
};
