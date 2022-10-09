
import {forwardRef} from 'react';
import classnames from 'classnames';
import {Input} from '@baidu/sstrd';

import {isNull} from './templateData';
import './index.less';

const PREFIX = 'com-input';
const ComInput = forwardRef((props, ref) => {
    const {className, value, onChange, maxLength, cut = true, ...otherProps} = props;
    const cls = classnames(PREFIX, className);
    const {disabled} = otherProps;
    const onInnerChange = e => {
        const changeValue = e.target.value;
        if (typeof maxLength === 'number') {
            if (cut && !isNull(changeValue) && changeValue.length > maxLength) {
                onChange && onChange(changeValue.slice(0, maxLength));
                return;
            }
        }
        onChange && onChange(changeValue);
    };

    const renderLength = () => {
        if (!maxLength) {
            return;
        }

        return (
            <div className={`${PREFIX}-length`}>
                {`${isNull(value) ? 0 : value.length}/${maxLength}`}
            </div>
        );
    };

    return (
        <div className={cls}>
            <Input
                ref={ref}
                value={value}
                className={disabled ? `${PREFIX}-input edit-disable-input` : `${PREFIX}-input`}
                onChange={onInnerChange}
                {...otherProps}
            />
            {!disabled && renderLength()}
        </div>
    );
});

export default ComInput;