import React, {useMemo} from 'react';
import classnames from 'classnames';
import {Drawer, Button} from '@baidu/sstrd';
import './index.less';

const PREFIX = 'com-drawer';
const ComDrawer = props => {
    const {
        loading,
        children,
        className,
        onOk, // 点击确定按钮执行的回调
        onCancel, // 点击取消执行的回调函数
        showFooter = true,
        footer,
        width = 600,
        maskClosable = false,
        ...otherProps
    } = props;
    const cls = useMemo(() => {
        return classnames(`${PREFIX}`, className);
    }, [className]);

    const onInnerOk = () => {
        onOk && onOk();
    };

    const onInnerCancel = () => {
        onCancel && onCancel();
    };

    const renderDefaultFooter = () => {
        if (!showFooter) {
            return;
        }
        return (
            <div className={`${PREFIX}-footer`}>
                <Button
                    onClick={onInnerCancel}
                >
                    取消
                </Button>
                <Button
                    type='primary'
                    onClick={onInnerOk}
                    loading={loading}
                    className={`${PREFIX}-footer-sure`}
                >
                    提交
                </Button>
            </div>
        );
    };
    return (
        <Drawer
            width={width}
            maskClosable={maskClosable}
            {...otherProps}
            className={cls}
            footer={footer || renderDefaultFooter()}
            footerStyle={{padding: 0}}
        >
            {children}
        </Drawer>
    );
};

export default ComDrawer;