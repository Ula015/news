import axios from "../plugins/axios/signUp/index";
import Vue from "vue";
/**
 * Функция login деалет запрос на авторизацию.
 * @param {String} email
 * @param {String} password
 */
export async function login(email, password) {
  try {
    const response = await axios.post(
      `/auth/login`,
      JSON.stringify({ email, password })
    );
    //Success notification
    Vue.notify({
      text: "Data is correct!",
      type: "success",
      speed: 1000,
    });
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error); // returning promise status.
  }
}
