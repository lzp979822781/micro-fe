/*
* @Author: liuyan45
* @Date: 2021-12-28 19:23:22
 * @LastEditTime: 2021-12-29 19:21:14
 * @LastEditors: liuyan45
 * @FilePath: /blue-cli/src/components/NotFound/index.js
* @Description: NotFound
*/

import _ from 'lodash';
import {Link} from 'react-router-dom';

import './index.less';

export default props => {
    return (
        <div className="du-not-found">
            <div className="notfound-image" />
            <div className="content">
                <div className="http-text">抱歉，你访问的页面不存在</div>
                <Link to={'/home'}>返回首页</Link>
            </div>
        </div>
    );
};
