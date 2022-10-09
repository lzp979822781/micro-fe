/**
 * @file hooks/useUpload 上传hooks
 * @author v_jinenchen
*/

import {cloneDeep} from 'lodash';
import {useState, useEffect} from 'react';

import {Tooltip, message, Upload} from '@baidu/sstrd';
import {getByteLength} from 'utils';
import {FILE_NAME_LIMIT_SIZE} from 'constants/constants';

import api from 'configure/api';
import actions from 'actions';

const useUpload = props => {
    const {files = [], options = {}, otherParams = {}, validFile} = props || {};
    const [allowDel, updateAllowDel] = useState(true);
    const [fileList, updateFileList] = useState([]); // 完全控制的文件列表

    // 客制化处理，冗余文件与文件列表联动 start
    const {otherMergeCheckFile} = otherParams;
    useEffect(() => {
        if (!otherMergeCheckFile || Object.keys(otherMergeCheckFile)?.length === 0) {
            return;
        }
        const {
            type,
            showPic,
            fileName,
            fileUrl,
            fileUuid,
            position
        } = otherMergeCheckFile;
        // 文件列表重复检查
        let isExists = fileList.some(({name}) => name === fileName);
        if (isExists) {
            return;
        }
        let mergeItem = {
            name: fileName,
            response: {
                result: [
                    {
                        name: fileName,
                        position: position,
                        uid: fileUuid
                    }
                ]
            },
            status: 'done',
            uid: fileUuid,
            url: fileUrl
        };
        let _newList = [...fileList];
        // 名片重复检查, 重复的替换，不重复的话添加
        let _index = fileList.findIndex(({url}) => url === showPic);
        if (_index !== -1 && fileList.length === 11) {
            _newList[_index] = mergeItem;
        } else {
            _newList.push(mergeItem);
        }
        updateFileList(_newList);
    }, [otherMergeCheckFile]);
    // end

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

    // 初始化文件列表、校验列表
    useEffect(() => {
        if (files.length === 0) {
            return;
        }
        let defaultList = formatInitFileList(files);
        updateFileList(defaultList);
    }, [files]);

    const checkFileNameSize = fileName => {
        return getByteLength(fileName) > FILE_NAME_LIMIT_SIZE;
    };

    const uploadOption = {
        action: `${api.expertFileUpload}`,
        multiple: true,
        name: 'uploadStream',
        maxCount: 10,
        fileList,
        itemRender: (item, file) => (
            <Tooltip title={file.name} placement="top">
                {item}
            </Tooltip>
        ),
        beforeUpload: async file => {
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

            // 检验已保存到后台的列表
            if (validFile) {
                if (!validFile(file)) {
                    return Upload.LIST_IGNORE;
                }
                return Promise.resolve();

            }
            return Promise.resolve();
        },
        onRemove: async file => {
            let _newList = cloneDeep(fileList);
            _newList = _newList.filter(({name}) => name !== file.name);
            updateFileList(_newList);
            // 后端这里的设计非常不合理:)，前端去掉这个删除接口
            // if (!allowDel) {
            //     message.warn('删除中，请稍候再试');
            //     return false;
            // }
            // try {
            //     updateAllowDel(false);
            //     const {response} = file;
            //     let params = (response?.result || [])[0];
            //     await actions.delExpertFile({
            //         fileUuid: params?.uid,
            //         position: params?.position
            //     });
            //     let _newList = cloneDeep(fileList);
            //     _newList = _newList.filter(({name}) => name !== file.name);
            //     updateFileList(_newList);
            // }
            // catch (err) {
            //     console.error('on remove error: ', err);
            // }
            // finally {
            //     setTimeout(() => {
            //         updateAllowDel(true);
            //     }, 500);
            // }
        },
        onChange: e => {
            const {file, fileList} = e;
            updateFileList(fileList);
        },
        ...options
    };

    return {
        uploadOption,
        checkList: fileList,
        updateCheckList: updateFileList
    };
};

export default useUpload;