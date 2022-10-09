import classnames from 'classnames';
import {Modal} from '@baidu/sstrd';
import {ExclamationCircleOutlined, CloseOutlined} from '@ant-design/icons';
import './index.less';

const PREFIX = 'com-delete-modal';
function ComDeleteModal(props) {
    const {
        className,
        width = 500,
        message = '确定删除吗?',
        description,
        footer,
        cancelButtonProps = {},
        okButtonProps = {},
        ...otherProps
    } = props;
    const cls = classnames(PREFIX, className);

    return (
        <Modal
            wrapClassName={cls}
            width={width}
            closable={false}
            cancelButtonProps={{className: `${PREFIX}-footer-cancel`}}
            {...otherProps}
        >
            <div className={`${PREFIX}-content`}>
                <div className={`${PREFIX}-content-prompt`}>
                    <ExclamationCircleOutlined className={`${PREFIX}-content-prompt-icon`} />
                    <div className={`${PREFIX}-content-prompt-container`}>
                        <div className={`${PREFIX}-content-prompt-text`}>{message}</div>
                        <div className={`${PREFIX}-content-prompt-desc`}>{description}</div>
                    </div>
                    <div className={`${PREFIX}-content-prompt-right`}>
                        <CloseOutlined
                            className={`${PREFIX}-content-prompt-right-close`}
                            onClick={otherProps?.onCancel}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ComDeleteModal;