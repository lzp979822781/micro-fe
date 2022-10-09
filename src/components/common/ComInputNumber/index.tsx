import React from 'react';
import classnames from 'classnames';

import {InputNumber} from '@baidu/sstrd';
import './index.less';

const PREFIX = 'com-input-number';
function ComInputNumber(props) {
    const {className, ...otherProps} = props;
    const cls = classnames(PREFIX, className);

    return (
        <InputNumber
            className={cls}
            {...otherProps}
        />
    );
}

export default ComInputNumber;