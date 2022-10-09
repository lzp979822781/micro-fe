import {useEffect, useRef} from 'react';
import copy from 'copy-to-clipboard';
import moment from 'moment';
import {notification} from '@baidu/sstrd';

const showSuccess = msg => {
    notification.success({
        message: msg,
        duration: 5
    });
};

const showError = msg => {
    notification.error({
        message: msg,
        duration: 5
    });
};

const showWarning = msg => {
    notification.warning({
        message: msg,
        duration: 5
    });
};

const showInfo = msg => {
    notification.info({
        message: msg,
        duration: 5
    });
};
export {
    showSuccess,
    showError,
    showWarning,
    showInfo
};

// 计算table滚动宽度
const calcColWidths = (cols, initVal = 120) =>
    cols
        .map(item => item.width)
        .filter(width => width)
        .reduce((sum, width) => sum + width, initVal);

export {calcColWidths};

/**
 * 判断数组是否为空
 * @param {*} data
 */
function isArrayNull(data) {
    return !Array.isArray(data) || (Array.isArray(data) && !data.length);
}

export {isArrayNull};

const isPureObject = param => {
    return Object.prototype.toString.call(param) === '[object Object]';
};

const isNull = param => {
    if (typeof param !== 'object') {
        if (typeof param === 'number') {
            return false;
        }
        return !param;
    }

    if (param == null) {
        return true;
    }

    if (Array.isArray(param)) {
        return !param.length;
    }

    if (isPureObject(param)) {
        return !Object.keys(param).length;
    }
};

export {isNull};

// 获取外部url参数
const getUrlAllParams = () => {
    let url = decodeURI(window.location.href);
    let res = {};
    const urlArr = url.split('?');
    let url_data = urlArr[urlArr.length - 1];
    if (!url_data) {
        return res;
    }
    let params_arr = url_data.split('&');
    params_arr.forEach(item => {
        let [key, value] = item.split('=');
        res[key] = value;
    });
    return res;
};

// 拷贝文本
const copyText = (text, succesMsg, errorMsg) => {
    if (!text) {
        // message.warning('没有可复制的文本');
        notification.warning({
            message: '没有可复制的文本',
            duration: 3
        });
        return;
    }
    if (copy(text)) {
        // message.success(succesMsg);
        notification.success({
            message: succesMsg,
            duration: 3
        });
        return;
    }
    // message.warning(errorMsg);
    notification.warning({
        message: errorMsg,
        duration: 3
    });
};

// 数字格式化, 加千位分隔符
const countReset = count => {
    return (count || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
};

export {
    getUrlAllParams,
    copyText,
    countReset
};

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export {usePrevious};

const handleError = e => {
    if (typeof e === 'object') {
        const {global} = e;
        // message.error(global);
        notification.error({
            message: global
        });
        return;
    }
    // message.error(e);
    notification.error({
        message: e
    });
};

export {handleError};

const reg = /(?=(?!(\b))(\d{3})+$)/g;
const formatThousandth = str => {
    if (!str) {
        return '--';
    }
    return str.replace(reg, ',');
};

export {formatThousandth};

function genUuid() {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i += 1) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    // eslint-disable-next-line no-bitwise
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

    s[8] = '-';
    s[13] = '-';
    s[18] = '-';
    s[23] = '-';

    const uuid = s.join('');
    return uuid;
}

export {genUuid};

const formatOpts = params => {
    if (isNull(params)) {
        return [];
    }

    return params.map(item => {
        const {name, code} = item;
        return {
            text: name,
            value: code
        };
    });
};

export {formatOpts};

const sortObj = {
    desc: 'descend',
    asc: 'ascend'
};

const sortMap = (order, orderBy, field) => {
    if (!order) {
        return null;
    }

    const fieldsArr = orderBy.split(',');
    const orderValueArr = order.split(',');

    const obj = {};
    fieldsArr.forEach((key, index) => {
        const currentSort = orderValueArr[index];
        obj[key] = sortObj[currentSort];
    });

    return obj[field];
};

export {sortMap};

/**
 * 处理返回的排序值和排序字段
 */

const orderObj = {
    ascend: 'asc',
    descend: 'desc'
};

const getArrayByField = (data, field) => {
    if (field === 'order') {
        return data.map(item => {
            const sortValue = item[field];
            return sortValue ? orderObj[sortValue] : undefined;
        });
    }
    return data.map(item => item[field]);
};
const handleSort = data => {
    if (typeof data !== 'object') {
        return {order: '', orderBy: ''};
    }

    const arrData = Array.isArray(data) ? data : [data];
    const resData = arrData.filter(item => item.order);
    const orderStr = getArrayByField(resData, 'order').join(',');
    const orderByStr = getArrayByField(resData, 'field').join(',');

    return {order: orderStr, orderBy: orderByStr};
};

const handleSingleSort = data => {
    if (typeof data !== 'object') {
        return {order: '', orderBy: ''};
    }

    const arrData = Array.isArray(data) ? [data[data.length - 1]] : [data];
    const resData = arrData.filter(item => item.order);
    const orderStr = getArrayByField(resData, 'order').join(',');
    const orderByStr = getArrayByField(resData, 'field').join(',');

    return {order: orderStr, orderBy: orderByStr};
};

export {handleSort, handleSingleSort};

const getRealObj = paramsObj => {
    if (isNull(paramsObj)) {
        return {};
    }

    const res = {};
    const keys = Object.keys(paramsObj);

    for (let i = 0; i < keys.length; i++) {
        const temp = paramsObj[keys[i]];
        if (isNull(temp)) {
            continue;
        }
        res[keys[i]] = temp;
    }

    return res;
};

/**
 *
 * @param {*} originUrl 原始url不带参数
 * @param {*} urlParams 需要拼接的url参数 url参数
 */
const formatUrl = (originUrl, urlParams) => {
    if (isNull(urlParams)) {
        return originUrl;
    }

    const newParams = getRealObj(urlParams);

    const keys = Object.keys(newParams);

    return keys.reduce((total, key, index) => {
        const temp = newParams[key];
        if (isNull(temp)) {
            return total;
        }
        return `${total}${!index ? '?' : ''}${key}=${temp}${index < keys.length - 1 ? '&' : ''}`;
    }, originUrl);
};

export {formatUrl};

const jointUrlParam = urlParams => {
    if (isNull(urlParams)) {
        return;
    }

    const newParams = getRealObj(urlParams);

    const keys = Object.keys(newParams);

    return keys.reduce((total, key, index) => {
        const temp = newParams[key];
        if (isNull(temp)) {
            return total;
        }
        return `${total}${!index ? '?' : ''}${key}=${temp}${index < keys.length - 1 ? '&' : ''}`;
    }, '');
};

export {jointUrlParam};

const commonDataZoom = {
    borderColor: 'transparent',
    showDataShadow: false,
    // handleIcon: `image://${zoomIcon}`,
    handleSize: 0,
    // zoomLock: true,
    // moveOnMouseWheel: true,
    handleStyle: {
        color: 'rgba(146, 146, 148, 0.9)',
        shadowColor: 'rgba(146, 146, 148, 0.9)',
        borderColor: 'rgba(146, 146, 148, 0.9)',
        borderWidth: 0
    },
    throttle: 100,
    bottom: 5,
    textStyle: {
        color: '#333333'
    },
    maxSpan: 50,
    minSpan: 50
};

function genDataZoom(end = 0.1) {
    return [
        {
            type: 'inside',
            start: 0,
            end,
            height: 8,
            showDetail: true,
            ...commonDataZoom
        },
        {
            type: 'slider',
            start: 0,
            end,
            height: 8,
            show: true,
            ...commonDataZoom,
            backgroundColor: 'transparent', // 整个缩放条背景色
            fillerColor: 'rgba(146, 146, 148, 0.9)'
            /* labelFormatter: function (index, value) {
                if (!value) {
                    return '';
                }
                return moment(value).format(format);
            } */
        }
    ];
}

export {genDataZoom};
const getByteLength = params => {
    if (!params) {
        return 0;
    }

    return new Blob([params]).size;
};

export {getByteLength};

const checkNameRepeat = (current, fileList) => {
    return fileList.some(({name}) => current === name);
};

export {
    checkNameRepeat
};

// 上传文件格式化
const formatUploadFileName = (fileList = []) => {
    if (!Array.isArray(fileList)) {
        return;
    }

    return fileList.map(item => ({
        ...item,
        name: item.fileName ? decodeURI(item.fileName) : item.fileName
    }));
};

export {formatUploadFileName};

const getDecodeName = name => {
    return name ? decodeURI(name) : name;
};

export {getDecodeName};
// 数字格式化
const formatterNumber = val => {
    const tenthounsand = 10000;
    const hundredthounsand = tenthounsand * 10;
    const million = hundredthounsand * 10;
    const tenmillion = million * 10;
    const houndredthounsand = tenmillion * 10;
    if (val > tenthounsand) {
        return `${(val / tenthounsand).toFixed((1))}万`;
    }
    if (val > hundredthounsand) {
        return `${(val / hundredthounsand).toFixed((1))}十万`;
    }
    if (val > million) {
        return `${(val / million).toFixed((1))}百万`;
    }
    if (val > tenmillion) {
        return `${(val / million).toFixed((1))}千万`;
    }
    if (val > houndredthounsand) {
        return `${(val / million).toFixed((1))}亿`;
    }
    return val;
};

export {formatterNumber};

const isResetPage = () => {
    const pathname = window.location.pathname;
    return pathname.startsWith('/management/reset') || pathname.startsWith('/enterprise/reset');
};

export {isResetPage};

const formatDate = (data, format = 'YYYY.MM.DD') => {
    return data ? moment(data).format(format) : '';
};

const formatRangeDate = (data, format = 'YYYY.MM.DD') => {
    if (!Array.isArray(data)) {
        return [];
    }

    const [start, end] = data;

    return [formatDate(start, format), formatDate(end, format)];
};

export {
    formatDate,
    formatRangeDate
};

function srollToFirstError(form, errorInfo) {
    const defaultScrollToFirstError = {block: 'nearest'};
    form && form.scrollToField(errorInfo.errorFields[0].name, defaultScrollToFirstError);
}

export {srollToFirstError};

/**
 * table column空值渲染函数
 * @param {*} fn 值处理函数
 * @param {*} field 从行数据中获取的字段
 * @param {string} [placeHolder='-'] 值为空时的占位字符
 */
const handleDefault = (fn, field, placeHolder = '-') => (text, record) => {
    const value = field ? record[field] : text;
    return value ? (fn ? fn(value) : value) : placeHolder;
};

const handleDate = handleDefault((value, format = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(value).format(format);
});

export {handleDefault, handleDate};

/**
 * 过滤选中key值，重新请求数据后非当前页的选中数据会被过滤掉
 * @param {*} data 当前列表数据
 * @param {*} selectedRowKeys 当前数据的key值
 * @return {*}
 */
function filterSelectedRow(data, selectedRowKeys, rowkey) {
    if (!Array.isArray(data)) {
        return selectedRowKeys;
    }
    return data.filter(item => selectedRowKeys.includes(item[rowkey]))
        .map(item => item[rowkey]);
}

export {filterSelectedRow};

const getCompatiableDate = (date, delimiter = '.') => {
    if (!date) {
        return date;
    }

    return date.split(delimiter).slice(0, 2).join(delimiter);
};

export {getCompatiableDate};

/**
 * 获取公共select属性
 * @return {*}
 */
function getComSelectProps() {
    return {
        getPopupContainer: triggerNode => triggerNode.parentNode
    };
}

export {getComSelectProps};

const replaceDate = date => {
    return date ? date.replace(/\./g, '-') : date;
};

export {replaceDate};

/**
 * 表格文本默认符号展示兼容
 * @param {*} text
 */
function handleText(text, placeholder = '-') {
    return (typeof text !== 'undefined' && text !== null) ? text : placeholder;
}

export {handleText};

/**
 * 为数组添加id,前端需要使用id处理问题
 * @param {*} arr
 */
function addId(arr) {
    if (isArrayNull(arr)) {
        return arr;
    }

    return arr.map(item => ({...item, id: genUuid()}));
}

export {addId};

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 6},
        lg: {span: 6}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 18},
        lg: {span: 18}
    }
};

const singleRowLayout = {
    labelCol: {
        xs: {span: 5}
    },
    wrapperCol: {
        xs: {span: 18}
    }
};

// 多列多行组合项col布局
const containerLayout = {
    xs: {span: 24},
    md: {span: 12},
    lg: {span: 12},
    xl: {span: 8},
    xxl: {span: 8}
};

export {formItemLayout, singleRowLayout, containerLayout};

const defaultPage = {
    pageNo: 1,
    pageSize: 20
};

export {defaultPage};

/**
 * 格式化请求参数，如果参数是纯对象或者是纯数组且为空的情况下，返回undefined
 * @param {*} params
 * @returns
 */
const formatReqParams = params => {
    if (typeof params !== 'object') {
        return params;
    }

    if (isPureObject(params)) {
        return Object.keys(params).length ? params : undefined;
    }

    if (Array.isArray(params)) {
        return isArrayNull(params) ? undefined : params;
    }

    return params;
};

export {formatReqParams};

/**
 * 获取当前时间的时分秒
 * @param {*} date
 * @author liuzhipeng03
 * @returns
 */
const getCurrentHourMinSeconds = (date = moment()) => {
    const hour = date.hours();
    const minute = date.minutes();
    const sencond = date.seconds();
    return {hour, minute, sencond};
};

/**
 * 获取两个数字间的所有数字
 * @param {*} start 开始值
 * @param {*} end 结束值
 * @author liuzhipeng03
 * @returns
 */
function range(start, end) {
    const result = [];
    if (typeof start !== 'number' || typeof end !== 'number') {
        return [];
    }

    for (let i = 0; i < end; i++) {
        result.push(i);
    }

    return result;
}

export {
    getCurrentHourMinSeconds,
    range
};

const handleWarning = res => {
    if (res && !res.success) {
        const {message: {warn} = {}} = res;
        if (warn) {
            showWarning(warn);
        }
    }
};

export {handleWarning};

/**
 * 处理过滤字段的映射
 * @param filterItems 当前过滤数据对象
 * @param {object} fields {key: value} key 接口需要的字段 | value为columns中配置的字段
 */
const formatFilterParam = (filterItems = {}, fields) => {
    const res = {};
    for (let key in fields) {
        const value = filterItems[fields[key]];
        res[key] = isNull(value) ? undefined : value;
    }

    return res;
};

export {formatFilterParam};

/**
 * 当前过滤项是否为空
 * @param {*} filterItems
 */
const isFilterNotEmpty = filterItems => {
    if (typeof filterItems !== 'object') {
        return false;
    }

    const keys = Object.keys(filterItems) || [];
    const isNotEmpty = keys.some(item => !isNull(filterItems[item]));

    return isNotEmpty;
};

export {isFilterNotEmpty};

const isOrderNotEmpty = (order, orderBy) => {
    return !!order;
};

const formatSortParam = (order, orderBy, defaultValue) => {
    if (isOrderNotEmpty(order, orderBy)) {
        return {order, orderBy};
    }
    return defaultValue;
};

export {formatSortParam};

const formatSearch = (field, searchValue) => {
    return {[field]: searchValue};
};

export {formatSearch};

// 是否公有云
const pathNames = ['bcetest.baidu.com', 'bce.baidu.com'];
const isConsole = () => {
    const hostname = window.location.hostname;
    return pathNames.some(path => hostname.endsWith(path));
};

export {isConsole};

const getRealPathname = () => {
    const hash = window.location.hash;
    const pathParamString = hash.slice(1) || '';
    const [item] = pathParamString.split('?');
    return item;
};

export {getRealPathname};

/**
 * 获取依赖项的值
 * @param {Array} keys 依赖的字段名
 * @param {*} params
 * @return {string}
 */
export const getDependencyValues = (keys, params) => {
    if (typeof params !== 'object') {
        return '';
    }
    return keys.map(item => {
        const isBasicType = typeof params[item] !== 'object';
        return isBasicType ? params[item] : JSON.stringify(params[item]);
    }).join(',');
};

// 字符串像素装换为number
export const pxStrToNumber = param => {
    if (typeof param !== 'string') {
        console(`util pxStrToNumber param ${param} not a string`);
        return 0;
    }

    const escapeWhiteStr = param.trim();
    const res = escapeWhiteStr.slice(0, escapeWhiteStr.length - 2);
    console.log('res', res);
    return parseInt(res, 10);
};

/**
 * 获取全量select数据
 * @param {*} arr
 * @param {*} value
 * @return {*}
 */
export const getSelectedData = (arr, value) => {
    if (!Array.isArray(arr)) {
        return {};
    }
    const [data] = arr.filter(item => item.value === value);
    return data || {};
};

/**
 * 判断hooks中必传项是否非空
 * @param {*} params 传入的参数值
 * @param {*} keys 传入的必传项key
 * @return {*}
 */
export const isRequiredValueNotNull = (params, keys) => {
    return keys.every(key => {
        const value = params[key];
        return typeof value !== 'undefined' && value !== null;
    });
};

/**
 * @param {*} w 三角形框宽度
 * @param {*} h 三角形框高度
 * @return {*} 三角形中心距顶部的距离
 */
export const calcTriangleCenterLineLength = (w, h) => {
    return (w * w + 4 * h * h) / (8 * h);
};

export const getTopSize = (w, h, borderWidth) => {
    const overlayWidth = w - 2 * borderWidth;
    const overlayHeight = h - 2 * borderWidth;
    const outerCenterLineLength = calcTriangleCenterLineLength(w, h);
    const overlayCenterLineLength = calcTriangleCenterLineLength(overlayWidth, overlayHeight);
    return outerCenterLineLength - overlayCenterLineLength;
};