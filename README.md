# ACG工业方向blue-cli脚手架项目开发说明

## 预览地址

[http://szwg-gyy-rmp10001.szwg01:8952](http://szwg-gyy-rmp10001.szwg01:8952)

## 技术框架
1. 前端采用`React/ES6、less`架构，兼容IE8+
2. blue-cli脚手架采用`create-react-app + node.js + express + Webpack 5.0`完成脚手架基本的开发，express完成mock数据生成工具的开发.Webpack负责模块打包和项目优化。node.js负责blue-command开发、blue-cli组件模版创建开发
3. 项目样式支持less,css。建议使用css module来解决样式覆盖和冲突问题。可以定义css或者less文件为xxx.module.css或者xxx.module.less，样式文件将会被自动编译加上随机后缀。
4. 为接口请求封装了拦截器。拦截器在文件`server/until/request.js`中,拦截器开发支持Fetch、axios。
业务侧接口使用方法如下：
```
// 业务侧请求封装
export function getSkillList(params = {}) {
    return service({
        url: '/v1/skills',
        method: 'GET',
        body: params,
        headers: {
            'Content-Type': CONTENTTYPE.form.json
        }
    });
}

// 业务侧使用
getSkillList().then(result => {
  console.log('request', result);
}).catch(err => {
  console.log(err);
});
```
5. 数据管理采用redux,并使用useSelector、useDispatch等HooksApi替代connect，减少模板代码,中间件使用了redux-thunk，使dispatch支持传函数参数，支持调用异步接口

6. 在`server/until/sse.js`做了sse请求的封装

```
// 业务侧请求封装
import {initSseServer} from '../utils/sse.js';

const path = '/v1/monitors/events';
function getMonitorsList(params = null, callback) {
    return initSseServer(path, params, callback);
}

export {
    getMonitorsList
};

// 业务侧使用
useEffect(() => {
    let getMonitorsListSource = getMonitorsList({
        pageNo: 1,
        pageSize: 4,
        sort: '-index'
    }, result => {
        // 各个状态码所代表的含义
        switch (result.status) {
            case 125:
                console.log('SSE连接建立');
                break;
            case 200:
                console.log('收到SSE数据');
                console.log('result', result.data);
                break;
            case 226:
                console.log('SSE连接中断');
            case 500:
                console.log('SSE返回数据格式错误！');
                break;
            case 501:
                console.log('客户端不支持SSE');
                break;
            default:
                break;
        }
    });
    return () => {
        // 组件销毁，SSE断开
        getMonitorsListSource && getMonitorsListSource.close();
    };
}, []);
```

## 项目整体目录结构及说明

```

|-- config                             // webpack配置
|   |-- blue-cli-config.js             // 项目配置
|   |-- webpack.config.js              // webpack配置
|-- dist                               // 打包后的代码集合
|   |--static                          // 静态资源集合
|   |   |--css                         // css
|   |   |--img                         // img
|   |   |--js                          // js
|   |-- favicon.ico                    // logo
|   |-- index.html                     // 最终打包生成的html文件
|-- node_modules                       // 项目依赖包
|--mockup                              // mock数据生成工具
|   |-- app.js                         // mock数据生成工具入口
|   |-- v1                             // 接口返回值
|--public                              // 页面需要的静态资源
|   |-- favicon.ico                    
|   |-- index.html                    
|--script                              // 脚手架主要功能node代码
|   |-- create.js                      // 创建组件脚本
|   |-- start.js                       // 启动项目脚本
|   |-- build.js                       // 构建项目脚本
|   |-- test.js                        // 自动化测试脚本
|-- src                                // 项目脚本集合
|   |-- assets                         // 项目静态文件集合
|   |   |-- css                        // css
|   |   |-- icons                      // icon
|   |   |-- images                     // image
|   |   |-- script                     // js
|   |-- components                     // 页面使用的公共组件
|   |   |-- widget.js                  // 组件js脚本
|   |   |-- widget.less                // 组件sless样式
|   |-- layout                         // 页面主框架布局
|   |   |-- layout.js                  // 初始的菜单配置数据，通过指定path和路由匹配
|   |-- constants                      // 页面使用常量
|   |-- hooks                          // 自定义hooks
|   |-- pages                          // 项目中的页面集合
|   |   |   |-- page.js                // 页面js脚本
|   |   |   |-- page.less              // 页面less样式
|   |-- redux                          // redux封装
|   |   |-- actions                    // actions
|   |   |-- reducer                    // reducer
|   |-- routes                         // 路由
|   |-- server                         // 拦截器
|   |   |-- request                    // 业务侧http请求封装
|   |   |-- sse                        // 业务侧sse请求封装
|   |   |-- util                       // 拦截器封装
|   |   |-- api.js                     // api列表
|   |-- utils                          // 项目工具函数集合
|-- index.js                           // 页面的入口
|-- package-lock.json                  // 锁定安装时的包的版本号
|-- package.json                       // 项目基本信息
|-- README.md                          // 项目说明
|-- eslintrc.js                        // eslint参数配置
|-- gitignore                          // gitignore配置
|-- ci.yml                             // 构建配置
|-- stylelint.config.js                // stylelint配置               
|-- tsconfig.json                      // typescript配置
```

## 准备

项目依赖：

```
"less-loader": "^10.2.0",
"webpack": "^5.64.4",
"webpack-dev-server": "^4.6.0"
```

## 快速开始

1. 进入文件夹，安装依赖
```
npm install
```
2. 启动项目
```
npm start
```

## 常用命令
1. `npm run start` 启动本地服务
2. `npm run build` 构建项目，用于生产环境代码打包
3. `npm run create` 开发时使用，用于`src/components`文件新建组件
4. `npm run mock` 启动mock数据生成工具
4. `npm run test` 自动化测试

## webpack配置alias简化相对路径
```
'@src': path.resolve('src'),                    // 项目主体目录
'@components': path.resolve('src/components'),  // 公共组件
'@routes': path.resolve('src/routes'),          // 路由
'@common': path.resolve('src/common'),          // 项目公共资源
'@pages': path.resolve('src/pages'),            // 项目页面
'@hooks': path.resolve('src/hooks'),            // 自定义hooks
'@assets': path.resolve('src/assets'),          // 项目引入的静态资源
'@images': path.resolve('src/assets/images'),   // 项目使用的图片
'@icons': path.resolve('src/assets/icons'),     // 项目使用的图标
'@constants': path.resolve('src/constants'),    // 项目使用的常量
'@actions': path.resolve('src/redux/actions'),  // 项目中redux中的action
'@request': path.resolve('src/server/request'), // 项目使用的http请求封装方法
'@sse': path.resolve('src/server/sse')          // 项目使用的sse封装方法
```
**注意！！！配置完成之后，重启服务，否则配置不生效。**

## 未来规划

1. 集成blue-label
2. 集成blue-hooks
3. 优化webpack
4. 集成blue-commond，使用命令行加载使用模板。