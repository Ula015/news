import axios from "../plugins/axios/signUp/index";
/**
 * Function getUser. Makes a request to API to receive countries and cities list.
 * @param {String} index
 */
class CitiesApi {
  async countries() {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_SIGN_UP_URL}/location/get-countries`
      );
      return response;
    } catch (err) {
      console.log(err);
      Promise.reject(err);
    }
  }

  async cities(index) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_SIGN_UP_URL}/location/get-cities/${index}`
      );
      return response;
    } catch (err) {
      console.log(err);
      Promise.reject(err);
    }
  }
}

const apiCities = new CitiesApi();
export default apiCities;
