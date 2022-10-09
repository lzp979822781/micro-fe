
/**
 * @file v1/device/1.js
 */
var infoData = {
    'id': 'xxx',
    'name': '东区01号',
    'streamURL': 'rtmp://test.com',
    'image': {
        'url': 'http://img2.imgtn.bdimg.com/it/u=1962045236,1139336730&fm=26&gp=0.jpg',
        'width': 398,
        'height': 252
    }
};
exports.getData = function (method, data) {
    // 可根据data进行操作
    return JSON.stringify(infoData);
};