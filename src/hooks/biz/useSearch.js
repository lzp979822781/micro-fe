import {useState} from 'react';

function useSearch(props) {
    const {handleSearch} = props;
    // 搜索值
    const [frzzyValue, setFrzzyValue] = useState();
    const [searchValue, setSearchValue] = useState();

    const freezySearch = value => {
        setFrzzyValue(value);
        handleSearch && handleSearch();
    };
    const freezyChange = e => {
        setSearchValue(e.target.value);
    };

    const onClear = () => {
        setFrzzyValue(undefined);
        setSearchValue(undefined);
    };

    return {
        frzzyValue,
        searchValue,
        freezySearch,
        freezyChange,
        onClear
    };
}

export default useSearch;