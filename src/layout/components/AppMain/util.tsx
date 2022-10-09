/**
 * @description 加载路由配置相关工具函数
 * @author guowei26
 */
import React from 'react';
import {cloneDeep} from 'lodash';
import {Switch, Route, Redirect} from 'react-router-dom';
import NotFound from '@components/NotFound';
import {injectRowKey, RowKey} from '../../../utils/rowKey';
import {RouterItem} from '@routes/index';
import {getRouterBeforeEachFn} from './routerNavigation';
import {MenuItemIProps} from '../AppSideNav/type';

// // 获取菜单栏所有的url
// const getAllMenuUrl = (menuList:MenuItemIProps[]):string[] => {
//     const urls:string[] = [];
//     const pushUrlByMenu = (menu:MenuItemIProps[]) => {
//         menu.forEach(item => {
//             if (item?.children) {
//                 pushUrlByMenu(item?.children);
//             }
//             if (item?.path) {
//                 urls.push(item.path);
//             }
//         });
//     };
//     pushUrlByMenu(menuList);
//     return urls;
// };


// 根据菜单栏url以及路由配置，动态生成要渲染的路由
export const getRenderRoute = (
    _menuList: MenuItemIProps[],
    routers: RouterItem[],
) => {
    // // 暂时保留代码：当路由中有配置，菜单中无配置时，返回404
    // const menuUrls = getAllMenuUrl(menuList);
    // const getChildRoute = (childrenRoutes:RouterItem[]) => {
    //     return childrenRoutes.filter(item => {
    //         const {path, routes = []} = item;
    //         if (routes && routes.length > 0) {
    //             item.routes = getChildRoute(routes);
    //         }
    //         if (path) {
    //             const isExistUrl = menuUrls.includes(String(path));
    //             return isExistUrl;
    //         }
    //         return true;
    //     });
    // };
    // const renderRoute = getChildRoute(cloneDeep(routers));
    return injectRowKey(routers);
};

/**
 * 1.根据配置的layout布局组件和component页面组件来判断最终如何渲染
 * 2.实现路由前置守卫
 * 3.实现根据路由配置去重定向
 */
export const RouteContent: React.FC<Record<string, any>> = props => {
    const {layout, component, path: pathname, redirect, children = []} = props;
    const pageProps = cloneDeep(props);
    const childrenRoutes = children as RouterItem[];
    Reflect.deleteProperty(pageProps, 'children');
    Reflect.set(pageProps, 'childrenRoutes', children);
    const childRoute = childrenRoutes.map(item => <Route key={item.path} {...item} />);
    if (redirect) {
        return <Redirect from={pathname} to={redirect} />;
    };
    const Layout = layout as typeof React.Component;
    const Component = component as typeof React.Component;
    let url;
    const beforeEachFn = getRouterBeforeEachFn(pathname, res => {
        url = res;
    });
    beforeEachFn();
    if (url) {
        return <Redirect to={url} />;
    }
    // layout布局组件和component路由组件都不存在
    if (!Component && !Layout) {
        return null;
    }
    // compoent组件存在，layout组件不存在
    if (Component && !layout) {
        return <Component {...pageProps}>{childRoute}</Component>;
    }
    // component组件不存在，layout组件存在
    if (!Component && layout) {
        return <Layout {...pageProps} />;
    }
    // 如果都存在，layout组件包裹component组建进行渲染
    return (
        <Layout {...pageProps}>
            <Component {...pageProps}>{childRoute}</Component>
        </Layout>
    );
};

// 页面级路由和组件路由拆分
export const splitPageRoutes = routeList => {
    return Object.assign(routeList).map(item => {
        const cloneRoute = cloneDeep(item);
        const {routes = []} = cloneRoute;
        if (routes && routes.length > 0) {
            cloneRoute.routes = routes.filter(route => !route.nest);
            cloneRoute.children = routes.filter(route => route.nest);
        }
        if (cloneRoute.routes && cloneRoute.routes.length > 0) {
            cloneRoute.routes = splitPageRoutes(cloneRoute.routes);
        }
        return cloneRoute;
    });
};

// 生成嵌套路由
export const createRoute = (routeList:RowKey<RouterItem>[]) => {
    return Object.assign(routeList).map((item: RowKey<RouterItem>) => {
        const {path, routes, layout, component, title} = item;
        if (routes && routes.length) {
            const childrenRoutes = routes.map(item => {
                if (layout && !item.layout) {
                    item.layout = layout;
                }
                return item;
            });
            return (
                <Route
                    key={`${path}-${title}`}
                    path={path}
                    render={parentProps => {
                        return (
                            <Switch>
                                {createRoute(injectRowKey(childrenRoutes))}
                                {component && <Route
                                    exact={item.exact}
                                    path={path}
                                    render={props => (
                                        <RouteContent
                                            routerProps={{...parentProps, ...props}}
                                            {...item}
                                        />
                                    )}
                                />}
                                <Route key='404' component={NotFound} />
                            </Switch>
                        );
                    }}
                />
            );
        }
        return (
            <Route
                exact={item.exact}
                key={`${path}-${title}`}
                path={path}
                render={props => {
                    return (
                        <RouteContent routerProps={props} {...item} />
                    );
                }}
            />
        );
    });
};
