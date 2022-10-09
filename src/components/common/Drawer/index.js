/**
 * @file components/common/Drawer 共通抽屉，有其他共通配置请塞到这里:)
 * @author jc
*/

import React from 'react';
import {Drawer, Button} from '@baidu/sstrd';
import classNames from 'classnames';

import './index.less';

const PRE_FIX = 'com-drawer-container';
const PRE_FOOTER_FIX = `${PRE_FIX}-footer`;

export default props => {
    const {
        onCancel,
        onOk,
        cancelBtnProps,
        okBtnProps,
        cancelText = '取消',
        okText = '确认',
        okBtn = true,
        otherBtns,
        className
    } = props || {};
    const prefix = classNames(PRE_FIX, className);

    const handleCancel = () => {
        onCancel && onCancel();
    };

    const handleOk = () => {
        onOk && onOk();
    };
    return (
        <Drawer
            className={prefix}
            width={600}
            destroyOnClose
            footer={(
                <div className={PRE_FOOTER_FIX}>
                    <Button {...cancelBtnProps} onClick={handleCancel}>{cancelText}</Button>
                    {okBtn && <Button type="primary" {...okBtnProps} onClick={handleOk}>{okText}</Button>}
                    {otherBtns}
                </div>
            )}
            {...props}
        >
            {props?.children}
        </Drawer>
    );
};
