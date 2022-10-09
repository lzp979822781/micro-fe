import {useState} from 'react';
import {modal} from '@baidu/sstrd';
import {ComDeleteModal} from '@components/common/modal';
import {post} from '@src/server/services';

import {showSuccess, showError} from '@utils';
/**
 * confirm 形式的删除弹框无论成功失败都会关闭
 * @param {*} props
 * @return {*}
 */
function useDelete(props) {

    const {
        api,
        modalMsg,
        modalDesc,
        successCallback,
        handleParams
    } = props;

    const handleDel = async record => {
        try {
            const res = await post(api, handleParams(record));
            if (res) {
                showSuccess('删除成功');
                successCallback && successCallback();
            }
        } catch (e) {
            showError(e && e.global);
        }
    };

    const onOk = record => () => {
        modal.confirm({
            title: modalMsg,
            content: modalDesc,
            onOk: async () => {
                handleDel(record);
            }
        });
    };

    return {
        onOk
    };
}

export {useDelete};

/**
 * 阻塞式删除弹框
 * @param {*} props
 * @return {*}
 */
function useDeleteModal(props) {

    const {
        api,
        message,
        description,
        successCallback,
        handleParams
    } = props;

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const [selectedItem, setSelectedItem] = useState();

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

    const handleDel = async record => {
        try {
            showLoading();
            const res = await post(api, handleParams(record));
            if (res) {
                onClose();
                showSuccess('删除成功');
                successCallback && successCallback(res);
            }
        } catch (e) {
            showError(e && e.global);
        } finally {
            hideLoading();
        }
    };

    const onOk = () => {
        if (!selectedItem) {
            return;
        }
        handleDel(selectedItem);
    };

    const onDel = record => () => {
        setSelectedItem(record);
        onOpen();
    };

    const renderModal = () => {
        return (
            <ComDeleteModal
                message={message}
                description={description}
                confirmLoading={loading}
                visible={visible}
                maskClosable={false}
                onCancel={onClose}
                onOk={onOk}
            />
        );
    };

    return {
        onOk,
        onDel,
        renderModal
    };
}

export {useDeleteModal};

/**
 * 确认弹框
 * @param {*} props
 * @return {*}
 */
function useConfirm(props) {

    const {
        api,
        message,
        description,
        successCallback,
        params
    } = props;

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const showLoading = () => {
        setLoading(true);
    };

    const hideLoading = () => {
        setLoading(false);
    };

    const callBack = res => {
        successCallback && successCallback(res);
    };

    const handleRequest = async () => {

        try {
            showLoading();
            const res = await post(api, params);
            res && callBack(res);
        } catch (e) {
            showError(e && e.global);
        } finally {
            hideLoading();
        }
    };

    const onOpen = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const onOk = () => {
        if (api) {
            handleRequest();
        } else {
            callBack({onClose});
        }
    };

    const renderModal = () => {
        return (
            <ComDeleteModal
                message={message}
                description={description}
                confirmLoading={loading}
                visible={visible}
                maskClosable={false}
                onCancel={onClose}
                onOk={onOk}
            />
        );
    };

    return {
        onOk,
        onOpen,
        onClose,
        renderModal
    };
}

export {useConfirm};