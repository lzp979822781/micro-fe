import React, {useCallback} from 'react';
import {VerticalAlignBottomOutlined} from '@ant-design/icons';
import {Button} from '@baidu/sstrd';
import classnames from 'classnames';
import {download} from '@src/server/services';

import './index.less';

const PREFIX = 'download-btn';
export default props => {
    const {extra = {}, url, className, visible = true, ...otherProps} = props;

    const onDownClick = useCallback(() => {
        // 请求下载
        download({...extra, url});
    }, [extra, url]);

    const cls = classnames(className, PREFIX, {
        [`${PREFIX}-hide`]: !visible
    });
    return (
        <Button
            className={cls}
            icon={<VerticalAlignBottomOutlined />}
            onClick={onDownClick}
            {...otherProps}
        />
    );
};