/*
 * @Author:zhoupengfei03
 * @Date: 2021-11-10 10:32:10
 * @LastEditTime: 2021-11-10 11:07:12
 * @Description: ACG 智能制造 SSE初始化方案
 * @FilePath: /my-fe-project/src/server/utils/sse.js
 */
// 判断字符串是否为JSON格式
const release = 'http://' + window.location.host + '/';
function isJSON(str) {
    if (typeof str === 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
}
// 初始化SSE server
export function initSseServer(path, params, callback) {
    let callbackFun = callback;
    // 客户端支持SSE
    if (!!window.EventSource) {
        let url = host + path;
        if (params) {
            let parameters = '?';
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    const element = params[key];
                    parameters = parameters + key + '=' + encodeURIComponent(element) + '&';
                }
            }
            url = url + parameters.slice(0, parameters.length - 1);
        }
        let source = new EventSource(url);
        source.onopen = function (event) {
            // handle open event
            callbackFun({
                data: event,
                status: 125,
                message: 'SSE连接建立'
            });
        };
        source.onerror = function (event) {
            // handle error event
            callbackFun({
                data: null,
                status: 226,
                message: 'SSE连接中断'
            });
        };
        source.onmessage = function (event) {
            // handle message event
            let ifJSON = isJSON(event.data || '');
            callbackFun({
                data: ifJSON ? JSON.parse(event.data) : null,
                status: ifJSON ? 200 : 500,
                message: ifJSON ? '收到SSE数据' : 'SSE返回数据格式错误！'
            });
        };
        return source;
    } else {
        // 客户端不支持SSE
        callback({
            data: null,
            status: 501,
            message: '客户端不支持SSE'
        });
        return null;
    }
}