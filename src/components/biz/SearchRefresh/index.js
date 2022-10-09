/**
 * Author: your name
 * Date: 2021-06-24 18:12:42
 * LastEditTime: 2021-07-19 18:46:54
 * LastEditors: Please set LastEditors
 * Description: In User Settings Edit
 * FilePath: /device-intelligence-platform/src/components/biz/SearchRefresh/index.js
 */
import React from 'react';
import FuzzySearch from '@components/common/InputSearch';
import {RefreshButton} from '@components/common';

export default function SearchRefresh(props) {
    let style = {
        width: 280,
        display: 'flex',
        justifyContent: 'space-between'
    };
    const {onReset} = props;
    return (
        <div style={style}>
            <FuzzySearch {...props} />
            <RefreshButton onClick={onReset} />
        </div>
    );
}
