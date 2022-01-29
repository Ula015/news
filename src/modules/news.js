import axios from "@/plugins/axios/news";
/**
 * Функции topHeadlines и everything делает запрос на API для получения новостей.
 * @param {String} query
 */
export async function topHeadlines(country = "ua", category = "business") {
  try {
    const response = await axios.get(
      `/top-headlines?country=${country}&category=${category}&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`
    );
    return response.articles;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function everything(query) {
  try {
    const response = await axios.get(
      `/everything?q=${query}&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`
    );
    return response.articles;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}
