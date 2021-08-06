//左边
var myChart2 = echarts.init(document.getElementById('left_mid_charts1'));
var option_wq = {
    title: {
        text: '单位:g/kW.h',
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
	color:['hsl(160deg 100% 49%)','hsl(52deg 100% 51%)','hsl(23deg 100% 50%)'],
    legend: {
			 data:['2018年','2019年','2020年'],
             y: 'top',    //延Y轴居上
             x: 'right', //居右显示
			 padding: [39, 10, 30, 40],
			 icon:'line'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },

    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ["南京", "无锡", "徐州","常州","苏州","盐城","淮安","南通","宿迁","扬州","镇江","泰州","连云港"],
        axisLabel: {
			interval: 0,
                formatter: function (value) {
                    //x轴的文字改为竖版显示
                    var str = value.split("");
                    return str.join("\n");
                },
            textStyle: {
                //文字样式
                color: "#fff",
                fontSize: "12"
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            textStyle: {
                //文字样式
                color: "#fff",
                fontSize: "12"
            }
        },
        splitLine:{
            lineStyle:{
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
			lineStyle:{
				normal:{
					width:2,
				}
			},
            data: [572, 424, 163,430,129,327,430,129,327,392,287,221, 143, 465]
        },
        {
            name: '2019年',
            type: 'line',
            stack: '总量',
			lineStyle:{
				normal:{
					width:2,
				}
			},
            data: [656, 54, 545,432,93,392,283,493,286,96,149,283,396]
        },
        {
            name: '2020年',
            type: 'line',
            stack: '总量',
			lineStyle:{
				normal:{
					width:2,
				}
			},
            data: [572, 424, 163,430,129,327,430,129,327,392,287,221, 143, 465]
        }/*,
        {
            name: '徐州',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '常州',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '苏州',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        },
        {
            name: '盐城',
            type: 'line',
            stack: '总量',
            data: [346, 389, 438, 245, 125, 95, 563]
        },
        {
            name: '淮安',
            type: 'line',
            stack: '总量',
            data: [124, 468, 853, 736, 257, 469, 256]
        },
        {
            name: '南通',
            type: 'line',
            stack: '总量',
            data: [468, 367, 463, 95, 367, 489, 258]
        },
        {
            name: '宿迁',
            type: 'line',
            stack: '总量',
            data: [1243, 567, 489, 936, 374, 942, 347]
        },
        {
            name: '扬州',
            type: 'line',
            stack: '总量',
            data: [632, 263, 472, 372, 742, 258, 269]
        },
        {
            name: '镇江',
            type: 'line',
            stack: '总量',
            data: [369, 1263, 643, 479, 358, 472, 936]
        },
        {
            name: '泰州',
            type: 'line',
            stack: '总量',
            data: [524, 361, 328, 843, 258, 371, 835]
        },
        {
            name: '连云港',
            type: 'line',
            stack: '总量',
            data: [1253, 843, 263, 542, 483, 947, 734]
        }*/
    ]
};

myChart2.setOption(option_wq);