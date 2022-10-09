import {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import classnames from 'classnames';
import styles from './index.module.less';

const format = 'YYYY-MM-DD HH:mm:ss';

const PREFIX = 'current-time';
function CurrentTime(props) {
    const {className, interval = 1000} = props;
    const cls = classnames(styles[PREFIX], className);
    const [time, setTime] = useState(moment().format(format));
    const ref = useRef();

    const getTime = () => {
        return moment().format(format);
    };

    const updateTime = () => {
        setTime(getTime());
        clearTimeout(ref.current);
        ref.current = setTimeout(() => {
            updateTime();
        }, interval);
    };

    useEffect(() => {
        updateTime();
        return () => {
            ref.current && clearTimeout(ref.current);
        };
    }, []);

    return (
        <div className={cls}>{time}</div>
    );
}

export default CurrentTime;