import {useCallback, useState, useEffect} from 'react';
import classnames from 'classnames';
import {Upload, Modal, notification} from '@baidu/sstrd';
import {PlusOutlined, Loading3QuartersOutlined} from '@ant-design/icons';
import {UploadIcon, UploadErrorMsg, UploadImage} from './components';
import {isNull} from '@utils';
import {upload} from '@server/services';
import {validSize, statusText, cloaseDialogStatus} from './templateData';
import './index.less';

const PREFIX = 'image-upload';
function ImageUpload(props) {
    const {className, value, onChange, otherProps, onStatusChange} = props;
    const cls = classnames(PREFIX, className);
    const [progressVal, setProgressVal] = useState(0);
    const [fileList, setFileList] = useState(value || []);
    const [imageUrl, setImageUrl] = useState();
    const [errorMsg, setErrorMsg] = useState(''); // 错误信息展示
    const [status, setStatus] = useState('ready'); // ready | selected | uploading | success | error
    const [previewImgClick, setPreviewImgClick] = useState(true); // 预览图片点击事件
    const [isOpenFileDialog, setIsOpenFileDialog] = useState(); // 是否打开文件对话框
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState();

    useEffect(() => {
        onStatusChange && onStatusChange(status);
    }, [status]);

    const {
        name = 'avatar',
        accept = '.png, .jpg, .jpeg',
        limitType = ['image/png', 'image/jpeg', 'image/jpg'],
        action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        description = '图片格式: png/jpg/jpeg，图片大小不超过5M',
        limitSize = 5, // 默认单位是M
        extra,
        onError
    } = props;

    useEffect(() => {
        setIsOpenFileDialog(!cloaseDialogStatus.includes(status));
        if (status === 'success') {
            setIsOpenFileDialog(previewImgClick);
        }
    }, [status, previewImgClick]);
    useEffect(() => {
        setFileList(isNull(value) ? [] : value);
        setStatus(isNull(value) ? 'ready' : 'success');
    }, [value]);
    const resetData = useCallback(() => {
        // setFileList([]);
        setProgressVal(0);
        setErrorMsg('');
        // setStatus('ready');
        setPreviewImgClick(true);
        setPreviewVisible(false); // 预览弹框是否展示
    }, []);

    const handleCancel = () => {
        setPreviewImgClick(true);
        // 因为弹框是有预览页触发，预览页的点击事件会触发文件选择,所以关闭的时候要还原文件选择
        setPreviewVisible(false);
    };

    const onUploadProgress = progressEvent => {
        const {lengthComputable, loaded, total} = progressEvent;
        if (!lengthComputable) {
            return;
        }
        const percent = (loaded / total) * 100;
        if (percent === 100) {
            setTimeout(() => {
                setProgressVal(100);
            }, 500);
        } else {
            setProgressVal(percent.toFixed(2));
        }
        // const complete = parseInt(loaded / total * 100, 10);
        // setProgressVal(complete);
        // if (complete === 100) {
        //     setProgressVal(100);
        // }
    };

    const toFormData = params => {
        if (typeof params !== 'object') {
            return;
        }
        const formData = new FormData();
        // Object.keys(params).forEach(key => {
        //     formData.append(key, params[key]);
        //     console.log('formData', formData);
        // });
        const {file} = params;
        formData.append('file', file, file.name);
        return formData;
    };

    const setFormValue = value => {
        const {onChange} = props;
        if (typeof onChange === 'function') {
            onChange(value);
        }
    };

    const executeCallback = params => {
        const {file, response: {data: {data: {fileUrl: url}} = {}}, response} = params;
        file.url = url;
        setStatus('success');
        setFormValue([file]);
        // message.success('上传成功');
        notification.success({
            message: '上传成功',
            duration: 3
        });
    };

    // 执行上传
    const executeUpload = (params, file) => {
        const reqParam = {
            data: params,
            // url: 'http://172.24.159.80:8369/enterprise/employee/import',
            url: action,
            onUploadProgress
        };
        return upload(reqParam).then((response = {}) => {
            // 提示导入成功
            const {data: {success, message}} = response;
            success && executeCallback({file, response});
            !success && setErrorMsg(message);
        }).catch(error => {
            // 提示导入失败
            setStatus('error');
            // message.error(`导入失败,失败原因${error}`);
            notification.error({
                message: `导入失败,失败原因${error}`,
                duration: 3
            });
            setErrorMsg(`${error}`);
            onError && onError();
        });
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

    /**
     * ok按钮回调函数,实际执行的是上传操作
     * 上传成功后关闭弹框
     * 上传失败后重置fileList和loading状态
     */
    const handleUploadFile = file => {
        // if (!files.length) {
        //     message.error('请选择上传文件');
        //     return;
        // }

        // const [file] = files;
        const reqParam = {
            file,
            uploadStream: file,
            ...extra
        };
        setStatus('uploading'); // 设置上传状态
        executeUpload(toFormData(reqParam), file);
    };

    const beforeUpload = async file => {
        resetData();
        const {name: fileName, size, type} = file;
        const isSizePass = validSize(size, limitSize);
        if (!limitType.includes(type)) {
            // message.error('图片格式不正确');
            notification.error({
                message: '图片格式不正确',
                duration: 3
            });
            return Promise.reject();
        } else if (!isSizePass) {
            // message.error('文件大小超出限制');
            notification.error({
                message: '文件大小超出限制',
                duration: 3
            });
            return Promise.reject();
        }
        // 设置文件状态
        setStatus('selected');
        // 存储文件
        const base64Data = await getBase64(file);
        const stream = await fileToStream(file);
        file.base64Data = base64Data;
        file.stream = stream;
        setFileList([file]);
        handleUploadFile(file);

        return false;
    };

    // Upload组件属性
    const uploadProps = {
        name,
        accept,
        action,
        beforeUpload,
        // onChange: handleChange,
        fileList: fileList || [],
        showUploadList: false // 是否展示文件列表,
        // ...otherProps
    };

    const renderIcon = status => {
        if (status === 'error') {
            return <Loading3QuartersOutlined />;
        }
        const uploadProcess = ['selected', 'uploading'];
        if (uploadProcess.includes(status)) {
            return (
                <UploadIcon
                    percent={progressVal}
                />
            );
        }

        return <PlusOutlined />;
    };

    const onPreview = file => {
        const [fileItem] = fileList || [];
        setPreviewImage(file.base64Data || file.url);
        setPreviewVisible(true);
        // 禁止文件选择框弹出
        setPreviewImgClick(false);
    };

    const onDelete = file => {
        // setFileList();
        setFormValue(undefined);
        setPreviewImgClick(false);
        setStatus('ready');
        setTimeout(() => {
            setPreviewImgClick(true);
        }, 0);
    };

    const renderContent = () => {
        const [fileItem] = fileList || [];
        if (status === 'success') {
            return (
                <UploadImage
                    file={fileItem}
                    // src={fileItem?.url || '/static/img/iqi-logo.svg'}
                    src={fileItem?.url}
                    onPreview={onPreview}
                    onDelete={onDelete}
                />
            );
        }
        return (
            <div className={`${PREFIX}-btn`}>
                {renderIcon(status)}
                <div style={{marginTop: 8}}>{statusText[status]}</div>
            </div>
        );
    };

    const renderDescription = () => {
        if (!description) {
            return;
        }
        return (
            <div className={`${PREFIX}-description`}>
                {description}
            </div>
        );
    };

    const renderError = () => {
        if (status !== 'error') {
            return;
        }
        return (
            <UploadErrorMsg>
                上传错误
            </UploadErrorMsg>
        );
    };

    // const [firstFile] = fileList || [];
    return (
        <div className={cls}>
            <Upload
                {...uploadProps}
                openFileDialogOnClick={isOpenFileDialog}
            >
                {renderContent()}
            </Upload>
            {renderDescription()}
            {renderError()}
            <Modal
                centered
                visible={previewVisible}
                title={'图片预览'}
                footer={null}
                onCancel={handleCancel}
            >
                {previewImage && <img alt="example" style={{width: '100%'}} src={previewImage} />}
            </Modal>
        </div>
    );
}

export default ImageUpload;
