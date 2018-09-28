import Vue from "vue"
import Router from "vue-router"

import Home from "@/components/Home"
import AddCategory from "@/components/AddCategory"
import AddRecord from "@/components/AddRecord"


Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/plus",
      name: "AddRecord",
      component: AddRecord,
      props: { type: "income" }
    },
    {
      path: "/minus",
      name: "AddRecord",
      component: AddRecord,
      props: { type: "expense" }
    },
    {
      path: "/add-category",
      name: "AddCategory",
      component: AddCategory
    }
  ]
})
