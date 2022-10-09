/**
 * @file: 初始的菜单配置数据，通过指定path和路由匹配
 * @Author: Guo Xiaohua <guoxiaohua@baidu.com>
 * @Date: Do not edit
 * LastEditors: Please set LastEditors
 * LastEditTime: 2022-03-30 14:30:13
 */
import {MailOutlined} from '@ant-design/icons';
const headerMenuData = [
    {name: '首页', key: '1', path: '/home'}
];

// siderbar侧导航菜单配置数据
const siderbarMenuData = [
];

// 侧导航顶部选择框数据
const menuSelectData = [
    {
        label: '选项1',
        value: 'select1'
    },
    {
        label: '选项2',
        value: 'select2'
    },
    {
        label: '选项3',
        value: 'select3'
    },
    {
        label: '选项4',
        value: 'select4'
    }
];

export {headerMenuData, siderbarMenuData, menuSelectData};
