const colorPalette = [
    '#c12e34', '#0098d9', '#36b623', '#2b821d',
    '#005eaa', '#339ca8', '#cda819', '#32a487'
];
const theme = {
    color: colorPalette,
    title: {
        textStyle: {
            fontWeight: 'normal'
        },
        top: 20
    },
    visualMap: {
        color: ['#2468F2', '#EAEEFF']
    },
    toolbox: {
        iconStyle: {
            normal: {
                borderColor: '#06467c'
            }
        }
    },
    tooltip: {
        backgroundColor: '#fff'
    },
    dataZoom: {
        dataBackgroundColor: '#dedede',
        fillerColor: 'rgba(154,217,247,0.2)',
        handleColor: '#005eaa'
    },
    timeline: {
        lineStyle: {
            color: '#005eaa'
        },
        controlStyle: {
            normal: {
                color: '#005eaa',
                borderColor: '#005eaa'
            }
        }
    },
    candlestick: {
        itemStyle: {
            normal: {
                color: '#c12e34',
                color0: '#2b821d',
                lineStyle: {
                    width: 1,
                    color: '#c12e34',
                    color0: '#2b821d'
                }
            }
        }
    },
    /* graph: {
        color: colorPalette
    }, */
    map: {
        label: {
            normal: {
                textStyle: {
                    color: '#333333'
                }
            }
        },
        itemStyle: {
            normal: {
                borderColor: 'rgba(44,54,141, 0.80)',
                areaColor: '#F4F7FC'
            }
            /* emphasis: {
                areaColor: '#e6b600'
            } */
        }
    },
    gauge: {
        axisLine: {
            show: true,
            lineStyle: {
                color: [[0.2, '#2b821d'], [0.8, '#005eaa'], [1, '#c12e34']],
                width: 5
            }
        },
        axisTick: {
            splitNumber: 10,
            length: 8,
            lineStyle: {
                color: 'auto'
            }
        },
        axisLabel: {
            textStyle: {
                color: 'auto'
            }
        },
        splitLine: {
            length: 12,
            lineStyle: {
                color: 'auto'
            }
        },
        pointer: {
            length: '90%',
            width: 3,
            color: 'auto'
        },
        title: {
            textStyle: {
                color: '#333'
            }
        },
        detail: {
            textStyle: {
                color: 'auto'
            }
        }
    }
};

export default theme;