import React, {useState, useEffect} from 'react';
import {Radio} from '@baidu/sstrd';

const field = 'code';
export default function TabRadio(props) {
    const {tableType = [], typeChange = () => {}, value} = props;
    const [radioVlaue, setRadioValue] = useState();
    const radioChange = e => {
        setRadioValue(e.target.value);
        typeChange(e.target.value);
    };
    useEffect(() => {
        let defaultValue = tableType[0] && tableType[0][field];
        setRadioValue(value || defaultValue);
    }, [tableType.length, value]);
    return (
        <>
            <Radio.Group onChange={radioChange} value={radioVlaue} optionType="button">
                {
                    tableType.map(item => {
                        return (
                            <Radio.Button
                                key={item[field]}
                                value={item[field]}
                            >
                                {item.name}({item.count || 0})
                            </Radio.Button>
                        );
                    })
                }
            </Radio.Group>
        </>
    );
}
