import React from 'react';
import classnames from 'classnames';
import styles from './index.module.less';

const PREFIX = 'table-container';
function TableContainer(props) {
    const {className, children} = props;
    const cls = classnames(styles[PREFIX], className);

    return (
        <div className={styles[`${PREFIX}-container`]}>
            <div className={cls}>{children}</div>
        </div>
    );
}

export default TableContainer;