import Vue from "vue";
const lsTokenKey = "my_app_token";

function setToken(req) {
  const isNewsUrl = req.baseURL.includes("newsapi");
  const isAuthUrl = req.url.includes("auth");
  if (!isAuthUrl) {
    const token = localStorage.getItem(lsTokenKey);
    if (isNewsUrl) {
      req.headers["X-Api-Key"] = token;
    } else {
      req.headers["x-access-token"] = token;
    }
  }
  return req;
}

function setTokenOnLogin(res) {
  const isLoginUrl = res.config.url.includes("login");
  if (isLoginUrl) {
    const token = res.data.token;
    localStorage.setItem(lsTokenKey, token);
  }
  return res;
}

function getClearResponse(res) {
  return res.data;
}

function onError(err) {
  Vue.notify({
    text: err.response.data.message,
    type: "error",
    speed: 1000,
  });
  return Promise.reject(err);
}

export function setTokenFunction(axios) {
  axios.interceptors.request.use(setToken);
  axios.interceptors.response.use(setTokenOnLogin);
  axios.interceptors.response.use(getClearResponse, onError);
}
