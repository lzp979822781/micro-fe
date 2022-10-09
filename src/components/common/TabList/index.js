import {useMemo, useCallback, useState} from 'react';

import {Table} from '@baidu/sstrd';
import TabSub from './components/TabSub';
import {calcColWidths} from '@utils';

const UseTable = props => {
    const {
        toolBarOption,
        title,
        tableOption, // 表格配置
        event // 工具栏配置项以及回调
    } = props;
    const {
        addText = '新建数据集',
        disabledAdd = false, // 是否允许新增
        disabledDel = false // 是否允许删除
    } = toolBarOption || {};
    const {
        onDel, // 删除回调
        promptName, // 提示文案
        onAdd // 添加回调
    } = event || {};
    const {dataSource = []} = tableOption || {};
    const [selectedRows, updateSelectedRows] = useState([]); // 选中行
    if (tableOption && tableOption.rowSelection) {
        tableOption.rowSelection.onChange = (keys, rows) => {
            updateSelectedRows(rows);
            tableOption.rowSelection.onSelectChange && tableOption.rowSelection.onSelectChange(keys, rows);
        };
    }
    // 选中记录数量
    const selectedRowsWithData = useMemo(() => {
        if (dataSource.length === 0) {
            return 0;
        }
        return tableOption?.rowSelection?.selectedRowKeys?.length;
    }, [tableOption, dataSource]);

    // 是否可删除
    const disabledDelWithData = useMemo(() => {
        return disabledDel || selectedRowsWithData === 0 || !tableOption.rowSelection;
    }, [disabledDel, selectedRowsWithData]);

    // 执行函数
    const execFn = useCallback((fn, ...rest) => {
        fn && typeof fn === 'function' && fn(...rest);
    }, []);

    return (
        <div className="common-Tablist-content">
            {/* 标题部 */}
            <div className="header">
                {title}
            </div>
            {/* 工具栏部 */}
            <TabSub
                addText={addText}
                rowCount={selectedRowsWithData}
                disabledAdd={disabledAdd}
                disableDel={disabledDelWithData}
                onDel={() => execFn(onDel, selectedRows)}
                onAdd={() => execFn(onAdd)}
                promptName={promptName}
            />
            {/* 表格部 */}
            <Table
                {...tableOption}
                scroll={{x: calcColWidths(((tableOption || {}).columns) || 'max-content')}}
            />
        </div>
    );
};

export default UseTable;