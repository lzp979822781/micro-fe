
import {Form} from '@baidu/sstrd';
import './index.less';

const PREFIX = 'text-render';
function TextRender(option, data) {
    const {placeholder, required = true, label, field, custom, rules = [], text = '-', ...otherData} = option;

    return (
        <Form.Item
            label={`${label}：`}
            rules={rules}
            {...otherData}
            required={required}
        >
            {custom && custom}
            {!custom && <div className={`${PREFIX}-text`}>{(data && field) ? data[field] : '-'}</div>}
        </Form.Item>
    );
}

export default TextRender;
