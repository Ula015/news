import apiCities from "@/modules/location";
import { getField, updateField } from "vuex-map-fields";

const locations = {
  namespaced: true,
  state: {
    countries: null,
    cities: null,
    index: null,
    country: "",
    city: "",
  },
  getters: {
    getField,
    countriesList: ({ countries }) => countries,
    citiesList: ({ cities }) => cities,
    countryInput: ({ country }) => country,
    cityInput: ({ city }) => city,
    countryIndex: ({ index }) => index,
  },

  mutations: {
    updateField,
    COUNTRIES_LIST(state, countries) {
      state.countries = countries;
    },
    CITIES_LIST(state, cities) {
      state.cities = cities;
    },
    COUNTRY_INDEX(state, index) {
      state.index = index;
    },
  },

  actions: {
    initLocations: {
      handler({ dispatch }) {
        dispatch("fetchLocations");
      },
      root: true,
    },
    async fetchLocations({ commit }) {
      try {
        const response = await Promise.all([apiCities.countries()]);
        const [countries] = Object.values(response);
        const countries2 = Object.values(countries);
        commit("COUNTRIES_LIST", countries2);
      } catch (err) {
        // TODO: This is where I have to handle the error.
        console.log(err);
        Promise.reject(err); // returning promise status
      }
    },
    async fetchCities({ commit, getters }, countryName) {
      try {
        let index = Object.keys(getters.countriesList).find(
          (key) => getters.countriesList[key] === countryName
        );
        commit("COUNTRY_INDEX", index);
        const response = await Promise.all([apiCities.cities(++index)]);
        const [cities] = Object.values(response);
        commit("CITIES_LIST", cities);
      } catch (err) {
        console.log(err);
        Promise.reject(err);
      }
    },
  },
};

export default locations;
