
import _ from 'lodash';
// import {WHITE_HOSTS} from '@/constants/auth';

// 跳转地址url合法性验证
export function validateUrl(url = '') {
    // url不存在
    if (!url) {
        return false;
    }
    // 创建模拟dom连接
    const domA = document.createElement('a');
    domA.href = url;
    const urlHostName = domA.hostname;
    // 开始验证
    /* if (_.includes(WHITE_HOSTS, urlHostName)) {
        return true;
    } */
    return false;
}
