import axios from "@/plugins/axios/news";
/**
 * Function topHeadlines and everything. Makes a request to API to receive news.
 * @param {String} query
 */
export async function topHeadlines(country = "ua", category = "business") {
  try {
    const response = await axios.get(
      `/top-headlines?country=${country}&category=${category}&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`
    );
    return response.articles;
  } catch (err) {
    // TODO: This is where I have to handle the error.
    console.log(err);
    return Promise.reject(err); // returning promise status
  }
}

export async function everything(query) {
  try {
    const response = await axios.get(
      `/everything?q=${query}&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`
    );
    return response.articles;
  } catch (err) {
    // TODO: This is where I have to handle the error.
    console.log(err);
    return Promise.reject(err); // returning promise status
  }
}
