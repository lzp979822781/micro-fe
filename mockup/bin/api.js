/*
 * @Author: zhoupengfei03
 * @Date: 2021-12-21 20:23:57
 * @LastEditTime: 2021-12-22 15:39:19
 * @LastEditors: liuyan45
 * @Description: mock工具响应函数封装
 * @FilePath: /blue-cli/mockup/bin/api.js
 */
const fs = require('fs');
const path = require('path');

function getDataFromPath(apiName, method, params, res) {
    if (apiName) {
        fs.access(
            // 提取请求路径中的js文件
            apiName.substring(1) + '.js',
            // 回调函数，检查请求的路径是否有效失败返回一个错误参数
            function (err) {
                if (!err) {
                    // 每次请求都清除模块缓存重新请求
                    delete require.cache[require.resolve('..' + apiName.substring(7))];
                    try {
                        addApiResult(res, require('..' + apiName.substring(7)).getData(method, params));
                    } catch (e) {
                        console.error(e.stack);
                        res.status(500).send(apiName + ' has an error,please check the code.');
                    }
                } else {
                    addApiResult(res);
                }
            }
        );
    } else {
        addApiResult(res);
    }
}

function addApiHead(res) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    // 跨域
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Total-Count', 100);
    // 控制http缓存
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 0);
}

function addApiResult(res, result) {
    if (result) {
        res.send(result);
    } else {
        res.status(404).send();
    }
}
// get
exports.get = function (req, res) {
    addApiHead(res);
    const API_DIR = path.resolve('/mockup/' + req.path);
    getDataFromPath(API_DIR, 'GET', req.query, res);
};
// post
exports.post = function (req, res) {
    addApiHead(res);
    const API_DIR = path.resolve('/mockup/' + req.path);
    getDataFromPath(API_DIR, 'POST', req.body, res);
};
// delete
exports.delete = function (req, res) {
    addApiHead(res);
    const API_DIR = path.resolve('/mockup/' + req.path);
    getDataFromPath(API_DIR, 'DELETE', req.body, res);
};
// put
exports.put = function (req, res) {
    addApiHead(res);
    const API_DIR = path.resolve('/mockup/' + req.path);
    getDataFromPath(API_DIR, 'PUT', req.body, res);
};
