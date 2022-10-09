/**
 * Author: your name
 * Date: 2021-07-06 10:37:00
 * LastEditTime: 2021-07-19 18:31:17
 * LastEditors: Please set LastEditors
 * Description: In User Settings Edit
 * FilePath: /device-intelligence-platform/src/components/common/SearchTable/fuzzySearch.js
 */
import React, {useState} from 'react';
import {Input} from '@baidu/sstrd';
import classnames from 'classnames';
import './index.less';

const {Search} = Input;
const PREFIX = 'com-search';
export default function InputSearch(props) {
    const {className} = props;
    const {placeholder = '请输入', width = 200, onSearch, value, onChange} = props;

    const [focused, setFocused] = useState(false);

    const onFocus = () => {
        setFocused(true);
    };

    const onBlur = () => {
        setFocused(false);
    };

    const cls = classnames(PREFIX, className, {
        [`${PREFIX}-focus`]: focused
    });


    return (
        <Search
            className={cls}
            placeholder={placeholder}
            onSearch={onSearch}
            style={{width}}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
}
