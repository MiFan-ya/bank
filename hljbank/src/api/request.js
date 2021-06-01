import axios from "axios";
const service = axios.create({
  timeout: 60000,
});

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
        this.$message("请求成功");
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export default service;
