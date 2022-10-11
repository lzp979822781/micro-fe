/*
 * @Author: zhoupengfei03
 * @Date: 2021-12-27 17:14:23
 * @LastEditTime: 2022-02-22 16:11:37
 * @LastEditors: Please set LastEditors
 * @FilePath: /blue-cli/src/pages/Home/index.js
 * @Description: 首页
 */
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from '@baidu/sstrd';
import styles from './index.module.less';

const Home = props => {

    const history = useHistory();

    const onClick = () => {
        history.push('/test');
    };

    return (
        <div className={styles['home-page']}>
            <Button type='primary' onClick={onClick}>跳转到测试页</Button>
        </div>
    );
};

export default Home;
