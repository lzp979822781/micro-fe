import classnames from 'classnames';

import {ComTooltip} from '../../common';
import './index.less';


const PREFIX = 'table-tooltip-text';
function TableTooltipText(props) {
    const {className, rows, text, width = 120, placeholder = '-'} = props;
    const cls = classnames(PREFIX, className, `${PREFIX}-${rows}`);
    if (!text) {
        return placeholder;
    }

    return (
        <ComTooltip title={text} width={width}>
            <div className={cls}>
                {text}
            </div>
        </ComTooltip>
    );
}

export default TableTooltipText;