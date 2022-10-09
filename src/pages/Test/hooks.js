import {useState, useEffect} from 'react';
import {getData} from './services';

function useTable(props) {
    const {reqPage = {pageNo: 1, pageSize: 10}} = props;
    const [data, setData] = useState({data: [], total: 0});

    const getInnerData = async params => {
        const res = await getData(params);
        if (res && res.success) {
            const {page: {result: data}, totalCount} = res;
            setData({data, total: totalCount});
        }
    };

    useEffect(() => {
        getInnerData({
            pageNo: reqPage.pageNo,
            pageSize: reqPage.pageSize,
            enterpriseUuid: '567c1c2de2204489b87b23614326a993'
        });
    }, [reqPage.pageNo, reqPage.pageSize]);

    return {
        ...data,
        paginationOpts: {
            total: data?.totalCount,
            current: reqPage.pageNo,
            pageSize: reqPage.pageSize
        }
    };
}

export {useTable};