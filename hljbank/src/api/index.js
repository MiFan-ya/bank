import { fetch, post } from "../api/request.js";

// export function gettest(params) {
//   return fetch(`https://music.api.tianli0.top/search?keywords=${params}`);
// }

export function GTabledata(params) {
  return fetch(
    `/order/query?pageNum=${params.pageNum}&pageSize=${params.pageSize}`
  );
}

export function GSeachtdata(params) {
  if (params.companyName) {
    return fetch(
      `/order/query?pageNum=${params.pageNum}&pageSize=${params.pageSize}&companyName=${params.companyName}`
    );
  } else {
    return fetch(
      `/order/query?pageNum=${params.pageNum}&pageSize=${params.pageSize}&bidNum=${params.bidNum}`
    );
  }
}

export function GSeachtdataboth(params) {
  return fetch(
    `/order/query?pageNum=${params.pageNum}&pageSize=${params.pageSize}&bidNum=${params.bidNum}&companyName=${params.companyName}`
  );
}

export function PSendhan(data) {
  return post(`/order/edit`, data);
}

export function PUserlogin(data) {
  return post(`/user/login`, data);
}

export function POrderPush(data) {
  return post(`/order/push`, data);
}
// return fetch(`/order/get?bidNum=${params.bidNum}&companyName=${params.companyName}`);
