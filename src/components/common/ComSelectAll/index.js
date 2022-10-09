import {useState, useEffect} from 'react';
import classnames from 'classnames';

import {Select} from '@baidu/sstrd';

import {ComSelectAllPanel, ComSelectTag} from './components';

import {useSelectArrow, useDropList} from './hooks';

import {testFieldNames, testOptionData, addLabelAndValue} from './templateData';
import './index.less';

import {isArrayNull} from '@utils';

const PREFIX = 'com-select-all';
function ComSelectAll(props) {
    const {
        className,
        value,
        onChange,
        fieldNames = testFieldNames,
        options = testOptionData,
        isSearchAbled = true,
        api,
        disabled,
        handleParams,
        ...otherProps
    } = props;
    // console.log('props', options);
    const cls = classnames(PREFIX, className);
    const [dropData, setDropData] = useState();
    const checkedList = addLabelAndValue(value, fieldNames);
    const {onDropdownVisibleChange, icon} = useSelectArrow();

    // 用于tag渲染
    const handleSetCheckedList = params => {
        // 如果是form组件走form代理的onChange事件, 否则直接设置选中的数据接口
        if (onChange) {
            onChange(params);
        }
    };

    // 数据请求
    const successCallback = data => {
        setDropData(addLabelAndValue(data, fieldNames));
    };

    const {searchValue, onChange: onSearch} = useDropList({
        api,
        successCallback,
        isSearchAbled,
        handleParams
    });

    const commonProps = {
        fieldNames,
        options: dropData,
        globalDisabled: disabled,
        handleSetCheckedList,
        checkedList
    };

    const renderDrop = () => {
        return (
            <ComSelectAllPanel
                onChange={onChange}
                {...commonProps}
            />
        );
    };

    const renderTag = item => {
        return (
            <ComSelectTag
                {...item}
                {...commonProps}
            />
        );
    };

    const onInputChange = value => {
        console.log('selected value', value);
        let inputValue = value && value.filter(item => item?.label);
        handleSetCheckedList(inputValue);
    };

    const onClear = () => {
        handleSetCheckedList([]);
        // 清空模糊搜索的输入值
        onSearch();
    };
    useEffect(() => {
        setDropData(addLabelAndValue(options, fieldNames));
    }, [options, fieldNames]);

    return (
        <Select
            className={cls}
            mode='tags'
            value={checkedList}
            tagRender={renderTag}
            dropdownRender={renderDrop}
            onChange={onInputChange}
            searchValue={searchValue}
            onSearch={onSearch}
            // fieldNames={fieldNames}
            disabled={disabled}
            allowClear={checkedList.length}
            onClear={onClear}
            onDropdownVisibleChange={onDropdownVisibleChange}
            suffixIcon={icon}
            showArrow
            getPopupContainer={triggerNode => triggerNode.parentNode}
            {...otherProps}
        />
    );
}

export default ComSelectAll;