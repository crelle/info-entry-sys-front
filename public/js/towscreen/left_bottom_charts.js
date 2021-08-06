//左边
var myChart2 = echarts.init(document.getElementById('left_bottom_charts1'));
var option_wq = {
    title: {
        text: '单位:万吨',
        padding: 34, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
        x: 'left', //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
        textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: '#fff',

        },

    },
    tooltip: {
        trigger: 'axis'
    },
    color: ['hsl(180deg 100% 49%)'],
    //legend: {
    //data:['2018年','2019年','2020年'],
    //y: 'top',    //延Y轴居上
    //x: 'right', //居右显示
    //padding: [39, 10, 30, 40],
    //icon:'line'
    //},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },

    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ["2018", "2019", "2020"],
        axisLabel: {
            interval: 0,

            textStyle: {
                //文字样式
                color: "#b2d8ef",
                fontSize: "12"
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            interval: 0,

            textStyle: {
                //文字样式
                color: "#b2d8ef",
                fontSize: "12"
            }
        },
        splitLine: {
            lineStyle: {
                color: ['#ddd'],
                width: 0.2,
                type: 'solid'
            }
        },
    },
    series: [
        {
            name: '2018年',
            type: 'line',
            stack: '总量',
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
                color: '#36c5e7',
                width: 2
            },
            data: [35, 32, 53, 38, 35, 73, 37, 46, 18, 63, 32, 52, 23],
            zlevel: 2,
            areaStyle: {            // 折现下是否填充
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#000000' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'hsl(180deg 100% 49%)' // 100% 处的颜色
                    }],
                    global: false
                }
            },
        },

    ]
};

myChart2.setOption(option_wq);

