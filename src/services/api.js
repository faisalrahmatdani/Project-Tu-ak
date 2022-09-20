import axios from "axios";
import querystring from "qs";

const BASE_URL = process.env.BASE_URL;

const isServer = typeof window === "undefined";
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
  headers: {
    Accept: "application/json",
    // 'Accept-Language': 'ID',
  },
  paramsSerializer: (params) => querystring.stringify(params),
});

export default {
  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} json
   * @param {Object} form
   */
  put: (url, form = {}, json = {}, customConfig = {}, auth = false) => {
    if (!isServer && auth) {
      const userToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      if (userId) api.defaults.headers["user-id"] = userId;
      if (userToken) api.defaults.headers.Authorization = `Bearer ${userToken}`;
    }
    api.defaults.headers.common["Content-Type"] = json
      ? "application/json"
      : "application/x-www-form-urlencoded";
    const data = querystring.stringify(form) || json;
    return api
      .put(url, data, {
        params: querystring.stringify(form),
        ...customConfig,
      })
      .then((response) => Promise.resolve(response.data))
      .catch((err) => Promise.reject(err));
  },

  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} param query params
   */
  get: (url, customConfig = {}, auth = true) => {
    if (!isServer && auth) {
      const userToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      if (userId) api.defaults.headers["user-id"] = userId;
      if (userToken) api.defaults.headers.Authorization = `Bearer ${userToken}`;
    }
    return api
      .get(url, {
        ...customConfig,
      })
      .then((response) => Promise.resolve(response.data))
      .catch((err) => Promise.reject(err));
  },

  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} json
   * @param {Object} form
   * @param {Object} reqConfig  custom config for request
   */
  post: (url, form = null, json = {}, reqConfig = {}, auth = true) => {
    if (!isServer && auth) {
      const userToken = localStorage.getItem("accessToken");
      api.defaults.headers.Authorization = `Bearer TES`;
    }

    api.defaults.headers["Content-Type"] = form
      ? "application/x-www-form-urlencoded"
      : "application/json";
    const data = querystring.stringify(form) || json;
    return api
      .post(url, data, {
        params: querystring.stringify(form),
        ...reqConfig,
      })
      .then((response) => Promise.resolve(response.data))
      .catch((err) => Promise.reject(err));
  },

  /**
   * Send request with Content-Type multipart/form
   * used to upload file
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} data
   */
  postData: (base_url, url, data = {}, customConfig = {}, auth = true) => {
    if (!isServer && auth) {
      const userToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      if (userId) api.defaults.headers["user-id"] = userId;
      if (userToken) api.defaults.headers.Authorization = `Bearer ${userToken}`;
    }

    api.defaults.headers["Content-Type"] = "multipart/form-data";
    api.defaults.timeout = 30000;
    const formData = new FormData();
    const keys = Object.keys(data);
    keys.map((key) => {
      data[key] instanceof File
        ? formData.append(key, data[key], data[key].name)
        : formData.append(key, data[key]);
    });
    return api
      .post(url, formData, { baseURL: base_url || BASE_URL, ...customConfig })
      .then((response) => Promise.resolve(response.data))
      .catch((err) => Promise.reject(err));
  },

  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} params
   * {
   *   id: [1,2,3]
   * }
   */
  delete: (url, params, auth = true) => {
    if (!isServer && auth) {
      const userToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      if (userId) api.defaults.headers["user-id"] = userId;
      if (userToken) api.defaults.headers.Authorization = `Bearer ${userToken}`;
    }
    let newUrl = url;
    if (params) {
      const qparam = querystring.stringify(params);
      newUrl = `${newUrl}?${qparam}`;
    }
    return api
      .delete(newUrl)
      .then((response) => Promise.resolve(response.data))
      .catch((err) => Promise.reject(err));
  },
  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} payload
   * {
   *   id: [1,2,3]
   * }
   */ deleteData: (url, payload, auth = true) => {
    if (!isServer && auth) {
      const userToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      if (userId) api.defaults.headers["user-id"] = userId;
      if (userToken) api.defaults.headers.Authorization = `Bearer ${userToken}`;
    }

    return api
      .delete(url, { data: payload }, (auth = true))
      .then((response) => Promise.resolve(response.data))
      .catch((err) => Promise.reject(err));
  },
  /**
   * Send request with Content-Type multipart/form
   * used to upload file
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} data
   */
  putData: (url, data = {}, customConfig = {}, auth = true) => {
    if (!isServer && auth) {
      const userToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      if (userId) api.defaults.headers["user-id"] = userId;
      if (userToken) api.defaults.headers.Authorization = `Bearer ${userToken}`;
    }
    api.defaults.headers["Content-Type"] = "multipart/form-data";
    api.defaults.timeout = 30000;
    const formData = new FormData();
    const keys = Object.keys(data);
    keys.map((key) => {
      data[key] instanceof File
        ? formData.append(key, data[key], data[key].name)
        : formData.append(key, data[key]);
    });
    return api
      .put(url, formData, { ...customConfig })
      .then((response) => Promise.resolve(response.data))
      .catch((err) => Promise.reject(err));
  },
};
