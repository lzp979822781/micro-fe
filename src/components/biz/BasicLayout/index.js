/*
 * @Author: guowei
 * @Date: 2021-12-27 17:14:23
 * @LastEditTime: 2022-01-04 19:43:09
 * @LastEditors: guowei
 * @FilePath: /blue-cli/src/components/index.tsx
 * @Description: 带有面包屑和返回按钮的layout组件
 */
import React, {useState, useMemo, useRef} from 'react';
import {LeftOutlined} from '@ant-design/icons';
// ts-ignore
import {useHashHistory} from '@hooks';
import styles from './index.module.less';

const BasicLayout = props => {
    const {title} = props;
    // title 使用的是router里所配置的title
    const [pageTitle, setPageTitle] = useState(title);
    const [showBack, setShowBack] = useState(false);
    const backClickRef = useRef();
    const history = useHashHistory();

    // 是否展示顶部返回按钮以及标题
    const showBackHeader = useMemo(() => {
        return pageTitle || showBack;
    }, [pageTitle, showBack]);

    return (
        <div className={styles.container}>
            {showBackHeader
                && (
                    <div className={styles.pageHeader}>
                        {showBack
                        && (
                            <div
                                className={styles.backContainer}
                                onClick={() => {
                                    if (backClickRef.current) {
                                        backClickRef.current();
                                        return;
                                    }
                                    history.goBack();
                                }}
                            >
                                <LeftOutlined className={styles.backSvg} />
                                <span>返回</span>
                            </div>)}
                        {pageTitle && <div className={styles.title}>{pageTitle}</div>}
                    </div>
                )
            }
            <div className={styles.content}>
                {React.cloneElement(props.children, {
                    // 设置面包屑标题
                    setPageTitle: res => setPageTitle(res),

                    // 是否显示返回按钮
                    setShowBack: res => setShowBack(res),

                    // 返回按钮自定义点击事件
                    handleBackClick: fn => {
                        if (fn) {
                            backClickRef.current = fn;
                        }
                    }
                })}
            </div>
        </div>
    );
};

export default BasicLayout;
