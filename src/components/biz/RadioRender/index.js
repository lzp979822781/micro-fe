import React from 'react';
import {Radio, Form} from '@baidu/sstrd';
import './index.less';

function RadioRender(data, options) {
    const {name, label, rules, componentProps = {}, ...otherData} = data;

    const renderOptions = () => {
        if (!Array.isArray(options)) {
            return;
        }

        return (
            <>
                {
                    options.map(item => {
                        const {code, name, disabled} = item;
                        return <Radio value={code} key={code} disabled={disabled}>{name}</Radio>;
                    })
                }
            </>
        );
    };

    return (
        <Form.Item
            name={name}
            label={`${label}：`}
            rules={rules}
            {...otherData}
            key={name}
        >
            <Radio.Group {...componentProps}>
                {renderOptions()}
            </Radio.Group>
        </Form.Item>
    );
}

export default RadioRender;