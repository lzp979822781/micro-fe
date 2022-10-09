
/**
* @file TableOptions
* @descrption 表格操作列
* @author chenziqin01
*/
import './index.less';
import {Tooltip} from '@baidu/sstrd';

/**
 * 表格操作列
 * @param {Object} style
 * @param {Object} options 操作对象
 * @param {string} options.text 操作名称
 * @param {boolean=} options.disabled 是否可点击
 * @param {Function=} options.onClick 点击事件
 * @param {string} options.tipText tooltip
 * @returns {*}
 */
function TableOptions(props) {
    const {options = [], style} = props;
    return (
        <div className='options' style={style}>
            {options.filter(item => !item.visible).map(item => {
                const {onClick, text = '', disabled, tipText} = item;
                return (
                    disabled ? (
                        <Tooltip title={tipText}>
                            <span className='options-disabled' key={text}>{text}</span>
                        </Tooltip>) : <a key={text} className='options-normal' onClick={onClick && onClick}>{text}</a>
                );
            })}
        </div>
    );
}
export default TableOptions;