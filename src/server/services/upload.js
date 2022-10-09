import axios from 'axios';
import {getCookie} from '@utils/cookie';
const csrfToken = getCookie('bce-user-info');

const upload = (params = {}) => {
    const {url, onUploadProgress, data, ...otherParams} = params;
    return axios({
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            csrftoken: csrfToken.replace(/"/g, '')
        },
        onUploadProgress,
        data,
        ...otherParams
    });
};

export default upload;