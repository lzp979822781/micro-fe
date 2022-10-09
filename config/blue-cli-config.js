/*
 * @Author: zhoupengfei03
 * @Date: 2021-12-21 16:22:28
 * @LastEditTime: 2021-12-27 12:32:02
 * @LastEditors: liuyan45
 * @Description: 项目配置文件
 * @FilePath: /blue-cli/config/blue-cli-config.js
 */

// 代理转发域名地址
const PROXY_URL = {
    releaseRD: 'http://iiom-rd.bce.baidu.com:8360/' // @rd环境
};

module.exports = {
    buildConfig: {
        port: 9000 // 项目端口
    },
    portConfig: {
        proxy: { // 代理
            '/api/v1': {
                target: PROXY_URL.releaseRD // 测试环境服务地址
            }
        },
        port: 3001 // mock服务端口
    }
};