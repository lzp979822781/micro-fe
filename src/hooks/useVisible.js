import {useState} from 'react';

import {useBasicDispatch} from './index';

/**
 * @param {boolean} visible 弹框后抽屉是否可见
 * @return {*}
 */
function useVisible(props) {
    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false);
    };

    const onOpen = () => {
        setVisible(true);
    };

    return {
        visible,
        onClose,
        onOpen
    };
}

export {useVisible};

/**
 * @param {string} action redux action
 * @param {function} callRedux redux方法调用
 * @return {*}
 */
function useDispatchVisible(props) {
    const {action} = props;
    const {callRedux} = useBasicDispatch();

    const onOpen = () => {
        callRedux(action, true);
    };

    const onClose = () => {
        callRedux(action, false);
    };

    return {onOpen, onClose};
}

export {useDispatchVisible};
