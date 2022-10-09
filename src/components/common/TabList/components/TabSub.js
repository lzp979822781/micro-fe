
import {useCallback} from 'react';

import {Button} from '@baidu/sstrd';
import {PlusOutlined} from '@ant-design/icons';
import './index.less';

const ToolBar = ({
    disabledAdd,
    disableDel,
    rowCount = 0, // 选中条数
    addText = '',
    onAdd, // 增
    onDel // 删
}) => {
    const renderAddBtn = useCallback(() => {
        if (!onAdd && !addText) {
            return;
        }
        return (
            <Button type="primary" disabled={disabledAdd} onClick={() => onAdd && onAdd()}>
                <PlusOutlined /> {addText}
            </Button>
        );
    }, [onAdd, addText, disabledAdd]);

    const renderRowCountInfo = useCallback(() => {
        if (rowCount === 0) {
            return;
        }
        return <span className="select-info">已选择{rowCount}条记录</span>;
    }, [rowCount]);

    return (
        <div className="table-toolbar-TabList">
            <Button
                className="toolbar-buttondel"
                type="danger"
                disabled={disableDel}
                onClick={() => onDel()}
            >
                删除
            </Button>
        </div>
    );
};

export default ToolBar;