/**
 * @description 侧导航相关工具函数
 * @author guowei26
 */

import {Fragment, useMemo} from 'react';
import {Menu} from '@baidu/sstrd';
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons';
import classNames from 'classnames';
import ComTooltip from '@components/ComTooltip';
import {MenuItemIProps} from './type';
import styles from './index.module.less';

const {SubMenu} = Menu;

export const getTextWidth = ({title}) => {
    const div = document.createElement('div');
    const sider = document.querySelector('#sider-menu');
    let fontSize = '14px';
    if (sider) {
        fontSize = window.getComputedStyle(sider, null).getPropertyValue('font-size');
    }
    div.style.display = 'inline-block';
    div.textContent = title;
    div.style.fontSize = fontSize;
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    setTimeout(() => document.body.removeChild(div), 0);
    return div.clientWidth;
};

// 菜单栏Tooltip文字显示
export const MenuContentTooltip = ({title}) => {
    const tooltipWidth = 110;
    const wordWidth = getTextWidth({title});
    if (wordWidth < tooltipWidth) {
        return <div className={styles.menuContent}>{title}</div>;
    }
    return (
        <ComTooltip
            arrowPointAtCenter
            title={title}
            width={tooltipWidth}
            color="white"
            overlayInnerStyle={{color: 'black'}}
        >
            <div className={styles.menuContent}>{title}</div>
        </ComTooltip>
    );
};

export const createChildNodes = (
    param: MenuItemIProps,
    handleMenuClick,
    menuList,
    collapsed,
    isCreateRoot?: boolean
) => {
    const {children = [], title: rootTitle} = param;
    return children.map((item, index) => {
        const {title, key, isGroup, children = [], hide} = item;
        if (hide) {
            return null;
        }
        const nextLevelMenu = createChildNodes(
            item, handleMenuClick, menuList, collapsed);
        const isShowRootMenu = collapsed && isCreateRoot && index === 0;
        const rootMenuItem = isShowRootMenu && (
            <Menu.Item className={classNames(styles.rootMenu, 'sider-rootMenu')} key={`${item.path}-${item.title}`}>
                <div className={styles.rootContainer}>{rootTitle}</div>
            </Menu.Item>
        );
        if (isGroup) {
            return (
                <Fragment key={item.key}>
                    {rootMenuItem}
                    <Menu.ItemGroup
                        className={styles.customMenuGroup}
                        key={String(item.key)}
                        title={<MenuContentTooltip title={title} />}
                    >
                        {nextLevelMenu}
                    </Menu.ItemGroup>
                </Fragment>
            );
        }
        if (children.length > 0) {
            return (
                <Fragment key={item.key}>
                    {rootMenuItem}
                    <SubMenu
                        onTitleClick={() => handleMenuClick?.(item, menuList)}
                        title={<MenuContentTooltip title={title} />}
                        key={String(item.key)}
                        popupClassName={classNames({[styles.submenuPopup]: collapsed}, styles.secondLevelMenu)}
                    >
                        {nextLevelMenu}
                    </SubMenu>
                </Fragment>
            );
        }
        return (
            <Fragment key={item.key}>
                {rootMenuItem}
                <Menu.Item
                    onClick={() => handleMenuClick?.(item, menuList)}
                    className={classNames(styles.customMenuItem)}
                    key={String(key)}
                >
                    <MenuContentTooltip title={title} />
                </Menu.Item>
            </Fragment>
        );
    });
};

// 递归的创建子菜单、并设置默认展开和选中的菜单
export const createMenu = (
    param: MenuItemIProps,
    handleMenuClick,
    menuList,
    collapsed,
) => {
    const childrenMenus = createChildNodes(
        param,
        handleMenuClick,
        menuList,
        collapsed,
        true
    );
    return {childrenMenus};
};

interface MenuNodeIProps {
    key: string;
    url: string;
    parent?: MenuNodeIProps;
    title: string;
}

// 根据url获取默认展开和默认选中菜单
export const getOpenSelectKeysByUrl = (url: string, menu: MenuItemIProps[]) => {
    const createMenuNode = (menuItem, parent?:MenuNodeIProps) => {
        return {
            key: menuItem.key,
            url: menuItem?.basePath || menuItem?.path,
            parent: parent,
            title: menuItem.title
        };
    };
    const createNewMenu = (menuList: MenuItemIProps[], parent?:MenuNodeIProps) => {
        menuList.forEach(item => {
            if (item.children && item.children.length > 0) {
                createNewMenu(item.children, createMenuNode(item, parent));
                return;
            }
            menuTree.push(createMenuNode(item, parent));
        });
    };
    const menuTree: MenuNodeIProps[] = [];
    const openKeys: string[] = [];
    const selectedKeys:string[] = [];
    createNewMenu(menu);
    menuTree.forEach(item => {
        const isSelected = new RegExp(`^${item.url}`).test(url);
        if (isSelected) {
            let currentNode = item;
            selectedKeys.push(String(currentNode.key));
            while (currentNode.parent) {
                openKeys.push(String(currentNode.parent.key));
                currentNode = currentNode.parent;
            }
        }
    });
    return {openKeys, selectedKeys};
};

// 根据菜单栏数据设置默认展开和默认选中
export const getDefaultMenuKeys = (menuList:MenuItemIProps[], path) => {
    let defaultOpenKeys:string[] = [];
    let defaultSelectedKeys:string[] = [];
    const pushKeys = (list:MenuItemIProps[]) => {
        list.forEach(item => {
            if (item.defaultOpen && !defaultOpenKeys.includes(String(item.key))) {
                defaultOpenKeys.push(String(item.key));
            }
            if (item.defaultSelect && !defaultSelectedKeys.includes(String(item.key))) {
                defaultSelectedKeys.push(String(item.key));
            }
            if (item.children && item.children.length > 0) {
                pushKeys(item.children);
            }
        });
    };
    // 获取配置中的默认展开和收起
    pushKeys(menuList);

    // 根据url获取展开和收起
    const {openKeys, selectedKeys} = getOpenSelectKeysByUrl(path, menuList);

    // 数据合并
    return {
        defaultOpenKeys: [...defaultOpenKeys, ...openKeys],
        defaultSelectedKeys: [...defaultSelectedKeys, ...selectedKeys]
    };

};

export const useTriggerComponent = ({
    collapsed, menuList, loaction, setKeys, setCollapsed
}) => {
    const triggerComponent = useMemo(() => {
        return (
            <div
                className={classNames(styles.trigerContainer, {[styles.iconCenter]: collapsed})}
                onClick={() => {
                    if (collapsed) {
                        const keys = getDefaultMenuKeys(menuList, loaction.pathname);
                        setKeys({defaultOpenKeys: keys.defaultOpenKeys});
                    }
                    setCollapsed(!collapsed);
                }}
            >
                {!collapsed
                    ? (
                        <>
                            <MenuFoldOutlined />
                            <div className={styles.word}>展开/收起</div>
                        </>) : <MenuUnfoldOutlined />}
            </div>
        );
    }, [collapsed, loaction.pathname]
    );
    return triggerComponent;
};

// 获取没有icon属性的menu数据
export const getMenuDataDelIcon = (menuList: MenuItemIProps[]) => {
    return menuList.map(item => {
        const cloneItem = {...item};
        Reflect.deleteProperty(cloneItem, 'icon');
        if (cloneItem.children && cloneItem.children.length > 0) {
            cloneItem.children = getMenuDataDelIcon(cloneItem.children);
        }
        return cloneItem;
    });
};
