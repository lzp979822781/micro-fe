
import {Form} from '@baidu/sstrd';
import {ComArea} from '../../common';
import './index.less';

const PREFIX = 'area-itemcount';
function AreaItemCount(props) {

    const {name, label, rules, initialValue, componentProps = {}, ...otherData} = props;
    return (
        <Form.Item
            name={name}
            label={`${label}：`}
            rules={rules}
            initialValue={initialValue}
            {...otherData}
            className={`${PREFIX}-areaitem`}
        >
            <ComArea autoSize={false} className={`${PREFIX}-text`} rows={4} {...componentProps} />
        </Form.Item>
    );
}

export default AreaItemCount;
