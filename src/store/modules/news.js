import Vue from "vue";
import { topHeadlines, everything } from "@/modules/news";

const locations = {
  namespaced: true,
  state: {
    news: {},
    country: "us",
    category: "business",
    searchText: null,
  },
  getters: {
    newsList: ({ news }) => news,
    getCountry: ({ country }) => country,
    getCategory: ({ category }) => category,
    getSearchText: ({ searchText }) => searchText,
    /*
      Object.keys(news)
          .slice(from, to)
          .reduce((result, key) => {
            result[key] = news[key];

            return result;
      }, {})
    */
  },

  mutations: {
    NEWS_LIST(state, news) {
      state.news = news;
    },

    ADD_NEWS(state, item) {
      Vue.set(state.news, item.id, item);
    },

    DELETE_ITEM(state, id) {
      Vue.delete(state.news, id);
    },

    SET_ITEM(state, values) {
      console.log("values=>", values);
      Object.keys(state.news).filter((item) => {
        if (item === values.id) {
          state.news[item].author = values.author;
          state.news[item].content = values.content;
          state.news[item].description = values.description;
          state.news[item].source.name = values.source;
          state.news[item].title = values.title;
        }
      });
    },
    SET_COUNTRY(state, country) {
      state.country = country;
    },
    SET_CATEGORY(state, category) {
      state.category = category;
    },
    SET_SEARCH_TEXT(state, searchText) {
      state.searchText = searchText;
    },
  },

  actions: {
    initNews: {
      handler({ dispatch }) {
        dispatch("fetchNews");
      },
      root: true,
    },

    async fetchNews({ commit, getters }) {
      try {
        if (!getters.getSearchText) {
          const news = await topHeadlines(
            getters.getCountry,
            getters.getCategory
          );
          const news2 = Object.values(news).reduce((acc, item) => {
            const newItem = { ...item, id: String(Math.random()) };
            acc[newItem.id] = newItem;
            return acc;
          }, {});
          commit("NEWS_LIST", news2);
        } else {
          const news = await everything(getters.getSearchText);
          const news2 = Object.values(news).reduce((acc, item) => {
            const newItem = { ...item, id: String(Math.random()) };
            acc[newItem.id] = newItem;
            return acc;
          }, {});
          commit("NEWS_LIST", news2);
        }
      } catch (err) {
        // TODO: This is where I have to handle the error.
        console.log(err);
        Promise.reject(err); // returning promise status
      }
    },

    addNews({ commit }, item) {
      const newObj = {
        ...item,
        id: String(Math.random()),
        url: "someUrl",
        urlToImage: `${process.env.VUE_APP_RANDOM_IMAGE_URL}`,
      };
      commit("ADD_NEWS", newObj);
      Vue.notify({
        text: "News added",
        type: "success",
        speed: 1000,
      });
    },

    deleteItemFromList({ commit }, id) {
      commit("DELETE_ITEM", id);
    },

    setItem({ commit }, itemValues) {
      commit("SET_ITEM", itemValues);
      Vue.notify({
        text: "News edited",
        type: "success",
        speed: 1000,
      });
    },
    setCountry({ commit }, country) {
      commit("SET_COUNTRY", country);
    },
    setCategory({ commit }, category) {
      commit("SET_CATEGORY", category);
    },
    setSearchText({ commit }, searchText) {
      commit("SET_SEARCH_TEXT", searchText);
    },
  },
};

export default locations;
