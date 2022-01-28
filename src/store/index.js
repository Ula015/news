import Vue from "vue";
import Vuex from "vuex";
import news from "./modules/news";
import locations from "./modules/locations";

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    news,
    locations,
  },
});

store.dispatch("initNews");

export default store;
