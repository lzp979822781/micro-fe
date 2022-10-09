/*
 * @Author: zhoupengfei03
 * @Date: 2021-12-21 20:08:33
 * @LastEditTime: 2022-01-10 19:11:19
 * @LastEditors: Please set LastEditors
 * @FilePath: /blue-cli/.stylelintrc.js
 * @Description: stylelint配置
 */
module.exports = {
    'extends': '@ecomfe/stylelint-config',
    'plugins': [
        'stylelint-declaration-block-no-ignored-properties'
    ],
    'rules': {
        'plugin/declaration-block-no-ignored-properties': true,
        'rule-empty-line-before': null,
        'at-rule-empty-line-before': null,
        'at-rule-no-unknown': null,
        'function-comma-space-after': null,
        'at-rule-name-case': null,
        'property-no-unknown': null,
        'declaration-block-no-shorthand-property-overrides': null,
        'declaration-empty-line-before': null,
        'color-hex-case': 'upper',
        'color-hex-length': 'short',
        'no-eol-whitespace': null,
        'no-duplicate-selectors': null,
        'function-calc-no-unspaced-operator': null
    }
};
