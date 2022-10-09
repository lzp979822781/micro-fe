/**
 * @description 常用的正则集合
 * @author guowei26
 */

// 身份证号
export const REGX_IDCARD = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

// 银行卡号
export const REGX_BANKCARD = /^([1-9]{1})(\d{15,18})$/;

// 交易密码
export const REGX_TRADE_PASSWORD = /^[0-9]{6}$/;

// 手机号
export const REGX_MOBILE_PHONE = /^1[0-9]\d{9}$/;

// 严格手机号
// eslint-disable-next-line max-len
export const REGX_MOBILE_PHONE_STRICT = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;

// 6位数字验证码
export const REGX_MOBILE_PHONE_CODE = /^[0-9]{6}$/;
