import {useMemo} from 'react';
import {SyncOutlined} from '@ant-design/icons';
import classnames from 'classnames';
import './index.less';

const PREFIX = 'refresh-biz-button';
function RefreshButton(props) {
    const {className, spin, reset} = props;
    const cls = useMemo(() => {
        return classnames(`${PREFIX}`, className);
    }, [className]);
    return (
        <div className={cls} onClick={() => reset()}>
            <SyncOutlined spin={spin} className={`${PREFIX}-icon`} />
        </div>
    );
}

export default RefreshButton;