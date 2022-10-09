/**
 * @file CollapsedProjects
 * @description 侧导航自定义icon
 * @author guowei26
 */
import React from 'react';
import Icon from '@ant-design/icons';
import * as menuSvgIcon from './icon';

export const enum MenuType {
    // 出水量预测
    WATER_YIELD_PREDICT='WATER_YIELD_PREDICT',
    // 出水压力推荐
    OUTLET_VALVE_PRESSURE_RECOMMEND='OUTLET_VALVE_PRESSURE_RECOMMEND',
    // 点胶机场景
    SIMULATION='SIMULATION',
    // 非结构化数据
    FJGSH='FJGSH',
    // 供水量预测场景
    GSLYCCJ='GSLYCCJ',
    // 加压泵运行状态推荐
    PUMP_RUNSTATUS_RECOMMEND='PUMP_RUNSTATUS_RECOMMEND',
    // 进水阀开度推荐
    INLET_VALVE_OPENING_RECOMMEND='INLET_VALVE_OPENING_RECOMMEND',
    // 模型管理
    MXGL='MXGL',
    // 取水泵运行状态推荐
    QSBYXZTTJ='QSBYXZTTJ',
    // 设备预测性维护
    EQU_PRE_MAIN='EQU_PRE_MAIN',
    // 时序预测场景
    TIME_SERIES_PREDICT='TIME_SERIES_PREDICT',
    // 水厂水平衡场景
    WATER_BALANCE='WATER_BALANCE',
    // 送水泵运行状态推荐
    SSBYXZTTJ='SSBYXZTTJ',
    // 异常预警分析
    ALERT = 'ALERT',
    // 收起状态项目箭头
    COLLAPSED_PROJECT_ICON='COLLAPSED_PROJECT'

}

interface MenuIconIProps {
    type: MenuType;
    className?: string;
}

const MenuMap: Map<MenuType, { svg: React.ComponentType<React.SVGProps<any>> }> = new Map([
    [MenuType.WATER_YIELD_PREDICT, {svg: menuSvgIcon.waterYieldPrediction}],
    [MenuType.OUTLET_VALVE_PRESSURE_RECOMMEND, {svg: menuSvgIcon.sendOutWater}],
    [MenuType.SIMULATION, {svg: menuSvgIcon.dispenserScene}],
    [MenuType.FJGSH, {svg: menuSvgIcon.unstructuredData}],
    [MenuType.GSLYCCJ, {svg: menuSvgIcon.waterSupply}],
    [MenuType.PUMP_RUNSTATUS_RECOMMEND, {svg: menuSvgIcon.boosterPump}],
    [MenuType.INLET_VALVE_OPENING_RECOMMEND, {svg: menuSvgIcon.inletValveOpening}],
    [MenuType.MXGL, {svg: menuSvgIcon.modelManagement}],
    [MenuType.QSBYXZTTJ, {svg: menuSvgIcon.waterIntakePump}],
    [MenuType.EQU_PRE_MAIN, {svg: menuSvgIcon.equipmentMaintenance}],
    [MenuType.TIME_SERIES_PREDICT, {svg: menuSvgIcon.timeSeriesPrediction}],
    [MenuType.WATER_BALANCE, {svg: menuSvgIcon.waterBalance}],
    [MenuType.SSBYXZTTJ, {svg: menuSvgIcon.waterSupplyPump}],
    [MenuType.ALERT, {svg: menuSvgIcon.warningAnalysis}],
    [MenuType.COLLAPSED_PROJECT_ICON, {svg: menuSvgIcon.menuArrow}]
]);

const MenuIcon: React.FC<MenuIconIProps> = props => {
    const {type, className} = props;

    return <Icon className={className} component={MenuMap.get(type)?.svg} />;
};

export default MenuIcon;
