/**
 * @file components/common/Tab
 * @author v_jinenchen
 */

import _ from 'lodash';
import React, {useState, useEffect} from 'react';

import './index.less';

const Tab = ({
    title,
    defaultIndex = 0,
    controlIndex,
    onChange,
    selectClass,
    render,
    list = []
}) => {
    const [currentIndex, updateCurrentIndex] = useState(defaultIndex);

    useEffect(() => {
        if (controlIndex || controlIndex === 0) {
            updateCurrentIndex(controlIndex);
        }
    }, [controlIndex]);

    const handleClick = (item, index) => {
        updateCurrentIndex(index);
        if (onChange && typeof onChange === 'function') {
            onChange(item, index);
        }
    };

    const getSelectStyle = index => {
        let classname = 'baidu-acg-tab-content-item ';
        if (currentIndex === index) {
            selectClass ? classname += selectClass : classname += 'is-select';
        }
        return classname;
    };

    const renderTitle = () => {
        return <div className="baid-acg-tab-title">{title}</div>;
    };

    const renderContent = () => {
        return (
            <div className="baidu-acg-tab-content">
                {
                    _.map(list, (item, index) => (
                        <div
                            className={getSelectStyle(index)}
                            onClick={() => handleClick(item, index)}
                        >
                            {render && typeof render === 'function' ? render(item) : item.title}
                        </div>
                    ))
                }
            </div>
        );
    };

    return (
        <div className="baidu-acg-tab-container">
            {title && renderTitle()}
            {renderContent()}
        </div>
    );
};

export default Tab;
