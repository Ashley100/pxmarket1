import VueRouter from "vue-router";

// User
import Home from "../components/home";
import Product from "../components/product";
import Market from "../components/market";
import Card from "../components/card";
import Login from "../components/login";
import Registration from "../components/registration";
import Error404 from "../components/404";
// Admin
import Admin from "../components/admin/admin";
import addProduct from "../components/admin/components/addProduct";
import allProducts from "../components/admin/components/allProducts";
import allCategories from "../components/admin/components/allCategories";

export default new VueRouter({
  routes: [
    {
      path: "",
      component: Home
    },
    {
      path: "/market",
      component: Market,
      children: [
        {
          path: ":id",
          component: Market
        }
      ]
    },
    {
      path: "/product/:id",
      component: Product
    },
    {
      path: "/card",
      component: Card
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/registration",
      component: Registration
    },
    {
      path: "*",
      component: Error404
    },
    // Admin
    {
      path: "/admin",
      component: Admin,
      children: [
        {
          path: "add-product",
          component: addProduct
        },
        {
          path: "all-products",
          component: allProducts
        },
        {
          path: "all-categories",
          component: allCategories
        }
      ]
    }
  ],
  mode: "history"
});
