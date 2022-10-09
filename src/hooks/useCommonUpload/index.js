/**
 * @file hooks/useUpload 上传hooks
 * @author v_jinenchen
*/

import {cloneDeep} from 'lodash';
import {useState} from 'react';

import {Tooltip, message, Upload} from '@baidu/sstrd';
import {getByteLength} from 'utils';
import {FILE_NAME_LIMIT_SIZE} from 'constants/constants';

import api from 'configure/api';
const protocal = window.location.protocol;
const UseCommonUpload = props => {
    const {files = [], options = {}, validFile} = props || {};
    const [fileList, updateFileList] = useState([]); // 完全控制的文件列表

    // 格式化回显文件列表，方便后续校验、删除、提交保存
    const formatInitFileList = files => {
        return files.map(({fileName, fileUrl, fileUuid, position}) => ({
            uid: fileUuid,
            name: fileName ? decodeURI(fileName) : fileName,
            status: 'done',
            url: fileUrl,
            response: {
                result: [{name: fileName, uid: fileUuid, position}]
            }
        }));
    };

    const checkFileNameSize = fileName => {
        return getByteLength(fileName) > FILE_NAME_LIMIT_SIZE;
    };

    const uploadOption = {
        action: `${api.expertFileUpload}`,
        multiple: true,
        name: 'uploadStream',
        maxCount: 10,
        defaultFileList: formatInitFileList(files),
        itemRender: (item, file) => (
            <Tooltip title={file.name} placement="top">
                {item}
            </Tooltip>
        ),
        beforeUpload: file => {
            const {name, size} = file;
            // 文件格式校验
            let lastIndex = name.lastIndexOf('.') + 1;
            let type = name.substring(lastIndex); // 文件后缀
            type = type.toLowerCase();
            if (type !== 'docx' && type !== 'jpg' && type !== 'png' && type !== 'pdf' && type !== 'doc') {
                message.warn(`支持docx、jpg、png、pdf格式，可上传${options?.maxCount || 10}个附件`);
                return Upload.LIST_IGNORE;
            }
            // 文件大小校验
            let sizeByMb = size / Math.pow(1024, 2);
            if (sizeByMb > 10) {
                message.warn('文件不允许超过10M');
                return Upload.LIST_IGNORE;
            }
            // 文件列表重复检查
            let isExists = fileList.some(({name: _name}) => _name === name);
            if (isExists) {
                message.warn(`${name}已存在，请不要重复上传文件`);
                return Upload.LIST_IGNORE;
            }

            // 文件名长度检查
            if (checkFileNameSize(name)) {
                message.warn('文件名长度不能超过45个字符');
                return Upload.LIST_IGNORE;
            }

            if (validFile) {
                if (!validFile(file)) {
                    return Upload.LIST_IGNORE;
                } else {
                    return Promise.resolve();
                }
            }
            return Promise.resolve();
        },
        onRemove: async file => {
            let _newList = cloneDeep(fileList);
            _newList = _newList.filter(({name}) => name !== file.name);
            updateFileList(_newList);
        },
        onChange: e => {
            const {file, fileList} = e;
            if (file.status === 'done') {
                updateFileList(fileList);
            }
        },
        ...options
    };

    return {
        uploadOption,
        fileList,
        updateFileList
    };
};

export default UseCommonUpload;