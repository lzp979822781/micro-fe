import {useMemo} from 'react';
import {SyncOutlined} from '@ant-design/icons';
import {Button} from '@baidu/sstrd';
import RefreshSvg from '@images/icons/refresh.svg';
import classnames from 'classnames';
import './index.less';

const PREFIX = 'refresh-button';
function RefreshButton(props) {
    const {
        className,
        visible = true,
        ...otherProps
    } = props;

    const cls = classnames(PREFIX, className, {
        [`${PREFIX}-hide`]: !visible
    });
    return (
        <Button
            className={cls}
            icon={<RefreshSvg />}
            {...otherProps}
        />
    );
}

export default RefreshButton;