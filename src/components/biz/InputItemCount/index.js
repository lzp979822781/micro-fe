/**
 * 带有数字的输入框
*/

import {forwardRef} from 'react';
import {Form} from '@baidu/sstrd';
import {ComInput} from '../../common';
import './index.less';

const InputItemCount = forwardRef((props, ref) => {

    const {name, label, rules, initialValue, componentProps = {}, ...otherData} = props;
    return (
        <Form.Item
            name={name}
            label={`${label}：`}
            rules={rules}
            initialValue={initialValue}
            {...otherData}
            key={name}
            className="input-item"
        >
            <ComInput ref={ref} {...componentProps} />
        </Form.Item>
    );
});

export default InputItemCount;