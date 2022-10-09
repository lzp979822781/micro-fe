import {useMemo, useRef, useState, useEffect} from 'react';
import classnames from 'classnames';
import {Tooltip} from '@baidu/sstrd';
import './index.less';
const PREFIX = 'base-tooltip';
/**
 * 超出指定宽的时候,展示tooltip,不超出的话直接返回children
 * @param {number} width 容器宽度
 * @param {string} containerClass 容器内部嵌套的第一层div样式
 * @return {*}
 */
function BaseTooltip(props) {
    const {
        width,
        children,
        placement,
        className,
        overlayClassName,
        ...otherProps
    } = props;
    const [visible, setVisible] = useState(false);
    const [isBeyond, setIsBeyond] = useState(false);
    const shadowRef = useRef();
    const positionObj = {
        placement: placement || 'top'
    };
    const renderShadow = () => {
        const {title} = otherProps;
        return (
            <div className={`${PREFIX}-shadow`} ref={shadowRef}>
                {title}
            </div>
        );
    };
    useEffect(() => {
        const el = shadowRef.current;
        if (!el) {
            return;
        }
        const scrollWidth = el.scrollWidth;
        setIsBeyond(width ? scrollWidth > width : true);
    }, [props.title, width]);
    const onMouseOver = () => {
        setVisible(true);
    };
    const onMouseLeave = () => {
        setVisible(false);
    };
    const cls = useMemo(() => {
        return classnames(`${PREFIX}`, className);
    }, [className]);

    const innerCls = classnames(`${PREFIX}-overlay`, overlayClassName);
    return (
        <Tooltip
            visible={visible && isBeyond}
            className={cls}
            overlayClassName={innerCls}
            {...otherProps}
            {...positionObj}
        >
            <div
                className={`${PREFIX}-container`}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
            >
                {children}
            </div>
            {renderShadow()}
        </Tooltip>
    );
}
export default BaseTooltip;
