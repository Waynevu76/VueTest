import Vue from "vue";
import VueRouter from "vue-router";
import SurveyList from "../views/SurveyList.vue";
import Survey from "../views/Survey.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "SurveyList",
    component: SurveyList,
  },
  {
    path: "/:id",
    name: "Survey",
    component: Survey,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
