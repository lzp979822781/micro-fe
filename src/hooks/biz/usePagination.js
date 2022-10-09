import {useState} from 'react';
import {defaultPage as defaultParams} from '@utils';


function usePagination(props = {defaultPage: defaultParams}) {
    const {defaultPage} = props;
    const [reqPage, setReqPage] = useState(defaultPage);

    return {
        reqPage,
        setReqPage
    };
}

export default usePagination;