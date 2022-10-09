/**
 * Author: your name
 * Date: 2022-04-28 11:00:42
 * LastEditTime: 2022-04-28 9:44:42
 * LastEditors: liuzhipeng03
 * Description: 表格右侧刷新组件
 * FilePath: src/components/biz/TableLeftButtons/index.js
 */
import React, {useState, useEffect} from 'react';
import classnames from 'classnames';
import {Space, Button} from '@baidu/sstrd';
import FuzzySearch from '@components/common/InputSearch';
import {
    DownloadButton,
    AutoUpload,
    BatchDel
} from '@components/common';

import {CreateButton} from '@components/common/buttons';

import {useVisible} from '@hooks';

import './index.less';

const PREFIX = 'table-right-buttons';
function TableLeftButtons(props) {
    const {
        className,
        createProps: {className: createClass, ...otherCreateProps} = {},
        importProps: {
            className: importClass,
            onSuccess: onImportSuccess,
            ...otherImportProps
        } = {},
        deleteProps: {
            className: delClass,
            ...otherDelProps
        } = {},
        spaceSize = 8
    } = props;
    const cls = classnames(PREFIX, className);

    const {
        visible,
        onClose,
        onOpen
    } = useVisible();

    const mergeCreateCls = classnames(`${PREFIX}-create`, createClass);
    const mergeImportCls = classnames(`${PREFIX}-import`, importClass);
    const mergeDeleteCls = classnames(`${PREFIX}-delete`, delClass);

    const onImport = () => {
        onOpen();
    };

    const onSuccess = () => {
        onImportSuccess && onImportSuccess();
        onClose();
    };

    return (
        <div className={cls}>
            <Space size={spaceSize}>
                <CreateButton {...otherCreateProps} className={mergeCreateCls} />
                <Button className={mergeImportCls} onClick={onImport}>一键导入</Button>
                <BatchDel {...otherDelProps} className={mergeDeleteCls} />
                <AutoUpload
                    visible={visible}
                    onClose={onClose}
                    onSuccess={onSuccess}
                    {...otherImportProps}
                />
            </Space>
        </div>
    );
}

export default TableLeftButtons;