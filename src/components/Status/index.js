/*
 * @Author: liuyan45
 * @Date: 2022-01-13 19:31:03
 * @LastEditTime: 2022-01-13 19:32:08
 * @LastEditors: liuyan45
 * @FilePath: /blue-cli/src/components/Status/index.js
 * @Description: Status组件
 */
import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

const DU_PREFIX = 'status';
// 状态对应默认配置项，支持后续拓展
const DEFAULT_TYPE_CONFIG = {
    pending: {
        text: '运行中'
    },
    warning: {
        text: '警告'
    },
    success: {
        text: '运行成功'
    },
    error: {
        text: '运行错误'
    },
    unavailable: {
        text: '不可用'
    }
};

const Status = props => {
    const {type, text, style} = props;

    return (
        <div className={`${DU_PREFIX}`} style={style}>
            <div className={`${DU_PREFIX}-type ${DU_PREFIX}-type-${type}`}>
                {text}
            </div>
        </div>
    );
};

Status.defaultProps = {
    type: 'success',
    text: DEFAULT_TYPE_CONFIG.success.text
};

Status.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string,
    style: PropTypes.object
};

export default Status;