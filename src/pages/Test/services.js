import {post} from '@src/server/services';
import api from '@src/server/api';

const {
    tableList
} = api;

export const getData = async params => {
    return post(tableList, params);
};