import axios from "../plugins/axios/signUp/index";
import Vue from "vue";
/**
 * Function signUp. Make signUp request to API
 * @param {String} email
 * @param {String} password
 * @param {String} nickname
 * @param {String} first_name
 * @param {String} last_name
 * @param {String} phone
 * @param {String} gender_orientation
 * @param {String} city
 * @param {String} country
 * @param {Number} date_of_birth_day
 * @param {Number} date_of_birth_month
 * @param {Number} date_of_birth_year
 */
export async function signUp(
  email,
  password,
  nickname,
  first_name,
  last_name,
  phone,
  gender_orientation,
  city,
  country,
  date_of_birth_day,
  date_of_birth_month,
  date_of_birth_year
) {
  try {
    const response = await axios.post(
      `/auth/signup`,
      JSON.stringify({
        email,
        password,
        nickname,
        first_name,
        last_name,
        phone,
        gender_orientation,
        city,
        country,
        date_of_birth_day,
        date_of_birth_month,
        date_of_birth_year,
      }),
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    Vue.notify({
      title: "You are registered!",
      text: "Please sign-in",
      type: "success",
      speed: 2000,
    });
    return response.data;
  } catch (error) {
    // TODO: This is where I have to handle the error.
    console.log(error);
    return Promise.reject(error); // returning promise status.
  }
}
