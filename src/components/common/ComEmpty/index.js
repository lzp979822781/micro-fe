import {useMemo} from 'react';
import classnames from 'classnames';
import newEmptyImg from '@assets/images/new-empty.png';
import './index.less';
import {PlusOutlined} from '@ant-design/icons';
import EmptyImg from './empty.svg';

const PREFIX = 'com-empty';
function ComEmpty(props) {
    const {
        className,
        onClick,
        title = '暂无数据',
        disabled = false,
        visible = true,
        emptyImg = newEmptyImg,
        hasCondition = true, // 是否带条件搜索为空
        extraText
    } = props;
    const onInnerClick = () => {
        if (disabled) {
            return;
        }
        onClick && typeof onClick === 'function' && onClick();
    };

    const renderPrompt = () => {
        if (hasCondition || !visible) {
            return;
        }

        const emptyCls = classnames(`${PREFIX}-content-desc`, {
            [`${PREFIX}-content-desc-disabled`]: disabled
        });

        return (
            <div
                className={emptyCls}
                onClick={onInnerClick}
            >
                <PlusOutlined /> {extraText}
                {/* 马上创建&gt; */}
            </div>
        );
    };
    const cls = useMemo(() => {
        return classnames(`${PREFIX}`, className);
    }, [className]);
    return (
        <div className={cls}>
            {/* <img className={`${PREFIX}-img`} src={emptyImg} /> */}
            <EmptyImg className={`${PREFIX}-bgimg`} />
            <div className={`${PREFIX}-content`}>
                <div className={`${PREFIX}-content-title`}>{title}</div>
            </div>
            <div>{renderPrompt()}</div>
        </div>
    );
}

export default ComEmpty;