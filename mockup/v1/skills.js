/*
 * @Author: liuyan45
 * @Date: 2021-12-22 13:54:36
 * @LastEditTime: 2021-12-22 13:54:37
 * @LastEditors: liuyan45
 * @FilePath: /blue-cli/mockup/v1/skills.js
 * @Description:
 */

let infoData = [{
    'id': '0',
    'name': '安全帽检测技能0',
    'labels': [{
        'id': 'xxx',
        'name': '合规'
    }],
    'version': 'V1',
    'aiModel': {
        'id': 'xxx',
        'name': '安全帽检测'
    },
    'deviceCount': 10,
    'description': '备注信息是啥呢',
    'status': 'created',
    'createdAt': '2021-01-01T12:00:00Z',
    'updatedAt': '2021-01-01T12:00:00Z'
},
{
    'id': '1',
    'name': '安全帽检测技能1',
    'labels': [{
        'id': 'xxx',
        'name': '合规'
    }],
    'version': 'V1',
    'aiModel': {
        'id': 'xxx',
        'name': '安全帽检测'
    },
    'deviceCount': 10,
    'description': '备注信息是啥呢',
    'status': 'created',
    'createdAt': '2021-01-01T12:00:00Z',
    'updatedAt': '2021-01-01T12:00:00Z'
},
{
    'id': '2',
    'name': '安全帽检测技能2',
    'labels': [{
        'id': 'xxx',
        'name': '合规'
    }],
    'version': 'V1',
    'aiModel': {
        'id': 'xxx',
        'name': '安全帽检测'
    },
    'deviceCount': 10,
    'description': '备注信息是啥呢',
    'status': 'created',
    'createdAt': '2021-01-01T12:00:00Z',
    'updatedAt': '2021-01-01T12:00:00Z'
},
{
    'id': '3',
    'name': '安全帽检测技能3',
    'labels': [{
        'id': 'xxx',
        'name': '合规'
    }],
    'version': 'V1',
    'aiModel': {
        'id': 'xxx',
        'name': '安全帽检测'
    },
    'deviceCount': 10,
    'description': '备注信息是啥呢',
    'status': 'created',
    'createdAt': '2021-01-01T12:00:00Z',
    'updatedAt': '2021-01-01T12:00:00Z'
},
{
    'id': '4',
    'name': '安全帽检测技能4',
    'labels': [{
        'id': 'xxx',
        'name': '合规'
    }],
    'version': 'V1',
    'aiModel': {
        'id': 'xxx',
        'name': '安全帽检测'
    },
    'deviceCount': 10,
    'description': '备注信息是啥呢',
    'status': 'created',
    'createdAt': '2021-01-01T12:00:00Z',
    'updatedAt': '2021-01-01T12:00:00Z'
}
];
exports.getData = function (method, data) {
    // 可根据data进行操作
    return JSON.stringify(infoData);
};
