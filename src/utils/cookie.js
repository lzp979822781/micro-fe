/*
 * @Author: liuyan45
 * @Date: 2022-01-13 19:11:13
 * @LastEditTime: 2022-01-13 19:12:19
 * @LastEditors: liuyan45
 * @FilePath: /blue-cli/src/utils/cookie.js
 * @Description: cookie工具
 */

import {isBrowser} from './browser';
/** * 获取cookie * */
export function getCookie(name, cookieText = '') {
    if (isBrowser()) {
        cookieText = document.cookie;
    }
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const arr = cookieText.match(reg);

    return arr ? decodeURIComponent(arr[2]) : '';
}
/** * 设置cookie * */
export function setCookie(name, value) {
    document.cookie = name + '=' + escape(value) + '; path=/';
}
/** * 去除cookie * */
export function removeCookie(name) {
    const value = getCookie(name);

    if (value) {
        const exp = new Date();
        exp.setTime(exp.getTime() - 10000);
        document.cookie
            = name + '=' + value + '; expires=' + exp.toUTCString() + '; path=/';
    }
}