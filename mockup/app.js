/*
 * @Author: zhoupengfei03
 * @Date: 2021-12-21 20:23:57
 * @LastEditTime: 2021-12-22 15:23:49
 * @LastEditors: liuyan45
 * @Description: mock工具入口方法封装
 * @FilePath: /blue-cli/mockup/app.js
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
// 引入API
const api = require('./bin/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/* 配置请求 */
const MOCK_DIR = '/v1/*';
app.put(MOCK_DIR, api.put);
app.get(MOCK_DIR, api.get);
app.post(MOCK_DIR, api.post);
app.delete(MOCK_DIR, api.delete);
app.options(MOCK_DIR, function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.sendStatus(200); /* 让options请求快速返回 */
});

module.exports = app;
