import './index.less';
function TableOptions(props) {
    const {options = []} = props;
    return (
        <div className='options'>
            {options.filter(item => item.visible).map(item => {
                const {onClick, text = '', disabled} = item;
                return disabled ? <span className='options-disabled' key={text}>{text}</span> : (
                    <span key={text} className='options-normal' onClick={onClick && onClick}>{text}</span>
                );
            })}
        </div>
    );
}
export default TableOptions;