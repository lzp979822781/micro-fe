import {useState, useEffect, useRef} from 'react';
import classnames from 'classnames';
import {Button, Form, Divider, Space} from '@baidu/sstrd';

import {ComChart, ComDrawer, ComTable, AutoUpload} from '@components/common';
import {
    inputItemRender,
    textRender,
    areaRender,
    selectRender,
    radioRender
} from '@components/biz';

import {useVisible, useDeleteModal} from '@hooks';
import {useTable} from './hooks';

import {
    options,
    columns,
    appNameOpt,
    webTypeOpts,
    appDescOpt,
    eventTypeOpt,
    eventTypeDropOpts,

    roleOpts,
    roleItemOpts
} from './templateData';

import {showSuccess, showError} from '@utils';

import './index.less';

const testValue = [
    {id: 3, text: 'orange'},
    {id: 5, text: 'bananabanana'}
];

const PREFIX = 'test';
function Test(props) {
    const {className} = props;
    const cls = classnames(PREFIX, className);
    const [form] = Form.useForm();
    const ref = useRef();
    const [reqPage, setReqPage] = useState({pageNo: 1, pageSize: 10});

    const {visible, onOpen, onClose} = useVisible();
    const {data, paginationOpts} = useTable({reqPage});

    // 弹窗是否可见
    const {
        visible: modalVisible,
        onOpen: onModalOpen,
        onClose: onModalClose
    } = useVisible();

    console.log('modalVisible', modalVisible);

    // 删除
    const {onDel, renderModal} = useDeleteModal({
        api: 'aaa',
        message: '确定删除',
        description: '删除测试',
        successCallback: () => {}
    });

    const actionObj = {
        filter: () => {},
        paginate: pagination => {
            const {pageSize: currentSize} = reqPage;
            const {current, pageSize} = pagination;
            setReqPage({
                pageNo: currentSize !== pageSize ? 1 : current,
                pageSize
            });
        },
        sort: () => {}
    };

    /**
     * @param {*} pagination
     * @param {*} filters
     * @param {*} sorter
     * @param {*} extra action paginate | sort | filter
     */
    const onTableChange = (pagination, filters, sorter, extra) => {
        const {action} = extra;

        const dataObj = {
            filter: filters,
            sort: sorter,
            paginate: pagination
        };
        actionObj[action](dataObj[action]);
    };

    useEffect(() => {
        if (form) {
            form.setFieldsValue({
                username: testValue
            });
        }
    }, [form]);

    const onSubmit = () => {
        form.validateFields()
            .then(values => {
                console.log('values', values);
            })
            .catch(errorInfo => {
                console.log('errorInfo', errorInfo);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            ref.current.setOption({
                xArr: {
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                series: [
                    {
                        data: [300, 460, 448, 436, 270, 294, 520]
                    }
                ]
            });
        }, 10000);
    }, []);

    const onSuccessClick = () => {
        showSuccess('成功提示');
    };

    const onErrorClick = () => {
        showError('错误提示');
    };

    return (
        <div className={cls}>
            <Form
                form={form}
            >
                {/* <Form.Item
                    label="Username"
                    name="username"
                >
                    <ComSelectAll />
                </Form.Item> */}
                {inputItemRender(appNameOpt)}
                {textRender(webTypeOpts)}
                {areaRender(appDescOpt)}
                {selectRender({...eventTypeOpt, options: eventTypeDropOpts})}
                {radioRender(roleOpts, roleItemOpts)}
            </Form>
            <Button type="primary" onClick={onSubmit}>
                Submit
            </Button>
            <div>
                <ComChart
                    id='myChart'
                    ref={ref}
                    options={options}
                    width='100%'
                />
            </div>
            <div>
                <Button type='primary' onClick={onOpen}>抽屉测试</Button>
                <ComDrawer
                    className={`${PREFIX}-drawer`}
                    title='应用延期申请'
                    visible={visible}
                    onOk={onClose}
                    onClose={onClose}
                    onCancel={onClose}
                    destroyOnClose
                >
                    抽屉测试
                </ComDrawer>
            </div>
            <div>
                <ComTable
                    columns={columns}
                    dataSource={data}
                    pagination={paginationOpts}
                />
            </div>
            <div>
                <Button type='primary' onClick={onDel({id: 1})}>删除弹框</Button>
                {renderModal()}
            </div>
            <Divider />
            <Space>
                <Button type='primary' onClick={onSuccessClick}>成功提示</Button>
                <Button type='primary' onClick={onErrorClick}>错误提示</Button>
            </Space>
            <div>
                <Button type='primary' onClick={onModalOpen}>上传测试</Button>
                <AutoUpload
                    visible={modalVisible}
                    title='上传测试'
                    onClose={onModalClose}
                    /* downloadUrl={api.customerFileexcelDownload}
                    uploadUrl={api.customerUpload}
                    validUrl={api.customerFileCheck} */
                    // extra={}
                    // onSuccess={this.onRefresh}
                />
            </div>
        </div>
    );
}

export default Test;