import {Select} from '@baidu/sstrd';
import './index.less';

const {Option} = Select;
function SelectOptions(data) {
    if (!Array.isArray(data)) {
        return null;
    }

    return (
        <>
            {
                data.map(item => {
                    const {code, name, disabled} = item;
                    return <Option value={code} key={code} disabled={disabled}>{name}</Option>;
                })
            }
        </>
    );
}

export default SelectOptions;