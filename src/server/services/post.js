import axiosService from '../utils/axiosRequest.js';

function post(url, params = {}, cancelToken) {
    return axiosService({
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: params,
        cancelToken
    });
}

export default post;