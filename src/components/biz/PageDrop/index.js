import React from 'react';
import classnames from 'classnames';

import {
    DownOutlined,
    UpOutlined
} from '@ant-design/icons';

import {useDrop} from '@hooks';
import styles from './index.module.less';

const PREFIX = 'page-drop';
function PageDrop(props) {
    const {
        className,
        text = '高级筛选',
        onDropVisibleChange
    } = props;
    const cls = classnames(styles[PREFIX], className);
    const {
        open,
        onClick,
        onMouseOut,
        onMouseOver
    } = useDrop({
        defaultOpen: false,
        disabled: false,
        onDropVisibleChange
    });

    return (
        <div
            className={cls}
            onClick={onClick}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
        >
            <div className={styles[`${PREFIX}-text`]}>{text}</div>
            {open ? <UpOutlined /> : <DownOutlined />}
        </div>
    );
}

export default PageDrop;