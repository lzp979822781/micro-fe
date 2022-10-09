import {useDispatch} from 'react-redux';

/**
 * @author liuzhipeng03
 * @return {object} object | {callRedux: redux方法调用}
 */
function useBasicDispatch() {
    const dispatch = useDispatch();

    const callRedux = (type, params) => {
        dispatch({
            type,
            payload: params
        });
    };

    return {
        callRedux
    };
}
export default useBasicDispatch;