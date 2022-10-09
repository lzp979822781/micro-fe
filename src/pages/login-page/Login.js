import {useState} from 'react';
import {Form, Input, Button} from '@baidu/sstrd';
// 背景图和logo需要根据深色或者浅色替换图片，logo替换为自己业务的logo
import bgCenterImg from './img/bg-light-center.png';
import baiduLogo from './img/logo1.png';
import kaiwuLogo from './img/logo2.png';
import './login.less';

import {showSuccess} from '@utils';
import {validateUrl} from './utils';

const PREFIX = 'login-page';

export default props => {
    const [form] = Form.useForm();
    // 在这里修改文案
    const [data] = useState({
        title: '百度智能云开物',
        // subTitle为了展现好看，每行字数单独写，最多3行
        subTitle: [
            '百度智能云开物面向OP人员，对工业互联网平台接入的多种应用进行统一的管理及监控告警。',
            '系统包含监控告警大屏、告警列表、告警规则设置、用户管理、日志管理等主要功能。'
        ],
        loginTab: '欢迎登录百度智能云开物'
    });
    const [loading, setLoading] = useState(false);

    const handlelPrams = values => {
        return {
            ...values
            // password: Base64.stringify(sha256(values?.password))
            // password: aes.encode(values?.password)
        };
    };
    const handleLogin = async values => {
        try {
            setLoading(true);
            // actions.indexUserLogin(values);
            // const {success, message} = await userLogin(handlelPrams(values)) || {};
            // success && await successCallback();
        } finally {
            setLoading(false);
        }
    };

    // const successCallback = async () => {
    //     notification.success('登录成功');
    //     const defaultUrl = '/';
    //     let url = getQueryString('u', props.routerProps.location.search);
    //     if (!validateUrl(url)) {
    //         url = defaultUrl;
    //     }
    //     window.location.href = url;
    // };


    const onFinish = values => {
        form.validateFields().then(values => {
            handleLogin(values);
        });
    };

    return (
        <div className="login-page">
            <div className="bgmask"></div>
            <div className="page-wrap">
                <div className="page-logo">
                    <img src={baiduLogo}></img>
                    <img src={kaiwuLogo}></img>
                </div>
                <div className="left-desc">
                    <div className="bg">
                    </div>
                    <div className="content">
                        <div className="title">
                            {data.title}
                        </div>
                        <div className="subtitle">
                            <div>
                                {data.subTitle.map(text =>
                                    <p key={text}>{text}</p>
                                )}
                            </div>
                        </div>
                        <img className="center" src={bgCenterImg}></img>
                    </div>

                </div>
                <div className="right-wrap">
                    <div className="login-one-tab">
                        {data.loginTab}
                    </div>

                    <div className="form-wrap">
                        <Form
                            className="pro-form"
                            name="basic"
                            onFinish={onFinish}
                            form={form}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名'
                                    }
                                ]}
                            >
                                <Input
                                    className={`${PREFIX}-password`}
                                    placeholder="请输入用户名"
                                    type="text"
                                    autocomplete="off"
                                    style={{height: '40px'}}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码'
                                    }
                                ]}
                            >
                                <Input.Password
                                    className={`${PREFIX}-password`}
                                    placeholder="请输入密码"
                                    autocomplete="new-password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};
