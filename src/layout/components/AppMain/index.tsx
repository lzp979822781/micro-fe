/**
 * @description 加载路由配置主组件
 * @author guowei26
 */

import React, {useEffect, useMemo, Suspense} from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import {usePrevious} from 'react-use';
import routers from '@routes/index';
import NotFound from '@components/NotFound';
import Loading from '@components/Loading';
import {MenuItemIProps} from '../AppSideNav/type';
import {getRouterAfterEachFn} from './routerNavigation';
import {getRenderRoute, createRoute, splitPageRoutes} from './util';

interface AppMainIProps {
    menuList?:MenuItemIProps[]
}

const AppMain: React.FC<AppMainIProps> = props => {
    const {menuList = []} = props;
    const {pathname} = useLocation();
    const previousPath = usePrevious<string>(pathname);
    // 递归生成嵌套路由
    const routerConfig = useMemo(() => {
        const renderRoutes = getRenderRoute(menuList, routers);
        return createRoute(splitPageRoutes(renderRoutes));
    }, [JSON.stringify(menuList)]);

    // 模拟实现路由后置导航守卫
    useEffect(() => {
        const routerAfterEach = getRouterAfterEachFn(previousPath, pathname);
        routerAfterEach();
    }, [pathname]);

    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                {routerConfig}
                <Route key='404' component={NotFound} />
            </Switch>
        </Suspense>
    );
};

export default AppMain;
