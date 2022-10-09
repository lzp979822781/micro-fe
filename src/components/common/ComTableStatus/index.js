import {useState, useEffect} from 'react';
import classnames from 'classnames';

import {Tooltip} from '@baidu/sstrd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import './index.less';

const PREFIX = 'com-table-status';
/**
 * @param {object} options [{code: 1, name: '已发送', style, color}]
 * @returns
 */
function ComTableStatus(props) {
    const {className, options, current} = props;
    const cls = classnames(PREFIX, className);
    const {code, name} = current || {};

    const [currentOpt] = options.filter(item => item.code === code);
    const {color, style = {}, tooltipText} = currentOpt || {};
    if (!name) {
        return null;
    }

    const renderTooltip = () => {
        if (!tooltipText) {
            return;
        }

        return (
            <Tooltip title={tooltipText}>
                <QuestionCircleOutlined className={`${PREFIX}-text-icon`} />
            </Tooltip>
        );
    };

    return (
        <div className={cls}>
            <div className={`${PREFIX}-icon`} style={{backgroundColor: color, ...style}}></div>
            <div className={`${PREFIX}-text`}>
                {current?.name}
                {renderTooltip()}
            </div>
        </div>
    );
}

export default ComTableStatus;