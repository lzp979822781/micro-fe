import React, {useState, useEffect} from 'react';
import classnames from 'classnames';
import {ComTooltip} from '../../common';
import './index.less';

const PREFIX = 'click-text';
function ClickText(props) {
    const {
        className,
        text,
        onClick,
        disabled,
        placeholder,
        width,
        rows
    } = props;
    const cls = classnames(PREFIX, className, `${PREFIX}-${rows}`, {
        [`${PREFIX}-disabled`]: disabled
    });

    const onInnerClick = () => {
        if (disabled) {
            return;
        }

        onClick && onClick();
    };

    if (!text) {
        return placeholder;
    }

    return (
        <ComTooltip title={text} width={width}>
            <div className={cls} onClick={onInnerClick}>{text}</div>
        </ComTooltip>
    );
}

export default ClickText;