/** * 是否为mac系统（包含iphone手机） * */
export function isMac() {
    return /macintosh|mac os x/i.test(navigator.userAgent);
};

/** * 是否为windows系统 * */
export function isWindows() {
    return /windows|win32/i.test(navigator.userAgent);
};

export function getUrlParams() {
    let url = location.search; // 获取url中'?'符后的字串
    let theRequest = {};
    if (url.indexOf('?') !== -1) {
        let str = url.substr(1);
        let strs = str.split('&');
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
        }
    }
    return theRequest;
};

export function queryParams(data = {}, isPrefix = true, arrayFormat = 'brackets') {
    let prefix = isPrefix ? '?' : '';
    let _result = [];
    if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) === -1) {
        arrayFormat = 'brackets';
    }
    for (let key in data) {
        let value = data[key];
        // 去掉为空的参数
        if (['', undefined, null].indexOf(value) >= 0) {
            continue;
        }
        // 如果值为数组，另行处理
        if (value.constructor === Array) {
            // e.g. {ids: [1, 2, 3]}
            switch (arrayFormat) {
                case 'indices':
                    // 结果: ids[0]=1&ids[1]=2&ids[2]=3
                    for (let i = 0; i < value.length; i++) {
                        _result.push(key + '[' + i + ']=' + value[i]);
                    }
                    break;
                case 'brackets':
                    // 结果: ids[]=1&ids[]=2&ids[]=3
                    value.forEach(_value => {
                        _result.push(key + '[]=' + _value);
                    });
                    break;
                case 'repeat':
                    // 结果: ids=1&ids=2&ids=3
                    value.forEach(_value => {
                        _result.push(key + '=' + _value);
                    });
                    break;
                case 'comma':
                    // 结果: ids=1,2,3
                    let commaStr = '';
                    value.forEach(_value => {
                        commaStr += (commaStr ? ',' : '') + _value;
                    });
                    _result.push(key + '=' + commaStr);
                    break;
                default:
                    value.forEach(_value => {
                        _result.push(key + '[]=' + _value);
                    });
            }
        } else {
            _result.push(key + '=' + value);
        }
    }
    return _result.length ? prefix + _result.join('&') : '';
};
/** * 是否是浏览器 * */
export function isBrowser() {
    return typeof window !== 'undefined';
}
/** * 是否匹配路径 * */
export function isAbsolutePath(path) {
    return /^https?:\/\//.test(path);
}
/** * 是否滑倒底部 * */
export function isScrollBottom() {
    const scrollTop = window.pageYOffset
        || (document.documentElement && document.documentElement.scrollTop)
        || (document.body && document.body.scrollTop)
        || 0; // 滚动距离
    const clientHeight = (document.documentElement && document.documentElement.clientHeight)
        || (document.body && document.body.clientHeight)
        || 0; // 展示高度
    const scrollHeight = Math.max(
        (document.documentElement ? document.documentElement.scrollHeight : 0),
        (document.body ? document.body.scrollHeight : 0),
        0
    ); // 文档总高度
    return scrollHeight - scrollTop - clientHeight < 10;
}
/** * 路径截取参数 * */
export function getQueryString(name, search) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const res = search.substr(1).match(reg);
    return res !== null ? decodeURIComponent(res[2]) : '';
}
