/*
 * @Author: zhoupengfei03
 * @Date: 2021-12-21 18:56:06
 * @LastEditTime: 2022-01-17 12:37:46
 * @LastEditors: Please set LastEditors
 * @Description: 封装axios拦截器
 * @FilePath: /my-fe-project/src/server/utils/axiosRequest.js
 */
import axios from 'axios';
// const baseUrl = 'http://' + window.location.host;

/* 创建axios实例 */
const axiosService = axios.create({
    timeout: 5000 // 请求超时时间
});
axiosService.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* request拦截器 */
axiosService.interceptors.request.use(config => {
    return config;
}, error => {
    Promise.reject(error);
});

/* respone拦截器 */
axiosService.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // 异常处理
        console.log(error);
        return Promise.reject(error);
    },
);

export default axiosService;