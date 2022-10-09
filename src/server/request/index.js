/*
 * @Author: liuyan45
 * @Date: 2021-12-29 21:04:33
 * @LastEditTime: 2021-12-29 21:10:25
 * @LastEditors: liuyan45
 * @FilePath: /blue-cli/src/server/request/index.js
 * @Description: request
 */
import * as home from './home';
import * as user from './user';

export default {
    ...home,
    ...user
};