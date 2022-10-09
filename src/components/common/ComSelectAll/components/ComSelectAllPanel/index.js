import {useState, useEffect} from 'react';
import classnames from 'classnames';
import {Checkbox} from '@baidu/sstrd';
import {cloneDeep} from 'lodash';

import {ComSelectAllEmpty} from '../index';

import {isArrayNull} from '@utils';

import {
    formatOptions,
    formatSelectValue,
    filterValueFromIds
} from '../../templateData';

import './index.less';

const CheckboxGroup = Checkbox.Group;

const PREFIX = 'com-select-all-panel';
const ComSelectAllPanel = props => {
    const {
        className,
        options,
        checkedList,
        handleSetCheckedList,
        fieldNames
    } = props;

    const cls = classnames(PREFIX, className);

    const [indeterminate, setIndeterminate] = useState(false);
    const [showAllDisabled, setShowAllDisabled] = useState(false);
    const [listData, setListData] = useState([]); // 存储过滤后的options内容

    // 公共处理options数据的内容
    const reducerOptions = data => {
        let _listData = cloneDeep(data);
        let _list = _listData.filter(item => !item?.disabled);
        return _list;
    };

    const handleCheckedValue = checkedIds => {
        const checkedValues = filterValueFromIds(options, checkedIds, fieldNames);
        handleSetCheckedList(checkedValues);
    };

    const onInnerChange = list => {
        let _list = reducerOptions(options);
        setListData(_list);
        handleCheckedValue(list);
        setIndeterminate(!!list.length && list.length < _list.length);
    };

    const onCheckAllChange = e => {
        // 点击全部过滤禁用状态的不选中
        let list = reducerOptions(options);
        setListData(list);
        handleSetCheckedList(e.target.checked ? list : []);
        setIndeterminate(false);
    };


    // 监听传过来多选的数据进行一个全选的禁用状态
    useEffect(() => {
        if (!options) {
            return;
        }
        // 编辑的时候内容如果全部选中全部默认选中
        let _list = reducerOptions(options);
        setListData(_list);
        // 初始化新建编辑选中内容全选状态修改
        setIndeterminate(!checkedList.length ? !!checkedList.length : checkedList.length < _list.length);
        // 全选反选
        let res = options.every(item => item?.disabled);
        setShowAllDisabled(res);
    }, [options]);



    if (isArrayNull(options)) {
        return <ComSelectAllEmpty />;
    }
    return (
        <div className={cls}>
            <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkedList.length === listData.length && listData.length}
                className={`${PREFIX}-all`}
                disabled={showAllDisabled}
            >
                全部
            </Checkbox>
            <CheckboxGroup
                options={formatOptions(options, fieldNames)}
                value={formatSelectValue(checkedList, fieldNames)}
                onChange={onInnerChange}
                className={`${PREFIX}-option`}
            />
        </div>
    );
};

export default ComSelectAllPanel;