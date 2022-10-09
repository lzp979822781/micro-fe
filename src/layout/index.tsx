/*
 * @Author: zhoupengfei03
 * @Date: 2021-12-27 17:14:23
 * @LastEditTime: 2022-03-02 14:14:35
 * @LastEditors: Please set LastEditors
 * @FilePath: /frame/src/layout/index.tsx
 * @Description: 项目布局配置
 */
/* eslint-disable react/jsx-key */
import {useCallback, useMemo, useEffect} from 'react';
import {Layout, Avatar} from '@baidu/sstrd';
import {useLocation, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {CopyOutlined} from '@ant-design/icons';
import {getTargetRouteConfig} from '../routes';
import {hideHeaderNav, hideSideNav, updateHeaderStatus, updateSideNavStatus} from '@redux/menu.slice';
import AppSideNav from './components/AppSideNav'; ;
import AppHeader from './components/AppHeader';
import AppMain from './components/AppMain';
import styles from './index.module.less';
import logoSvg from '@images/logo.svg?url';

import {headerMenuData, menuSelectData} from './layout';

const {Content} = Layout;
const MainPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const reduxHeaderStatus = useSelector(hideHeaderNav);
    const reduxSideStatus = useSelector(hideSideNav);
    const showSideNav = useMemo(() => !reduxSideStatus, [reduxSideStatus]);
    const showHeaderNav = useMemo(() => !reduxHeaderStatus, [reduxHeaderStatus]);
    // 顶部导航-菜单栏点击回调
    const handleMenuChange = useCallback(res => {
        if (res.path) {
            history.push(res.path);
        }
    }, []);

    // 顶部导航-用户模块某一项点击事件回调
    const handleActionClick = useCallback(res => {
        // console.log(res);
    }, []);

    // 顶部导航-用户模块点击退出事件回调
    const handleLoginOut = useCallback(() => {
        // 调用登出接口成功后退出到登录页面
        history.push('/login');
        console.log('退出');
    }, []);
    // 左侧菜单栏-点击切换回调
    const handleMenuClick = useCallback((currMenu, munuList) => {
        const {children} = munuList;
        const {path, external} = currMenu;
        if (external) {
            window.open(path, '_blank');
            return;
        }
        history.push(path);
        console.log(children);
    }, []);
    // 左侧菜单栏-点击筛选框返回首页按钮
    const handleBackHome = useCallback(() => {
        history.push('/');
    }, []);
    // 左侧菜单栏-下拉选项框选项改变回调
    const handleSelect = useCallback((value, item, arr) => {
        console.log(value, item, arr);
    }, []);
    // 顶部导航配置
    const headerNav = {
        // 顶部导航logo
        logoComponent: <img src={logoSvg} style={{height: '43px', width: '224px'}} />,
        // 顶部导航菜单栏数据
        menu: headerMenuData,
        // 顶部导航菜单栏点击回调
        handleMenuChange,
        // 导航栏右边位置，个人中心配置
        user: {
            name: 'Admin',
            icon: <Avatar src="https://joeschmoe.io/api/v1/random" />,
            actions: [
                // 此处可以配置用户部分的操作行为,以『修改密码』举例
                {key: '1', icon: <CopyOutlined />, name: '修改密码'}
            ],
            // 用户模块某一项点击事件回调
            handleActionClick,
            // 用户模块点击退出事件回调
            handleLoginOut
        }
        // 右侧额外顶部节点
        // extra: <div>123123123123</div>
    };
    // 左侧导航数据
    const sideNav = {
        // 菜单栏点击回调
        handleMenuClick,
        // 菜单栏顶部Select配置
        menuSelect: {
            data: menuSelectData,
            initValue: 'select1',
            visible: true,
            handleBackHome,
            handleSelect
        }
        // 侧导航额外节点
        // extra: {name: '测试项目标题', icon: <CopyOutlined />}
    };
    // 路由切换，根据路由配置更新侧导航和顶部导航显示隐藏状态
    useEffect(() => {
        const targetRouterConfig = getTargetRouteConfig(location.pathname) || {};
        dispatch(updateHeaderStatus(!!targetRouterConfig.hideHeaderNav));
        dispatch(updateSideNavStatus(!!targetRouterConfig.hideSideNav));
    }, [location.pathname]);
    return (
        <Layout style={{height: '100vh'}}>
            {showHeaderNav
                && <AppHeader {...headerNav} />}
            <Layout>
                {showSideNav
                    && <AppSideNav {...sideNav} />}
                <Layout className={styles.contentLayout}>
                    <Content>
                        <AppMain />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MainPage;
