import {useState, useEffect} from 'react';

function useSearch(props) {
    const [changehValue, setChangeValue] = useState();
    const onChange = e => {
        setChangeValue(e.target.value);
    };

    return {
        changehValue,
        setChangeValue,
        onChange
    };
}

export default useSearch;