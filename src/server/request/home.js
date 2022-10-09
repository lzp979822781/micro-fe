/*
 * @Author: zhoupengfei03
 * @Date: 2021-12-21 19:20:40
 * @LastEditTime: 2022-01-17 12:32:31
 * @LastEditors: Please set LastEditors
 * @Description: 接口请求示例
 * @FilePath: /my-fe-project/src/server/api/home.js
 */
import axiosService from '../utils/axiosRequest.js';
import fetchService from '../utils/axiosRequest.js';
import {CONTENTTYPE} from '@constants/serverEmue.js';
/**
 * @description: axios拦截器示例
 * @param null
 * @return {type} object
 */
export function getSkillList(params = {}) {
    return axiosService({
        url: '/v1/skills',
        method: 'GET',
        params: params,
        headers: {
            'Content-Type': CONTENTTYPE.json
        }
    });
}
/**
 * @description: fetch拦截器示例
 * @param null
 * @return {type} object
 */
export function getUserDetails(params = {}) {
    return fetchService({
        url: '/v1/user/detail',
        method: 'GET',
        params: params,
        headers: {
            'Content-Type': CONTENTTYPE.json
        }
    });
}