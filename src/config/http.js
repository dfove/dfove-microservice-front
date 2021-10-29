/*
请求函数模块
*/
import axios from "axios";
import { Message } from "element-ui";
import qs from "qs";
axios.defaults.timeout = 300000; // 5分钟
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
const http = {};

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("USER_TOKEN");
    if (token && !config.noCertification) {
      config.headers.Authorization = "Bearer " + " " + token;
    }
    if (config.headers["Content-Type"] == "application/x-www-form-urlencoded") {
      if (config.method === "post" || config.method === "put") {
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response.data;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 401:
          Message.closeAll();
          if (err.response.data.code == "4001") {
            Message.warning({
              message: err.response.data.message
            });
            return false;
          }
          if (err.response.data.code == "1001") {
            Message.warning({
              message: err.response.data.message
            });
            return false;
          }
          break;
        default:
          break;
      }
    } else {
    }
    Message.error({
      message: err.message
    });
    return Promise.reject(err.response);
  }
);

http.get = function(url, options) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, options)
      .then(response => {
        responseProcessing(response, resolve, reject);
      })
      .catch(e => {
        reject(e);
      });
  });
};

http.post = function(url, data, options = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, options)
      .then(response => {
        responseProcessing(response, resolve, reject);
      })
      .catch(e => {
        reject(e);
      });
  });
};

http.put = function(url, data, options = {}) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, options)
      .then(response => {
        responseProcessing(response, resolve, reject);
      })
      .catch(e => {
        reject(e);
      });
  });
};

http.delete = function(url, options) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, options)
      .then(response => {
        responseProcessing(response, resolve, reject);
      })
      .catch(e => {
        reject(e);
      });
  });
};

function responseProcessing(e, resolve, reject) {
  if ((e || e.data) && e.code == "200") {
    resolve(e);
  } else {
    if (e) {
      Message.error({
        message: e.message || e.data.message
      });
    }
    reject(e);
  }
}

export default http;
