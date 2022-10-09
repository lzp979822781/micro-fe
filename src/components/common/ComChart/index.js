import {useEffect, forwardRef} from 'react';
import classnames from 'classnames';
import * as echarts from 'echarts';

import theme from './theme';
import styles from './index.module.less';

const PREFIX = 'com-chart';
const ComChart = forwardRef((props, ref) => {
    const {
        className,
        options = null,
        id,
        width = 590,
        height = 220,
        onChange,
        onClick,
        reload
    } = props;
    const cls = classnames(styles[PREFIX], className);

    useEffect(() => {
        if (ref.current && ref.current.setOption) {
            ref.current.setOption(options);
        }
    }, [reload]);

    const callbacklistener = chart => {
        onClick && chart.on('click', params => {
            onClick(params);
        });

        if (onChange && typeof onChange === 'function') {
            onChange();
        }
    };

    useEffect(() => {
        const dom  = document.getElementById(id);
        const chart = echarts.init(dom, theme);
        ref.current = chart;
        chart.setOption(options);
        callbacklistener(chart);
        const handleResizeListener = () => {
            chart.resize();
        };
        window.addEventListener('resize', handleResizeListener);

        return () => {
            window.removeEventListener('resize', handleResizeListener);
        };
    }, []);

    return (
        <div id={id} className={cls} ref={ref} style={{width: width, height: height}}></div>
    );
});

export default ComChart;