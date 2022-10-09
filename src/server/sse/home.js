import {initSseServer} from '../utils/sse.js';

const path = '/v1/monitors/events';
function getMonitorsList(params = null, callback) {
    return initSseServer(path, params, callback);
}

export {
    getMonitorsList
};