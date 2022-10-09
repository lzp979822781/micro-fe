/**
 * @description 侧导航顶部下拉框
 * @author guowei26
 */

import React, {useCallback, useMemo, useState} from 'react';
import {Select} from '@baidu/sstrd';
import {uniqueId} from 'lodash';
import ComTooltip from '@components/ComTooltip';
import {SelectItemIProps} from '../../type';

import styles from './index.module.less';

type selectValue = string| number;

interface MenuHeaderSelectIProps {
    options: SelectItemIProps[];
    initValue?: selectValue;
    handleChange?: (
        params1: selectValue,
        params2: SelectItemIProps,
        params3: SelectItemIProps[]
    ) => void;
    handleBackHome?: () => void;
}

const MenuHeaderSelect: React.FC<MenuHeaderSelectIProps> = props => {
    const {options = []} = props;
    const [value, setValue] = useState(props?.initValue);

    const optionsList = useMemo(() => {
        return options.map(item => {
            const key = uniqueId();
            return {...item, key};
        });
    }, [JSON.stringify(options)]
    );

    const handleChange = useCallback((e: selectValue) => {
        const selectItem = options.find(item => String(item.value) === String(e)) as SelectItemIProps;
        props?.handleChange?.(e, selectItem || {}, options);
        setValue(e);
    }, [options]
    );

    return (
        <div className={styles.menuSelectContainer}>
            <Select
                className={styles.menuSelect}
                dropdownClassName={styles.customSselectDrop}
                placeholder="请选择"
                virtual={false}
                value={value}
                onChange={handleChange}
                dropdownRender={menu => (
                    <div>
                        {menu}
                        <div
                            className={styles.selectReturnHomepage}
                            onMouseDown={e => e.preventDefault()}
                            onClick={props?.handleBackHome}
                        >
                            返回首页
                        </div>
                    </div>
                )}
            >
                {optionsList.map(item => {
                    const {label, value, key} = item;
                    return (
                        <Select.Option value={value} key={key}>
                            <ComTooltip
                                arrowPointAtCenter
                                title={label}
                                width={116}
                                key={key}
                                color="white"
                                overlayInnerStyle={{color: 'black'}}
                            >
                                <div className={styles.menuContent}>{label}</div>
                            </ComTooltip>
                        </Select.Option>
                    );
                })}
            </Select>
        </div>
    );
};

export default MenuHeaderSelect;
