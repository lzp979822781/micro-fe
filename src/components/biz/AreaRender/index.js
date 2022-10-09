
import {Form} from '@baidu/sstrd';
import {ComArea} from '../../common';

import './index.less';

const PREFIX = 'area-render';
function AreaRender(data) {
    const {placeholder, label, rules, text = '-', componentProps = {}, ...otherData} = data;
    return (
        <Form.Item
            label={`${label}：`}
            rules={rules}
            {...otherData}
        >
            <ComArea autoSize={false} className={`${PREFIX}-text`} {...componentProps} />
        </Form.Item>
    );
}

export default AreaRender;
