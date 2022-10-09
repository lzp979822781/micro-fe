/**
 * @description 侧导航组件
 * @author guowei26
 */

import {FC, useCallback, useEffect, useMemo} from 'react';
import {Menu, Layout} from '@baidu/sstrd';
import classNames from 'classnames';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {
    menu, updateCurrentMenu, updateCollapse, collapse,
    hideSiderNavSelect, updateSiderNavSelectStatus
} from '@redux/menu.slice';
import {useBoolean, useSetState} from 'react-use';
import CustomIcon from '@components/CustomIcon/index.js';
import CollapsedProjects from '../CollapsedProjects';
import MenuHeaderSelect from './components/MenuHeaderSelect';
import {createMenu, getDefaultMenuKeys, useTriggerComponent, MenuContentTooltip} from './util';
import {MenuItemIProps, AppSideIProps} from './type';
import styles from './index.module.less';

const {SubMenu} = Menu;
const {Sider} = Layout;

type StringArray = string[];
interface StateIProps {
    // 默认被选中的项
    defaultSelectedKeys: StringArray;
    // 默认被展开的项
    defaultOpenKeys: StringArray;
}

const AppSideNav: FC<AppSideIProps> = props => {
    const loaction = useLocation();
    const dispatch = useDispatch();
    const {
        refreshMenuData,
        hideMenu,
        menuSelect,
        mode = 'inline',
        theme = 'light',
        handleMenuClick,
        extra,
        extraNode: customExtraNode,
        ...customProps
    } = props;
    const [hide, setHide] = useBoolean(false);
    const [menuKeys, setKeys] = useSetState<StateIProps>({
        defaultOpenKeys: [], defaultSelectedKeys: []
    });

    const collapsed = useSelector(collapse);
    const reduxSideSelectStatus = useSelector(hideSiderNavSelect);

    // redux传递的menu数据
    const menuList = useSelector(menu);
    const selectList = menuSelect?.data || [];

    // 更新下拉框显示隐藏状态到redux
    useEffect(() => {
        dispatch(updateSiderNavSelectStatus(!!menuSelect?.visible));
    }, [menuSelect?.visible]);

    // 侧导航收起展开事件
    const setCollapsed = useCallback((res: boolean) => {
        dispatch(updateCollapse(res));
        if (res) {
            setKeys({defaultOpenKeys: []});
            return;
        }
        if (!res) {
            const keys = getDefaultMenuKeys(menuList, loaction.pathname);
            setKeys({defaultOpenKeys: []});
            setTimeout(() => setKeys(keys), 0);
        }
    }, [menuList, location.pathname]);

    // 菜单栏底部展开收起组件
    const triggerComponent = useTriggerComponent({
        collapsed, loaction, menuList, setKeys, setCollapsed
    });

    // 创建子菜单、并设置默认展开和选中的菜单
    const createChildMenu = useCallback((menuItem: MenuItemIProps) => {
        const {childrenMenus} = createMenu(menuItem, (currentMenu, menuList) => {
            handleMenuClick?.(currentMenu, menuList);
            setKeys({defaultSelectedKeys: [String(currentMenu.key)]});
            dispatch(updateCurrentMenu(currentMenu));
        }, menuList, collapsed);
        return {childMenu: childrenMenus};
    }, [menuList, collapsed]
    );

    useEffect(() => {
        const keys = getDefaultMenuKeys(menuList, loaction.pathname);
        if (!collapsed) {
            const openKeys = [...menuKeys.defaultOpenKeys, ...keys.defaultOpenKeys];
            setKeys({
                defaultOpenKeys: [...new Set(openKeys)],
                defaultSelectedKeys: keys.defaultSelectedKeys
            });
        }
        if (collapsed) {
            setKeys({defaultSelectedKeys: keys.defaultSelectedKeys});
        }
    }, [loaction.pathname, collapsed, menuList]);

    // 传递menu更新函数,传递隐藏菜单函数
    useEffect(() => {
        hideMenu?.(setHide);
    }, [refreshMenuData, hideMenu]
    );

    // menu顶部select选择
    const menuSelectChange = useCallback((params1, params2, params3) => {
        menuSelect?.handleSelect?.(params1, params2, params3);
    }, []
    );

    // 菜单栏宽度
    const menuWidth = useMemo(() => {
        if (collapsed) {
            return 60;
        }
        return 180;
    }, [collapsed]
    );

    // 根据主题和菜单样式生成对应类名
    const menuClassName = useMemo(() => {
        return `${theme}-${mode}-customMenu`;
    }, [theme, mode]
    );

    // 手风琴收起展开效果
    const handleOpenChange = useCallback(keys => {
        setKeys({defaultOpenKeys: keys});
        // const rootSubmenuKeys = menuList.map(item => item.key);
        // const openKeys = menuKeys.defaultOpenKeys;
        // const selectedKeys = menuKeys.defaultSelectedKeys;
        // const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        // if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        //     setKeys({defaultOpenKeys: keys, defaultSelectedKeys: selectedKeys});
        //     return;
        // }
        // setKeys({
        //     defaultOpenKeys: latestOpenKey ? [latestOpenKey] : [],
        //     defaultSelectedKeys: selectedKeys
        // });

    }, [menuList, JSON.stringify(menuKeys)]);

    // 收起时，展示项目选择
    const collapsedSelect = useMemo(() => {
        if (!collapsed || !reduxSideSelectStatus) {
            return null;
        }
        return (
            <SubMenu
                popupClassName={classNames({[styles.submenuPopup]: collapsed})}
                key="collapsedSelect"
                icon={
                    <CustomIcon
                        className='projectCollpaseIcon'
                        type='icon-menu-arrow'
                    />}
            >
                <Menu.Item
                    className={styles.clearPadding}
                    key="selectMenuItem"
                >
                    <CollapsedProjects
                        options={selectList}
                        value={menuSelect?.initValue}
                        handleChange={menuSelectChange}
                    />
                </Menu.Item>
                <Menu.Item key="backHome" className={styles.backHomeMenuItem} onClick={menuSelect?.handleBackHome}>
                    <div className={styles.backHomeContainer}>返回首页</div>
                </Menu.Item>
            </SubMenu>
        );
    }, [collapsed, JSON.stringify(selectList), menuSelect?.initValue]);

    // 额外菜单栏节点
    const extraNode = useMemo(() => {
        if (!extra && !customExtraNode || collapsed) {
            return null;
        }
        if (customExtraNode) {
            return (
                <div className={styles.extraNav}>
                    <div className={styles.extraContainer}>{customExtraNode}</div>
                </div>
            );
        }
        if (extra) {
            return (
                <div className={styles.extraNav}>
                    <div className={classNames(styles.extraContainer, styles.extraWord)}>
                        {extra?.icon && extra.icon}
                        <div className={styles.name}>{extra.name}</div>
                    </div>
                </div>
            );
        }
        return null;

    }, [extra, customExtraNode, collapsed]);

    if (hide) {
        return null;
    }
    console.log('menuList', menuList);
    return (
        <Sider
            theme={theme}
            collapsible
            trigger={triggerComponent}
            width={menuWidth}
            className={classNames(styles.sider, {[styles.collapsedSider]: collapsed})}
            collapsed={collapsed}
            collapsedWidth={60}
        >
            {!collapsed && reduxSideSelectStatus ? <MenuHeaderSelect
                options={selectList}
                initValue={menuSelect?.initValue}
                handleChange={menuSelectChange}
                handleBackHome={menuSelect?.handleBackHome}
            /> : extraNode
            }
            <Menu
                style={{width: menuWidth}}
                {...customProps}
                selectedKeys={menuKeys.defaultSelectedKeys}
                openKeys={menuKeys.defaultOpenKeys}
                onOpenChange={handleOpenChange}
                mode={mode}
                inlineIndent={20}
                className={styles[menuClassName]}
                id="sider-menu"
            >
                {collapsedSelect}
                {menuList.map(item => {
                    const {key, title, icon, children = []} = item;
                    const {childMenu} = createChildMenu(item);
                    if (children.length === 0) {
                        return (
                            <Menu.Item
                                icon={icon}
                                onClick={() => handleMenuClick?.(item, menuList)}
                                className={classNames(styles.rootMenuItem)}
                                key={String(key)}
                            >
                                <MenuContentTooltip title={title} />
                            </Menu.Item>
                        );
                    }
                    return (
                        <SubMenu
                            key={key}
                            title={<MenuContentTooltip title={title} />}
                            icon={icon}
                            popupClassName={classNames({[styles.submenuPopup]: collapsed})}
                            popupOffset={[16, 16]}
                        >{childMenu}
                        </SubMenu>
                    );
                })}
            </Menu>
        </Sider>
    );
};
export default AppSideNav;

export * from './type';
