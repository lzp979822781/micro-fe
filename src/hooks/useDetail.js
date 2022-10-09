import {useState, useEffect, useMemo} from 'react';
import {post} from '@src/server/services';

/**
 * 详情页请求hook
 * @param {*} props {params | api}
 * @return {Object}
 */
function useDetail(props) {
    const {
        params,
        api,
        successCallback,
        isSendRequest,
        refresh,
        id
    } = props;
    const [data, setData] = useState({});

    const getData = async innerParams => {
        try {
            const res = await post(api, innerParams);
            const {success, result} = res || {};
            if (res && success) {
                setData(result);
                successCallback && successCallback(result);
            }
        } catch (e) {
            console.log('e', e);
            // showError(e && e.global);
        }
    };

    useEffect(() => {
        if (!isSendRequest) {
            return;
        }
        getData(params);
    }, [refresh, isSendRequest, api]);

    return {data};
}

export default useDetail;