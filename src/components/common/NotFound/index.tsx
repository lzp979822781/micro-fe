/**
 * @file modules/other/NotFound
 * @modify zhangzhe
 */

import React from 'react';
import {Link} from 'react-router-dom';

import './index.less';

export default () => (
    <div className="du-not-found">
        <div className="notfound-image" />
        <div className="content">
            <div className="http-text">页面显示出现错误，请返回<Link to="/">首页</Link>重新操作 &gt;</div>
        </div>
    </div>
);
