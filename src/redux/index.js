/**
 * @file 状态收口文件
 * @author guowei26
 */

import {configureStore} from '@reduxjs/toolkit';
import {menuSlice} from './menu.slice.js';

export const rootReducer = {
    menuSlice: menuSlice.reducer
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});
