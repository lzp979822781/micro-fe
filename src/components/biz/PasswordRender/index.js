
import classnames from 'classnames';
import {Form} from '@baidu/sstrd';
import {ComPassword} from '@components/common';

import './index.less';

const PREFIX = 'password-render';
function PasswordRender(data) {

    const {name, label, rules, className, componentProps = {}, ...otherData} = data;
    const cls = classnames(PREFIX, className);
    return (
        <Form.Item
            name={name}
            label={`${label}：`}
            rules={rules}
            key={name}
            className={cls}
            {...otherData}
        >
            <ComPassword {...componentProps} />
        </Form.Item>
    );
}

export default PasswordRender;