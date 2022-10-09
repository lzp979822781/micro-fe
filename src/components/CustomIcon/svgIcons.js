/*
 * @Author: zhoupengfei03
 * @Date: 2022-01-04 15:15:28
 * @LastEditTime: 2022-01-04 19:28:51
 * @LastEditors: zhoupengfei03
 * @FilePath: /blue-cli/src/components/CustomIcon/svgIcons.js
 * @Description: svg文件列表
 */
/* eslint-disable */
const boosterPumpIcon = () => (
    <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
        <title>加压泵运行状态推荐</title>
        <g id="加压泵运行状态推荐" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect id="矩形" stroke="#999999" x="1" y="1" width="14" height="14"></rect>
            <g id="编组" transform="translate(3.618964, 3.910686)" stroke="#999999">
                <rect id="矩形备份" x="0.88103624" y="0.5" width="7" height="4"></rect>
                <line x1="4.38103624" y1="4.49994738" x2="4.38103624" y2="7.67862858" id="路径-14"></line>
                <line x1="0" y1="8.15270993" x2="8.76207248" y2="8.15270993" id="路径-15"></line>
                <path d="M2.84278635,0.435866442 C2.10695117,1.45910628 2.10695117,2.81379992 2.84278635,4.49994738" id="路径-16"></path>
                <path d="M6.47116251,0.435866442 C5.73532733,1.45910628 5.73532733,2.81379992 6.47116251,4.49994738" id="路径-16备份" transform="translate(6.195224, 2.467907) scale(-1, 1) translate(-6.195224, -2.467907) "></path>
            </g>
        </g>
    </svg>
)
const menuArrowIcon = () => (
    <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
        <title>编组 27</title>
        <g id="导航升级" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="导航-浅色-模板" transform="translate(-82.000000, -8967.000000)">
                <g id="编组-26" transform="translate(60.000000, 8894.000000)">
                    <g id="列1备份-6" transform="translate(0.000000, 61.000000)">
                        <g id="编组-27" transform="translate(30.000000, 20.000000) rotate(-270.000000) translate(-30.000000, -20.000000) translate(22.000000, 12.000000)">
                            <rect id="矩形" fill="#D8D8D8" opacity="0" x="0" y="0" width="16" height="16"></rect>
                            <polyline id="路径-2" stroke="#212632" points="5.69886077 2.4149619 11.2838989 8 5.69886077 13.5850381"></polyline>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
)


export {
    // 加压泵运行状态推荐
    boosterPumpIcon,
    // 菜单箭头
    menuArrowIcon,
};