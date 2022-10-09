import React from 'react';
import {Form} from '@baidu/sstrd';
import CustomInputNumber from '../CustomInputNumber';

// const PREFIX = 'custom-number-render';
function CustomNumberRender(props) {
    const {name, label, rules, componentProps = {}, ...otherData} = props;

    return (
        <Form.Item
            name={name}
            label={`${label}：`}
            rules={rules}
            {...otherData}
            key={name}
        >
            <CustomInputNumber addonBefore='≥' addonAfter='%' {...componentProps} />
        </Form.Item>
    );
}

export default CustomNumberRender;