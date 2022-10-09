/*
 * @Author: zhoupengfei03
 * @Date: 2021-12-27 17:14:23
 * @LastEditTime: 2022-03-02 15:57:39
 * @LastEditors: Please set LastEditors
 * @FilePath: /frame/src/routes/index.ts
 * @Description: 项目路由配置，所有的路由总出口
 */
import React from 'react';
import {matchPath} from 'react-router-dom';
import {RouterItem} from './type';

import testRoutes from './routes/test';
// 当内容较多时，可以单独拆分为文件，在此入口文件中引入
// sstrd 单独拆分至sstrd文件，在此处进行引入

// 路由匹配优先级按照数组中元素的path匹配顺序，先匹配到的则会被使用
const routers: RouterItem[] = [
    {
        path: '/',
        redirect: '/home',
        exact: true
    },
    {
        path: '/home',
        title: '首页',
        component: React.lazy(() => import('@pages/Home')),
        hideSideNav: true
    },
    ...testRoutes
];
export default routers;
export * from './type';

// 根据当前页面路径获取对应路由配置
export const getTargetRouteConfig = (pathName:string):RouterItem => {
    const findMatchRoute = (path?: string) => matchPath(pathName, {path, exact: true, strict: true});
    let targetRoute: RouterItem = {hideHeaderNav: false, hideSideNav: false};
    const findRightRoute = (routeList: RouterItem[] = []) => {
        for (let i = 0; i < routeList.length; i++) {
            const route = routeList[i];
            const isRight = findMatchRoute(route.path);
            const isExistChildren = route.routes && route.routes.length > 0;
            if (isRight) {
                targetRoute = route;
                break;
            }
            if (isExistChildren) {
                findRightRoute(route.routes);
            }
        }
    };
    findRightRoute(routers);
    return targetRoute;
};
