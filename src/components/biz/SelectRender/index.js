
import {useState} from 'react';
import {Form, Select} from '@baidu/sstrd';

import DownImg from '@assets/images/arrow/down.svg';
import UpImg from '@assets/images/arrow/up.svg';

import {selectOptions} from '../index';
import {getComSelectProps} from '@utils';

function SelectRender(data) {

    const [open, setOpen] = useState(false);

    const {name, label, rules, componentProps = {}, onChange, options, ...otherData} = data;

    const onDropdownVisibleChange = dropVisible => {
        setOpen(dropVisible);
    };

    const getSuffixIcon = () => {
        return open ? <UpImg /> : <DownImg />;
    };

    const onMachineEvent = e => {
        onChange && onChange(e);
    };

    return (
        <Form.Item
            name={name}
            label={`${label}：`}
            rules={rules}
            {...otherData}
            key={name}
        >
            <Select
                {...componentProps}
                {...getComSelectProps()}
                onDropdownVisibleChange={onDropdownVisibleChange}
                suffixIcon={getSuffixIcon()}
                onChange={onMachineEvent}
            >
                {selectOptions(options)}
            </Select>
        </Form.Item>
    );
}

export default SelectRender;