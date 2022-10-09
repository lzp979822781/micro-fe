import {useDelete, useDeleteModal, useConfirm} from './common';

import useBasicDispatch from './useBasicDispatch';
import useRequest from './useRequest';

import {useVisible, useDispatchVisible} from './useVisible';
import useChange from './useChange';

// 表格相关
import useTableFn from './useTableFn';

import useDetail from './useDetail';

// 下拉筛选
export {default as useDrop} from './useDrop';

// 获取前一个值
export {default as usePrevious} from './usePrevious';

// 搜索框相关hooks
export {default as useSearch} from './useSearch';

export {default as useHashHistory} from './useHashHistory';


export {
    useDelete,
    useDeleteModal,
    useConfirm,

    useBasicDispatch,
    useRequest,

    useVisible,
    useChange,
    useDispatchVisible,
    useTableFn,

    useDetail
};