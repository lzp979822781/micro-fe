import {useMemo} from 'react';
import classnames from 'classnames';
import {ExclamationCircleFilled} from '@ant-design/icons';
import './index.less';

const PREFIX = 'com-alert';
function ComAlert(props) {
    const {
        className,
        children
    } = props;

    const renderIcon = () => {
        return (
            <div className={`${PREFIX}-icon`}>
                <ExclamationCircleFilled />
            </div>
        );
    };

    const renderContent = () => {
        return (
            <div className={`${PREFIX}-content`}>
                {children}
            </div>
        );
    };

    const cls = useMemo(() => {
        return classnames(`${PREFIX}`, className);
    }, [className]);
    return (
        <div className={cls}>
            {/* {renderIcon()} */}
            {renderContent()}
        </div>
    );
}

export default ComAlert;