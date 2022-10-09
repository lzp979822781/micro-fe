import classnames from 'classnames';
import './index.less';

const PREFIX = 'upload-error-msg';
function UploadErrorMsg(props) {
    const {className, children} = props;
    const cls = classnames(PREFIX, className);

    return (
        <div className={cls}>{children}</div>
    );
}

export default UploadErrorMsg;