import {components} from 'baidu-acu-react-common';
import './index.less';

const {Loading} = components;

const customLoading = props => {
    const {loading = false, maskStyle} = props;
    return (
        <>
            {
                loading && (
                    <div className="loading-container">
                        <div className="mask" style={maskStyle}></div>
                        <Loading />
                    </div>
                )
            }
        </>
    );
};

export default customLoading;