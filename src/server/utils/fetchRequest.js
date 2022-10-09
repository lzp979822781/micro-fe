/*
 * @Author: zhoupengfei03
 * @Date: 2021-12-21 18:56:06
 * @LastEditTime: 2022-01-17 12:33:05
 * @LastEditors: Please set LastEditors
 * @Description: 封装fetch拦截器
 * @FilePath: /my-fe-project/src/server/utils/fetchRequest.js
 */
const baseUrl = 'http://' + window.location.host;
/**
 * @description: 封装fetch拦截器主函数
 * @param apiConfig {type} SquareConfig
 * @return {type} Promise<any>
 */
async function fetchService(apiConfig) {
    apiConfig.url = baseUrl + apiConfig.url;
    if (apiConfig.method === 'GET') {
        let dataStr = '';
        Object.keys(apiConfig.params).forEach(key => {
            dataStr += key + '=' + apiConfig.params[key] + '&';
        });
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            apiConfig.url = apiConfig.url + '?' + dataStr;
        }
        const options = {
            method: apiConfig.method,
            headers: apiConfig.headers && apiConfig.headers,
            credentials: 'include' // Fetch 请求默认是不带 cookie 的，此处需要设置credentials为'include'
        };
        try {
            const response = await fetch(apiConfig.url, options);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            throw new Error(error);
        }
    } else {
        const options = {
            method: apiConfig.method,
            body: JSON.stringify(apiConfig.params),
            headers: apiConfig.headers && apiConfig.headers,
            credentials: 'include'
        };
        try {
            const response = await fetch(apiConfig.url, options);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default fetchService;