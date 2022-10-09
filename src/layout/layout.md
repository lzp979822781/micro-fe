## Layout布局

配置整个项目的侧导航、顶部导航以及内容主体

#### 何时使用

项目初始化后，根据业务需求，进行侧导航(包括菜单栏)、顶部导航、内容主体的配置

#### 目录结构

```javascript
|-- layout                   
|  |-- components                    
|      |-- AppHeader                 // 顶部导航栏
|      |-- AppMain                   // 内容主体 
|      		 |-- routerNavigation      // 路由导航守卫
|              |-- afterEach.tsx     // 路由后置导航守卫
|              |-- beforeEach.tsx    // 路由前置导航守卫
|      |-- AppSideNav                // 侧导航
|      |-- CollapsedProjects         // 侧导航顶部下拉组件
|  |-- index.module.less             // layout样式
|  |-- index.tsx                     // layout布局组件
|  |-- layout.js                     // layout配置
|  |-- layout.md                     
```

#### 演示地址

http://szwg-gyy-rmp10001.szwg01:8952/



---



#### 顶部导航栏 AppHeader

演示：http://szwg-gyy-rmp10001.szwg01:8952/

```typescript
import logoSvg from '@images/logo.svg?url';

// 这个数据配置到layouyt.js里，在这里引入，这里为了方便看，暂时写到这里
const headerMenuData = [
    {name: '首页', key: '1', path: '/home'},
    {name: '基础示例', key: '2', path: '/example/sstrd/baseUi/button', basePathName: '/example'}
];

 // 顶部导航-菜单栏点击回调
const handleMenuChange = useCallback(res => {
  if (res.path) {
    history.push(res.path);
  }
}, []);

// 顶部导航-用户模块某一项点击事件回调
const handleActionClick = useCallback(res => {
  // console.log(res);
}, []);

 // 顶部导航-用户模块点击退出事件回调
const handleLoginOut = useCallback(() => {
  console.log('退出');
}, []);

// 顶部导航配置
const headerNav = {
  // 顶部导航logo
  logoComponent: <img src={logoSvg} style={{height: '43px', width: '224px'}} />,
  // 顶部导航菜单栏数据
  menu: headerMenuData,
  // 顶部导航菜单栏点击回调
  handleMenuChange,
  // 导航栏右边位置，个人中心配置
  user: {
    name: 'Admin',
      icon: <Avatar src="https://joeschmoe.io/api/v1/random" />,
        actions: [
          // 此处可以配置用户部分的操作行为,以『修改密码』举例
          {key: '1', icon: <CopyOutlined />, name: '修改密码'}
        ],
          // 用户模块某一项点击事件回调
          handleActionClick,
          // 用户模块点击退出事件回调
          handleLoginOut
  }
  // 右侧额外顶部节点
  extra: <div>额外自定义内容</div>
};

<AppHeader {...headerNav} />

```

##### API

| 参数             | 说明               | 默认值 | 类型                                       |
| ---------------- | ------------------ | ------ | ------------------------------------------ |
| logoComponent    | 导航栏logo         | -      | ReactNode                                  |
| menu             | 数据数组           | -      | HeaderMenuItemIProps[]                     |
| handleMenuChange | 菜单栏点击回调     | -      | (*params*?: HeaderMenuItemIProps) => void; |
| user             | 右顶部个人中心配置 | -      | UserItemIProps                             |
| extra            | 额外扩展节点       | -      | ReactNode                                  |

**相关类型（详细可参考layout/components/AppHeader/type.ts）**

```typescript
interface HeaderMenuItemIProps {
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

interface ActionItemIProps {
    name: string;
    key: string | number;
    icon?: React.ReactNode;
    uniqueKey?: number|string;
}

interface UserItemIProps {
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
```



---



#### 侧导航 AppSideNav

演示：http://szwg-gyy-rmp10001.szwg01:8952/

```typescript

// 侧导航顶部选择框数据,这个配置放在layout.js里，暂时放在这里
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

// 左侧菜单栏-点击切换回调
const handleMenuClick = useCallback((currMenu, munuList) => {
  const {children} = munuList;
  const {path, external} = currMenu;
  if (external) {
    window.open(path, '_blank');
    return;
  }
  history.push(path);
  console.log(children);
}, []);

// 左侧菜单栏-点击筛选框返回首页按钮
const handleBackHome = useCallback(() => {
  history.push('/');
}, []);

// 左侧菜单栏-下拉选项框选项改变回调
const handleSelect = useCallback((value, item, arr) => {
  console.log(value, item, arr);
}, []);

const sideNav = {
  // 菜单栏点击回调
  handleMenuClick,
  // 菜单栏顶部Select配置
  menuSelect: {
    data: menuSelectData,
    initValue: 'select1',
    visible: true,
    handleBackHome,
    handleSelect
  }
  // 侧导航额外节点
  // extra: {name: '测试项目标题', icon: <CopyOutlined />}
};
```

##### 注意

1. **侧导航相关配置参数可参考 layout/index.tsx 中代码**

2. **侧导航相关功能为方便使用，已将相关功能和redux结合到了一起，详细可参考：**

   **redux：redux/menu.slice.js**  

   **Demo:  pages/Example/NavDemo  使用redux调用侧导航相关api，如侧导航收起展开、切换数据等**

   

#### API

| 参数            | 说明             | 默认值 | 类型                                                         |
| --------------- | ---------------- | ------ | ------------------------------------------------------------ |
| data            | 导航栏logo       | []     | MenuItemIProps[]                                             |
| hideMenu        | 隐藏菜单栏       | -      | (fun: (*params*: boolean) => void) => void;                  |
| handleMenuClick | 菜单点击回调     | -      | (*currentMenu*:MenuItemIProps,*menuData*: MenuItemIProps[])=>void |
| menuSelect      | 侧导航顶部选择框 | -      | MenuSelect                                                   |
| refreshMenuData | menu数据刷新     | -      | (func: (*params*: MenuItemIProps[]) => void) => void         |
| setMenuList     | 菜单栏数据修改   | -      | (*params*: MenuItemIProps[]) => void;                        |
| extra           | 额外扩展节点     | -      | Extra                                                        |

###### MenuSelect 侧导航顶部选择框

| 参数            | 说明           | 类型                                                         |
| --------------- | -------------- | ------------------------------------------------------------ |
| data            | 数据源         | SelectItemIProps[]                                           |
| handleSelect    | 下拉框选择回调 | (params1:string\|number,params2:SelectItemIProps,params3:SelectItemIProps[])=>void |
| handleMenuClick | 菜单点击回调   | (*currentMenu*:MenuItemIProps,*menuData*: MenuItemIProps[])=>void |
| visible         | 显示/隐藏      | Boolean                                                      |
| initValue       | 初始值         | string ｜ number                                             |
| handleBackHome  | 返回首页回调用 | () => void                                                   |

Extra 额外扩展节点

| 参数 | 说明 | 类型      |
| ---- | ---- | --------- |
| icon | 图标 | ReactNode |
| name | 名称 | String    |

**相关类型（详细可参考layout/components/AppSideNav/type.ts）**

```typescript
interface MenuItemIProps {
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

interface SelectItemIProps {
    label: string;
    value: string | number;
    disabled?: boolean;
    [index: string]: any;
}
```



---



### 内容主体AppMain

描述：主要用来放置内容

演示：http://szwg-gyy-rmp10001.szwg01:8952/

#### 路由导航守卫

- ##### 前置导航守卫：路由跳转之前所执行函数

  - **使用方式：首先在AppMain/routerNavigation/beforeEach.ts注册函数，然后在routerNavigation/index.tsx中的路由全局前置钩子函数getRouterBeforeEachFn添加注册**
  - **demo：具体范例，请参考AppMain/routerNavigation/beforeEach.ts中的handleLogin方法**

- ##### 后置导航守卫:   路由跳转后所执行函数

  - **使用方式：首先在AppMain/routerNavigation/afterEach.ts注册函数，然后在routerNavigation/index.tsx中的路由全局后置钩子函数getRouterAfterEachFn添加注册**
  - **demo：具体范例，请参考AppMain/routerNavigation/afterEach.ts中的scrollToTop方法**

##### 注意：

1. 这个组件无需配置，这里所渲染的组件和路由配置中的组件相对应

