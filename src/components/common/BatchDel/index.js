import {useState, useEffect} from 'react';
import classnames from 'classnames';

import {Button, modal} from '@baidu/sstrd';
import {ComDeleteModal} from '../index';
import {post} from '@src/server/services';

import {isArrayNull, showSuccess, showError} from '@utils';
import './index.less';

const PREFIX = 'batch-del-btn';
function BatchDel(props) {
    const {
        className,
        disabled,
        data,
        text = '批量删除',
        api,
        message,
        description,
        params,
        handleParams,
        successCallback,
        ...otherProps
    } = props;

    const btnCls = classnames(`${PREFIX}-btn`, className);

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const showLoading = () => {
        setLoading(true);
    };

    const hideLoading = () => {
        setLoading(false);
    };

    const onOpen = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };


    const handleDel = async resParams => {
        try {
            showLoading();
            const res = await post(api, resParams);
            if (res) {
                onClose();
                showSuccess('删除成功');
                successCallback && successCallback();
            }
        } catch (e) {
            showError(e && e.global);
        } finally {
            hideLoading();
        }
    };

    const onClick = async () => {
        onOpen();
    };

    const onOk = () => {
        if (isArrayNull(data)) {
            return;
        }
        handleDel(params);
    };

    return (
        <div className={PREFIX}>
            <Button
                className={btnCls}
                disabled={disabled || isArrayNull(data)}
                onClick={onClick}
                {...otherProps}
            >
                {text}
            </Button>
            <ComDeleteModal
                message={message}
                description={description}
                confirmLoading={loading}
                visible={visible}
                maskClosable={false}
                onCancel={onClose}
                onOk={onOk}
            />
        </div>
    );
}

export default BatchDel;