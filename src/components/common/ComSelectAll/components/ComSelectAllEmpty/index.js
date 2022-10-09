import classnames from 'classnames';
import emptyImg from '@assets/images/new-empty.png';
import './index.less';

const PREFIX = 'com-select-all-empty';
function ComSelectAllEmpty(props) {
    const {className} = props;
    const cls = classnames(PREFIX, className);

    return (
        <div className={cls}>
            <img className={`${PREFIX}-img`} src={emptyImg} />
            <div className={`${PREFIX}-text`}>暂无结果</div>
        </div>
    );
}

export default ComSelectAllEmpty;