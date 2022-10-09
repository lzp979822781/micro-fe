import {useState, useEffect} from 'react';
import {useChange} from '@hooks';
import {post} from '@src/server/services';

import UpImg from '@assets/images/arrow/up.svg';
import DownImg from '@assets/images/arrow/down.svg';

function useCheckList(props) {
    const {value} = props;
    const [checkedList, setCheckedList] = useState(value || []);

    return {
        checkedList,
        setCheckedList
    };
}

export {useCheckList};

function useSelectArrow() {
    const {data: dropDownVisible, onChange: onDropdownVisibleChange} = useChange();
    const icon = dropDownVisible ? <UpImg /> : <DownImg />;
    return {
        onDropdownVisibleChange,
        icon
    };
};

export {useSelectArrow};

function useDropList(props = {}) {
    const [searchValue, setSearchValue] = useState();
    const {api, successCallback, isSearchAbled, handleParams} = props;
    const [loading, setLoading] = useState(false);

    const onChange = value => {
        setSearchValue(value);
    };

    const getData = async params => {
        try {
            setLoading(true);
            const res = await post(api, params);
            if (res) {
                successCallback && successCallback(res);
            }
        } catch (e) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!api || !isSearchAbled) {
            return;
        }
        getData(typeof handleParams === 'function' ? handleParams(searchValue) : {name: searchValue});
    }, [api, isSearchAbled, handleParams, searchValue]);

    return {
        loading,
        searchValue,
        onChange
    };
}

export {useDropList};