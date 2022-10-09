import classnames from 'classnames';
import {ComTooltip} from '../../../index';

import {Tag} from '@baidu/sstrd';

import {handleDelete} from '../../templateData';
import './index.less';

const PREFIX = 'com-select-tag';
function ComSelectTag(props) {
    const {
        className,
        fieldNames = {},
        value,
        onClose,
        checkedList,
        onChange,
        handleSetCheckedList,
        globalDisabled,
        ...otherProps
    } = props || {};
    const {disabled, label} = value || {};

    const isDisabled = disabled || globalDisabled;
    const cls = classnames(PREFIX, className, {
        [`${PREFIX}-disabled`]: isDisabled
    });

    const onInnerClose = () => {
        const afterDeleteArr = handleDelete(checkedList, value, fieldNames);
        handleSetCheckedList(afterDeleteArr);
        // onClose && onClose(event);
    };

    /**
     * 阻止由于tag操作造成select下拉框收起
     * @param {*} event
     */
    const onPreventMouseDown = event => {
        event.preventDefault();
        event.stopPropagation();
    };

    if (!props) {
        return null;
    }

    return (
        <Tag
            className={cls}
            onClose={onInnerClose}
            onMouseDown={onPreventMouseDown}
            {...otherProps}
        >
            <ComTooltip title={label} width={58}>
                <div className={`${PREFIX}-label`}>
                    {label}
                </div>
            </ComTooltip>
        </Tag>
    );
}

export default ComSelectTag;