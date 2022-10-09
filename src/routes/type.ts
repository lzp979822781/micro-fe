/**
 * @description 路由类型
 * @author guowei26
 */

import React from 'react';
import {RouteProps} from 'react-router-dom';

// 具体可以根据RouteProps的参数以及业务，再去扩展路由功能
export interface RouterItem extends Omit<RouteProps, 'path'> {
    /**
     * @default
     * @type string
     * @description 页面级子路由
     */
    routes?: RouterItem[],

    /**
     * @default false
     * @type boolean
     * @description 是否是组件嵌套级路由
     */
    nest?: boolean;

    /**
     * @default
     * @type string
     * @description 重定向路径
     */
    redirect?: string;

    /**
     * @default
     * @type string
     * @description 路由路径
     */
    path?: string;

    /**
     * @default false
     * @type boolean
     * @description 隐藏侧导航
     */
    hideSideNav?: boolean;

     /**
     * @default false
     * @type boolean
     * @description 隐藏顶部
     */
    hideHeaderNav?: boolean;

    /**
     * @default null
     * @type React.ReactNode
     * @description 页面布局组件
     */
    layout?: React.ReactNode;

    /**
     * @default ''
     * @type string
     * @description 页面标题，当layout选择了BasicLayout时，title会作为当前页面的title
     */
    title?: string;

    //  /**
    //  * @default false
    //  * @type boolean
    //  * @description 是否和菜单栏联动，权限控制
    //  */
    // auth?: boolean;

    /**
     * @default false
     * @type {}
     * @description 路由相关业务参数
     */
    ext?: {}
}
