/**
 * @description 侧导航相关类型
 * @author guowei26
 */

import React, {ReactChild} from 'react';
import {MenuProps} from '@baidu/sstrd/lib/menu';

export type stringNumber = string | number;

// 菜单MenuItem
export interface MenuItemIProps {
    // 菜单名称
    title: string;
    // 图标
    icon?: ReactChild;
    // 菜单唯一标识
    key: string | number;
    // 是否默认展开，只适用于有子菜单的菜单
    defaultOpen?: boolean;
    // 默认被选中
    defaultSelect?: boolean;
    // 跳转路径
    path?: string;
    // 根路径
    basePath?: string;
    // 是否禁用
    disabled?: boolean;
    // 是否分组
    isGroup?: boolean;
    // 子菜单
    children?: MenuItemIProps[];
    // 是否显示
    hide?: boolean;
    // 是否是外链
    external?: boolean;
    // 选中回掉时想要传的额外参数
    [index: string]: any;
}

export interface SelectItemIProps {
    label: string;
    value: string | number;
    disabled?: boolean;
    [index: string]: any;
}

export interface AppSideIProps extends Omit<MenuProps, 'defaultOpenKeys'|'defaultSelectedKeys'> {
    /**
     * @description 菜单数据
     */
    data?:MenuItemIProps[];

    /**
     * @description 隐藏菜单栏
     */
    hideMenu?: (fun: (params: boolean) => void) => void;

    /**
     * @description 菜单点击回掉
     */
    handleMenuClick?: (
        currentMenu:MenuItemIProps,
        menuData: MenuItemIProps[]) => void;

    /**
     * @description menuSelect 选项
     */
    menuSelect?: {
        /**
         * @description menu头部select数据加载
         */
        data?: SelectItemIProps[];

        /**
         * @description menu头部选择
         */
        handleSelect?: (
            params1: stringNumber,
            params2: SelectItemIProps,
            params3: SelectItemIProps[]
        ) => void;

        /**
         * @description 是否现实select
         */
        visible?: boolean;

        /**
         * @description select初始值
         */
        initValue?: string | number;

         /**
         * @description 返回首页
         */
        handleBackHome?: () => void;
    };

    /**
     * @description menu数据刷新
     */
    refreshMenuData?: (func: (params: MenuItemIProps[]) => void) => void;

    /**
     * @description 菜单栏数据修改
    */
    setMenuList?: (params: MenuItemIProps[]) => void;

    /**
     * @description 额外菜单节点
     */
    extraNode?: React.ReactNode;

    /**
     * @description 额外菜单信息
     */
    extra?:{ icon?: React.ReactNode, name: string }
}
