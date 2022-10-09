/**
 * @description 路由导航守卫
 * @author guowei26
 */

import {scrollToTop} from './afterEach';
import {handleLogin, beforeFnTest} from './beforeEach';

type fnVoid = () => void;
type fnParams = <T>(params: T) => T;
type fnRes = fnVoid | fnParams

// 异步函数实现函数聚合=>串行执行
export const composeFn = (fns:fnRes[]) => {
    return async () => {
        let index = 0;
        async function next() {
            if (index === fns.length) {
                return Promise.resolve();
            }
            if (index < fns.length) {
                return Promise.resolve(fns[index++](next));
            }
        }
        return await next();
    };
};


// 同步函数实现函数聚合=>串行执行
export const composeFnAsyc = (
    fns: Array<Function>,
    to: string,
    next: (path?: string) => void
) => {
    return function () {
        let index = 0;
        let url = '';
        const run = (): void => {
            if (index === fns.length) {
                return;
            }
            if (index < fns.length) {
                const currentFn = fns[index];
                currentFn?.({to, next: (res:string) => {
                    if (res) {
                        url = res;
                        next(res);
                    }
                }});
                if (url) {
                    return;
                }
                index++;
                return run();
            }
        };
        return run();
    };
};

// 函数并行执行
export const parallelFn = (
    fns: Array<(form?: string, to?: string) => void>,
    from?: string,
    to?: string
) => {
    return () => {
        fns.forEach(fn => fn(from, to));
    };
};


// 路由全局后置钩子函数=>可并行执行，可串行执行（当前是并行执行）
export const getRouterAfterEachFn = (from?:string, to?:string) => {
    // const toTop: fnRes = scrollToTop; // 返回顶部
    // return composeFn(fns);
    const fns = [scrollToTop];
    return parallelFn(fns, from, to);
};

// 路由全局前置钩子函数
export const getRouterBeforeEachFn = (
    to: string,
    next: (params?: string) => void
) => {
    const fns = [handleLogin, beforeFnTest];
    return composeFnAsyc(fns, to, next);
};
