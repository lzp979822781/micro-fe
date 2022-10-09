import React from 'react';
import classnames from 'classnames';

import {ComInputNumber} from '@components/common';
import './index.less';

const PREFIX = 'custom-input-number';
function CustomInputNumber(props) {
    const {className, ...otherProps} = props;
    const cls = classnames(`${PREFIX}-content`, className);
    const {addonBefore, addonAfter} = otherProps;

    const renderLeft = () => {
        return <div className={`${PREFIX}-left`}>{addonBefore}</div>;
    };

    const renderRight = () => {
        return <div className={`${PREFIX}-right`}>{addonAfter}</div>;
    };

    return (
        <div className={PREFIX}>
            <ComInputNumber
                addonBefore={renderLeft()}
                addonAfter={renderRight()}
                className={cls}
                {...otherProps}
            />
        </div>
    );
}

export default CustomInputNumber;