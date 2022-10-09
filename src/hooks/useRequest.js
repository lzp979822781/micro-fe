import {useState, useEffect} from 'react';
import {post} from '@server/services';
import {showError, getDependencyValues, isRequiredValueNotNull} from '@utils';

/**
 * 通用request请求，封装错误处理,loading状态
 * @author liuzhipeng03
 * @param {object} params 请求参数
 * @param {function} service 请求方法
 * @param {function} successCallback 成功回调
 * @param {function} failCallback 失败回调
 * @return {*}
 */
function useRequest(props) {
    const {
        api,
        service,
        params,
        successCallback,
        failCallback,
        defaultData,
        formatter,
        dependency,
        requiredKeys = []
    } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(defaultData);
    const depencySign = !Array.isArray(dependency) ? '' : getDependencyValues(dependency, params);

    const handleRequst = async () => {
        try {
            setLoading(true);
            let res;
            if (api) {
                res = await post(api, params);
            } else {
                res = await service(params);
            }
            const {data: {success, result} = {}} = res || {};
            if (success) {
                const resValue = typeof formatter === 'function' ? formatter(result) : result;
                setData(resValue);
                successCallback && successCallback(resValue);
            }
            return res;
        } catch (e) {
            console.log('e', e);
            showError(e && e.global || '请求失败');
            failCallback && failCallback(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (Array.isArray(requiredKeys) && params) {
            if (!isRequiredValueNotNull(params, requiredKeys)) {
                return;
            }
        }
        handleRequst();
    }, [api, depencySign]);

    return {handleRequst, loading, data};
}

export default useRequest;