import {useState, useEffect} from 'react';
import classnames from 'classnames';
import './index.less';

const PREFIX = 'table-search-container';
function TableSearchContainer(props) {
    const {
        className,
        left,
        middle,
        right
    } = props;
    const cls = classnames(PREFIX, className);

    return (
        <div className={cls}>
            {left}
            <div className={`${PREFIX}-middle`}>
                {middle}
            </div>
            {right}
        </div>
    );
}

export default TableSearchContainer;