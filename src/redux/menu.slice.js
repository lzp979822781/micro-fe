/**
 * @file 菜单栏相关数据
 * @author guowei26
 */
import {createSlice} from '@reduxjs/toolkit';
import {siderbarMenuData} from '../layout/layout';

const initialState = {
    // 菜单栏数据
    menu: siderbarMenuData,
    // 当前选中菜单
    currentMenu: {},
    // 顶部导航显示隐藏
    hideHeaderNav: false,
    // 侧导航显示隐藏
    hideSideNav: false,
    // 侧导航展开收起
    collapse: false,
    // 侧导航下拉框的显示和隐藏
    hideSiderNavSelect: false
};

export const menuSlice = createSlice({
    name: 'menuSlice',
    initialState,
    reducers: {
        updateMenu: (state, actions) => {
            state.menu = actions.payload;
        },
        updateCurrentMenu: (state, actions) => {
            state.currentMenu = actions.payload;
        },
        updateHeaderStatus: (state, actions) => {
            state.hideHeaderNav = actions.payload;
        },
        updateSideNavStatus: (state, actions) => {
            state.hideSideNav = actions.payload;
        },
        updateCollapse: (state, actions) => {
            state.collapse = actions.payload;
        },
        updateSiderNavSelectStatus: (state, actions) => {
            state.hideSiderNavSelect = actions.payload;
        }
    }
});

export const menu = state => state.menuSlice.menu;

export const currentMenu = state => state.menuSlice.currentMenu;

export const hideHeaderNav = state => state.menuSlice.hideHeaderNav;

export const hideSideNav = state => state.menuSlice.hideSideNav;

export const collapse = state => state.menuSlice.collapse;

export const hideSiderNavSelect = state => state.menuSlice.hideSiderNavSelect;

export const {
    updateMenu,
    updateCurrentMenu,
    updateHeaderStatus,
    updateSideNavStatus,
    updateCollapse,
    updateSiderNavSelectStatus
} = menuSlice.actions;
