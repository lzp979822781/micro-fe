import {genUuid} from '@utils';
const mime = require('mime');

const addArrkey = data => {
    if (!Array.isArray(data)) {
        return data;
    }

    return data.map(item => ({content: item, key: genUuid()}));
};

export {addArrkey};

const alertMessage = '为保证数据顺利导入，请按照提供的模板规定录入信息 ，';
const fileMessage = '支持csv文件，大小不超过100M；重复导入会覆盖原先板材信息';
const defaultDownloadTitle = '下载板材信息模板';

const getLimtFileType = (fileTypes, separator = ',') => {
    if (!fileTypes) {
        return [];
    }

    return fileTypes.split(separator)
        .map(item => item.trim())
        .map(item => mime.getType(item));
};

export {
    alertMessage,
    fileMessage,
    defaultDownloadTitle,
    getLimtFileType
};