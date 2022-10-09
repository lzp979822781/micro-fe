/**
 * @description 顶部导航栏
 * @author guowei26
 */

import {useEffect, useMemo, useRef, FC, useState} from 'react';
import {Menu, Layout, Avatar, Dropdown} from '@baidu/sstrd';
import classNames from 'classnames';
import {useLocation} from 'react-router-dom';
import {uniqueId} from 'lodash';
import ArrowBottom from '@assets/images/arrow-bottom.svg';
import {AppHeaderIProps, HeaderMenuItemIProps} from './type';

import styles from './index.module.less';

const {Header} = Layout;

const AppHeader: FC<AppHeaderIProps> = props => {
    const {logoComponent, user, handleMenuChange, menu = [], extra} = props;
    const {actions = [], name, handleActionClick, icon} = user || {};
    const {pathname} = useLocation();
    const [userVisible, setUserVisible] = useState<boolean>(false);
    const menuRef = useRef<{ menuList: HeaderMenuItemIProps[] }>({menuList: []});
    const noActions = actions.length === 0;

    const headerCls = classNames(styles.header);

    // 默认选中项
    const defaultSelectedKeys = useMemo(() => {
        const configSelected = menu.filter(item => item?.isSelected).map(item => item.key);
        const keysByPath = menu.filter(item => {
            if (!item.path) {
                return false;
            }
            const isSelected = new RegExp(`^${item.basePathName || item.path}`).test(pathname);
            return isSelected;
        }).map(item => item.key);
        return [...configSelected, ...keysByPath];
    }, [menu, pathname]
    );

    useEffect(() => {
        menuRef.current.menuList = menu;
    }, [JSON.stringify(menu)]);

    // useEffect(() => {
    //     const currentMenuList = menuRef.current.menuList;
    //     const currentKey = defaultSelectedKeys?.[0];
    //     const targetMenu = currentMenuList.find(item => String(item.key) === String(currentKey));
    //     console.log(targetMenu, '++++=');
    //     initHeaderMenuChange?.(targetMenu);
    // }, []);

    const keyAcionsList = useMemo(() => {
        return actions.map(item => {
            const uniqueKey = uniqueId();
            return {...item, uniqueKey};
        });

    }, [actions]
    );

    // 姓名简称
    const shortName = useMemo(() => {
        if (!name) {
            return null;
        }
        return name.slice(0, 1);
    }, [name]);

    // 头像显示=>传入icon显示icon，没有icon现实姓名首字母
    const avatarNode = useMemo(() => {
        if (icon) {
            return icon;
        }
        return <Avatar className={styles.avtarBox}>{shortName}</Avatar>;

    }, [shortName]);

    const userActionMenu = (
        <Menu>
            <Menu.Item key="name" className={classNames(styles.name, {[styles.clearMargin]: noActions})}>
                {avatarNode}
                <span>{name}</span>
            </Menu.Item>
            {keyAcionsList.map((item, index) => {
                return (
                    <Menu.Item
                        key={item.uniqueKey}
                        className={
                            classNames(styles.normal, {
                                [styles.clearMargin]: keyAcionsList.length - 1 === index
                            })
                        }
                        onClick={() => handleActionClick(item)}
                    >
                        {item?.icon}
                        <span>{item?.name}</span>
                    </Menu.Item>
                );
            })}
            <Menu.Item key="login" onClick={() => user?.handleLoginOut?.()}>
                <div className={classNames(styles.loginOut, {[styles.clearLoginMagin]: noActions})}>退出登录</div>
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className={headerCls}>
            <div className={styles.logo}>
                {logoComponent}
            </div>
            <Menu
                mode="horizontal"
                selectedKeys={defaultSelectedKeys}
            >
                {menu.map(item => {
                    return (
                        <Menu.Item
                            key={item.key}
                            onClick={() => handleMenuChange?.(item)}
                        >
                            {item.name}
                        </Menu.Item>
                    );
                })}
            </Menu>
            <div className={styles.rightBtnContainer}>
                {extra && <div className={styles.extra}>{extra}</div>}
                <Dropdown
                    overlayClassName={styles.overClassName}
                    overlay={userActionMenu}
                    placement="bottomRight"
                    onVisibleChange={visible => setUserVisible(visible)}
                >
                    <div className={styles.avtar}>
                        {avatarNode}
                        <ArrowBottom className={classNames(styles.arrowBottom, {
                            [styles.activeDrop]: userVisible
                        })}
                        />
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
};

export default AppHeader;

export * from './type';
