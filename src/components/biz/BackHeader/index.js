/**
 * Author: liuzhipeng03
 * Date: 2021-07-19 10:12:36
 * LastEditTime: 2021-07-22 14:17:58
 * LastEditors: Please set LastEditors
 */
import {useSelector} from 'react-redux';
import classnames from 'classnames';
import {useHashHistory} from '@hooks';
import LeftIcon from '@assets/images/arrow/left.svg';
import {collapse} from '@redux/menu.slice';

import './index.less';

const PREFIX = 'backHeader';
export default function BackHeader(props) {
    const history = useHashHistory();
    const collapsed = useSelector(collapse);

    const backPage = () => {
        history.push('/');
    };
    const {toBack = backPage, title = '', style, middle, exact, isBack = true} = props;

    const titleCls = classnames(`${PREFIX}-left-title`, {
        [`${PREFIX}-left-title-noback`]: !isBack
    });

    const cls = classnames(PREFIX, {
        [`${PREFIX}-collapsed`]: !collapsed
    });

    return (
        <div className={`${PREFIX}-container`}>
            <div className={cls} style={style}>
                <div className={`${PREFIX}-left`}>
                    {isBack && (
                        <span className={`${PREFIX}-left-href`} onClick={toBack}>
                            <LeftIcon className={`${PREFIX}-left-href-icon`} /> 返回
                        </span>
                    )}
                    <span className={titleCls}>{title}</span>
                    {middle}
                </div>
                {exact}
            </div>
        </div>
    );
}
