
import {Form, Input} from '@baidu/sstrd';

function InputItemRender(data) {

    const {name, label, rules, componentProps = {}, ...otherData} = data;
    return (
        <Form.Item
            name={name}
            label={`${label}：`}
            rules={rules}
            {...otherData}
            key={name}
        >
            <Input {...componentProps} />
        </Form.Item>
    );
}

export default InputItemRender;