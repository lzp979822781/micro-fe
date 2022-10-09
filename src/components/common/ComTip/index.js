/**
*
* @file ComTip
* @descrption 提示栏
* @author chenziqin01
*/

import React from 'react';
import styles from './index.module.less';
import classnames from 'classnames';
import configType from './config';
const PREFIX = 'comtip';

/**
 * @param {string} color 颜色
 * @param {string} type 类型
 * @param {string} icon 提示符
 * @returns {*}
 */

export default function ComTip(props) {
    const {color, background, type, icon, className, text = ''} = props;
    const cls = classnames(PREFIX, className);
    const getCurStyle = () => {
        return (type ? configType[type] : {icon});
    };
    return (
        <div className={styles[cls]} style={{background}}>
            <span style={{color}}>{getCurStyle().icon}</span>
            <p>{text}</p>
        </div>
    );
}
