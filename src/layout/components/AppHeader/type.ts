/**
 * @description 顶部导航栏相关类型
 * @author guowei26
 */

import React from 'react';

export interface HeaderMenuItemIProps {
    // 名称
    name: string;
    // 唯一标示
    key: string;
    // 是否可以点击
    disable?: boolean;
    // 是否隐藏
    isHide?: boolean;
    // 是否默认选中
    isSelected?: boolean;
    // 跳转路径
    path?: string;
    // 顶部导航正则匹配地址
    basePathName?: string;
}

export interface ActionItemIProps {
    name: string;
    key: string | number;
    icon?: React.ReactNode;
    uniqueKey?: number|string;
}

export interface UserItemIProps {
    // icon处理
    icon?: React.ReactNode;
    // 用户名称
    name: string;
    // 操作按钮数组
    actions: ActionItemIProps[];
    // 操作按钮点击回调
    handleActionClick: (params:ActionItemIProps) => void;
    // 退出登录回调
    handleLoginOut: () => void;
}
export interface AppHeaderIProps {
    /**
     * @description  顶部导航栏logo,传入组件
     */
    logoComponent?: React.ReactNode;

    /**
     * @description logo点击回调=>配合logoSrc使用
     */
    handleLogoClick?: () => void;

    /**
     * @description 顶部导航菜单栏
     */
    menu?: HeaderMenuItemIProps[];

    /**
     * @description 菜单栏切换回调
     */
    handleMenuChange?: (params?: HeaderMenuItemIProps) => void;

    // /**
    //  * @description 菜单栏初始化选中的回调
    //  */
    // initHeaderMenuChange?: (params?: HeaderMenuItemIProps) => void;

    /**
     * @description 个人中心
     */
    user: UserItemIProps;

     /**
     * @description 额外节点
     */
    extra?: React.ReactNode;
}
