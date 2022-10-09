import {useState, useEffect} from 'react';
import classnames from 'classnames';
import {Button} from '@baidu/sstrd';
import {EditOutlined} from '@ant-design/icons';
import styles from './index.module.less';

const PREFIX = 'content-header';
function ContentHeader(props) {
    const {
        className,
        text,
        onClick,
        disabled
    } = props;
    const cls = classnames(styles[PREFIX], className);

    return (
        <div className={cls}>
            <div className={styles[`${PREFIX}-text`]}>{text}</div>
            <Button
                type='text'
                icon={<EditOutlined />}
                onClick={onClick}
                disabled={disabled}
            />
        </div>
    );
}

export default ContentHeader;