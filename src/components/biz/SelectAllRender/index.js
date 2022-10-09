
import {Form} from '@baidu/sstrd';
import {ComSelectAll} from '@components/common';
function SelectAllRender(data) {
    const {name, label, rules, componentProps, getField, ...otherData} = data;
    return (
        <Form.Item
            name={name}
            label={`${label}：`}
            rules={rules}
            {...otherData}
            key={name}
            // shouldUpdate={(prevValues, curValues) => {
            //     return getField && (prevValues[getField] !== curValues[getField])
            // }}
        >
            <ComSelectAll {...componentProps} />
        </Form.Item>
    );
}

export default SelectAllRender;

