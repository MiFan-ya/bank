// import request from '@/utils/request'
// import axios from 'axios'
// import qs from 'qs'


// const userApi = {
//   Login: '/oauth/token',
//   Logout: '/auth/logout',
//   ForgePassword: '/auth/forge-password',
//   Register: '/auth/register',
//   twoStepCode: '/auth/2step-code',
//   SendSms: '/account/sms',
//   SendSmsErr: '/account/sms_err',
//   // get my info
//   UserInfo: '/user/getUserInfo',
//   UserMenu: '/user/nav'
// }

// /**
//  * login func
//  * parameter: {
//  *     username: '',
//  *     password: '',
//  *     remember_me: true,
//  *     captcha: '12345'
//  * }
//  * @param parameter
//  * @returns {*}
//  */
// export function login (parameter) {
//   console.log(parameter)
//   const data = {
//     grant_type: 'password',
//     client_id: 'zcd',
//     client_secret: 'HvwBCfzU6tUOGIhI',
//     username: parameter.username,
//     password:parameter.password
//   }
//   return  axios({
//     method: 'post',
//     url: userApi.Login,
//     baseURL: process.env.VUE_APP_API_BASE_URL,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;'
//     },
//     data:qs.stringify(data)
//   })
// }

// export function refreshLogin (parameter,refresh_token) {
//   console.log(parameter)
//   const data = qs.stringify({
//     grant_type: 'refresh_token',
//     refresh_token: refresh_token,
//     username: parameter.username,
//     password:parameter.password
//   })
//   return  axios({
//     method: 'post',
//     url: userApi.Login,
//     baseURL: process.env.VUE_APP_API_BASE_URL,
//     headers: {
//       'Authorization': 'basic emNkOkh2d0JDZnpVNnRVT0dJaEk='
//     },
//     data
//   })
// }

// export function getSmsCaptcha (parameter) {
//   return request({
//     url: userApi.SendSms,
//     method: 'post',
//     data: parameter
//   })
// }

// export function getInfo () {
//   return request({
//     url: userApi.UserInfo,
//     baseURL: process.env.VUE_APP_API_BASE_URL,
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

// export function getCurrentUserNav () {
//   return request({
//     url: userApi.UserMenu,
//     method: 'get'
//   })
// }

// export function logout () {
//   return request({
//     url: userApi.Logout,
//     baseURL: process.env.VUE_APP_API_BASE_URL,
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

// /**
//  * get user 2step code open?
//  * @param parameter {*}
//  */
// export function get2step (parameter) {
//   return request({
//     url: userApi.twoStepCode,
//     method: 'post',
//     data: parameter
//   })
// }
