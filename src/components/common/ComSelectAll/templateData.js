import {isArrayNull} from '@utils';

const testFieldNames = {
    label: 'text',
    value: 'id'
};

const testOptionData = [
    {id: 1, text: 'aaaa'},
    {id: 2, text: 'bbbb'},
    {id: 3, text: 'orange'},
    {id: 4, text: 'apple'},
    {id: 5, text: 'bananabanana'}
];

const testValue = [
    {id: 3, text: 'orange'},
    {id: 5, text: 'bananabanana'}
];

export {
    testFieldNames,
    testOptionData,
    testValue
};

const formatOptions = (options, fieldNames) => {
    const {label: labelField = 'label', value: valueField = 'value'} = fieldNames;
    if (isArrayNull(options)) {
        return [];
    }

    return options.map(item => {
        const {[labelField]: label, [valueField]: value, ...otherItem} = item;
        return {label, value, ...otherItem};
    });
};

const formatSelectValue = (selectValues = [], fieldNames = {}) => {
    const {value: valueField = 'value'} = fieldNames;
    if (isArrayNull(selectValues)) {
        return [];
    }

    return selectValues.map(item => item[valueField]);
};

const filterValueFromIds = (options, ids, fieldNames) => {
    if (isArrayNull(options) || isArrayNull(ids)) {
        return [];
    }
    const {value: valueField = 'value'} = fieldNames;
    return options.filter(item => ids.includes(item[valueField]));
};

const filterIds = (value, fieldNames) => {
    const {value: valueField = 'value'} = fieldNames;
    if (typeof value !== 'object') {
        return [];
    }

    const wrapperValue = Array.isArray(value) ? value : [value];
    return wrapperValue.map(item => item[valueField]);
};

const handleDelete = (selectValues, deleteItem, fieldNames) => {
    if (isArrayNull(selectValues)) {
        return [];
    }

    if (typeof deleteItem !== 'object') {
        return selectValues;
    }
    const {value: valueField = 'value'} = fieldNames;
    const deleteIds = filterIds(deleteItem, fieldNames);
    return selectValues.filter(item => !deleteIds.includes(item[valueField]));
};

const addLabelAndValue = (data, fieldNames) => {
    if (isArrayNull(data)) {
        return [];
    }
    const {value: valueField = 'value', label: labelField = 'label'} = fieldNames;
    return data.map(item => {
        return {
            ...item,
            label: item[labelField],
            value: item[valueField]
        };
    });
};

export {
    formatOptions,
    formatSelectValue,
    filterValueFromIds,

    handleDelete,
    addLabelAndValue
};