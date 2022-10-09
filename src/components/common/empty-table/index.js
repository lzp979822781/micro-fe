/**
 * @file 表格的空状态
 * @author jianghaoran01
 * @description 表格空状态 支持设置是否可点击
 */

import React from 'react';
import {Typography} from '@baidu/sstrd';
import './index.less';

const {Link} = Typography;
const PREFIX = 'biz-table-empty';

const TabListIcon = props => {
    const {
        title = '暂无数据',
        imgSrc = '/static/img/empty.png',
        onClick = undefined,
        clickTitle = '马上创建',
        rightDom = undefined // 自定义右侧DOM
    } = props;

    return (
        <div className={PREFIX}>
            <div className={`${PREFIX}-left`}>
                <img src={imgSrc} />
            </div>
            <div className={`${PREFIX}-right`}>
                {
                    rightDom
                        ? React.cloneElement(rightDom)
                        : (
                            <>
                                <p>{title}</p>
                                {onClick && <Link onClick={onClick}>{`${clickTitle}>`}</Link>}
                            </>
                        )
                }
            </div>
        </div>
    );
};

export default TabListIcon;

