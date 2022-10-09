import {useMemo, useCallback} from 'react';
import classnames from 'classnames';
import {Table, ConfigProvider, Empty} from '@baidu/sstrd';
import {ComEmpty} from '../index';
import './index.less';

const PREFIX = 'com-table';
function ComTable(props) {
    const {
        className,
        renderEmpty,
        emptyProps = {},
        pagination,
        setMinHeight = true,
        dataSource,
        ...otherProps
    } = props;
    const cls = useMemo(() => {
        return classnames(`${PREFIX}`, className, {
            [`${PREFIX}-filter-fixed`]: setMinHeight,
            noBorder: dataSource?.length === 0
        });
    }, [className, setMinHeight]);

    const renderDefaultEmpty = useCallback(
        () => {
            return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        },
        [],
    );

    const getPagination  = () => {
        const pageOpts = {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => (
                <span style={{color: '#818897', fontSize: '12px'}}>
                    {`共${total}条数据`}
                </span>
            )
        };

        return pagination ? {...pageOpts, ...pagination} : pagination;
    };

    const renderCustomEmpty = () => {
        return (
            <ComEmpty
                {...emptyProps}
            />
        );
    };

    return (
        <ConfigProvider renderEmpty={renderEmpty || (emptyProps && renderCustomEmpty) || renderDefaultEmpty}>
            <Table
                showSorterTooltip={false}
                className={cls}
                pagination={getPagination()}
                dataSource={dataSource}
                getPopupContainer={triggerNode => triggerNode.parentNode}
                {...otherProps}
            />
        </ConfigProvider>
    );
}

export default ComTable;