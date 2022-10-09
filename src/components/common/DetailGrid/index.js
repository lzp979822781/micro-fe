import classnames from 'classnames';
import {Row, Col} from '@baidu/sstrd';
import {isNull} from '@utils';
import ComTooltip from '../ComTooltip';
import './index.less';

const PREFIX = 'detail-grid';
function DetailGrid(props) {
    const {
        className,
        rowGutter = [10, 10],
        options = [],
        data = {},
        showTooltip,
        labelClass
    } = props;
    const cls = classnames(PREFIX, className);

    const renderText = item => {
        const {
            field,
            span = 24,
            defaultValue = '-',
            formatter,
            showTooltip = true
        } = item;
        const resVal = !isNull(data[field])
            ? (formatter ? formatter(data[field]) : data[field])
            : defaultValue;
        const textCls = classnames(`${PREFIX}-content-value`, {
            [`${PREFIX}-content-value-ellipse`]: span === 8
        });
        if (item.custom) {
            return;
        }

        if (showTooltip) {
            return (
                <ComTooltip
                    title={resVal}
                    width={220}
                    overlayClassName={`${PREFIX}-tooltip`}
                >
                    <div className={textCls}>
                        {item.exact && item.exact}&nbsp;{resVal}
                    </div>
                </ComTooltip>
            );
        }

        return (
            <div className={textCls}>
                {item.exact && item.exact}{resVal}
            </div>
        );
    };
    const renderContent = () => {
        if (!Array.isArray(options)) {
            return;
        }
        return (
            <Row gutter={rowGutter}>
                {
                    options.map(item => {
                        const {text, field, span = 24, defaultValue = '-', visible = true} = item;
                        const itemCls = classnames({[`${PREFIX}-hide`]: !visible});
                        return (
                            <Col key={item} span={span} className={itemCls}>
                                <div className={`${PREFIX}-content-item`}>
                                    <div className={`${PREFIX}-content-label ${labelClass || ''}`}>
                                        {text ? `${text}：` : ''}
                                    </div>
                                    {
                                        renderText(item)
                                    }
                                    {
                                        item.custom
                                            ? (
                                                item.custom
                                                    || <div className={`${PREFIX}-content-value`}>{defaultValue}</div>
                                            )
                                            : null
                                    }
                                </div>
                            </Col>
                        );
                    })
                }
            </Row>
        );
    };

    return (
        <div className={cls}>
            {renderContent()}
        </div>
    );
}

export default DetailGrid;