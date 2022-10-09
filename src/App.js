import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {ConfigProvider as AntdConfigProvider} from '@baidu/sstrd';
import zhCN from '@baidu/sstrd/lib/locale-provider/zh_CN';
import {Provider as ReduxProvider} from 'react-redux';

import PrimaryLayout from './layout/index';
import {store} from '@redux';

function App() {
    return (
        <ReduxProvider store={store}>
            <AntdConfigProvider locale={zhCN} prefixCls='micro-fe'>
                <Router basename='/subApp'>
                    <PrimaryLayout />
                </Router>
            </AntdConfigProvider>
        </ReduxProvider>
    );
}

export default App;