/**
 * @description 路由前置导航守卫
 * @author guowei26
 */
export interface BeforeRouterItemIProps {
    to: string;
    next: (path?: string) => void;
}

// 路由前置执行
export const handleLogin = (params:BeforeRouterItemIProps) => {
    const {to, next} = params;
    if (to === '/page2') {
        // console.log(456);
        next('/page2/page3');
    }
};

// 测试后边函数不执行
export const beforeFnTest = () => {
    // console.log(123123123);
};

