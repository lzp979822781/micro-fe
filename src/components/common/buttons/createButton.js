import {Button} from '@baidu/sstrd';
import {PlusOutlined} from '@ant-design/icons';
import './index.less';
import classnames from 'classnames';
const PREFIX = 'create-btn';
const CreateButton = props => {
    const {text, onClick, disabled, className} = props;
    const cls = classnames(PREFIX, className);
    return (
        <Button disabled={disabled} type='primary' icon={<PlusOutlined />} onClick={onClick} className={cls}>
            {text}
        </Button>
    );
};
export default CreateButton;
