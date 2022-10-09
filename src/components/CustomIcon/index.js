/*
 * @Author: zhoupengfei03
 * @Date: 2022-01-04 15:15:28
 * @LastEditTime: 2022-01-04 19:28:51
 * @LastEditors: zhoupengfei03
 * @FilePath: /blue-cli/src/components/CustomIcon/index.js
 * @Description: 自定义icon组件
 */
import Icon from '@ant-design/icons';
import * as svgIcons from './svgIcons.js';
// svg映射表
const iconMap = new Map([
    ['icon-booster-pumpIcon', svgIcons.boosterPumpIcon],
    ['icon-menu-arrow', svgIcons.menuArrowIcon]
]);
// 自定义Icon组件主体函数
const CustomIcon = props => {
    const {type, className, width = 16, height = 16} = props;

    return <Icon className={className} width={width} height={height} component={iconMap.get(type)} />;
};

export default CustomIcon;
