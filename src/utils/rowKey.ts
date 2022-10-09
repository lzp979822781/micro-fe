/**
 * @description 生成数组与对象的key
 * @author guowei26
 */

import {uniqueId} from 'lodash';

export type RowKey<T extends object> = T & { [key: string]: string };

/**
 * 设置 `rowKey` 字段
 * 不会覆盖
 *
 * @template T
 * @param {T} value
 * @return {RowKey<T>}
 */
export const setRowKey = <T extends object>(
    value: T,
    key?: string
): RowKey<T> => ({
        [key || 'rowKey']: uniqueId(),
        ...value
    });

export const injectRowKey = <T extends object>(
    values: T[],
    key?: string
): RowKey<T>[] => {
    return values.map(item => setRowKey(item, key));
};
