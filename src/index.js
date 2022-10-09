/*
 * @Author: liuyan45
 * @Date: 2022-01-04 15:15:28
 * @LastEditTime: 2022-01-04 19:28:51
 * @LastEditors: liuyan45
 * @FilePath: /acg-industry-fe/blue-cli/src/index.js
 * @Description: 入口页
 */
import './public-path';
import ReactDOM from 'react-dom';
import App from './App';

function render(props) {
    const {container} = props;
    ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}

export async function bootstrap() {
    console.log('micro fe bootstraped');
}

export async function mount(props) {
    console.log('micro fe props from main framework', props);
    render(props);
}

export async function unmount(props) {
    const {container} = props;
    ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

