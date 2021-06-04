import axios from "axios";

let loadingInstance = null;
let BASE_URL = "http://117.78.6.68:7878/";

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

const { Message, Loading } = require("element-ui");

//请求拦截器
service.interceptors.request.use(
  (config) => {
    let Authorization = sessionStorage.getItem("bipToken");
    if (Authorization) {
      config.headers["Authorization"] = Authorization;
    }
    loadingInstance = Loading.service({
      text: "Loading...",
      spinner: 'el-icon-loading'
    })
    return config;
  },
  (error) => {
    loadingInstance.close()
    return Promise.reject(error);
  }
);

//响应拦截器
service.interceptors.response.use(
  (response) => {
    loadingInstance.close()
    const responseCode = response.status;
    if (responseCode === 200 || responseCode === 204) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    // 断网 或者 请求超时 状态
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes("timeout")) {
        Message({
          showClose: true,
          message: "请求超时，请检查网络是否连接正常",
          type: "error",
        });
        loadingInstance.close()
      } else {
        // 可以展示断网组件
        Message({
          showClose: true,
          message: "请求失败，请检查网络是否已连接",
          type: "error",
        });
        loadingInstance.close()
      }
      return;
    }
    const responseCode = error.response.status;
    // console.log(responseCode)
    switch (responseCode) {
      case 401: // 401 未登录
        // document.addEventListener("UniAppJSBridgeReady", function () {
        // uni.postMessage({
        //   data: {
        //     action: "doLogin",
        //   },
        // });
        Message({
          showClose: true,
          message: "未登录",
          type: "error",
        });
        loadingInstance.close()
        // });
        break;
      case 404: //请求接口不存在
        Message({
          showClose: true,
          message: "接口404",
          type: "error",
        });
        loadingInstance.close()
        break;
      case 500: //服务器错误
        Message({
          showClose: true,
          message: "服务器错误",
          type: "error",
        });
        loadingInstance.close()
        break;
      default:
        Message({
          message: "error.response.data",
          type: "success",
        });
        loadingInstance.close()
    }
    return Promise.reject(error.response.data);
  }
);

/**
 * 封装get请求
 * @param {请求地址} url
 * @param {请求参数} params
 * @returns {Promise}
 */
export function fetch(url, params = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params,
        headers,
      })
      .then((res) => {
        // this.$message("请求成功");
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/**
 * 封装post请求
 * @param {请求地址} url
 * @param {请求参数} data
 */
export function post(url, data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    service
      .post(url, data, { headers })
      .then((res) => {
        if (res == undefined) {
          throw new Error("请求失败，请检查网络是否已连接");
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/**
 * 封装put请求
 * @param {请求地址} url
 * @param {请求参数} data
 */
export function put(url, data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    service
      .put(url, data, { headers })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装delete请求
 * @param {请求地址} url
 * @param {请求参数} data
 */
export function remove(url, data = {}) {
  return new Promise((resolve, reject) => {
    service
      .delete(url, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default service;
