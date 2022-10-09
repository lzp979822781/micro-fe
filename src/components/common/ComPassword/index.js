import classnames from 'classnames';
import {Input} from '@baidu/sstrd';

import './index.less';

const PREFIX = 'com-password';
function ComPassword(props) {
    const {className, ...otherProps} = props;
    const cls = classnames(PREFIX, className);

    return (
        <Input.Password
            className={cls}
            autocomplete='new-password'
            {...otherProps}
        />
    );
}

export default ComPassword;