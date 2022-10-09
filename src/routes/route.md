## 路由Route配置

配置整个项目的相关页面路由

#### 何时使用

1. 项目初始化后，根据业务需求，配置初始化所展示页面
2. 后续迭代过程中，根据业务需求，添加相关路由

#### 目录结构

```javascript
|-- routes
|  |-- index.ts      // 路由配置文件
|  |-- sstrd.ts      // sstrd示例路由配置
|  |-- type.ts       // 路由相关类型
```

#### **配置规则**

1. 路由配置规则同**react-router-dom v5** ，项目中路由**继承**了**react-router-dom v5**中的api并进行**扩展**

2. 路由的懒加载使用React的React.lazy和Suspense实现

   react-router-dom v5地址：https://v5.reactrouter.com/

#### 代码示例（详细请看：routes/index.ts）

```typescript
import {matchPath} from 'react-router-dom';
import {RouterItem} from './type';
import BasicLayout from '@components/BasicLayout';
// 当内容较多时，可以单独拆分为文件，在此入口文件中引入
// sstrd 单独拆分至sstrd文件，在此处进行引入
import sstrd from './sstrd';

// 路由匹配优先级按照数组中元素的path匹配顺序，先匹配到的则会被使用，使用exact进行精准匹配。
const routers: RouterItem[] = [
    {
        path: '/',
        redirect: '/home',
        exact: true
    },
    {
        path: '/home',
        title: '首页',
        component: React.lazy(() => import('@pages/Home')),
        hideSideNav: true
    },
    {
        path: '/login',
        title: '登录',
        component: React.lazy(() => import('@pages/Login')),
        hideHeaderNav: true,
        hideSideNav: true
    },
    {
        path: '/example',
        title: '基础示例',
        routes: [
            {
                path: '/example/navDemo/routeParamsDemo/:name/:id?',
                title: '参数示例',
                component: React.lazy(() => import('@src/pages/Example/RouteParamsDemo')),
                layout: BasicLayout
            },
            {
                path: '/example/navDemo',
                title: '菜单设置',
                component: React.lazy(() => import('@pages/Example/NavDemo'))
            },
            ...sstrd
        ]
    }
];
export default routers;
```

#### 路由扩展工具函数(routes/index.ts)

getTargetRouteConfig，根据传入的路由path，可匹配路由配置表中该路由相关配置信息

demo：详细使用可参考layout/index.tsx

#### API

路由相关API请参考react-router-dom v5中的API，下边是根据业务扩展的一些API

注意： 

	1. ext是跟路由绑定的业务参数，如果有业务需求，需要根据路由配置一些参数，可配置在ext上
 	2. layout是容器组件，它只是一个布局组件。如果配置上，component会放入layout中然后渲染到页面上，
     - 详细可参考routes/index.ts中的所配置的BasicLayout组件

| 参数          | 说明             | 默认值 | 类型         |
| ------------- | ---------------- | ------ | ------------ |
| routes        | 页面级子路由     | -      | RouterItem[] |
| nest          | 组件级嵌套路由   | -      | boolean      |
| redirect      | 重定向路径       | -      | string       |
| path          | 路由路径         | -      | string       |
| hideSideNav   | 是否隐藏侧导航   | false  | boolean      |
| hideHeaderNav | 是否隐藏顶部导航 | False  | boolean      |
| layout        | 页面布局组件     | -      | ReactNode    |
| title         | 页面标题         | -      | string       |
| ext           | 业务扩展参数     | -      | Object       |

#### 相关类型

```typescript
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
```

