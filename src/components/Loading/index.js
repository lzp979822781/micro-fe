/*
* @Author: liuyan45
* @Date: 2021-12-29 18:52:48
 * @LastEditTime: 2021-12-29 18:59:10
 * @LastEditors: liuyan45
 * @FilePath: /blue-cli/src/components/Loading/index.js
* @Description: Loading
*/

import {useState, useRef, useEffect} from 'react';
import {findDOMNode} from 'react-dom';
import {Spin} from '@baidu/sstrd';

import './index.less';

const CLS_PREFIX = 'custom-loading';

export default props => {

    const {text = '玩命加载中...'} = props;

    const [height, setHeight] = useState('100%');
    const loadingRef  = useRef(null);

    useEffect(() => {
        const currentDom = findDOMNode(loadingRef.current);
        const parentNode = currentDom.parentNode;
        const newHeight = parentNode ? parentNode.offsetHeight - 20 : height;
        setHeight(newHeight);
    }, []);

    return (
        <div className={CLS_PREFIX} style={{height}} ref={loadingRef}>
            <Spin tip={text} />
        </div>
    );
};