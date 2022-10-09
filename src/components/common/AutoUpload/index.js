import React, {useState, useEffect, useCallback} from 'react';
import {Upload, Button, Modal, Progress, Popconfirm} from '@baidu/sstrd';
import classnames from 'classnames';
import {
    UploadOutlined,
    PaperClipOutlined,
    CloseOutlined
} from '@ant-design/icons';
import UploadIcon from '@images/icons/upload.svg';

import {ComAlert} from '../index';
import StarSvg from './red.svg';
import {download, upload} from '@src/server/services';

import {showSuccess, showError} from '@utils';
import {
    addArrkey,
    alertMessage,
    fileMessage,
    defaultDownloadTitle,
    getLimtFileType
} from './utils';
import './index.less';
const PREFIX = 'auto-upload';
const FILE_SELECTED_PREFIX = `${PREFIX}-file-selected`;
const FILE_PREFIX = `${PREFIX}-file`;
function AutoUpload(props) {
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progressVal, setProgressVal] = useState(0);
    const [completeStatus, setCompleteStatus] = useState('active');
    const [status, setStatus] = useState('ready'); // ready | uploading | success | error
    const [partialSuccessMsg, setPartialSuccessMsg] = useState(''); // 部分导入成功提示信息
    const [errorMsg, setErrorMsg] = useState(''); // 错误信息展示
    const [confirmLoading, setConfirmLoading] = useState(false); // 确认按钮loading
    const [errorNums, setErrorNums] = useState(0);
    const [hideOk, setHideOk] = useState(false);
    const {
        name = 'file',
        // 上传url
        uploadUrl = 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        // 下载url
        downloadUrl = '/abc',
        validUrl, //
        uploadTitle = '上传文件', // 上传按钮文本
        downloadTitle = defaultDownloadTitle, // 下载按钮文本
        downloadText = alertMessage,
        accept = '.csv', // 接受的文件类型
        promptText = fileMessage, // 上传提示信息
        onClose, // 关闭操作执行的函调函数
        onSuccess, // 上传成功后执行的回调操作
        onError, // 上传失败后执行的回调操作
        limitSize = 100, // 文件限制大小
        extra = {} // 额外携带的请求参数
    } = props;
    const {
        visible = false,
        title = '批量导入'
    } = props;
    const mimeTypes = getLimtFileType(accept);

    const resetData = useCallback(() => {
        setFileList([]);
        setProgressVal(0);
        setLoading(false);
        setConfirmLoading(false);
        setStatus('ready');
        setPartialSuccessMsg('');
        setErrorMsg('');
        setErrorNums(0);
        setHideOk(false);
    }, []);

    const executeCallback = () => {
        // 关闭当前窗口执行回调
        onClose && onClose();
        onSuccess && onSuccess();
    };

    const onUploadProgress = progressEvent => {
        const {lengthComputable, loaded, total} = progressEvent;
        if (!lengthComputable) {
            return;
        }
        const complete = parseInt(loaded / total * 100, 10);
        setProgressVal(complete);
        if (complete === 100) {
            setCompleteStatus('success'); // 更新进度条状态
            // setLoading(false);
        }
    };

    const handleRes = (response = {}) => {
        const {result: {totalNums, successNums, errorList = [], errorNums}} = response;
        const totalMsg = `共有数据：${totalNums}条`;
        const successMsg = `校验通过：${successNums}条`;
        const failMsg = `校验失败：${errorNums}条`;
        const failArrMsg = '失败信息：';
        const errorKeyList = addArrkey(errorList);
        setErrorNums(errorNums);
        setHideOk(true);
        // const msg = `${totalMsg}` + <br /> + `${successMsg}${failMsg}${failArrMsg}`;
        const ErrorMsg = (
            <>
                <p>{`${totalMsg}`}</p>
                <p>{`${successMsg}`}</p>
                <p className={`${PREFIX}-msg-error`}>{`${failMsg}`}</p>
                <p className={`${PREFIX}-msg-error`}>{`${failArrMsg}`}</p>
                {
                    Array.isArray(errorKeyList) && errorKeyList.map(item => {
                        const {content, key} = item;
                        return <p className={`${PREFIX}-msg-error`} key={key}>{content}</p>;
                    })
                }
            </>
        );
        setPartialSuccessMsg(ErrorMsg);
    };

    const handleTotalSuccess = () => {
        showSuccess('校验通过');
    };

    const handleError = (data = {}) => {
        const {message: {global}} = data;
        setErrorMsg(global);
    };

    // 执行上传
    const executeUpload = params => {
        const reqParam = {
            data: params,
            // url: 'http://172.24.159.80:8369/enterprise/employee/import',
            url: uploadUrl,
            onUploadProgress
        };
        return upload(reqParam).then((response = {}) => {
            // 提示导入成功
            setConfirmLoading(false);
            const {data: {success}} = response;
            success && executeCallback();
            !success && onClose && onClose();
        }).catch(error => {
            // 提示导入失败
            setLoading(false);
            setConfirmLoading(false);
            showError(`导入失败,失败原因${error}`);
            onError && onError();
        });
    };

    const toFormData = params => {
        if (typeof params !== 'object') {
            return;
        }
        const formData = new FormData();
        Object.keys(params).forEach(key => {
            formData.append(key, params[key]);
        });
        return formData;
    };

    /**
     * ok按钮回调函数,实际执行的是上传操作
     * 上传成功后关闭弹框
     * 上传失败后重置fileList和loading状态
     */
    const handleUploadFile = useCallback(
        () => {
            if (!fileList.length) {
                showError('请选择上传文件');
                return;
            }
            if (!fileList.length) {
                return;
            }
            const [file] = fileList;
            const {name} = file;
            const reqParam = {
                // file: name,
                // uploadStream: base64Data,
                uploadStream: file,
                ...extra
            };
            setConfirmLoading(true);
            executeUpload(toFormData(reqParam));
        },
        [fileList, resetData],
    );

    const handleCancel = useCallback(
        () => {
            onClose && onClose();
        },
        [onClose],
    );

    /**
     * 新ok方法,点击确定直接去执行回调
     */
    const onOk = () => {
        if (!fileList.length) {
            showError('请选择上传文件');
            return;
        }
        executeCallback();
    };

    const modalProps = {
        title,
        visible,
        width: '520px',
        className: PREFIX,
        onOk: onOk,
        onCancel: handleCancel,
        okText: '确定',
        cancelText: errorNums || hideOk ? '关闭' : '取消',
        okButtonProps: {
            className: classnames({
                [`${PREFIX}-hide`]: errorNums || hideOk
            }),
            disabled: !!hideOk
        },
        confirmLoading
    };

    // 获取文件的base64格式
    const getBase64 = useCallback(
        file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        []
    );

    /**
     * file文件类型转二进制
     * @param {*} file
     * @return {*}
     */
    const fileToStream = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = event => resolve(event.target.result);
            reader.onerror = error => reject(error);
        });
    };

    const executeValid = params => {
        const reqParam = {
            data: params,
            // url: 'http://172.24.159.80:8369/enterprise/employee/import',
            url: validUrl,
            onUploadProgress
        };
        return upload(reqParam).then((response = {}) => {
            // 提示导入成功
            console.log('response', response);
            const {data: {success, result}, data} = response;
            const {errorNums, errorList} = result || {};
            if (success && errorNums === 0 && errorList.length === 0) {
                handleTotalSuccess();
            } else if (errorList.length !== 0) {
                showError('文件内容校验失败！');
            }
            !success && handleError(data);
            success && handleRes(data);
            !success && setHideOk(true);
        }).catch(error => {
            // 提示导入失败
            setLoading(false);
            showError(`校验失败,失败原因${error}`);
        });
    };

    // 上传前校验
    const handleValid = file => {
        setLoading(true);
        setStatus('uploading');
        const {name} = file;
        const reqParam = {
            // file: name,
            // uploadStream: base64Data,
            uploadStream: file,
            ...extra
        };
        executeValid(toFormData(reqParam));
    };

    // 上传文件拦截
    const beforeUpload = async file => {
        resetData();
        // 限制文件不超过5M
        if (!mimeTypes.includes(file.type)) {
            showError('文件类型不正确');
            return Promise.reject();
        }
        const isLt5M = file.size / 1024 / 1025 <= limitSize;
        if (!isLt5M) {
            showError(`大小不超过${limitSize}M`);
            return Promise.reject();
        }
        // const data = cloneDeep(fileList);
        // 文件列表中设置base64数据
        const base64Data = await getBase64(file);
        const stream = await fileToStream(file);
        file.base64Data = base64Data;
        file.stream = stream;
        setFileList([file]);
        handleValid(file);
        return Promise.reject();
    };

    // 弹框的开闭状态改变后,需要重置文件列表
    useEffect(() => {
        resetData();
    }, [visible]);

    // Upload组件属性
    const uploadProps = {
        name,
        action: uploadUrl,
        accept,
        beforeUpload,
        // onChange: handleChange,
        fileList
    };

    const onDownload = useCallback(
        () => {
            download(downloadUrl);
        },
        [downloadUrl],
    );

    const renderProgress = useCallback(
        () => {
            if (!loading) {
                return;
            }
            return (
                <div className={`${PREFIX}-progress`}>
                    <Progress
                        percent={progressVal}
                        status={completeStatus}
                        // strokeColor='#0BC286'
                        strokeWidth={2}
                        size='small'
                        trailColor='#E8E9EB'
                    />
                </div>
            );
        },
        [progressVal, completeStatus, loading],
    );

    const onDel = file => () => {
        const res = fileList.filter(item => item.uid !== file.uid);
        setFileList(res);
        resetData();
    };

    const renderDel = item => {
        // 上传成功后不允许删除
        if (status === 'success') {
            return;
        }
        return (
            <div className={`${FILE_PREFIX}-del`} onClick={onDel(item)}>
                <CloseOutlined />
            </div>
        );
    };

    const renderSelectedFile = () => {
        const [item = {}] = fileList;
        const {name} = item;
        if (!fileList.length) {
            return;
        }
        const cls = classnames(`${PREFIX}-file-selected`, {
            [`${FILE_SELECTED_PREFIX}-success`]: status === 'success',
            [`${FILE_SELECTED_PREFIX}-error`]: status === 'error'
        });

        /* const iconCls = classnames(`${FILE_SELECTED_PREFIX}-icon`, {
            [`${FILE_SELECTED_PREFIX}-icon-success`]: status === 'success'
        }); */
        return (
            fileList.map(item => {
                return (
                    <div key={item.uid} className={cls}>
                        <div className={`${FILE_PREFIX}-icon`}>
                            <PaperClipOutlined />
                        </div>
                        <div className={`${FILE_PREFIX}-text`}>
                            {name}
                        </div>
                        {renderDel(item)}
                    </div>
                );
            })
        );
    };

    const renderPartialSucMsg = () => {
        if (!fileList.length || !partialSuccessMsg) {
            return;
        };
        return (
            <div className={`${PREFIX}-partial`}>
                {partialSuccessMsg}
            </div>
        );
    };

    const renderError = () => {
        if (!fileList.length || !errorMsg) {
            return;
        }
        return (
            <div className={`${PREFIX}-error`}>
                {errorMsg}
            </div>
        );
    };

    const renderAlert = () => {
        return (
            <div className={`${PREFIX}-alert`}>
                <ComAlert>
                    <div
                        className={`${PREFIX}-alert-download`}
                    >
                        {downloadText}
                        <span
                            className={`${PREFIX}-alert-download-text`}
                            onClick={onDownload}
                        >
                            {downloadTitle}
                        </span>
                    </div>
                </ComAlert>
            </div>
        );
    };

    const renderBody = () => {
        return (
            <div className={`${PREFIX}-body`}>
                <div className={`${PREFIX}-body-title`}><StarSvg className={`${PREFIX}-body-star`} />选择文件:</div>
                <div className={`${PREFIX}-body-container`}>
                    <div className={`${PREFIX}-body-right`}>
                        <div className={`${PREFIX}-body-right-upload`}>
                            <Upload {...uploadProps}>
                                <Button
                                    // className={`${PREFIX}-body-right-upload-text`}
                                    icon={<UploadIcon />}
                                    fileList={fileList}
                                >
                                    {uploadTitle}
                                </Button>
                            </Upload>
                        </div>
                    </div>
                    <div className={`${PREFIX}-body-prompt`}>
                        {promptText}
                    </div>
                    {fileList.length > 0 && (
                        <div className={`${PREFIX}-body-panel`}>
                            {renderSelectedFile()}
                            {!hideOk && renderProgress()}
                        </div>
                    )}
                    {(partialSuccessMsg || errorMsg) && (
                        <div className={`${PREFIX}-body-mes`}>
                            {renderPartialSucMsg()}
                            {renderError()}
                        </div>
                    )}
                </div>
            </div>
        );
    };
    return (
        <Modal
            {...modalProps}
        >
            {renderAlert()}
            {renderBody()}
        </Modal>
    );
}

export default AutoUpload;