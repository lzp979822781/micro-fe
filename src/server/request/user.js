/*
 * @Author: zhoupengfei03
 * @Date: 2021-12-21 19:20:40
 * @LastEditTime: 2022-01-17 12:32:46
 * @LastEditors: Please set LastEditors
 * @Description: 登陆接口
 * @FilePath: /blue-cli/src/server/request/user.js
 */
import axiosService from '../utils/axiosRequest.js';
import {CONTENTTYPE} from '@constants/serverEmue.js';
/**
 * @description: 登录
 * @param null
 * @return {type} object
 */
export function userLogin(params = {}) {
    return axiosService({
        url: '/v1/user/login',
        method: 'GET',
        params: params,
        headers: {
            'Content-Type': CONTENTTYPE.form
        }
    });
}
/**
 * @description: 获取登陆用户详情
 * @param null
 * @return {type} object
 */
export function getUserDetail(params = {}) {
    return axiosService({
        url: '/v1/user/detail',
        method: 'GET',
        params: params,
        headers: {
            'Content-Type': CONTENTTYPE.form
        }
    });
}