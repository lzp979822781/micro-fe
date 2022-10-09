import {useState} from 'react';

/**
 * @param {any} data
 * @return {*}
 */
function useChange(props) {
    const {defaultValue = false} = props || {};
    const [data, setData] = useState(defaultValue);

    const onChange = value => {
        setData(value);
    };

    return {
        data,
        onChange
    };
}

export default useChange;