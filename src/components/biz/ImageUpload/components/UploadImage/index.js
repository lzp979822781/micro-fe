/**
 * Author: your name
 * Date: 2021-07-10 14:24:00
 * LastEditTime: 2021-07-10 18:11:39
 * LastEditors: your name
 * Description: In User Settings Edit
 * FilePath: /device-intelligence-platform/src/components/biz/ImageUpload/components/UploadImage/index.js
 */
import classnames from 'classnames';
import {EyeOutlined} from '@ant-design/icons';
import Trash from '@images/trash.svg';
import './index.less';

const PREFIX = 'upload-image';
function UploadImage(props) {
    const {className, src, onPreview, onDelete, file} = props;
    const cls = classnames(PREFIX, className);
    const onInnerPreview = e => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        onPreview && onPreview(file);
    };

    const onInnerDelete = e => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        onDelete && onDelete(file);
    };

    const renderHover = () => {
        return (
            <div className={`${PREFIX}-hover`}>
                <EyeOutlined onClick={onInnerPreview} />
                <Trash
                    className={`${PREFIX}-hover-del`}
                    onClick={onInnerDelete}
                />
            </div>
        );
    };

    return (
        <div className={cls}>
            <img className={`${PREFIX}-img`} src={src} />
            {renderHover()}
        </div>
    );
}

export default UploadImage;
