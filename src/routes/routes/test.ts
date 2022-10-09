import React from 'react';
import {RouterItem} from '../index';

const Test = React.lazy(() => import('@pages/Test'));

const routers: RouterItem[] = [
    {
        path: '/test',
        title: '测试页面',
        component: Test
    }
];

export default routers;

