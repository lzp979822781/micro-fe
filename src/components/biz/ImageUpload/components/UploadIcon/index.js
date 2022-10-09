import classnames from 'classnames';
import {Progress} from '@baidu/sstrd';
import './index.less';

const PREFIX = 'upload-icon';
function UploadIcon(props) {
    const {className, percent} = props;
    const cls = classnames(PREFIX, className);

    return (
        <div className={cls}>
            <Progress
                percent={percent}
                strokeWidth={5}
                size='small'
                status='active'
                showInfo={percent}
            />
        </div>
    );
}

export default UploadIcon;
