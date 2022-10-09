import React from 'react';
import {Checkbox, Form} from '@baidu/sstrd';

function checkoutRender(data, options) {
    const {name, label, rules, componentProps = {}, ...otherData} = data;
    const renderOptions = () => {
        if (!Array.isArray(options)) {
            return;
        }

        return (
            <>
                {
                    options.map(item => {
                        const {code, name} = item;
                        return <Checkbox value={code} key={code}>{name}</Checkbox>;
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
            <Checkbox.Group {...componentProps}>
                {renderOptions()}
            </Checkbox.Group>
        </Form.Item>
    );
}

export default checkoutRender;