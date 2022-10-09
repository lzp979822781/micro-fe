/**
 * @file CollapsedProjects
 * @description 侧导航收起时，项目场景选择
 * @author guowei26
 */
import React, {useEffect, useRef} from 'react';
import {SelectItemIProps, stringNumber} from '../AppSideNav/type';
import ComTooltip from '@components/ComTooltip';
import classNames from 'classnames';
import './index.less';

interface CollapsedProjectsIProps {
    options: SelectItemIProps[];
    value?: number | string;
    handleChange?:(params1:stringNumber, params2:SelectItemIProps, params3:SelectItemIProps[])=>void
}

const PREFIX = 'collapsed-project-menu';

const CollapsedProjects: React.FC<CollapsedProjectsIProps> = props => {
    const {options = [], value} = props;

    const selectedItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedItemRef.current) {
            selectedItemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [selectedItemRef.current]);

    return (
        <div className={PREFIX}>
            {options.map((item, index) => {
                const isSelected = String(item.value) === String(value);
                return (
                    <ComTooltip
                        arrowPointAtCenter
                        title={item.label}
                        width={110}
                        key={item.value}
                        color="white"
                        overlayInnerStyle={{color: 'black'}}
                    >
                        <div
                            id={`${PREFIX}-${item.value}`}
                            ref={isSelected ? selectedItemRef : null}
                            className={classNames(
                                `${PREFIX}-item`,
                                {[`${PREFIX}-item-selected`]: isSelected},
                                {[`${PREFIX}-item-clearPadding`]: options.length - 1 === index}
                            )}
                            onClick={() => props?.handleChange?.(item.value, item, options)}
                        >
                            {item.label}
                        </div>
                    </ComTooltip>
                );
            })}
        </div>
    );
};

export default CollapsedProjects;
