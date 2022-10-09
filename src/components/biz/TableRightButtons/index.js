/**
 * Author: your name
 * Date: 2022-04-28 9:44:42
 * LastEditTime: 2022-04-28 9:44:42
 * LastEditors: liuzhipeng03
 * Description: 表格右侧刷新组件
 * FilePath: src/components/biz/TableRightButtons/index.js
 */
import React, {useState, useEffect} from 'react';
import classnames from 'classnames';
import {Space} from '@baidu/sstrd';
import FuzzySearch from '@components/common/InputSearch';
import {
    RefreshButton,
    DownloadButton
} from '@components/common';

import './index.less';

const PREFIX = 'table-right-buttons';
function TableRightButtons(props) {
    const {
        className,
        searchProps: {className: searchClass, ...otherSearchProps} = {},
        refreshProps: {className: refreshClass, ...otherRefreshProps} = {},
        downloadProps: {className: downloadClass, ...otherDownProps} = {},
        spaceSize = 8
    } = props;
    const cls = classnames(PREFIX, className);

    const mergeSearchCls = classnames(`${PREFIX}-search`, searchClass);
    const mergeRefreshCls = classnames(`${PREFIX}-refresh`, refreshClass);
    const mergeDownCls = classnames(`${PREFIX}-download`, downloadClass);
    return (
        <div className={cls}>
            <Space size={spaceSize}>
                <FuzzySearch {...otherSearchProps} className={mergeSearchCls} />
                <RefreshButton {...otherRefreshProps} className={mergeRefreshCls} />
                <DownloadButton {...otherDownProps} className={mergeDownCls} />
            </Space>
        </div>
    );
}

export default TableRightButtons;