import axios from "../plugins/axios/signUp/index";
/**
 * Функция getUser делает запрос на API для получения информации о пользователе
 * @param {String} id
 */
export async function getUser(id) {
  try {
    const response = await axios.get(`/users/get-info/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
