/*
 * @Author: liuyan45
 * @Date: 2022-01-13 19:22:21
 * @LastEditTime: 2022-01-13 19:26:50
 * @LastEditors: liuyan45
 * @FilePath: /blue-cli/src/utils/time.js
 * @Description: time相关工具
 */
import _ from 'lodash';
import moment from 'moment';

/**
 * 转为utc时间
 * @param {string|Object} time 时间字符串或者moment对象
 * @return {string} utc时间
 */

const timeToUtc = (time) => {
    if (!time || (!_.isString(time) && !moment.isMoment(time))) {
        return null;
    }

    const t = moment.isMoment(time) ? time : moment(time);
    if (t.isValid()) {
        return t.utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    }
    return null;
};

function unitFormat(str) {
    return str < 10 ? '0' + str : str;
}

export default {
    /** * 开始时间 * */
    getStartTime(date) {
        return moment(date).format('YYYY-MM-DD 00:00:00');
    },
    /** * 结束时间 * */
    getEndTime(date) {
        return moment(date).format('YYYY-MM-DD 23:59:59');
    },
    /** * 一个月第一天 * */
    getMonthFirstDay(d) {
        return moment(d || new Date()).format('YYYY-MM-01');
    },
    /** * utc时间 * */
    timeToUtc(time) {
        return timeToUtc(time);
    },
    /** * 格式化时间 * */
    toTime(utcTimeStr, defaultTime = '') {
        return utcTimeStr ? moment(utcTimeStr).format('YYYY-MM-DD HH:mm:ss') : defaultTime;
    },
    /** * 格式化时间-到分钟 * */
    utcToMinute(utcTimeStr, defaultTime = '') {
        return utcTimeStr ? moment(utcTimeStr).format('YYYY-MM-DD HH:mm') : defaultTime;
    },
    /** * 格式化时间-到日期* */
    toDate(utcTimeStr, defaultTime = '') {
        return utcTimeStr ? moment(utcTimeStr).format('YYYY-MM-DD') : defaultTime;
    },
    /**
     * 将时间区间处理成开始日00:00:00-结束日23:59:59的utc格式
     *
     * @param {Array} timeRange 时间区间
     * @return {Array} 处理后的值
     */
    formatTimeRange(timeRange) {
        timeRange = _.compact(timeRange);
        if (timeRange && timeRange.length === 2) {
            const newTimeRange = _.map(timeRange,
                (time) => (moment.isMoment(time) ? time : moment(time)));
            return [
                timeToUtc(newTimeRange[0].format('YYYY-MM-DD 00:00:00')),
                timeToUtc(newTimeRange[1].format('YYYY-MM-DD 23:59:59'))
            ];
        }
        return [];
    },

    /**
     * 将秒数转化成形如“16:00:00” “01:02”类似时间展现形式
     *
     * @param {number | string} seconds 秒数
     * @return {string} 处理后的值
     */
    durationBySecond(seconds) {
        seconds = parseInt(seconds.toString(), 10);
        let hour = 0;
        let minute = 0;
        let second = 0;
        if (seconds <= 0) {
            return '00:00';
        }
        minute = Math.floor(seconds / 60);
        if (minute < 60) {
            second = seconds % 60;
            return unitFormat(minute) + ':' + unitFormat(second);
        }
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        second = seconds - hour * 3600 - minute * 60;
        return unitFormat(hour) + ':' + unitFormat(minute) + ':' + unitFormat(second);
    }
};
