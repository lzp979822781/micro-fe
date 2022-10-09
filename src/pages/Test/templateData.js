const options = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
        }
    ]
};

export {options};

const columns = [
    {
        title: '应用名称',
        dataIndex: 'customizedAppName',
        key: 'customizedAppName',
        width: 120,
        ellipsis: true
    },
    {
        title: '应用ID',
        dataIndex: 'customizedApplicationUuid',
        key: 'customizedApplicationUuid',
        width: 120
    },
    {
        title: '应用描述',
        dataIndex: 'description',
        key: 'description',
        width: 180
    },
    {
        title: '状态',
        dataIndex: 'statusCode',
        key: 'statusCode',
        width: 120,
        render: (text, record) => {
            const {statusCode: code, statusName: name} = record;
            return name;
        }
    },
    {
        title: '更新时间',
        dataIndex: 'lastModifiedDate',
        key: 'lastModifiedDate',
        width: 180
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: 180,
        fixed: 'right'
    }
];

export {columns};

const appNameRule = [
    {
        required: true
    },
    {
        pattern: /^[\u4e00-\u9fa5A-Za-z]{2,32}$/
    }
];

const appNameOpt = {
    label: '应用名称',
    name: 'customizedAppName',
    rules: appNameRule,
    help: '2~32个字符,支持中文、大小写英文字母',
    componentProps: {
        placeholder: '请输入应用名称',
        maxLength: 32
    }
};
/* eslint-disabled */
const descRule = /^[\u4e00-\u9fa5a-zA-Z'',，.。/、\]\[【】\\n\s！!?？——_<>%;‘’；)《（）》(&+=`“”·*#@@]{2,200}$/;
const appDescOpt = {
    label: '应用描述',
    name: 'description',
    help: '2-200个字符，支持中文、大小写英文字母、标点符号',
    rules: [
        {required: true},
        {min: 2},
        {whitespace: true},
        {pattern: descRule}
    ],
    componentProps: {
        placeholder: '请输入应用描述',
        rows: 4,
        maxLength: 200
    }
};

const webTypeOpts = {
    label: '应用类型',
    custom: 'web应用',
    required: false
};

const iconOpts = {
    text: '应用图标'
};

const iconDesc = {
    formatText: '图片格式：png/jpg/jpeg，图片大小不超过5M',
    infoText: '若未上传应用图标，平台将提供默认图标'
};

export {
    appNameOpt,
    appDescOpt,
    webTypeOpts,
    iconOpts,
    iconDesc
};

const eventTypeOpt = {
    label: '事件类型',
    name: 'eventType',
    rules: [
        {required: true, message: '请选择事件类型'}
    ],
    componentProps: {
        placeholder: '请选择事件类型'
    }
};

const eventTypeDropOpts = [
    {code: 1, name: '会议'},
    {code: 2, name: '出差'},
    {code: 3, name: '日常'},
    {code: 4, name: '其他'}
];

export {
    eventTypeOpt,
    eventTypeDropOpts
};

const roleOpts = {
    label: '是否支持单个用户具备多角色',
    name: 'moreRoleFlag',
    preserve: true,
    rules: [{required: true, message: '请选择是否支持多角色'}]
};

const roleItemOpts = [
    {code: 1, name: '是'},
    {code: 0, name: '否'}
];

export {
    roleOpts,
    roleItemOpts
};
