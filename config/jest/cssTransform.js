/*
 * @Author: zhoupengfei03
 * @Date: 2021-12-24 16:52:10
 * @LastEditTime: 2022-01-17 11:31:02
 * @LastEditors: zhoupengfei03
 * @Description: 自动化测试
 * @FilePath: /baidu/acg-industry-fe/frame/config/jest/cssTransform.js
 */
'use strict';

// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
    process() {
        return 'module.exports = {};';
    },
    getCacheKey() {
        // The output is always the same.
        return 'cssTransform';
    }
};