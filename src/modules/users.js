import axios from "../plugins/axios/signUp/index";
/**
 * Function getUser. Make login request to API.
 * @param {String} id
 */
export async function getUser(id) {
  try {
    const response = await axios.get(`/users/get-info/${id}`);
    return response;
  } catch (error) {
    // TODO: This is where I have to handle the error.
    console.log(error);
    return Promise.reject(error); // returning promise status.
  }
}
