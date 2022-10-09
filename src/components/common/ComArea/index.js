import {useState, useRef} from 'react';
import classnames from 'classnames';
import {Input} from '@baidu/sstrd';

import {isNull} from './templateData';
import './index.less';

const {TextArea} = Input;

const PREFIX = 'com-area';
function ComArea(props) {
    const {className, value, maxLength, ...otherProps} = props;
    const [focused, setFocused] = useState(false);
    const timeRef = useRef();
    const cls = classnames(PREFIX, className, {
        [`${PREFIX}-focused`]: focused
    });

    const onFocus = () => {
        clearTimeout(timeRef.current);
        setFocused(true);
    };

    const onBlur = () => {
        timeRef.current = setTimeout(() => {
            setFocused(false);
        }, 200);
    };

    const renderLength = () => {
        if (!maxLength) {
            return;
        }

        return (
            <div className={`${PREFIX}-length`} onClick={onFocus}>
                {`${isNull(value) ? 0 : value.length}/${maxLength}`}
            </div>
        );
    };

    return (
        <div className={cls}>
            <TextArea
                className={`${PREFIX}-input`}
                value={value}
                maxLength={maxLength}
                {...otherProps}
                onFocus={onFocus}
                onBlur={onBlur}
            />

            {renderLength()}
        </div>
    );
}

export default ComArea;